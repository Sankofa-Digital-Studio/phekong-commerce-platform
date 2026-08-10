import type { ReactNode } from "react";
import "./adaptive-hero.css";

interface RitualLoaderProps {
  title: string;
  message: string;
  label: string;
  children?: ReactNode;
}

export function RitualLoader({ title, message, label, children }: RitualLoaderProps) {
  return (
    <div className="ritual-loader" role="status" aria-live="polite" aria-label={label} aria-busy="true">
      <div className="ritual-loader__seed" aria-hidden="true"><span /><i /><b /><em /></div>
      <p>{title}</p>
      <span>{message}</span>
      {children}
    </div>
  );
}