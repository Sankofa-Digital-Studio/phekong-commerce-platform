import Link from "next/link";
import "./site-footer.css";

export interface SiteFooterProps {
  wellnessCentreLabel?: string;
}

export function SiteFooter({ wellnessCentreLabel = "Wellness Centre" }: SiteFooterProps) {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__lead">
        <div>
          <p className="site-footer__eyebrow">Rooted care, made practical</p>
          <strong className="site-footer__brand">Phekong {wellnessCentreLabel}</strong>
          <p>Natural wellness products and considered rituals, presented with clarity and care.</p>
        </div>
        <Link className="site-footer__cta" href="/products">Explore the collection</Link>
      </div>

      <nav className="site-footer__links" aria-label="Footer navigation">
        <div><strong>Discover</strong><Link href="/products">Shop products</Link><Link href="/rituals">Rituals</Link><Link href="/about">Our story</Link></div>
        <div><strong>Support</strong><Link href="/contact">Contact</Link><Link href="/services">Services</Link><Link href="/account">Your account</Link></div>
        <div><strong>Shopping</strong><Link href="/cart">Your cart</Link><Link href="/wishlist">Saved items</Link><span>Secure checkout coming soon</span></div>
      </nav>

      <div className="site-footer__legal">
        <span>© 2026 Sankofa Digital. All rights reserved.</span>
        <span>Made with care in South Africa.</span>
      </div>
    </footer>
  );
}
