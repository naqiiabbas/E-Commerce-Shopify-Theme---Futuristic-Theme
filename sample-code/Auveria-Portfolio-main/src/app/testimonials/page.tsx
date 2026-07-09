import { TestimonialCard } from "@/components/marketing/cards";
import { PageHero } from "@/components/marketing/page-hero";
import { TestimonialMarquee } from "@/components/marketing/testimonial-marquee";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/content/site";

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Social proof presented with editorial polish."
        description="This page gives you both credibility and visual texture, with a premium testimonial rail and a masonry layout for deeper proof."
      />
      <section className="px-6 pb-8 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <TestimonialMarquee />
        </Reveal>
      </section>
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl columns-1 gap-6 md:columns-2 xl:columns-3">
          {testimonials.map((item, index) => (
            <div key={item.name} className="mb-6">
              <Reveal delay={index * 0.05}>
                <TestimonialCard item={item} />
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
