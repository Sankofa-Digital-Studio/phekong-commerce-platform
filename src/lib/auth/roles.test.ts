import { describe, expect, it } from "vitest";
import {
  appRoles,
  customerEditableProfileFields,
  describeAppRole,
  isAppRole,
  isCustomerEditableProfileField,
  isServerControlledProfileField,
  serverControlledProfileFields,
} from "./roles";

describe("auth role helpers", () => {
  it("exposes the approved application roles", () => {
    expect(appRoles).toEqual(["admin", "staff", "seller", "customer"]);
    expect(isAppRole("customer")).toBe(true);
    expect(isAppRole("visitor")).toBe(false);
  });

  it("describes roles for documentation and UI copy", () => {
    expect(describeAppRole("admin")).toBe("Administrative access");
    expect(describeAppRole("customer")).toBe("Customer access");
  });

  it("separates customer-editable and server-controlled profile fields", () => {
    expect(customerEditableProfileFields).toEqual(["full_name", "phone"]);
    expect(serverControlledProfileFields).toEqual(["role", "active"]);
    expect(isCustomerEditableProfileField("phone")).toBe(true);
    expect(isCustomerEditableProfileField("role")).toBe(false);
    expect(isServerControlledProfileField("active")).toBe(true);
    expect(isServerControlledProfileField("phone")).toBe(false);
  });
});
