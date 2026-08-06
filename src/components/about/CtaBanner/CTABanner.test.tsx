import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTABanner } from "./CTABanner";

describe("CTABanner", () => {
  const defaultProps = {
    title: "Begin your Wellness Journey Today",
    description:
      "Experience the healing power of nature and professional care, all in one place.",
    primaryLabel: "Shop Now",
    primaryHref: "/products",
    secondaryLabel: "Book Massage",
    secondaryHref: "/services",
  };

  it("renders the banner title and description", () => {
    render(<CTABanner {...defaultProps} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /begin your wellness journey today/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /experience the healing power of nature and professional care/i
      )
    ).toBeInTheDocument();
  });

  it("renders CTA links with the correct destinations", () => {
    render(<CTABanner {...defaultProps} />);

    expect(
      screen.getByRole("link", { name: /shop now/i })
    ).toHaveAttribute("href", "/products");

    expect(
      screen.getByRole("link", { name: /book massage/i })
    ).toHaveAttribute("href", "/services");
  });

  it("renders the banner image with meaningful alt text", () => {
    render(<CTABanner {...defaultProps} />);

    expect(
      screen.getByAltText(/herbal wellness tea with natural leaves/i)
    ).toBeInTheDocument();
  });

  it("renders exactly two CTA links", () => {
    render(<CTABanner {...defaultProps} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("renders inside a section with an accessible heading", () => {
    render(<CTABanner {...defaultProps} />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /begin your wellness journey today/i,
    });

    expect(heading).toBeInTheDocument();

    const section = heading.closest("section");
    expect(section).not.toBeNull();
  });
});