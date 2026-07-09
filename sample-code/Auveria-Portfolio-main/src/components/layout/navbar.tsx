"use client";

import * as React from "react";
import { Menu, X, ChevronDown, ChevronRight, Search, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation, siteName } from "@/content/site";
import { Button } from "@/components/ui/button";
import { useTheme, type Theme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useCurrency, allCurrencies } from "@/lib/currency-context";
import { useSearch } from "@/lib/search-context";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const themeOptions: Array<{ value: Theme; label: string }> = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  const { theme, setTheme } = useTheme();
  const { openCart, totalItems } = useCart();
  const { selectedCurrency, setCurrency } = useCurrency();
  const { openSearch } = useSearch();
  const { user, profile, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  return (
    <header className={cn("fixed left-0 right-0 z-50 w-full transition-transform duration-500", scrolled ? "-translate-y-10" : "translate-y-0")}>
      <div className="flex h-10 w-full items-center overflow-hidden border-b border-[var(--color-border-inverse)] bg-[var(--color-marquee-bg)]">
        <div className="marquee-track flex min-w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {["Free Worldwide Shipping", "•", "90 Day Free Trial", "•", "Spring Sale - Up To 50% Off", "•", "Free Worldwide Shipping", "•", "90 Day Free Trial", "•", "Spring Sale - Up To 50% Off", "•"].map((text, j) => (
                <span key={j} className="px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-marquee-fg)]">
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-4 pt-4 sm:px-6 lg:px-8">
        <div
          className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-500",
          scrolled
            ? "border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] shadow-[0_12px_42px_var(--color-card-shadow)] backdrop-blur-2xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className="font-display text-2xl tracking-[-0.04em] text-[var(--color-ink)]">
          {siteName}
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] py-2"
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>
              {item.children && (
                <div className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pt-2">
                  <div className="flex w-56 flex-col rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-2 shadow-xl backdrop-blur-xl">
                    {item.children.map(child => (
                      <div key={child.label} className="group/sub relative">
                        <Link href={child.href} className="flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-overlay-soft)] hover:text-[var(--color-ink)]">
                          {child.label}
                          {child.children && <ChevronRight size={14} />}
                        </Link>
                        {child.children && (
                          <div className="absolute left-full top-0 pl-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all">
                            <div className="flex w-48 flex-col rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-2 shadow-xl backdrop-blur-xl">
                              {child.children.map(subchild => (
                                <Link key={subchild.label} href={subchild.href} className="block rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-overlay-soft)] hover:text-[var(--color-ink)]">
                                  {subchild.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <div className="group relative">
            <div className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[var(--color-ink)]">
              <span className="text-base leading-none">{selectedCurrency.flag}</span>
              <span>{selectedCurrency.code} {selectedCurrency.symbol}</span>
              <ChevronDown size={14} className="text-[var(--color-muted)] transition-transform group-hover:rotate-180" />
            </div>
            
            {/* Currency Dropdown */}
            <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="scrollbar-hide max-h-[400px] w-72 overflow-y-auto rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-paper)] p-2 shadow-2xl backdrop-blur-xl">
                {allCurrencies.map((c) => (
                  <button
                    key={c.country}
                    onClick={() => setCurrency(c)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--color-overlay-soft)]",
                      selectedCurrency.country === c.country ? "bg-[var(--color-overlay-soft)] font-semibold" : ""
                    )}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="flex-1 truncate">{c.country}</span>
                    <span className="text-[var(--color-muted)] text-xs">{c.code} {c.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 border-l border-[var(--color-muted)]/20 pl-6">
            <button 
              onClick={openSearch}
              aria-label="Search" 
              className="text-[var(--color-ink)] transition-colors hover:text-[var(--color-muted)]"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <div className="group relative">
              <button aria-label="User account" className="flex items-center gap-1 text-[var(--color-ink)] transition-colors hover:text-[var(--color-muted)]">
                <User size={20} strokeWidth={1.5} />
                <ChevronDown size={14} className="text-[var(--color-muted)] transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute right-0 top-full z-50 invisible pt-4 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="w-56 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-2 shadow-2xl backdrop-blur-xl">
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-[var(--color-ink)]">
                        <p className="font-semibold">{profile?.name || user.displayName || "User"}</p>
                        <p className="text-xs text-[var(--color-muted)] truncate">{user.email}</p>
                      </div>
                      <div className="h-px w-full bg-[var(--color-border-soft)] my-1" />
                      <Link href="/profile" className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-overlay-soft)]">
                        My Profile
                      </Link>
                      <button onClick={logout} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-overlay-soft)]">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-overlay-soft)]">
                        Log In
                      </Link>
                      <Link href="/register" className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-overlay-soft)]">
                        Sign Up
                      </Link>
                    </>
                  )}
                  <div className="h-px w-full bg-[var(--color-border-soft)] my-1" />
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    Theme
                  </p>
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--color-overlay-soft)]",
                        mounted && theme === option.value
                          ? "bg-[var(--color-overlay-soft)] font-semibold text-[var(--color-ink)]"
                          : "text-[var(--color-muted)]"
                      )}
                    >
                      <span>{option.label}</span>
                      {mounted && theme === option.value ? (
                        <span className="text-xs text-[var(--color-ink)]">Active</span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={openCart}
              aria-label="Shopping bag" 
              className="group relative text-[var(--color-ink)] transition-colors hover:text-[var(--color-muted)]"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-ink)] text-[10px] font-bold text-[var(--color-paper)]">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 xl:hidden lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-2 text-[var(--color-ink)] backdrop-blur"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-[var(--color-border-soft)] bg-[var(--color-surface-strong)] p-5 shadow-[0_24px_60px_var(--color-card-shadow-strong)] backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <Button href="/contact" className="w-full">
                Book a demo
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </header>
  );
}
