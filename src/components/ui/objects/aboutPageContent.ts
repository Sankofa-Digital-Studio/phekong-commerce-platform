export const aboutPageContent = {
  hero: {
    eyebrow: "Where Natural Healing Meets Modern Wellness.",
    title: "About Phekong",

    paragraphs: [
      "Phekong Wellness Centre was established in 2006 in Welkom, Free State. We began with a simple belief—that true wellness comes from caring for the body, mind, and spirit through natural healing.",
      "Our approach combines traditional herbal knowledge with modern wellness practices to provide safe, effective solutions that support healthier lifestyles and long-term well-being.",
      "Today, Phekong Wellness Centre is more than a wellness business. We are a trusted partner dedicated to helping individuals and communities embrace healthier living through herbal products, therapeutic massage, and holistic care.",
    ],
  },
  whyChooseUs: {
    title: "Why Choose us",
    intro:
      "We're committed to providing trusted herbal wellness products and professional massage therapies, backed by knowledge, compassion, and years of experience.",
    items: [
      {
        iconLabel: "expertise-icon.png",
        title: "Expertise",
          iconSrc: '/images/expertise.png', 
        description:
          "We combine scientific understanding with traditional healing practices to deliver natural wellness solutions you can trust.",
      },
      {
        iconLabel: "commitment-icon.png",
        title: "Commitment",
         iconSrc: '/images/commitment.png', 

        description:
          "We are dedicated to helping every client achieve better health through personalised care and lasting support.",
      },
      {
        iconLabel: "attention-to-detail-icon.png",
        title: "Attention to detail",
         iconSrc: '/images/attention-to-detail.png', 
        description:
          "Products and wellness service are carefully selected to ensure quality, safety, and effectiveness.",
      },
      {
        iconLabel: "customer-service-icon.png",
        title: "Customer Service",
        iconSrc: '/images/customer-service.png', 
        description:
          "Our team is always ready to answer your questions and guide you on your wellness journey.",
      },
    ],
  },
  productsServices: {
    title: "Our Products & Services",
    panels: [
      {
        title: "Herbal products",
        items: [
          "Herbal Juices",
          "Herbal Teas",
          "Therapy Lab",
          "Beauty lap",
          "Food Cures",
        ],
        imageLabel: "herbal-products.png",
      },
      {
        title: "Massages",
        items: ["Full Body", "Half Body", "Foot", "Herbal Detox"],
        imageLabel: "massage.png",
      },
    ],
  },
  stats: [
    { icon: "calendar" as const, value: "18+ years", label: "of experience" },
    { icon: "leaf" as const, value: "100%", label: "Natural Ingredients" },
    { icon: "heart" as const, value: "Trust", label: "& Care" },
  ],
  values: {
    title: "Our Values",
    values: [
      {
        imageLabel: "quality.png",
        title: "Quality",
        description:
          "we source and provide only the best quality herbs and products",
      },
      {
        imageLabel: "integrity.png",
        title: "Integrity",
        description: "Honest, transparent and ethical in all we do",
      },
      {
        imageLabel: "community.png",
        title: "Community",
        description:
          "We care about our community and empower healthier lives together",
      },
    ],
  },
  cta: {
    title: "Begin your Wellness Journey Today",
    description:
      "Experience the healing power of nature and professional care, all in one place.",
    primaryLabel: "Shop Now",
    secondaryLabel: "Book Massage",
  },
};
