import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
}

export function Button({ variant = "primary", loading = false, disabled, children, ...props }: ButtonProps) {
  return (
    <button className={`phekong-button phekong-button-${variant}`}
      disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading ? "Loading…" : children}
    </button>
  );
}
