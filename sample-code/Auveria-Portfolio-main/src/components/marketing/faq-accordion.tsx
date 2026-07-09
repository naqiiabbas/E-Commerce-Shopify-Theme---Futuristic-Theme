"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { FaqItem } from "@/types/content";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = active === index;
        return (
          <div
            key={item.question}
            className="rounded-[28px] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] px-6 py-5 shadow-[0_12px_40px_var(--color-card-shadow)] backdrop-blur-xl"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 text-left"
              onClick={() => setActive(open ? null : index)}
            >
              <span className="text-lg font-medium text-[var(--color-ink)] sm:text-xl">
                {item.question}
              </span>
              <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
                <Plus className="text-[var(--color-muted)]" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-base leading-8 text-[var(--color-muted)]">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
