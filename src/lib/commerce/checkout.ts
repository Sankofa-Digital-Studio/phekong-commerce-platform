export type CheckoutChannel = "online" | "in_person";

export type OrderStatus =
  | "pending"
  | "paid"
  | "failed"
  | "cancelled"
  | "fulfilled"
  | "refunded"
  | "partially_refunded";

export const orderStatuses = [
  "pending",
  "paid",
  "failed",
  "cancelled",
  "fulfilled",
  "refunded",
  "partially_refunded",
] as const satisfies readonly OrderStatus[];

export interface CheckoutLineItem {
  productSlug: string;
  quantity: number;
  unitPriceCents: number;
}

const allowedOrderTransitions: Record<OrderStatus, readonly OrderStatus[]> = {
  pending: ["paid", "failed", "cancelled"],
  paid: ["fulfilled", "refunded", "partially_refunded", "cancelled"],
  failed: ["pending", "cancelled"],
  cancelled: [],
  fulfilled: ["refunded", "partially_refunded"],
  refunded: [],
  partially_refunded: ["refunded"],
};

export function isOrderStatus(value: string): value is OrderStatus {
  return orderStatuses.includes(value as OrderStatus);
}

export function canTransitionOrderStatus(from: OrderStatus, to: OrderStatus) {
  return allowedOrderTransitions[from].includes(to);
}

export function validateCheckoutLineItem(item: CheckoutLineItem) {
  return Boolean(
    item.productSlug.trim() &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      Number.isInteger(item.unitPriceCents) &&
      item.unitPriceCents >= 0,
  );
}

export function calculateCheckoutSubtotal(items: ReadonlyArray<CheckoutLineItem>) {
  return items.reduce((subtotal, item) => subtotal + item.quantity * item.unitPriceCents, 0);
}

