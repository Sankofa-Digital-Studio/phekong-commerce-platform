import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactScreen, normalizeContactTopic } from "./ContactScreen";

describe("ContactScreen", () => {
  it("maps service links into the right enquiry lane", () => {
    expect(normalizeContactTopic("product-guidance")).toBe("product");
    expect(normalizeContactTopic("ritual-planning")).toBe("ritual");
    expect(normalizeContactTopic("recovery-support")).toBe("service");
    expect(normalizeContactTopic("unknown")).toBe("general");
  });

  it("starts with an honest unsent state", () => {
    render(<ContactScreen initialTopic="service" />);
    expect(screen.getByRole("heading", { name: /make the first message more useful/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /service enquiry/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/nothing leaves this browser/i)).toBeInTheDocument();
  });

  it("validates required context before preparing a review", () => {
    render(<ContactScreen />);
    fireEvent.click(screen.getByRole("button", { name: "Review enquiry" }));
    expect(screen.getByRole("status")).toHaveTextContent(/complete your name, email, and message/i);
  });

  it("prepares a complete review without claiming delivery", () => {
    render(<ContactScreen initialTopic="product" />);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Lerato" } });
    fireEvent.change(screen.getByLabelText("Email for a future reply"), { target: { value: "lerato@example.com" } });
    fireEvent.change(screen.getByLabelText("How can Phekong help?"), { target: { value: "Please help me compare the two body-care options." } });
    fireEvent.click(screen.getByRole("button", { name: "Review enquiry" }));
    expect(screen.getByRole("heading", { name: /ready to share when a channel is confirmed/i })).toBeInTheDocument();
    expect(screen.getByText("Please help me compare the two body-care options.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/it has not been sent/i);
  });
});
