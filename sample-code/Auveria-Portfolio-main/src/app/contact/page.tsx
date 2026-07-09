import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/motion/reveal";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="A premium inquiry flow that feels light, clear, and conversion-focused."
        description="Use this form shell for sales, consultation requests, or founder-led outreach until you connect your real backend or scheduling layer."
      />
      <section className="px-6 pb-16 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[30px] border border-[var(--color-border-soft)] bg-[var(--color-panel-dark)] p-8 text-[var(--color-hero-fg)] shadow-[0_26px_80px_var(--color-card-shadow-strong)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-panel-dark-subtle)]">Reach the team</p>
            <h2 className="mt-4 font-display text-4xl tracking-[-0.03em]">Let&apos;s shape your launch.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-panel-dark-muted)]">
              Replace the placeholder contact details, booking link, and support paths with your real
              sales or intake workflow.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[var(--color-panel-dark-faint)]">
              <p>hello@aurevia.co</p>
              <p>Mon-Fri, 9:00 AM to 6:00 PM</p>
              <p>New York / London / Dubai</p>
            </div>
          </div>
          <form className="rounded-[30px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-8 shadow-[0_20px_60px_var(--color-card-shadow)]">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm text-[var(--color-muted)]">
                Name
                <input className="mt-2 min-h-12 w-full rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-paper)] px-4 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand-highlight)]" />
              </label>
              <label className="text-sm text-[var(--color-muted)]">
                Email
                <input type="email" className="mt-2 min-h-12 w-full rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-paper)] px-4 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand-highlight)]" />
              </label>
              <label className="text-sm text-[var(--color-muted)] sm:col-span-2">
                Company
                <input className="mt-2 min-h-12 w-full rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-paper)] px-4 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand-highlight)]" />
              </label>
              <label className="text-sm text-[var(--color-muted)] sm:col-span-2">
                What are you building?
                <textarea className="mt-2 min-h-36 w-full rounded-[24px] border border-[var(--color-border-strong)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-brand-highlight)]" />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-full bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-brand-secondary)]"
            >
              Send inquiry
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
