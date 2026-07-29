import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ApprovedImage } from "./ApprovedImage";

describe("ApprovedImage", () => {
  it("preserves intrinsic dimensions and responsive sizing hints", () => {
    render(
      <ApprovedImage
        src="/images/product-shea-butter.png"
        alt="Approved shea butter product"
        width={290}
        height={150}
        sizes="(max-width: 640px) 100vw, 220px"
      />,
    );

    const image = screen.getByRole("img", { name: /approved shea butter product/i });
    expect(image).toHaveAttribute("width", "290");
    expect(image).toHaveAttribute("height", "150");
    expect(image).toHaveAttribute("sizes", "(max-width: 640px) 100vw, 220px");
  });

  it("keeps an accessible, dimension-preserving fallback when loading fails", () => {
    render(
      <ApprovedImage
        className="product-card__image"
        src="/images/product-shea-butter.png"
        alt="Approved shea butter product"
        width={290}
        height={150}
      />,
    );

    fireEvent.error(screen.getByRole("img", { name: /approved shea butter product/i }));

    expect(screen.getByRole("img", { name: /approved shea butter product/i })).toHaveClass(
      "approved-image-fallback",
      "product-card__image",
    );
    expect(screen.getByText("Image unavailable")).toBeInTheDocument();
  });
});
