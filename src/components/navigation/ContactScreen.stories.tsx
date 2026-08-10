import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ContactScreen } from "./ContactScreen";

const meta = { title: "M2/Navigation/ContactScreen", component: ContactScreen, parameters: { layout: "fullscreen" }, tags: ["autodocs"] } satisfies Meta<typeof ContactScreen>;
export default meta;
type Story = StoryObj<typeof meta>;

export const GeneralEnquiry: Story = {};
export const ProductGuidance: Story = { args: { initialTopic: "product" } };
export const ServiceEnquiry: Story = { args: { initialTopic: "service" } };
export const PreparedReviewInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /ritual support/i }));
    await userEvent.type(canvas.getByLabelText("Your name"), "Lerato");
    await userEvent.type(canvas.getByLabelText("Email for a future reply"), "lerato@example.com");
    await userEvent.type(canvas.getByLabelText("How can Phekong help?"), "I would like help starting a simple ritual.");
    await userEvent.click(canvas.getByRole("button", { name: "Review enquiry" }));
    await expect(canvas.getByRole("heading", { name: /ready to share when a channel is confirmed/i })).toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent(/not been sent/i);
  },
};
