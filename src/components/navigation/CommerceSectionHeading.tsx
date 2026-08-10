export interface CommerceSectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}

export function CommerceSectionHeading({ eyebrow, title, description, id }: CommerceSectionHeadingProps) {
  return (
    <header className="commerce-section-heading">
      <p className="commerce-kicker">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
