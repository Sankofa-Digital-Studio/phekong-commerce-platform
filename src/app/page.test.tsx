import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the application shell with the product catalogue", () => {
    render(<HomePage />);

    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /begin your ritual/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /the earth remembers what the body needs/i })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /choose featured product slide/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /use less data/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /choose the ritual your day is asking for/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nourishing shea butter/i, level: 3 })).toBeInTheDocument();
  });
});
