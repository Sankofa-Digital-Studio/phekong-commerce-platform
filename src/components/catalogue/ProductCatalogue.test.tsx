import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCatalogue } from "./ProductCatalogue";

describe("ProductCatalogue", () => {
  it("renders the ready catalogue with active products", () => {
    render(<ProductCatalogue />);

    expect(screen.getByRole("heading", { name: /browse active products at a glance/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /restorative body oil/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /calming foot soak/i })).toBeInTheDocument();
    expect(screen.getAllByText(/out of stock/i)).toHaveLength(2);
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
});
