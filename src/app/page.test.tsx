import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the application shell with the product catalogue", () => {
    render(<HomePage />);

    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /find your remedy/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /healing herbal teas for daily balance/i })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /choose featured product slide/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /use less data/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /featured essentials for the page/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nourishing shea butter/i, level: 3 })).toBeInTheDocument();
  });
});
