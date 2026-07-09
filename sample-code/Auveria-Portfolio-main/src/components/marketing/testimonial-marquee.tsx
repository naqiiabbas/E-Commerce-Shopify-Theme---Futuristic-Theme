import { testimonials } from "@/content/site";

export function TestimonialMarquee() {
  const items = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden rounded-[32px] border border-[var(--color-border-soft)] bg-[var(--color-panel-dark)] py-5 text-[var(--color-hero-fg)] shadow-[0_22px_70px_var(--color-card-shadow-strong)]">
      <div className="marquee-track flex min-w-max gap-4 px-4">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="w-[320px] shrink-0 rounded-[24px] border border-[var(--color-border-inverse)] bg-[var(--color-surface-muted)] p-5 backdrop-blur"
          >
            <p className="text-sm leading-7 text-[var(--color-panel-dark-faint)]">{item.quote}</p>
            <p className="mt-4 text-sm font-semibold">{item.name}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-panel-dark-subtle)]">
              {item.role} · {item.company}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
