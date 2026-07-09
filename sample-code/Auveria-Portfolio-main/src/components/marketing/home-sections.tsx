 "use client";

import * as React from "react";
import { ShieldCheck, Zap, Moon, Sun, Award, Star } from "lucide-react";
import {
  faqs,
  features,
  hero,
  testimonials,
  trustMetrics,
  products,
} from "@/content/site";
import { Reveal } from "@/components/motion/reveal";
import { FeatureCard, ProductCard } from "@/components/marketing/cards";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function HomePageSections() {
  const [heroVideoSrc, setHeroVideoSrc] = React.useState("/videos/Hero vid1.mp4");

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-hero-bg)] px-6 pt-32 pb-16 lg:px-8 lg:pt-40 lg:pb-24">
        {/* Split Hero Layout */}
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative z-10 text-[var(--color-hero-fg)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-hero-muted)]">
              {hero.eyebrow}
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[1.05] tracking-[-0.04em] sm:text-7xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-hero-muted)]">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={hero.primaryCta.href} className="!bg-[var(--color-hero-fg)] !text-[var(--color-hero-bg)] hover:!bg-[var(--color-surface-strong)]">
                {hero.primaryCta.label}
              </Button>
            </div>
            <div className="mt-12 flex items-center gap-6 text-sm text-[var(--color-hero-muted)]">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-medium text-[var(--color-hero-fg)]">{stat.value}</p>
                  <p className="mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative h-[600px] w-full overflow-hidden rounded-[40px]">
            <video
              autoPlay
              muted
              playsInline
              onEnded={() => {
                if (heroVideoSrc === "/videos/Hero vid1.mp4") {
                  setHeroVideoSrc("/videos/Hero vid2.mp4");
                } else {
                  setHeroVideoSrc("/videos/Hero vid1.mp4");
                }
              }}
              className="absolute inset-0 h-full w-full object-cover"
              src={heroVideoSrc}
            />
            {/* Gradient overlay to ensure text contrast if it overflows */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-overlay)] via-transparent to-transparent" />
          </Reveal>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="border-b border-[var(--color-overlay-soft)] bg-[var(--color-paper)] px-6 py-12 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
          <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-ink)]">
            As seen in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 text-[var(--color-ink)] opacity-90 md:gap-16 lg:gap-24">
            {/* Vogue style */}
            <span className="font-display text-4xl uppercase tracking-widest" style={{ transform: "scaleY(0.95)" }}>Vogue</span>
            {/* Cosmopolitan style */}
            <span className="font-sans text-2xl font-black uppercase tracking-tighter" style={{ transform: "scaleY(1.1)" }}>Cosmopolitan</span>
            {/* WellnessPulse style */}
            <span className="font-sans text-2xl tracking-tight"><strong className="font-semibold">Wellness</strong>Pulse</span>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-[var(--color-paper)] px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Collection"
            title="Luxury at-home recovery equipment built around red light therapy."
            align="center"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Reveal key={product.id}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Red Light Ritual Banner */}
      <section className="bg-[var(--color-paper)] px-6 py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="relative overflow-hidden rounded-[34px] bg-[var(--color-redlight-base)] shadow-[0_30px_120px_var(--color-redlight-shadow)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="block h-auto w-full"
              src="/red_light/redlight.mp4"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-redlight-overlay-start)_38%,var(--color-redlight-overlay-end)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-overlay)] via-transparent to-[var(--color-redlight-side-glow)]" />

            {/* <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[68%] w-[84%] max-w-[760px]">
                <svg
                  viewBox="0 0 1000 520"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M260 120 C420 10, 650 10, 790 145"
                    fill="none"
                    stroke="var(--color-redlight-line)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M285 360 C430 465, 605 460, 770 310"
                    fill="none"
                    stroke="var(--color-redlight-line-soft)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M742 106 L790 145 L748 154"
                    fill="none"
                    stroke="var(--color-redlight-line)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="absolute left-[23%] top-[42%] -translate-x-1/2 -translate-y-1/2 text-[clamp(2.6rem,5vw,5rem)] font-serif text-[var(--color-redlight-text)]">
                  Daily
                </div>
                <div className="absolute right-[15%] top-[42%] -translate-y-1/2 text-[clamp(2.6rem,5vw,5rem)] font-serif text-[var(--color-redlight-text)]">
                  Ritual
                </div>
              </div>
            </div> */}
          </Reveal>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-[var(--color-paper)] px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Science"
            title="Recovery benefits that shape the entire brand."
            align="center"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Moon, title: "Sleep Support", desc: "Use recovery light routines to support deeper, more restorative sleep." },
              { icon: Zap, title: "Muscle Recovery", desc: "Speed up post-training recovery with light therapy and compression." },
              { icon: ShieldCheck, title: "Inflammation Support", desc: "Target daily soreness and recovery load with cellular-level support." },
              { icon: Sun, title: "Wellness Optimization", desc: "Create a consistent ritual for restoration, circulation, and performance." }
            ].map((benefit, i) => (
              <Reveal key={i} delay={i * 0.1} className="flex flex-col items-center rounded-3xl bg-[var(--color-surface-strong)] p-8 text-center shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-peach)]/20 text-[var(--color-accent-peach)]">
                  <benefit.icon size={28} />
                </div>
                <h3 className="mt-6 text-xl font-medium text-[var(--color-ink)]">{benefit.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{benefit.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features (Image Left/Right Layout) */}
      <section className="bg-[var(--color-paper)] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:gap-32">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} reverse={index % 2 !== 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Big Stat Banner */}
      <section className="bg-[var(--color-paper)] px-6 py-24 text-center lg:px-8 lg:py-32">
        <Reveal className="mx-auto max-w-4xl">
          <h2 className="bg-gradient-to-r from-[var(--color-accent-sage)] via-[var(--color-accent-blue)] to-[var(--color-accent-peach)] bg-clip-text font-display text-8xl font-light tracking-tight text-transparent sm:text-[12rem]">
            3
          </h2>
          <p className="mt-6 text-xl font-medium tracking-wide text-[var(--color-ink)] uppercase">
            panel sizes in the flagship red light line
          </p>
        </Reveal>
      </section>

      {/* Reviews Section */}
      <section className="bg-[var(--color-panel-dark)] px-6 py-24 text-[var(--color-hero-fg)] lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-panel-dark-muted)]">
            Recovery-first customer feedback
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, i) => (
              <Reveal key={i} delay={i * 0.1} className="rounded-[24px] border border-[var(--color-border-inverse)] bg-[var(--color-panel-dark)] p-8 text-left backdrop-blur-md">
                <div className="flex gap-1 text-[var(--color-accent-peach)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-6 text-lg leading-relaxed text-[var(--color-hero-fg)]">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-sm font-medium text-[var(--color-hero-fg)]">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-hero-fg)]">{testimonial.name}</p>
                    <p className="text-xs text-[var(--color-panel-dark-muted)]">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[var(--color-paper)] px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <SectionHeading eyebrow="Support" title="Frequently asked questions." />
            <p className="mt-6 text-lg text-[var(--color-muted)]">
              Everything you need to know about the products, shipping, and returns.
            </p>
            <Button href="/contact" variant="secondary" className="mt-8">
              Contact Support
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[32px] border border-[var(--color-overlay-soft)] bg-[var(--color-surface-strong)] p-6 shadow-sm lg:p-10">
              <FaqAccordion items={faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-[var(--color-overlay-soft)] bg-[var(--color-paper)] py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12 px-6 text-center text-sm text-[var(--color-muted)] lg:px-8">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-peach)]/10 text-[var(--color-accent-peach)]">
                <Award size={20} />
              </div>
              <p className="max-w-[200px]">
                <span className="font-semibold text-[var(--color-ink)]">{metric.value}</span> {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
