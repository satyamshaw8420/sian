import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, Plus, ShoppingBag, Users, X } from "lucide-react";
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
          className="fixed inset-0 z-[90] flex items-end justify-center bg-charcoal/80 backdrop-blur-sm sm:items-center sm:p-6"
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
            className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden bg-card text-charcoal sm:flex-row sm:rounded-sm"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
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
              <X className="h-4.5 w-4.5" aria-hidden />
            </button>

            {/* Image */}
            <div className="relative h-52 shrink-0 sm:h-auto sm:w-[46%]">
              <img
                src={selected.image}
                alt={selected.name}
                className="h-full w-full object-cover"
                decoding="async"
              />
              <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                <VegMark type={selected.type} />
                <span className="bg-charcoal/75 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-gold backdrop-blur">
                  {selected.category}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8">
              <h3 id="dish-modal-title" className="font-display text-3xl font-bold leading-tight">
                {selected.name}
              </h3>

              {selected.serves && (
                <p className="mt-2.5 flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-taupe">
                  <Users className="h-4 w-4 text-gold" aria-hidden />
                  {selected.serves}
                </p>
              )}

              <p className="mt-4 text-[14.5px] leading-[1.8] text-ink/80">{selected.description}</p>

              <p
                className={`mt-4 inline-flex w-fit items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] ${
                  selected.available ? "text-[#1a7f37]" : "text-chilli"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${selected.available ? "bg-[#1a7f37]" : "bg-chilli"}`}
                  aria-hidden
                />
                {selected.available ? "Available today" : "Unavailable today"}
              </p>

              <div className="mt-6 flex items-end justify-between border-t border-charcoal/10 pt-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-taupe">Price</p>
                  <p className="font-display text-3xl font-bold text-chilli">{inr(selected.price)}</p>
                </div>
                {selected.available && <QtyStepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} />}
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  disabled={!selected.available}
                  onClick={handleAdd}
                  className={`inline-flex flex-1 items-center justify-center gap-2 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 disabled:cursor-not-allowed disabled:bg-charcoal/30 ${
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
                        ? `Add ${qty} more (in selection: ${cart[selected.id]})`
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
