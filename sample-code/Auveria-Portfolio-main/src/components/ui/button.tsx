"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-all duration-300",
    variant === "primary" &&
      "bg-[var(--color-brand-primary)] text-[var(--color-paper)] shadow-[0_18px_40px_var(--color-brand-glow)] hover:bg-[var(--color-brand-secondary)]",
    variant === "secondary" &&
      "border border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-ink)] backdrop-blur-xl hover:bg-[var(--color-surface-strong)]",
    variant === "ghost" &&
      "text-[var(--color-ink)] hover:bg-[var(--color-surface-strong)]",
    className,
  );

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={href ? "" : "inline-block w-full"}>
      {href ? (
        <Link href={href} className={styles}>
          {children}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={cn(styles, "w-full cursor-pointer")}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
