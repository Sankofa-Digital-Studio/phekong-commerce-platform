import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductsScreen } from "./ProductsScreen";

describe("ProductsScreen", () => {
  it("starts with the complete approved collection and conversion paths", () => {
    render(<ProductsScreen />);
    expect(screen.getByRole("heading", { name: /find the care that fits your day/i })).toBeInTheDocument();
    expect(screen.getByText("Showing 4 products")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start with a ritual/i })).toHaveAttribute("href", "/rituals");
  });

  it("filters to complete category cards without losing the selected state", () => {
    render(<ProductsScreen />);
    fireEvent.click(screen.getByRole("button", { name: "Hair care" }));
    expect(screen.getByRole("button", { name: "Hair care" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Showing 1 product")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details for Growth & Strength Oil" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View details for Nourishing Shea Butter" })).not.toBeInTheDocument();
  });
});
