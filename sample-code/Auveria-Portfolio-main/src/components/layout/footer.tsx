import Link from "next/link";
import { footerGroups, siteName, siteTagline } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--color-border-soft)] bg-[var(--color-footer-bg)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:px-8">
        <div>
          <p className="font-display text-3xl tracking-[-0.04em] text-[var(--color-ink)]">
            {siteName}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--color-muted)]">
            {siteTagline}
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:max-w-sm sm:flex-row">
            <input
              type="email"
              placeholder="Your work email"
              className="min-h-12 flex-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-soft)] px-4 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand-highlight)]"
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-paper)] transition hover:bg-[var(--color-ink-soft)]"
            >
              Subscribe
            </button>
          </form>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{group.title}</p>
            <div className="mt-4 flex flex-col gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[var(--color-border-soft)] px-6 py-6 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>Contact: hello@aurevia.co</p>
        <p>Instagram / LinkedIn / X</p>
      </div>
    </footer>
  );
}
