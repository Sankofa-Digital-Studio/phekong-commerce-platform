import { ApplicationShell } from "../components/shell/ApplicationShell";

export default function HomePage() {
  return (
    <ApplicationShell
      activeRoute="home"
      showStatePanel={false}
    >
      <section className="home-hero" id="home">
        <p className="eyebrow">PHEKONG WELLNESS CENTRE</p>
        <h1>Commerce and booking platform</h1>
        <p className="intro">
          The Sankofa Digital MVP foundation is active. Product discovery, bookings,
          inventory and administrative tools will be delivered through controlled milestones.
        </p>
        <div className="status-card">
          <strong>Project status</strong>
          <span>Architecture approved. Application scaffold in progress.</span>
        </div>
      </section>
    </ApplicationShell>
  );
}
