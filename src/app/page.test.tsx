import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the application shell with the product catalogue", () => {
    render(<HomePage />);

    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact phekong/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /commerce and booking platform/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /browse active products at a glance/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /restorative body oil/i })).toBeInTheDocument();
  });
});
