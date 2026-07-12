"use client";

import Link from "next/link";
import Image from "next/image";
import { wellnessThemeContent } from "@/components/ui/objects/wellnessThemeContent";
import "./home-experience.css";

export function HomeExperience() {
  return (
    <section className="home-experience" id="our-story" aria-label="The Phekong story">
      <div className="home-experience__story">
        <div className="home-experience__media">
          <Image
            src="/images/phekong-hero-reference.png"
            alt="Phekong wellness products arranged in a premium natural display"
            width={960}
            height={720}
            priority={false}
          />
        </div>
        <div className="home-experience__copy">
          <p className="home-experience__eyebrow">OUR BEGINNING</p>
          <h2 className="home-experience__title">From Welkom, a quieter way back to yourself.</h2>
          <p className="home-experience__lede">Phekong began in the Free State in 2006 with a simple belief: wellbeing should feel close to home, not out of reach.</p>
          <p className="home-experience__lede">Every product is an invitation to pause—to turn an ordinary morning, bath or bedtime into a moment that belongs to you. Choose your ritual, carry the story forward, and make care part of the life you are building.</p>
          <div className="home-experience__actions">
            <Link className="home-experience__cta" href="/products">
              Choose your first ritual
            </Link>
            <Link className="home-experience__secondary" href="/services">
              Discover our care
            </Link>
            <Link className="home-experience__secondary" href="/contact">
              Speak with Phekong
            </Link>
          </div>
          <blockquote className="home-experience__manifesto">“Healing is not a destination. It is the small act of returning to yourself.”</blockquote>
        </div>
      </div>

      <div id="shop-by-need" className="home-experience__grid" aria-label="Shop by need">
        {wellnessThemeContent.categories.map((category) => (
          <Link key={category.title} className="home-experience__card" href={category.href}>
            <h3>{category.title}</h3>
            <p>{category.copy}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
