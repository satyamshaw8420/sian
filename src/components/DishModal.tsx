import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, Plus, ShoppingBag, Star, Users, X } from "lucide-react";
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

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-charcoal/85 backdrop-blur-sm sm:items-center sm:p-6"
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
            className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden bg-wine-deep text-cream sm:flex-row sm:border sm:border-gold/30"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 70, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close dish details"
              className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/70 text-cream backdrop-blur transition-colors hover:bg-chilli"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            {/* Image */}
            <div className="relative h-52 shrink-0 sm:h-auto sm:w-[46%]">
              <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" decoding="async" />
              <div className="absolute left-3.5 top-3.5 flex flex-wrap items-center gap-2">
                <VegMark type={selected.type} />
                <span className="bg-charcoal/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold backdrop-blur">
                  {selected.group}
                </span>
                {selected.isNew && (
                  <span className="border border-chilli bg-charcoal/80 px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-chilli backdrop-blur">
                    New
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8">
              <h3 id="dish-modal-title" className="pr-8 font-display text-3xl font-bold leading-tight text-cream">
                {selected.name}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                {selected.popular && (
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-gold/15 px-2 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-gold">
                    <Star className="h-3 w-3 fill-gold" aria-hidden /> Guest favourite
                  </span>
                )}
                {selected.serves && (
                  <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-cream/55">
                    <Users className="h-4 w-4 text-gold" aria-hidden />
                    {selected.serves}
                  </span>
                )}
              </div>

              {selected.description && (
                <p className="mt-4 border-l-2 border-gold/50 pl-4 text-[14px] leading-[1.8] text-cream/75">
                  {selected.description}
                </p>
              )}

              <p
                className={`mt-4 inline-flex w-fit items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] ${
                  selected.available ? "text-[#4cc06a]" : "text-chilli"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${selected.available ? "bg-[#4cc06a]" : "bg-chilli"}`}
                  aria-hidden
                />
                {selected.available ? "Available today" : "Unavailable today"}
              </p>

              {/* Pricing */}
              <div className="mt-5 border-t border-gold/20 pt-5">
                {selected.price === null ? (
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cream/50">Price</p>
                      <p className="mt-1 font-display text-2xl font-bold text-gold-light">
                        Confirmed at restaurant
                      </p>
                    </div>
                    {selected.available && <QtyStepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} tone="light" />}
                  </div>
                ) : (
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cream/50">
                        {selected.halfPrice !== undefined ? "Full portion" : "Price"}
                      </p>
                      <p className="font-display text-3xl font-bold text-gold">{inr(selected.price)}</p>
                      {selected.halfPrice !== undefined && (
                        <p className="mt-0.5 text-[12.5px] font-semibold text-cream/55">
                          Half — {inr(selected.halfPrice)}
                        </p>
                      )}
                    </div>
                    {selected.available && (
                      <QtyStepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} tone="light" />
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  disabled={!selected.available}
                  onClick={handleAdd}
                  className={`inline-flex flex-1 items-center justify-center gap-2 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 disabled:cursor-not-allowed disabled:bg-charcoal/50 disabled:text-cream/40 ${
                    added ? "bg-[#1a7f37]" : "bg-chilli hover:-translate-y-0.5 hover:bg-chilli-deep"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden /> Added to selection
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" aria-hidden />
                      {cart[selected.id]
                        ? `Add ${qty} more (${cart[selected.id]} in selection)`
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

              <p className="mt-4 text-[11.5px] leading-relaxed text-cream/45">
                “Add to WhatsApp” opens a pre-filled enquiry to the restaurant — availability and
                payment are confirmed by them directly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
