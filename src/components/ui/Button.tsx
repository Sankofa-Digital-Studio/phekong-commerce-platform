import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  label?: string;
}

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  label,
  children,
  ...props
}: ButtonProps) {
  const content = label ?? children;

  return (
    <button
      className={`phekong-button phekong-button-${variant} phekong-button-${size}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? "Loading..." : content}
    </button>
  );
}
