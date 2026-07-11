import type { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section className="section-block" id={id}>
      <div className="section-header">
        <p className="section-eyebrow">Overview</p>
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
