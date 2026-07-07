import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductDetail } from "./ProductDetail";
import { catalogueProducts } from "@/lib/products/fixture-repository";

describe("ProductDetail", () => {
  it("renders fixture fallback semantics for a low-stock product", () => {
    render(
      <ProductDetail
        product={catalogueProducts[1]}
        source="fixture"
        fallbackReason="live-unavailable"
      />,
    );

    expect(screen.getByRole("heading", { name: /growth & strength oil/i })).toBeInTheDocument();
    expect(screen.getByText(/low stock/i)).toBeInTheDocument();
    expect(screen.getByText(/fixture fallback/i)).toBeInTheDocument();
    expect(screen.getByText(/live data source unavailable/i)).toBeInTheDocument();
  });

  it("disables the primary action when stock is empty", () => {
    render(<ProductDetail product={catalogueProducts[2]} source="live" />);

    expect(screen.getByRole("button", { name: /unavailable/i })).toBeDisabled();
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
  });
});

