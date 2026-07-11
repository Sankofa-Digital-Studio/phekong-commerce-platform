export type AppRole = "admin" | "staff" | "seller" | "customer";

export const appRoles = ["admin", "staff", "seller", "customer"] as const satisfies readonly AppRole[];

export const customerEditableProfileFields = ["full_name", "phone"] as const;

export const serverControlledProfileFields = ["role", "active"] as const;

export function isAppRole(value: string): value is AppRole {
  return appRoles.includes(value as AppRole);
}

export function isCustomerEditableProfileField(value: string) {
  return customerEditableProfileFields.includes(value as (typeof customerEditableProfileFields)[number]);
}

export function isServerControlledProfileField(value: string) {
  return serverControlledProfileFields.includes(value as (typeof serverControlledProfileFields)[number]);
}

export function describeAppRole(role: AppRole) {
  switch (role) {
    case "admin":
      return "Administrative access";
    case "staff":
      return "Operational staff access";
    case "seller":
      return "Seller access";
    case "customer":
      return "Customer access";
  }
}
