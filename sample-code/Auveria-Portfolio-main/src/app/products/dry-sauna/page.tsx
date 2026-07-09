import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "At-Home Dry Sauna",
  description: "Premium at-home dry sauna by Somara Labs for detox, relaxation, recovery, and circulation support.",
};

const keyFeatures = [
  "Full-spectrum heat environment for deep restorative sessions",
  "Designed for detox, relaxation, circulation, and recovery rituals",
  "Compact architectural footprint built for premium home placement",
  "A supporting product inside the wider Somara Labs recovery ecosystem",
];

const deliveryOptions = [
  {
    title: "Standard Delivery",
    description:
      "A streamlined drop-off option for customers who want the most direct route to setup.",
    detail: "Best for straightforward access and self-managed installation.",
  },
  {
    title: "Room of Choice",
    description:
      "A guided in-home placement experience for customers who want the unit brought directly to its final room.",
    detail: "Ideal for apartments, stairs, and more complex entry paths.",
  },
  {
    title: "White Glove Setup",
    description:
      "Our highest-touch experience with in-home delivery, placement, and full assembly support.",
    detail: "For buyers who want the sauna integrated with as little friction as possible.",
  },
];

const benefits = [
  "Supports detox and daily decompression",
  "Builds a more complete recovery ritual around your core products",
  "Pairs naturally with light therapy and compression for full-system restoration",
  "Elevates the home environment into a premium wellness space",
];

const gallery = [
  "/sauna/show/2.webp",
  "/sauna/show/3.webp",
  "/sauna/show/4.webp",
  "/sauna/show/5.webp",
  "/sauna/show/7.webp",
  "/sauna/show/8.webp",
];

export default function DrySaunaPage() {
  return (
    <>
      <PageHero
        eyebrow="Recovery Ecosystem"
        title="An at-home dry sauna designed to bring heat, calm, and restoration into the Somara Labs system."
        description="Inspired by the premium at-home sauna category, this product extends the Somara Labs ritual beyond red light into detox, relaxation, circulation, and immersive recovery."
        primaryLabel="Request Sauna Guidance"
        primaryHref="/contact"
      />

      <section className="px-6 pb-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="overflow-hidden rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-panel-dark)] shadow-[0_28px_90px_var(--color-card-shadow-strong)]">
            <div className="grid gap-4 p-4">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/sauna/suana_hero.webp"
                className="aspect-[16/11] w-full rounded-[28px] object-cover"
                src="/sauna/hero_vid.mp4"
              />
              <div className="grid grid-cols-3 gap-4">
                <img src="/sauna/show/9.webp" alt="Sauna detail one" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
                <img src="/sauna/show/10.webp" alt="Sauna detail two" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
                <img src="/sauna/show/11.webp" alt="Sauna detail three" className="aspect-[4/5] w-full rounded-[22px] object-cover" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-8 shadow-[0_20px_60px_var(--color-card-shadow)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
              The Sauna
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--color-ink)]">
              Heat therapy reworked for a more beautiful, home-ready recovery environment.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              This page takes inspiration from premium sauna product storytelling: rich media,
              clear feature framing, and a purchase journey that feels considered. Within Somara Labs,
              the sauna plays a supporting but elevated role beside red light therapy.
            </p>
            <div className="mt-8 grid gap-4">
              {keyFeatures.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-ink)]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Button href="/contact" className="flex-1">
                Speak to a Specialist
              </Button>
              <Button href="/products" variant="secondary" className="flex-1">
                Compare Products
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
                Delivery Experience
              </p>
              <h2 className="mt-4 font-display text-5xl tracking-[-0.04em] text-[var(--color-ink)]">
                A premium setup journey should feel as refined as the product itself.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {deliveryOptions.map((option, index) => (
              <Reveal
                key={option.title}
                delay={index * 0.08}
                className="rounded-[30px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-7 shadow-[0_18px_50px_var(--color-card-shadow)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  Option {index + 1}
                </p>
                <h3 className="mt-4 font-display text-3xl tracking-[-0.03em] text-[var(--color-ink)]">
                  {option.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {option.description}
                </p>
                <p className="mt-5 rounded-[20px] bg-[var(--color-surface)] px-4 py-3 text-sm leading-7 text-[var(--color-ink)]">
                  {option.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-panel-dark)] shadow-[0_28px_90px_var(--color-card-shadow-strong)]">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal className="relative min-h-[420px] lg:min-h-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                src="/sauna/c6d171a2d1ed4850802bc1087f6d66d1.HD-1080p-7.2Mbps-84048803.mp4"
              />
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col justify-center p-8 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-redlight-text)]">
                Why it belongs
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[0.96] tracking-[-0.04em] text-[var(--color-redlight-text)]">
                A softer ritual, built to support restoration rather than compete with the flagship.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-redlight-line-soft)]">
                The sauna gives Somara Labs a second recovery language: slower, warmer, more
                atmospheric. It complements the precision of red light by offering full-body heat,
                deeper unwinding, and a more ritualized evening or post-training experience.
              </p>
              <div className="mt-8 grid gap-3">
                {benefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-[20px] border border-[var(--color-border-inverse)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm leading-7 text-[var(--color-redlight-text)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
                Gallery
              </p>
              <h2 className="mt-4 font-display text-5xl tracking-[-0.04em] text-[var(--color-ink)]">
                The sauna through the lens of material, atmosphere, and ritual.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <Reveal
                key={image}
                delay={index * 0.05}
                className="overflow-hidden rounded-[28px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] shadow-[0_18px_50px_var(--color-card-shadow)]"
              >
                <img
                  src={image}
                  alt={`Somara Labs sauna gallery ${index + 1}`}
                  className="aspect-[4/5] w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
