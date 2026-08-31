import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, ShoppingBag, Users, X } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { openWhatsAppForDish } from "../lib/whatsapp";
import { inr } from "../lib/format";
import { QtyStepper, VegMark } from "./ui";

export default function DishModal() {
  const { selected, setSelected, add, cart } = useOrder();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected) {
      setQty(1);
      setAdded(false);
      document.body.style.overflow = "hidden";
      window.setTimeout(() => closeRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSelected]);

  const close = () => setSelected(null);

  const handleAdd = () => {
    if (!selected) return;
    add(selected.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return typeof document !== "undefined"
    ? createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-end justify-center bg-charcoal/80 backdrop-blur-sm sm:items-center sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              role="dialog"
              aria-modal="true"
              aria-labelledby="dish-modal-title"
            >
              <motion.div
                className="relative max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-charcoal/10 bg-cream text-charcoal shadow-2xl sm:rounded-none"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hero image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="h-full w-full object-cover"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={close}
                    aria-label="Close details"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/70 text-cream backdrop-blur transition-colors hover:bg-chilli"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <span className="bg-gold px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-charcoal">
                      {selected.category}
                    </span>
                    <span className="font-display text-2xl font-black text-cream">
                      {selected.price !== null ? inr(selected.price) : "Price at table"}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <VegMark type={selected.type} size="md" />
                    <h3 id="dish-modal-title" className="font-display text-2xl font-bold">
                      {selected.name}
                    </h3>
                  </div>

                  {selected.description && (
                    <p className="mt-3 text-[14px] leading-relaxed text-taupe">{selected.description}</p>
                  )}

                  {selected.serves && (
                    <p className="mt-4 flex items-center gap-2 text-[12.5px] font-semibold text-taupe">
                      <Users className="h-4 w-4 text-chilli" aria-hidden /> Portion: {selected.serves}
                    </p>
                  )}

                  {selected.halfPrice !== undefined && selected.price !== null && (
                    <div className="mt-5 rounded border border-charcoal/10 bg-card p-3.5 text-xs text-taupe">
                      <span className="font-bold text-charcoal">Portion options:</span> Full{" "}
                      {inr(selected.price)} · Half {inr(selected.halfPrice)} (order half portions over the
                      counter or on WhatsApp).
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-5">
                    <span className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-taupe">
                      Quantity
                    </span>
                    <QtyStepper qty={qty} onChange={setQty} />
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      disabled={!selected.available}
                      onClick={handleAdd}
                      className="group inline-flex flex-1 items-center justify-center gap-2 bg-chilli px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:bg-chilli-deep disabled:cursor-not-allowed disabled:bg-charcoal/20"
                    >
                      {added ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" aria-hidden />
                          {!selected.available
                            ? "Currently Unavailable"
                            : cart[selected.id]
                              ? `Update selection (${cart[selected.id]} in bag)`
                              : "Add to selection"}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => openWhatsAppForDish(selected, qty)}
                      className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-wa px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-wa transition-all duration-300 hover:-translate-y-0.5 hover:bg-wa hover:text-cream"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Add to WhatsApp
                    </button>
                  </div>

                  <p className="mt-4 text-[11.5px] leading-relaxed text-taupe">
                    "Add to WhatsApp" opens a pre-filled enquiry to the restaurant — availability and
                    payment are confirmed by them directly.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;
}
