import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`phekong-button phekong-button-${variant} phekong-button-${size}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}
