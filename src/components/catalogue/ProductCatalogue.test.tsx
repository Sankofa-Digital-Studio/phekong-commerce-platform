import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCatalogue } from "./ProductCatalogue";

describe("ProductCatalogue", () => {
  it("renders the ready catalogue with active products", () => {
    render(<ProductCatalogue />);

    expect(screen.getByRole("heading", { name: /featured essentials for the page/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /care for your ritual, daily/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /nourishing shea butter/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /growth & strength oil/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /exfoliating sugar scrub/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /turmeric & honey soap/i })).toBeInTheDocument();
    expect(screen.getAllByText(/in stock/i)).toHaveLength(2);
    expect(screen.getByText(/low stock/i)).toBeInTheDocument();
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
  });

  it("links each product card to its detail page", () => {
    render(<ProductCatalogue />);

    expect(screen.getByRole("link", { name: /view details for nourishing shea butter/i })).toHaveAttribute(
      "href",
      "/products/nourishing-shea-butter",
    );
    expect(screen.getByRole("link", { name: /view details for growth & strength oil/i })).toHaveAttribute(
      "href",
      "/products/growth-strength-oil",
    );
  });

  it("renders the loading state", () => {
    render(<ProductCatalogue state="loading" />);

    expect(screen.getByRole("heading", { name: /loading active products/i })).toBeInTheDocument();
    expect(screen.getByText(/the public catalogue is resolving/i)).toBeInTheDocument();
  });

  it.each([
    ["empty", /no active products are available/i, /reload catalogue/i],
    ["error", /the catalogue could not be loaded/i, /try again/i],
  ] as const)("renders the %s state with a retry action", (state, heading, buttonLabel) => {
    const retry = vi.fn();

    render(<ProductCatalogue state={state} onRetry={retry} />);

    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: buttonLabel }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("shows feedback when a product is saved", async () => {
    render(<ProductCatalogue />);

    fireEvent.click(screen.getByRole("button", { name: /save nourishing shea butter/i }));
    expect(screen.getByText(/saving nourishing shea butter/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/saved for later/i)).toBeInTheDocument();
    });
  });
});
