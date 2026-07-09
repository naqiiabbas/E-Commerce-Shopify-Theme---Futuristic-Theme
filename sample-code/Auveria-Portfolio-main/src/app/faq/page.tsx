import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "@/content/site";

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Large-type answers with calm, touch-friendly interactions."
        description="Use this page for product, service, or onboarding questions while keeping the layout refined on both desktop and mobile."
      />
      <section className="px-6 pb-16 lg:px-8">
        <Reveal className="mx-auto max-w-5xl">
          <FaqAccordion items={faqs} />
        </Reveal>
      </section>
    </>
  );
}
