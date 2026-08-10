import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutScreen } from "./AboutScreen";

describe("AboutScreen", () => {
  it("connects the verified origin story to visible customer principles", () => {
    render(<AboutScreen />);
    expect(screen.getByRole("heading", { name: /rooted in welkom/i })).toBeInTheDocument();
    expect(screen.getByText("2006")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /no medical theatre/i })).toBeInTheDocument();
  });

  it("offers clear continuation paths", () => {
    render(<AboutScreen />);
    expect(screen.getByRole("link", { name: "Explore rituals" })).toHaveAttribute("href", "/rituals");
    expect(screen.getByRole("link", { name: "Talk to Phekong" })).toHaveAttribute("href", "/contact");
  });
});
