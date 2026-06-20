import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("shows the Phekong MVP status", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /commerce and booking platform/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/application scaffold in progress/i)).toBeInTheDocument();
  });
});
