import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the application shell with the product catalogue", () => {
    render(<HomePage />);

    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /begin your ritual/i })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how do you want to feel today/i })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /choose how you want to feel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /choose a feeling to begin/i })).toBeDisabled();
    expect(screen.getByRole("heading", { name: /a ritual becomes real when you make it yours/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nourishing shea butter/i, level: 3 })).toBeInTheDocument();
  });
});
