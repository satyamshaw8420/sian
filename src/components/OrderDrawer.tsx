import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShoppingBag, Trash2, X } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { generateWhatsAppMessage, openWhatsApp } from "../lib/whatsapp";
import { inr } from "../lib/format";
import { scrollToId } from "../lib/scroll";
import { QtyStepper } from "./ui";

export default function OrderDrawer() {
  const { drawerOpen, setDrawerOpen, lines, count, total, hasUnpriced, setQty, remove, clear } = useOrder();

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setDrawerOpen]);

  const continueOnWhatsApp = () => {
    openWhatsApp(
      generateWhatsAppMessage(lines.map((l) => ({ name: l.item.name, price: l.item.price, qty: l.qty })))
    );
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          className="fixed inset-0 z-[85] bg-charcoal/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setDrawerOpen(false)}
        >
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream text-charcoal shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Your selection"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-charcoal/10 bg-parchment px-6 py-5">
              <div>
                <h2 className="font-display text-2xl font-bold">Your Selection</h2>
                <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-taupe">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close selection"
                className="flex h-10 w-10 items-center justify-center border border-charcoal/15 transition-colors hover:border-chilli hover:text-chilli"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-10 w-10 text-taupe/70" aria-hidden />
                  <p className="mt-4 font-display text-xl font-bold">Nothing here yet</p>
                  <p className="mt-1.5 max-w-[240px] text-sm text-taupe">
                    Browse the menu and add a few cravings to get started.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      window.setTimeout(() => scrollToId("menu"), 120);
                    }}
                    className="mt-6 inline-flex items-center gap-2 bg-chilli px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-chilli-deep"
                  >
                    Browse the menu <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {lines.map(({ item, qty }) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3.5 border border-charcoal/10 bg-card p-3"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="h-16 w-16 shrink-0 rounded-sm object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-display text-[15px] font-bold leading-snug">{item.name}</p>
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="p-1 text-taupe transition-colors hover:text-chilli"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <QtyStepper compact qty={qty} onChange={(q) => setQty(item.id, q)} />
                            <p className="font-display text-[15px] font-bold text-chilli">
                              {item.price === null ? (
                                <span className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-taupe">
                                  Price at restaurant
                                </span>
                              ) : (
                                inr(item.price * qty)
                              )}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-charcoal/10 bg-parchment px-6 py-5">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-taupe">
                    Estimated total{hasUnpriced ? "*" : ""}
                  </p>
                  <p className="font-display text-3xl font-bold text-charcoal">{inr(total)}</p>
                </div>
                {hasUnpriced && (
                  <p className="mt-1 text-[11px] font-semibold text-chilli">
                    *Some selected items don't have prices listed — the restaurant will confirm them.
                  </p>
                )}
                <button
                  type="button"
                  onClick={continueOnWhatsApp}
                  className="mt-4 flex w-full items-center justify-center gap-2.5 bg-wa px-5 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(29,168,81,0.6)]"
                >
                  <MessageCircle className="h-4.5 w-4.5" aria-hidden />
                  Continue on WhatsApp
                </button>
                <div className="mt-3.5 flex items-center justify-between">
                  <p className="max-w-[240px] text-[11px] leading-relaxed text-taupe">
                    Prices indicative — the restaurant confirms availability, total &amp; payment on WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-chilli underline-offset-4 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
