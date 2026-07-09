import { PricingCard } from "@/components/marketing/cards";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { pricingTiers } from "@/content/site";

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Starter package design with room for your real packaging strategy."
        description="These tiers are intentionally polished placeholders that make the page feel launch-ready today and easy to rewrite when your final go-to-market model is set."
      />
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.07}>
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
