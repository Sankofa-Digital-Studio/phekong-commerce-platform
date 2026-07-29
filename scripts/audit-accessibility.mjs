import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(repoRoot, "docs", "evidence", "m1-accessibility");
const baseUrl = process.env.A11Y_BASE_URL ?? "http://127.0.0.1:3102";
const runId = process.env.A11Y_RUN_ID ?? "audit";
const routes = [
  { id: "home", path: "/" },
  { id: "about", path: "/about" },
  { id: "contact", path: "/contact" },
  { id: "catalogue", path: "/products" },
  { id: "product-detail", path: "/products/nourishing-shea-butter" },
];
const viewports = [
  { id: "mobile-390x844", width: 390, height: 844 },
  { id: "desktop-1440x1000", width: 1440, height: 1000 },
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: "light",
      reducedMotion: "reduce",
    });

    for (const route of routes) {
      const page = await context.newPage();
      const consoleErrors = [];
      const failedRequests = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          consoleErrors.push(message.text());
        }
      });
      page.on("requestfailed", (request) => {
        failedRequests.push({
          url: request.url(),
          error: request.failure()?.errorText ?? "unknown",
        });
      });

      const response = await page.goto(`${baseUrl}${route.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 60_000,
      });
      await page.locator("main").first().waitFor({ state: "visible", timeout: 30_000 });
      await page.waitForTimeout(400);
      await page.addScriptTag({ path: axePath });

      const axe = await page.evaluate(async () => {
        const report = await globalThis.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
          },
          resultTypes: ["violations", "incomplete"],
        });

        const simplify = (entry) => ({
          id: entry.id,
          impact: entry.impact,
          description: entry.description,
          help: entry.help,
          helpUrl: entry.helpUrl,
          nodes: entry.nodes.map((node) => ({
            target: node.target,
            html: node.html.slice(0, 240),
            failureSummary: node.failureSummary,
          })),
        });

        return {
          violations: report.violations.map(simplify),
          incomplete: report.incomplete.map(simplify),
        };
      });

      const structure = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((heading) => ({
          level: Number(heading.tagName.slice(1)),
          text: heading.textContent?.trim().replace(/\s+/g, " ").slice(0, 160) ?? "",
        }));
        const skippedHeadingLevels = [];

        for (let index = 1; index < headings.length; index += 1) {
          if (headings[index].level > headings[index - 1].level + 1) {
            skippedHeadingLevels.push({
              from: headings[index - 1],
              to: headings[index],
            });
          }
        }

        const images = Array.from(document.querySelectorAll("img")).map((image) => ({
          src: image.getAttribute("src"),
          alt: image.getAttribute("alt"),
          width: image.getAttribute("width"),
          height: image.getAttribute("height"),
        }));
        const interactive = Array.from(
          document.querySelectorAll("button,input,select,textarea,a[href],[role='button']"),
        )
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
          })
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName.toLowerCase(),
              text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 100) ?? "",
              ariaLabel: element.getAttribute("aria-label"),
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
              inlineLink: element.tagName === "A" && getComputedStyle(element).display === "inline",
            };
          });
        const formControls = Array.from(document.querySelectorAll("input,select,textarea")).map((control) => {
          const id = control.getAttribute("id");
          const labelledBy = control.getAttribute("aria-labelledby");
          const label =
            control.getAttribute("aria-label") ??
            (id ? document.querySelector(`label[for="${CSS.escape(id)}"]`)?.textContent?.trim() : null) ??
            (labelledBy ? document.getElementById(labelledBy)?.textContent?.trim() : null) ??
            control.closest("label")?.textContent?.trim() ??
            null;

          return {
            tag: control.tagName.toLowerCase(),
            type: control.getAttribute("type"),
            label,
          };
        });

        return {
          title: document.title,
          viewportMeta: document.querySelector("meta[name='viewport']")?.getAttribute("content") ?? null,
          headings,
          h1Count: headings.filter((heading) => heading.level === 1).length,
          skippedHeadingLevels,
          landmarks: {
            header: document.querySelectorAll("header").length,
            nav: document.querySelectorAll("nav").length,
            main: document.querySelectorAll("main").length,
            footer: document.querySelectorAll("footer").length,
            form: document.querySelectorAll("form").length,
          },
          images,
          missingAltCount: images.filter((image) => image.alt === null).length,
          formControls,
          unlabeledFormControls: formControls.filter((control) => !control.label),
          stateMessaging: {
            alerts: document.querySelectorAll("[role='alert']").length,
            status: document.querySelectorAll("[role='status']").length,
            liveRegions: document.querySelectorAll("[aria-live]").length,
            busyRegions: document.querySelectorAll("[aria-busy='true']").length,
          },
          horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          smallTargets: interactive.filter(
            (element) => !element.inlineLink && (element.width < 24 || element.height < 24),
          ),
        };
      });

      const textResize200 = await page.evaluate(async () => {
        const previousFontSize = document.documentElement.style.fontSize;
        document.documentElement.style.fontSize = "200%";
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const result = {
          horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
        document.documentElement.style.fontSize = previousFontSize;
        return result;
      });

      await page.evaluate(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement) {
          active.blur();
        }
        window.scrollTo(0, 0);
      });

      const focusSequence = [];
      const seenFocus = new Set();
      for (let index = 0; index < 36; index += 1) {
        await page.keyboard.press("Tab");
        const focused = await page.evaluate(() => {
          const element = document.activeElement;
          if (!(element instanceof HTMLElement) || element === document.body) {
            return null;
          }

          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          const label =
            element.getAttribute("aria-label") ??
            element.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) ??
            "";
          const outlineVisible =
            style.outlineStyle !== "none" &&
            Number.parseFloat(style.outlineWidth || "0") > 0 &&
            style.outlineColor !== "transparent";
          const shadowVisible = style.boxShadow !== "none";

          return {
            signature: [
              element.tagName.toLowerCase(),
              element.id,
              element.getAttribute("href"),
              label,
            ].join("|"),
            tag: element.tagName.toLowerCase(),
            id: element.id || null,
            href: element.getAttribute("href"),
            label,
            focusVisibleMatch: element.matches(":focus-visible"),
            visibleIndicator: outlineVisible || shadowVisible,
            inViewport:
              rect.bottom > 0 &&
              rect.right > 0 &&
              rect.top < window.innerHeight &&
              rect.left < window.innerWidth,
          };
        });

        if (!focused || seenFocus.has(focused.signature)) {
          break;
        }

        seenFocus.add(focused.signature);
        focusSequence.push(focused);
      }

      await page.locator("input,textarea").evaluateAll((elements) => {
        for (const element of elements) {
          element.value = "";
          element.setAttribute("data-evidence-redacted", "true");
        }
      });
      await page.evaluate(() => {
        const active = document.activeElement;
        if (active instanceof HTMLElement) {
          active.blur();
        }
        window.scrollTo(0, 0);
      });

      const screenshot = `${runId}-${route.id}-${viewport.id}.png`;
      await page.screenshot({
        path: resolve(outputDir, screenshot),
        fullPage: true,
        animations: "disabled",
      });

      results.push({
        route: route.path,
        routeId: route.id,
        viewport,
        status: response?.status() ?? null,
        screenshot,
        axe,
        structure,
        textResize200,
        keyboard: {
          focusableCountObserved: focusSequence.length,
          sequence: focusSequence,
          missingVisibleIndicator: focusSequence.filter(
            (entry) => entry.focusVisibleMatch && !entry.visibleIndicator,
          ),
          offscreenFocus: focusSequence.filter((entry) => !entry.inViewport),
        },
        consoleErrors,
        failedRequests,
      });

      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const summary = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routes: routes.length,
  viewports: viewports.length,
  audits: results.length,
  totals: {
    axeViolations: results.reduce((total, result) => total + result.axe.violations.length, 0),
    axeIncomplete: results.reduce((total, result) => total + result.axe.incomplete.length, 0),
    missingFocusIndicators: results.reduce(
      (total, result) => total + result.keyboard.missingVisibleIndicator.length,
      0,
    ),
    horizontalOverflowAudits: results.filter((result) => result.structure.horizontalOverflow > 1).length,
    missingAlt: results.reduce((total, result) => total + result.structure.missingAltCount, 0),
    unlabeledFormControls: results.reduce((total, result) => total + result.structure.unlabeledFormControls.length, 0),
    textResizeOverflowAudits: results.filter((result) => result.textResize200.horizontalOverflow > 1).length,
  },
  results,
};

await writeFile(
  resolve(outputDir, `${runId}-audit-results.json`),
  `${JSON.stringify(summary, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(summary.totals));
