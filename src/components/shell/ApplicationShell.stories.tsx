import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ApplicationShell,
  ShellAnatomy,
  ShellStateLab,
  TrainingHero,
} from "./ApplicationShell";
import { trainingLandingCopy } from "../training/trainingLandingCopy";

const meta = {
  title: "M1/Shell/ApplicationShell",
  component: ApplicationShell,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof ApplicationShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullPage: Story = {};

export const Hero: Story = {
  render: () => (
    <div className="training-content">
      <TrainingHero copy={trainingLandingCopy.en} />
    </div>
  ),
};

export const Anatomy: Story = {
  render: () => (
    <div className="training-content">
      <ShellAnatomy copy={trainingLandingCopy.en} />
    </div>
  ),
};

export const StateLaboratory: Story = {
  render: () => (
    <div className="training-content">
      <ShellStateLab copy={trainingLandingCopy.en} />
    </div>
  ),
};
