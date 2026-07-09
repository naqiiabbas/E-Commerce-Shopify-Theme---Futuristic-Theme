import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Aurevia"
        title="A premium brand system imagined for modern care businesses."
        description="This placeholder company story is designed to give the site believable structure now, while staying easy to replace with your real mission, founder perspective, and operating model later."
      />
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[
            "Thoughtful by default",
            "Operationally calm",
            "Built to earn trust",
          ].map((item, index) => (
            <Reveal key={item} delay={index * 0.08} className="rounded-[28px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-7 shadow-[0_18px_50px_var(--color-card-shadow)]">
              <h3 className="font-display text-3xl tracking-[-0.03em] text-[var(--color-ink)]">
                {item}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                Replace this section with your real point of view, team philosophy, and what
                distinguishes your care model or product experience from the market.
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
