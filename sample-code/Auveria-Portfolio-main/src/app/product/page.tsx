import { features } from "@/content/site";
import { FeatureCard } from "@/components/marketing/cards";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product and services"
        title="A flexible structure for software-led care, service delivery, or a hybrid offer."
        description="The page is intentionally written to support a wellness SaaS product, a premium services business, or a brand that blends both."
      />
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.07}>
              <FeatureCard feature={feature} reverse={index % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
