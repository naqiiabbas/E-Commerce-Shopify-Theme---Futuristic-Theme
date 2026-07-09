import { PageHero } from "@/components/marketing/page-hero";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy policy"
        title="A polished legal page that stays aligned with the rest of the brand."
        description="This placeholder copy exists to complete the information architecture and should be replaced with counsel-approved language before launch."
      />
      <section className="px-6 pb-16 lg:px-8">
        <article className="mx-auto max-w-4xl rounded-[32px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-8 shadow-[0_20px_60px_var(--color-card-shadow)]">
          <div className="space-y-6 text-sm leading-8 text-[var(--color-muted)]">
            <p>
              Aurevia collects only the operational and contact data needed to support product
              access, inquiry handling, and service delivery. Replace this section with your exact
              data collection, retention, and rights language.
            </p>
            <p>
              Include lawful basis, vendor disclosures, cross-border transfer treatment, and any
              healthcare-specific obligations that apply to your actual business model.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
