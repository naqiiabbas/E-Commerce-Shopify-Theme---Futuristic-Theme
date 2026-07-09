import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryLabel = "Book a demo",
  primaryHref = "/contact",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-12 lg:px-8 lg:pt-32">
      <div className="ambient-orb absolute left-0 top-10 h-64 w-64 bg-[var(--color-accent-peach)]/20" />
      <div className="ambient-orb absolute right-10 top-0 h-72 w-72 bg-[var(--color-accent-blue)]/18" />
      <Reveal className="mx-auto max-w-5xl rounded-[36px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-8 py-16 shadow-[0_24px_90px_var(--color-card-shadow)] backdrop-blur-2xl sm:px-12">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="center" />
        <div className="mt-8 flex justify-center">
          <Button href={primaryHref}>{primaryLabel}</Button>
        </div>
      </Reveal>
    </section>
  );
}
