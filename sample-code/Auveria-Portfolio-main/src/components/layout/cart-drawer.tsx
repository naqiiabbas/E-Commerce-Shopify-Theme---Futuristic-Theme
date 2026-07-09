"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { formatPrice } = useCurrency();

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
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
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--color-border-inverse)] p-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={20} className="text-[var(--color-ink)]" />
                  <h2 className="font-display text-2xl text-[var(--color-ink)]">Your Cart</h2>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-ink)] text-[10px] font-bold text-[var(--color-paper)]">
                    {totalItems}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="rounded-full p-2 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-[var(--color-surface-muted)] p-6 text-[var(--color-muted)]">
                      <ShoppingBag size={48} strokeWidth={1} />
                    </div>
                    <p className="text-lg font-medium text-[var(--color-ink)]">Your cart is empty</p>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      Start adding items to your wellness ritual.
                    </p>
                    <Button onClick={closeCart} className="mt-8">
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface-muted)]">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h4 className="font-display text-lg text-[var(--color-ink)]">
                              {item.product.name}
                            </h4>
                            <p className="text-sm font-semibold text-[var(--color-ink)]">
                              {formatPrice(item.product.basePrice)}
                            </p>
                          </div>
                          <p className="mt-1 text-xs text-[var(--color-muted)]">
                            {item.product.tagline}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-[var(--color-border-inverse)] bg-[var(--color-surface-muted)] p-1">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-xs font-bold text-[var(--color-ink)]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-xs font-medium text-[var(--color-brand-danger)] hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="space-y-4 border-t border-[var(--color-border-inverse)] p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--color-muted)]">Subtotal</span>
                    <span className="text-xl font-bold text-[var(--color-ink)]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)]">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button className="h-14 w-full rounded-2xl text-base font-bold">
                    Checkout Now
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
