import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import process from "node:process";

const root = new URL("../", import.meta.url);
const readJson = (name) => JSON.parse(readFileSync(new URL(name, root), "utf8"));
const manifest = readJson("package.json");
const lockfile = readJson("package-lock.json");
const policy = readJson("dependency-policy.json");
const rootLock = lockfile.packages?.[""] ?? {};
const findings = { errors: [], warnings: [], notices: [] };

const add = (level, message) => findings[level].push(message);
const major = (version) => {
  const match = String(version ?? "").match(/\d+/);
  return match ? Number(match[0]) : null;
};
const runJson = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, NPM_CONFIG_CACHE: process.env.NPM_CONFIG_CACHE || "/tmp/phekong-npm-cache" },
  });
  const text = result.stdout.trim() || result.stderr.trim();
  try {
    return { code: result.status ?? 1, data: text ? JSON.parse(text) : {}, stderr: result.stderr };
  } catch {
    add("errors", `${command} ${args.join(" ")} did not return valid JSON: ${text.slice(0, 500)}`);
    return { code: result.status ?? 1, data: {}, stderr: result.stderr };
  }
};

for (const section of ["dependencies", "devDependencies"]) {
  const declared = manifest[section] ?? {};
  const locked = rootLock[section] ?? {};
  for (const [name, range] of Object.entries(declared)) {
    if (locked[name] !== range) add("errors", `Lockfile root mismatch for ${name}: package.json=${range}, package-lock.json=${locked[name] ?? "missing"}`);
  }
  for (const name of Object.keys(locked)) {
    if (!(name in declared)) add("errors", `Lockfile root contains undeclared ${section} entry: ${name}`);
  }
}

const tree = runJson("npm", ["ls", "--all", "--json"]);
if (tree.code !== 0 || tree.data.error) add("errors", `npm dependency tree is invalid: ${tree.data.error?.summary ?? tree.stderr.trim() ?? "npm ls failed"}`);

const deprecated = Object.entries(lockfile.packages ?? {})
  .filter(([, value]) => value.deprecated)
  .map(([path, value]) => ({
    id: `${path.replace(/^node_modules\//, "")}@${value.version}`,
    reason: value.deprecated,
  }));
for (const item of deprecated) {
  const message = `${item.id}: ${item.reason}`;
  if (policy.acceptedDeprecations.includes(item.id)) add("notices", `Accepted transitive deprecation: ${message}`);
  else add("errors", `New deprecated dependency: ${message}`);
}

const outdated = runJson("npm", ["outdated", "--json", "--long"]);
for (const [name, value] of Object.entries(outdated.data ?? {})) {
  const currentMajor = major(value.current);
  const latestMajor = major(value.latest);
  const detail = `${name}: current ${value.current}, wanted ${value.wanted}, latest ${value.latest}`;
  if (currentMajor !== null && latestMajor !== null && latestMajor > currentMajor) add("errors", `Major upgrade requires an explicit migration review — ${detail}`);
  else if (policy.manualReviewPackages.includes(name)) add("warnings", `Protected package update requires changelog review — ${detail}`);
  else add("notices", `Update available — ${detail}`);
}

const npmLatest = runJson("npm", ["view", "npm", "version", "--json"]);
const currentNpmMajor = major(process.env.npm_config_user_agent?.match(/npm\/([^ ]+)/)?.[1] ?? manifest.packageManager);
const latestNpmMajor = major(npmLatest.data);
if (currentNpmMajor !== policy.approvedNpmMajor) add("errors", `Runtime npm major ${currentNpmMajor} differs from approved major ${policy.approvedNpmMajor}`);
if (latestNpmMajor > policy.approvedNpmMajor) add("warnings", `npm ${npmLatest.data} is a newer major; keep npm ${policy.approvedNpmMajor} until a migration review passes`);

try {
  const nodeIndex = await fetch("https://nodejs.org/dist/index.json").then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });
  const latestLts = nodeIndex.find((release) => release.lts);
  const runtimeNodeMajor = major(process.version);
  const latestLtsMajor = major(latestLts?.version);
  if (runtimeNodeMajor !== policy.approvedNodeLtsMajor) add("errors", `Runtime Node major ${runtimeNodeMajor} differs from approved LTS major ${policy.approvedNodeLtsMajor}`);
  if (latestLtsMajor > policy.approvedNodeLtsMajor) add("warnings", `Node ${latestLts?.version} is the newest LTS major and requires a migration review`);
  else add("notices", `Node policy is current: approved major ${policy.approvedNodeLtsMajor}, latest LTS ${latestLts?.version}`);
} catch (error) {
  add("warnings", `Could not query the Node release index: ${error.message}`);
}

const productionAudit = runJson("npm", ["audit", "--omit=dev", "--json"]);
const productionVulnerabilities = productionAudit.data.metadata?.vulnerabilities ?? {};
for (const severity of policy.auditFailureSeverities) {
  if ((productionVulnerabilities[severity] ?? 0) > 0) add("errors", `Production npm audit reports ${productionVulnerabilities[severity]} ${severity} vulnerabilities`);
}

const fullAudit = runJson("npm", ["audit", "--json"]);
const fullFindings = Object.entries(fullAudit.data.vulnerabilities ?? {}).map(([name, value]) => `${name}@${value.severity}`);
for (const finding of fullFindings) {
  if (policy.acceptedDevAuditFindings.includes(finding)) add("warnings", `Accepted development-tool advisory remains open: ${finding}`);
  else add("errors", `New npm audit finding requires triage: ${finding}`);
}
for (const accepted of policy.acceptedDevAuditFindings) {
  if (!fullFindings.includes(accepted)) add("notices", `Previously accepted audit finding is no longer present: ${accepted}`);
}

const lines = [
  "# Dependency governance report",
  "",
  `Generated: ${new Date().toISOString()}`,
  `Node: ${process.version}`,
  `Package manager policy: ${manifest.packageManager}`,
  "",
  ...["errors", "warnings", "notices"].flatMap((level) => [
    `## ${level[0].toUpperCase() + level.slice(1)} (${findings[level].length})`,
    "",
    ...(findings[level].length ? findings[level].map((item) => `- ${item}`) : ["- None"]),
    "",
  ]),
];
const report = lines.join("\n");
mkdirSync(new URL("tmp/", root), { recursive: true });
writeFileSync(new URL("tmp/dependency-governance.md", root), report);
console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
if (findings.errors.length) process.exitCode = 1;
