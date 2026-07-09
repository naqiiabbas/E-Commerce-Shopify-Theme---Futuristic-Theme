"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Star } from "lucide-react";
import type { BlogPostSummary, FeatureBlock, PricingTier, TestimonialItem, ProductItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";

const accentMap = {
  sage: "from-[var(--color-accent-sage)]/25 to-white",
  blue: "from-[var(--color-accent-blue)]/25 to-white",
  peach: "from-[var(--color-accent-peach)]/28 to-white",
  lavender: "from-[var(--color-accent-lavender)]/25 to-white",
};

export function FeatureCard({ feature, reverse = false }: { feature: FeatureBlock; reverse?: boolean }) {
  return (
    <article
      className={cn(
        "grid items-center gap-10 rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-8 shadow-[0_20px_80px_var(--color-card-shadow)] backdrop-blur-xl lg:grid-cols-2 lg:p-12",
        reverse && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
          {feature.eyebrow}
        </p>
        <h3 className="mt-4 font-display text-4xl leading-[1] tracking-[-0.03em] text-[var(--color-ink)]">
          {feature.title}
        </h3>
        <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">{feature.description}</p>
        <ul className="mt-6 space-y-3">
          {feature.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-sm leading-7 text-[var(--color-ink)]">
              <Check size={16} className="mt-1 text-[var(--color-accent-sage)]" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <Link
          href={feature.cta.href}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]"
        >
          {feature.cta.label}
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div
        className={cn(
          "relative min-h-[360px] overflow-hidden rounded-[30px] border border-[var(--color-border-strong)] bg-gradient-to-br p-6",
          accentMap[feature.accent],
        )}
      >
        <div className="ambient-orb absolute right-0 top-0 h-32 w-32 bg-[var(--color-surface-strong)]" />
        {feature.image ? (
          <img
            src={feature.image}
            alt={feature.title}
            className="relative h-full w-full rounded-[28px] border border-[var(--color-border-strong)] object-cover shadow-[0_20px_50px_var(--color-card-shadow)] backdrop-blur-xl"
          />
        ) : feature.video ? (
          <video
            src={feature.video}
            autoPlay
            loop
            muted
            playsInline
            className="relative h-full w-full rounded-[28px] border border-[var(--color-border-strong)] object-cover shadow-[0_20px_50px_var(--color-card-shadow)] backdrop-blur-xl"
          />
        ) : (
          <div className="relative rounded-[28px] border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-6 shadow-[0_20px_50px_var(--color-card-shadow)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
              <span>Care Journey</span>
              <span>Live</span>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[22px] bg-[var(--color-surface-strong)] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Phase 01</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-ink)]">Inquiry captured</p>
              </div>
              <div className="rounded-[22px] bg-[var(--color-brand-primary)] p-4 text-[var(--color-hero-fg)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-hero-muted)]">Phase 02</p>
                <p className="mt-2 text-lg font-medium">Coordinator outreach scheduled</p>
              </div>
              <div className="rounded-[22px] bg-[var(--color-surface-strong)] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Phase 03</p>
                <p className="mt-2 text-lg font-medium text-[var(--color-ink)]">Onboarding completed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="break-inside-avoid rounded-[28px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-6 shadow-[0_14px_44px_var(--color-card-shadow)] backdrop-blur-xl">
      <div className="mb-4 flex gap-1 text-[var(--color-accent-peach)]">
        {Array.from({ length: item.rating }).map((_, index) => (
          <Star key={index} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="text-base leading-8 text-[var(--color-ink)]">{item.quote}</p>
      <p className="mt-5 text-sm font-semibold text-[var(--color-ink)]">{item.name}</p>
      <p className="text-sm text-[var(--color-muted)]">
        {item.role}, {item.company}
      </p>
    </article>
  );
}

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      className={cn(
        "rounded-[32px] border p-8 shadow-[0_20px_60px_var(--color-card-shadow)] backdrop-blur-xl",
        tier.highlight
          ? "border-[var(--color-brand-highlight)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-brand-highlight)_24%,white),var(--color-surface-strong))]"
          : "border-[var(--color-border-soft)] bg-[var(--color-surface-soft)]",
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">{tier.name}</p>
      <div className="mt-5 flex items-end gap-2">
        <span className="font-display text-5xl tracking-[-0.04em] text-[var(--color-ink)]">{tier.price}</span>
        <span className="pb-2 text-sm text-[var(--color-muted)]">{tier.cadence}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{tier.description}</p>
      <ul className="mt-6 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-7 text-[var(--color-ink)]">
            <Check size={16} className="mt-1 text-[var(--color-accent-sage)]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={tier.cta.href}
        className="mt-8 inline-flex rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-ink-soft)]"
      >
        {tier.cta.label}
      </Link>
    </article>
  );
}

export function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-[28px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-6 shadow-[0_16px_44px_var(--color-card-shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_var(--color-card-shadow-strong)]"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
        <span>{post.category}</span>
        <span>{post.readTime}</span>
      </div>
      <h3 className="mt-6 font-display text-3xl leading-[1.02] tracking-[-0.03em] text-[var(--color-ink)]">
        {post.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between text-sm font-medium text-[var(--color-ink)]">
        <span>{post.date}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          Read article
        </span>
      </div>
    </Link>
  );
}

export function ProductCard({ product }: { product: ProductItem }) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  return (
    <article className="group flex flex-col overflow-hidden rounded-[24px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 transition hover:bg-[var(--color-surface-soft)]">
      <Link href={product.href} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-[var(--color-paper)]">
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "h-full w-full object-cover transition duration-700",
              product.hoverImage ? "opacity-100 group-hover:scale-100 group-hover:opacity-0" : "group-hover:scale-105",
            )}
          />
          {product.hoverImage ? (
            <img
              src={product.hoverImage}
              alt={`${product.name} alternate view`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : null}
          <div className="absolute left-4 top-4 rounded-full bg-[var(--color-surface-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-ink)] backdrop-blur-md">
            {formatPrice(product.basePrice)}
          </div>
        </div>
      </Link>
      <div className="mt-5 flex flex-1 flex-col justify-between px-2">
        <div>
          <Link href={product.href} className="inline-block">
            <h3 className="font-display text-2xl text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-ink-soft)]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{product.tagline}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            href={product.href}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-surface-strong)]"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-sm font-medium text-[var(--color-paper)] transition hover:bg-[var(--color-brand-secondary)]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
