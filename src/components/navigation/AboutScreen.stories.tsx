import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AboutScreen } from "./AboutScreen";

const meta = { title: "M2/Navigation/AboutScreen", component: AboutScreen, parameters: { layout: "fullscreen" }, tags: ["autodocs"] } satisfies Meta<typeof AboutScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const BrandStory: Story = {};
