import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import "../src/styles/phekong-tokens.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile390: {
          name: "Mobile 390",
          styles: { width: "390px", height: "844px" },
        },
        desktop1440: {
          name: "Desktop 1440",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },
    // Temporary during M1 setup.
    // Change to "error" only after current accessibility findings are reviewed.
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "Phekong surface",
      values: [
        { name: "Phekong surface", value: "#fffdf8" },
        { name: "Dark surface", value: "#111416" },
      ],
    },
  },
  globalTypes: {
    palette: {
      description: "Phekong colour palette",
      defaultValue: "earth",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "earth", title: "Earth & Gold" },
          { value: "ocean", title: "Ocean & Amber" },
          { value: "botanical", title: "Botanical & Bronze" },
        ],
      },
    },
    mode: {
      description: "Light or dark mode",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
    locale: {
      description: "Interface language",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "zh", title: "中文" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { palette, mode, locale } = context.globals;
      document.documentElement.dataset.palette = palette;
      document.documentElement.dataset.mode = mode;
      document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
      return Story();
    },
  ],
};

export default preview;
