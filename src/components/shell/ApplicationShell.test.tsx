import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApplicationShell } from "./ApplicationShell";

describe("ApplicationShell adaptive homepage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("shows and dismisses the ritual welcome without a network asset", () => {
    render(<ApplicationShell activeRoute="home" showStatePanel={false} />);
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByText("Rooting your wellness journey")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(800));
    expect(screen.queryByText("Rooting your wellness journey")).not.toBeInTheDocument();
  });

  it("persists the user data-saver override", () => {
    render(<ApplicationShell activeRoute="home" showStatePanel={false} />);
    act(() => vi.advanceTimersByTime(0));
    const toggle = screen.getByRole("button", { name: "Use less data" });
    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: "Use enhanced visuals" })).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem("phekong-data-saver")).toBe("on");
  });

  it("advances automatically while preserving manual navigation", () => {
    render(<ApplicationShell activeRoute="home" showStatePanel={false} />);
    act(() => vi.advanceTimersByTime(0));
    expect(screen.getByRole("heading", { name: /healing herbal teas for daily balance/i })).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(6300));
    expect(screen.getByRole("heading", { name: /fresh herbal juices with a clean finish/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(screen.getByRole("heading", { name: /healing herbal teas for daily balance/i })).toBeInTheDocument();
  });
});
