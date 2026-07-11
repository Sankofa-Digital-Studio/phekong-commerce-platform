import { describe, expect, it } from "vitest";
import { calculateCheckoutSubtotal, canTransitionOrderStatus, isOrderStatus, validateCheckoutLineItem } from "./checkout";

describe("checkout contract helpers", () => {
  it("recognizes approved order statuses", () => {
    expect(isOrderStatus("pending")).toBe(true);
    expect(isOrderStatus("paid")).toBe(true);
    expect(isOrderStatus("captured")).toBe(false);
  });

  it("keeps order transitions narrow", () => {
    expect(canTransitionOrderStatus("pending", "paid")).toBe(true);
    expect(canTransitionOrderStatus("paid", "fulfilled")).toBe(true);
    expect(canTransitionOrderStatus("fulfilled", "pending")).toBe(false);
  });

  it("validates cart line items and totals", () => {
    const lineItem = { productSlug: "nourishing-shea-butter", quantity: 2, unitPriceCents: 26000 };

    expect(validateCheckoutLineItem(lineItem)).toBe(true);
    expect(calculateCheckoutSubtotal([lineItem])).toBe(52000);
    expect(validateCheckoutLineItem({ ...lineItem, quantity: 0 })).toBe(false);
  });
});

