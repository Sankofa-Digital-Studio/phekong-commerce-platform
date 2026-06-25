import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the application shell with the current public MVP status", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("navigation", { name: /primary navigation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contact phekong/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /commerce and booking platform/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sankofa digital mvp foundation is active/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/application scaffold in progress/i)).toBeInTheDocument();
  });
});
