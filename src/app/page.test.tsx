import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the application shell with the product catalogue", () => {
    render(<HomePage />);

    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ask about a product/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /rituals that restore balance/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /featured essentials for the page/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /restorative body oil/i, level: 3 })).toBeInTheDocument();
  });
});
