export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type FooterGroup = {
  title: string;
  links: NavItem[];
};

export type HeroBlock = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  stats: Array<{ label: string; value: string }>;
};

export type FeatureBlock = {
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
  cta: NavItem;
  accent: "sage" | "blue" | "peach" | "lavender";
  image?: string;
  video?: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
};

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: NavItem;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
};

export type ProductItem = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  basePrice: number;
  image: string;
  hoverImage?: string;
  href: string;
};
