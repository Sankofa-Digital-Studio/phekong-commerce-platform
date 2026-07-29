import type { HTMLAttributes, ReactNode } from "react";
import "./card.css";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  headingLevel?: 1 | 2;
  footer?: ReactNode;
  tone?: "surface" | "accent";
}

export function Card({
  eyebrow,
  title,
  headingLevel = 2,
  footer,
  tone = "surface",
  children,
  className = "",
  ...props
}: CardProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";

  return (
    <article className={`phekong-card phekong-card-${tone} ${className}`.trim()} {...props}>
      {eyebrow ? <span className="phekong-card__eyebrow">{eyebrow}</span> : null}
      <Heading className="phekong-card__title">{title}</Heading>
      <div className="phekong-card__body">{children}</div>
      {footer ? <footer className="phekong-card__footer">{footer}</footer> : null}
    </article>
  );
}
