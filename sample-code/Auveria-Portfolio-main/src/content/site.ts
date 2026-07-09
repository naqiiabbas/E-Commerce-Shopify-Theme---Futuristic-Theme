import type {
  BlogPostSummary,
  FeatureBlock,
  FaqItem,
  FooterGroup,
  HeroBlock,
  NavItem,
  PricingTier,
  TestimonialItem,
  ProductItem,
} from "@/types/content";

export const siteName = "Somara Labs";
export const siteTagline = "Luxury recovery technology centered around red light therapy.";

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "SHOP SALE", href: "/products/sale" },
  { label: "Browse All", href: "/products" },
  { 
    label: "Learn More", 
    href: "#",
    children: [
      {
        label: "Benefits of Somara Labs",
        href: "/benefits",
        children: [
          { label: "Skin Health", href: "/benefits/skin" },
          { label: "Pain Relief", href: "/benefits/pain" },
          { label: "Mood", href: "/benefits/mood" },
          { label: "Sleep", href: "/benefits/sleep" },
          { label: "Muscle Recovery", href: "/benefits/muscle" },
          { label: "Hair Growth", href: "/benefits/hair" },
          { label: "Fat Loss", href: "/benefits/fat" },
          { label: "Female Health", href: "/benefits/female" },
          { label: "Male Health", href: "/benefits/male" }
        ]
      },
      { label: "Reviews", href: "/reviews" },
      { label: "Blog", href: "/blog" }
    ]
  },
  { label: "Contact", href: "/contact" },
];

export const footerGroups: FooterGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Red Light Panels", href: "/products/red-light-panels" },
      { label: "At-Home Dry Sauna", href: "/products/dry-sauna" },
      { label: "Compression Boots", href: "/products/compression-boots" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Technology", href: "/technology" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const hero: HeroBlock = {
  eyebrow: "Premium recovery technology",
  title: "Red light therapy built to anchor your at-home recovery ritual.",
  description:
    "Somara Labs is a luxury recovery equipment brand built around red light therapy panels in three core sizes: quarter, half, and full body.",
  primaryCta: { label: "Shop Recovery Systems", href: "/products" },
  secondaryCta: { label: "Learn More", href: "/technology" },
  stats: [
    { value: "3", label: "panel sizes in the core line" },
    { value: "Flagship", label: "red light panels lead the brand" },
  ],
};

export const products: ProductItem[] = [
  {
    id: "red-light-panels",
    name: "Red Light Therapy Panels",
    tagline: "Three sizes: quarter, half, and full body",
    price: "From $799",
    basePrice: 799,
    image: "/red_light/show/main.jpg",
    hoverImage: "/red_light/show/5.webp",
    href: "/products/red-light-panels",
  },
  {
    id: "dry-sauna",
    name: "At-Home Dry Sauna",
    tagline: "Detox, relaxation, and circulation support",
    price: "From $1,999",
    basePrice: 1999,
    image: "/sauna/show/1.webp",
    hoverImage: "/sauna/show/6.webp",
    href: "/products/dry-sauna",
  },
  {
    id: "compression-boots",
    name: "Compression Boots",
    tagline: "Performance recovery and lymphatic support",
    price: "From $899",
    basePrice: 899,
    image: "/compression boots/image.webp",
    hoverImage: "/compression boots/image1.webp",
    href: "/products/compression-boots",
  },
];

export const trustedBy = [
  "Vogue",
  "Goop",
  "Wired",
  "Forbes",
  "Elle",
  "GQ",
];

export const trustMetrics = [
  {
    value: "5,000+",
    label: "five-star reviews from verified customers",
  },
  { value: "30-Day", label: "home trial guarantee" },
  { value: "FDA", label: "cleared technology" },
];

export const features: FeatureBlock[] = [
  {
    eyebrow: "Flagship Category",
    title: "Red light panels are the heart of the Somara Labs recovery system.",
    description:
      "Offered in quarter, half, and full body sizes, our red light therapy panels are the defining product line across recovery, inflammation reduction, sleep support, skin health, and performance.",
    benefits: [
      "Quarter, half, and full body panel options",
      "Recovery, inflammation, and sleep support",
      "Skin health and muscle recovery optimization",
    ],
    cta: { label: "Explore red light therapy", href: "/products/red-light-panels" },
    accent: "sage",
    video: "/videos/mp_.mp4",
  },
  {
    eyebrow: "Recovery Ecosystem",
    title: "Sauna and compression complete the ritual around the core light therapy experience.",
    description:
      "Our supporting categories expand the system into detox, circulation, athletic recovery, and restoration so the brand feels like a complete premium at-home recovery environment.",
    benefits: [
      "At-home dry sauna for detox and relaxation",
      "Accelerated muscle recovery",
      "Compression boots for circulation and lymphatic drainage",
      "Positioned for sports recovery and elite wellness",
    ],
    cta: { label: "Shop the full recovery lineup", href: "/products" },
    accent: "blue",
    video: "/sauna/hero_vid.mp4",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "The red light panel became the center of my recovery routine within a week. It feels like performance equipment, but refined enough to live in a luxury home gym.",
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    company: "",
    rating: 5,
  },
  {
    quote:
      "The compression boots are the perfect complement to the panels. Recovery is faster, my legs feel lighter, and the whole setup feels premium from end to end.",
    name: "Marcus T.",
    role: "Verified Buyer",
    company: "",
    rating: 5,
  },
  {
    quote:
      "Somara Labs has a much sharper point of view than a generic wellness store. The focus on red light therapy gives the brand real authority in premium recovery.",
    name: "Elena Rodriguez",
    role: "Wellness Editor",
    company: "Vogue",
    rating: 5,
  },
];

export const pricingTiers: PricingTier[] = []; // Not used in consumer e-commerce

export const faqs: FaqItem[] = [
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship globally. Shipping costs and delivery times are calculated at checkout based on your location.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day risk-free home trial. If you don't love it, return it for a full refund. We even cover the return shipping.",
  },
  {
    question: "What panel sizes do you offer for red light therapy?",
    answer:
      "Our flagship red light therapy line is positioned around three formats: quarter panel, half panel, and full body panel, so customers can choose the setup that fits their space and recovery goals.",
  },
  {
    question: "Who are compression boots designed for?",
    answer:
      "Compression boots are positioned for athletic recovery, circulation support, lymphatic drainage, and muscle recovery, making them especially relevant for performance-focused customers.",
  },
];

export const blogPosts: BlogPostSummary[] = [
  {
    slug: "science-of-recovery",
    title: "Why Red Light Therapy Leads the Modern Recovery Room",
    excerpt:
      "A closer look at why red light therapy has become the anchor product for premium recovery and wellness optimization.",
    category: "Science",
    readTime: "5 min read",
    date: "May 2, 2026",
  },
  {
    slug: "designing-aura",
    title: "Designing a Luxury At-Home Recovery Ecosystem",
    excerpt:
      "How red light panels, sauna, and compression boots work together as a unified high-end recovery experience.",
    category: "Design",
    readTime: "7 min read",
    date: "April 18, 2026",
  },
  {
    slug: "morning-rituals",
    title: "Recovery Rituals for Better Sleep, Skin, and Performance",
    excerpt:
      "A practical framework for combining light therapy and recovery hardware into a daily home routine.",
    category: "Wellness",
    readTime: "4 min read",
    date: "March 29, 2026",
  },
];
