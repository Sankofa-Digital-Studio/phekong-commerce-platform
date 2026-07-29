import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RitualsScreen } from "./RitualsScreen";

describe("RitualsScreen", () => {
  it("starts with a concise daily ritual and approved product routes", () => {
    render(<RitualsScreen />);
    expect(screen.getByRole("heading", { name: /cleanse gently\. seal in softness/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /view product/i })[0]).toHaveAttribute("href", "/products/turmeric-honey-soap");
    expect(screen.getByRole("link", { name: /explore the full catalogue/i })).toHaveAttribute("href", "/products");
  });

  it("switches the full plan without hiding availability", () => {
    render(<RitualsScreen />);
    fireEvent.click(screen.getByRole("button", { name: "Weekly renewal" }));
    expect(screen.getByRole("heading", { name: /polish, replenish, and pause/i })).toBeInTheDocument();
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Weekly renewal" })).toHaveAttribute("aria-pressed", "true");
  });

  it("keeps general guidance distinct from professional advice", () => {
    render(<RitualsScreen initialRitual="hair-nourishment" />);
    expect(screen.getByRole("heading", { name: /make the final step count/i })).toBeInTheDocument();
    expect(screen.getByText(/does not replace advice from a qualified health professional/i)).toBeInTheDocument();
  });
});
