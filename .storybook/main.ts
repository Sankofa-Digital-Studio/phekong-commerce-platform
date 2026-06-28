import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const cacheDir = process.env.CACHE_DIR || resolve(process.cwd(), "tmp", "storybook-cache");

mkdirSync(cacheDir, { recursive: true });
process.env.CACHE_DIR = cacheDir;

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  typescript: {
    check: false
  },
  // staticDirs: ["../public"]
};

export default config;
