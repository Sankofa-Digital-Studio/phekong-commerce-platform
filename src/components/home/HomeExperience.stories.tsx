import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HomeExperience } from "./HomeExperience";

const meta = { title: "M2/Navigation/HomeExperience", component: HomeExperience, parameters: { layout: "fullscreen" }, tags: ["autodocs"] } satisfies Meta<typeof HomeExperience>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WellnessAndDiscovery: Story = {};
