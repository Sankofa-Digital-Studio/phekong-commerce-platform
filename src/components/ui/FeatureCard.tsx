export interface FeatureCardProps {
  title: string;
  description: string;
  badge: string;
}

export function FeatureCard({ title, description, badge }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <span className="feature-badge">{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
