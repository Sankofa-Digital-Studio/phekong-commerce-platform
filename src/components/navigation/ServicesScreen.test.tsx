import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServicesScreen } from "./ServicesScreen";

describe("ServicesScreen", () => {
  it("starts with product guidance and a contextual contact path", () => {
    render(<ServicesScreen />);
    expect(screen.getByRole("heading", { name: /choose from the approved collection/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue to contact/i })).toHaveAttribute("href", "/contact?topic=product-guidance");
  });

  it("switches the full support explanation", () => {
    render(<ServicesScreen />);
    fireEvent.click(screen.getByRole("button", { name: /massage & recovery/i }));
    expect(screen.getByRole("button", { name: /massage & recovery/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: /ask about hands-on support/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /continue to contact/i })).toHaveAttribute("href", "/contact?topic=recovery-support");
  });

  it("keeps booking confirmation honest", () => {
    render(<ServicesScreen initialService="recovery-support" />);
    expect(screen.getByText(/does not present a preview as a completed booking/i)).toBeInTheDocument();
  });
});
