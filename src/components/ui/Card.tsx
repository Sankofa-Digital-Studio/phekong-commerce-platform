import type { HTMLAttributes, ReactNode } from "react";
import "./card.css";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  footer?: ReactNode;
  tone?: "surface" | "accent";
}

export function Card({
  eyebrow,
  title,
  footer,
  tone = "surface",
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <article className={`phekong-card phekong-card-${tone} ${className}`.trim()} {...props}>
      {eyebrow ? <span className="phekong-card__eyebrow">{eyebrow}</span> : null}
      <h2 className="phekong-card__title">{title}</h2>
      <div className="phekong-card__body">{children}</div>
      {footer ? <footer className="phekong-card__footer">{footer}</footer> : null}
    </article>
  );
}
