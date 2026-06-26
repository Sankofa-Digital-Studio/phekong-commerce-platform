import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import HomePage from "./page";

<<<<<<< HEAD
describe("official training landing page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.dataset.palette = "earth";
    document.documentElement.dataset.mode = "light";
    document.documentElement.lang = "en";
  });

  it("renders the approved public shell content at the home route", () => {
=======
describe("HomePage", () => {
  it("renders the Storybook application shell with the current public MVP messaging", () => {
>>>>>>> 77a3722 (feat: wire home page to application shell)
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /a calm shell built for trust, clarity and growth/i,
      }),
    ).toBeInTheDocument();
<<<<<<< HEAD
    expect(screen.getByRole("heading", { name: /what the shell owns/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /shell state laboratory/i })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("opens and closes the mobile navigation without duplicating its information architecture", () => {
    render(<HomePage />);

    const menuButton = screen.getByRole("button", { name: /open navigation menu/i });
    fireEvent.click(menuButton);

    const mobileNavigation = screen.getByRole("navigation", { name: /mobile navigation/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(within(mobileNavigation).getByRole("link", { name: /services/i })).toHaveAttribute(
      "href",
      "#state-lab",
    );

    fireEvent.click(
      within(mobileNavigation).getByRole("link", { name: /^contact$/i }),
    );
    expect(screen.queryByRole("navigation", { name: /mobile navigation/i })).not.toBeInTheDocument();
  });

  it("switches the approved palette, mode, language, and reusable shell state", async () => {
    render(<HomePage />);

    fireEvent.change(screen.getByRole("combobox", { name: /colour palette/i }), {
      target: { value: "ocean" },
    });
    fireEvent.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("data-palette", "ocean");
      expect(document.documentElement).toHaveAttribute("data-mode", "dark");
    });

    fireEvent.click(screen.getByRole("button", { name: /preview global error/i }));
    expect(screen.getByRole("heading", { name: /we could not load this page/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.getByRole("heading", { name: /ready state/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /switch language to chinese/i }));
    expect(screen.getByRole("heading", { name: /外壳负责什么/ })).toBeInTheDocument();
  });

  it("restores saved display preferences before persisting defaults", async () => {
    window.localStorage.setItem("phekong-language", "zh");
    window.localStorage.setItem("phekong-mode", "dark");
    window.localStorage.setItem("phekong-palette", "botanical");

    render(<HomePage />);

    await waitFor(() => {
      expect(document.documentElement).toHaveAttribute("lang", "zh-CN");
      expect(document.documentElement).toHaveAttribute("data-mode", "dark");
      expect(document.documentElement).toHaveAttribute("data-palette", "botanical");
    });

    expect(screen.getByRole("heading", { name: /外壳负责什么/ })).toBeInTheDocument();
=======
    expect(
<<<<<<< HEAD
      screen.getAllByRole("link", { name: /contact phekong/i }),
    ).toHaveLength(2);
=======
      screen.queryByRole("heading", { name: /public experience ready/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /contact phekong/i }),
    ).toBeInTheDocument();
>>>>>>> 77a3722 (feat: wire home page to application shell)
    expect(
      screen.getByRole("heading", { name: /commerce and booking platform/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A modern MVP foundation that makes service discovery, booking, and operations clear for wellness studios./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Start strong with responsive navigation, product storytelling, and a growth-ready experience./i),
    ).toBeInTheDocument();
>>>>>>> 92a5cd4 (feat: enhance HomePage layout with responsive sections and update styles)
  });
});
