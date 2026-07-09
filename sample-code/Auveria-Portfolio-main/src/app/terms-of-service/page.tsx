import { PageHero } from "@/components/marketing/page-hero";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of service"
        title="Clean legal scaffolding for a production-shaped marketing site."
        description="This page is intentionally minimal and should be replaced with your real commercial, platform, and usage terms before launch."
      />
      <section className="px-6 pb-16 lg:px-8">
        <article className="mx-auto max-w-4xl rounded-[32px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-8 shadow-[0_20px_60px_var(--color-card-shadow)]">
          <div className="space-y-6 text-sm leading-8 text-[var(--color-muted)]">
            <p>
              Define account responsibilities, acceptable use, subscription or service payment terms,
              ownership of materials, disclaimers, and limitation language according to your real
              offering.
            </p>
            <p>
              For healthcare-adjacent businesses, make sure the final terms clearly distinguish
              software services from medical care where appropriate.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
