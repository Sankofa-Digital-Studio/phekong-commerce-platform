import type { ButtonHTMLAttributes } from "react";
import "./button.css";

<<<<<<< HEAD
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
=======
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
>>>>>>> 63c29ea (feat: add Button and Section components with responsive design and update FeatureCard)
  size?: ButtonSize;
  loading?: boolean;
  label?: string;
}

export function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
<<<<<<< HEAD
  children,
  ...props
}: ButtonProps) {
=======
  label,
  children,
  ...props
}: ButtonProps) {
  const content = label ?? children;

>>>>>>> 63c29ea (feat: add Button and Section components with responsive design and update FeatureCard)
  return (
    <button
      className={`phekong-button phekong-button-${variant} phekong-button-${size}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
<<<<<<< HEAD
      {loading ? "Loading…" : children}
=======
      {loading ? "Loading…" : content}
>>>>>>> 63c29ea (feat: add Button and Section components with responsive design and update FeatureCard)
    </button>
  );
}
