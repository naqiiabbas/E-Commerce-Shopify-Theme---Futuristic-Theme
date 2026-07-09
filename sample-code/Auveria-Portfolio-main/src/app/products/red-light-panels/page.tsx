import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Red Light Panels",
  description: "Flagship red light therapy panels from Somara Labs in quarter, half, and full body formats.",
};

const panelSizes = [
  {
    name: "Quarter Panel",
    image: "/red_light/show/quarter_1.webp",
    description:
      "A compact format for focused recovery zones, smaller spaces, and daily consistency.",
    benefits: ["Targeted muscle recovery", "Sleep support rituals", "Easy home placement"],
  },
  {
    name: "Half Panel",
    image: "/red_light/show/half_1.webp",
    description:
      "The balanced format for regular full-session use across performance, inflammation, and skin goals.",
    benefits: ["Mid-size recovery coverage", "Flexible daily scheduling", "Best all-round format"],
  },
  {
    name: "Full Body Panel",
    image: "/red_light/show/full_1.webp",
    description:
      "The hero format for immersive at-home recovery with the strongest flagship presence.",
    benefits: ["Head-to-toe coverage", "Premium recovery centerpiece", "Built for serious routines"],
  },
];

const highlights = [
  "Built around recovery, inflammation reduction, and muscle restoration",
  "Designed to support sleep, skin health, and long-term wellness optimization",
  "Available in quarter, half, and full body sizes",
  "Created as the lead product line in the Somara Labs recovery system",
];

export default function RedLightPanelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Flagship Product"
        title="Red light therapy panels built as the centerpiece of the Somara Labs recovery system."
        description="This is the core Somara Labs product line: premium red light panels in quarter, half, and full body formats for recovery, restoration, performance, and wellness optimization."
        primaryLabel="Shop Red Light Panels"
        primaryHref="/products/red-light-panels"
      />

      <section className="px-6 pb-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <Reveal className="relative min-h-[520px] overflow-hidden rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-panel-dark)] shadow-[0_28px_90px_var(--color-card-shadow-strong)] lg:min-h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/red_light/hero image.webp"
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="/red_light/show_case.mp4"
            />
          </Reveal>

          <Reveal delay={0.08} className="rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-8 shadow-[0_20px_60px_var(--color-card-shadow)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
              Why it leads
            </p>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.04em] text-[var(--color-ink)]">
              One flagship line. Three formats. A full recovery identity.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
              Red light panels are the brand-defining product for Somara Labs. Everything else in the
              catalog supports this system, but the panels carry the core promise of recovery,
              restoration, and daily ritualized performance care.
            </p>
            <div className="mt-8 grid gap-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-ink)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-14 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
                Panel Sizes
              </p>
              <h2 className="mt-4 font-display text-5xl tracking-[-0.04em] text-[var(--color-ink)]">
                Choose the format that fits your space and ritual.
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {panelSizes.map((panel, index) => (
              <Reveal
                key={panel.name}
                delay={index * 0.08}
                className="overflow-hidden rounded-[32px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] shadow-[0_20px_60px_var(--color-card-shadow)]"
              >
                <div className="p-4">
                  <img
                    src={panel.image}
                    alt={panel.name}
                    className="aspect-[4/5] w-full rounded-[24px] object-cover"
                  />
                </div>
                <div className="px-6 pb-6 pt-2">
                  <h3 className="font-display text-3xl tracking-[-0.03em] text-[var(--color-ink)]">
                    {panel.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {panel.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {panel.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <Reveal className="overflow-hidden rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-redlight-base)] shadow-[0_28px_90px_var(--color-redlight-shadow)]">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <img
                src="/red_light/hero image.webp"
                alt="Somara Labs red light therapy hero view"
                className="h-full w-full object-cover"
              />
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-redlight-text)]">
                  Daily Ritual
                </p>
                <h2 className="mt-4 font-display text-5xl leading-[0.96] tracking-[-0.04em] text-[var(--color-redlight-text)]">
                  Recovery technology that feels architectural, not clinical.
                </h2>
                <p className="mt-5 text-base leading-8 text-[var(--color-redlight-line-soft)]">
                  The Somara Labs red light collection is meant to feel like a premium environment
                  piece inside the home while still delivering the serious performance presence of a
                  flagship recovery system.
                </p>
                <div className="mt-8">
                  <Button href="/contact">Request Product Guidance</Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
