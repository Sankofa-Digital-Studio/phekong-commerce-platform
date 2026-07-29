import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeExperience } from "./HomeExperience";

describe("HomeExperience", () => {
  it("connects the wellness story to the three primary conversion paths", () => {
    render(<HomeExperience />);
    expect(screen.getByRole("region", { name: "Phekong wellness story" })).toHaveAttribute("id", "wellness");
    expect(screen.getByRole("link", { name: "Shop best sellers" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "Explore services" })).toHaveAttribute("href", "/services");
    expect(screen.getByRole("link", { name: "Talk to us" })).toHaveAttribute("href", "/contact");
  });

  it("renders every shop-by-need option as a complete link", () => {
    render(<HomeExperience />);
    const discoveryGrid = screen.getByLabelText("Shop by need");
    expect(discoveryGrid.querySelectorAll("a")).toHaveLength(6);
    expect(screen.getByRole("link", { name: /oral wellness/i })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: /massage and recovery/i })).toHaveAttribute("href", "/services");
  });
});
