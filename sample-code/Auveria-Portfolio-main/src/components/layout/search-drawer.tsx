"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon } from "lucide-react";
import { useSearch } from "@/lib/search-context";
import { useCurrency } from "@/lib/currency-context";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function SearchDrawer() {
  const { isOpen, closeSearch, query, setQuery, results } = useSearch();
  const { formatPrice } = useCurrency();
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("Products");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const tabs = ["Products", "Collections", "Pages"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 z-[100] bg-[var(--color-overlay)] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-md border-l border-[var(--color-border-inverse)] bg-[var(--color-paper)] p-0 shadow-2xl shadow-[var(--color-scrim)]"
          >
            <div className="flex h-full flex-col">
              {/* Header / Search Input */}
              <div className="p-8 pb-4">
                <div className="relative flex items-center justify-between">
                  <div className="flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for..."
                      className="w-full bg-transparent py-4 text-3xl font-display text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/40 focus:outline-none"
                    />
                    <div className="h-[1px] w-full bg-[var(--color-ink)]" />
                  </div>
                  <div className="ml-4 flex items-center gap-4">
                    {query && (
                      <button 
                        onClick={() => setQuery("")}
                        className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                      >
                        Clear
                      </button>
                    )}
                    <button
                      onClick={closeSearch}
                      className="rounded-full p-2 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-8 mt-6">
                <div className="flex gap-6 border-b border-[var(--color-border-inverse)]">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-2xl font-bold transition-all ${
                        activeTab === tab 
                          ? "text-[var(--color-ink)] border-b-2 border-[var(--color-ink)]" 
                          : "text-[var(--color-muted)]/40 hover:text-[var(--color-muted)]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                {query === "" ? (
                  <div className="py-12 text-center text-[var(--color-muted)]">
                    <SearchIcon size={40} className="mx-auto mb-4 opacity-10" strokeWidth={1} />
                    <p className="text-sm">Type to search for products, collections, or guides.</p>
                  </div>
                ) : activeTab === "Products" && results.length > 0 ? (
                  <div className="space-y-8">
                    {results.map((product) => (
                      <Link 
                        key={product.id} 
                        href={product.href} 
                        onClick={closeSearch}
                        className="flex gap-6 group"
                      >
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface-muted)]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-display text-xl text-[var(--color-ink)] group-hover:text-[var(--color-muted)] transition-colors">
                            {product.name}
                          </h4>
                          <div className="mt-1 flex items-center gap-3">
                            <span className="text-sm font-semibold text-[var(--color-brand-highlight)]">
                              {formatPrice(product.basePrice)}
                            </span>
                            <span className="text-xs text-[var(--color-muted)] line-through">
                              {formatPrice(product.basePrice * 1.2)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-[var(--color-muted)]">
                    <p className="text-sm">No results found for &ldquo;{query}&rdquo; in {activeTab}.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Bubble Icon - as seen in images */}
            <div className="absolute bottom-8 right-8">
              <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-cta-bubble)] text-[var(--color-hero-fg)] shadow-lg shadow-[var(--color-cta-bubble-shadow)] transition hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
