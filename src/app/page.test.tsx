import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ApplicationShell } from "../components/shell/ApplicationShell";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the Storybook application shell with the current public MVP messaging", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("navigation", { name: /primary navigation/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /public experience ready/i }),
    ).not.toBeInTheDocument();
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

  it("opens and closes the application shell mobile navigation", () => {
    render(<ApplicationShell activeRoute="services" />);

    const menuButton = screen.getByRole("button", { name: /menu/i });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    const mobileNavigation = screen.getByRole("navigation", { name: /mobile navigation/i });

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(
      within(mobileNavigation).getByRole("link", { name: /services/i }),
    ).toHaveAttribute("aria-current", "page");

    fireEvent.click(within(mobileNavigation).getByRole("link", { name: /contact/i }));

    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });
});
