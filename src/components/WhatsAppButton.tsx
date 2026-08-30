import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, ShoppingBag } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { SITE } from "../data/site";
import { openWhatsApp } from "../lib/whatsapp";
import { inr } from "../lib/format";

/** Floating WhatsApp + Call actions, plus the live "Your Selection" pill. */
export default function WhatsAppButton() {
  const { count, total, setDrawerOpen, drawerOpen } = useOrder();

  return (
    <>
      {/* Floating actions */}
      <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <a
          href={SITE.phoneHref}
          aria-label={`Call ${SITE.name} at ${SITE.phoneDisplay}`}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-charcoal/90 text-gold shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-charcoal hover:text-gold-light"
        >
          <Phone className="h-5 w-5" aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => openWhatsApp(`Hello ${SITE.name},\n\nI'd like to place an order.\n`)}
          aria-label="Chat with Sian Kitchen on WhatsApp"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-wa text-cream shadow-[0_14px_30px_-8px_rgba(29,168,81,0.65)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(29,168,81,0.8)]"
        >
          <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" aria-hidden />
        </button>
      </div>

      {/* Selection pill */}
      <AnimatePresence>
        {count > 0 && !drawerOpen && (
          <motion.button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="fixed bottom-5 left-4 z-[70] flex items-center gap-3 rounded-full bg-chilli py-3 pl-4 pr-5 text-cream shadow-[0_16px_35px_-10px_rgba(183,53,40,0.7)] sm:bottom-6 sm:left-6"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 70 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-label={`Open your selection — ${count} items, estimated ${inr(total)}`}
          >
            <span className="relative">
              <ShoppingBag className="h-5 w-5" aria-hidden />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10.5px] font-extrabold text-charcoal">
                {count}
              </span>
            </span>
            <span className="text-left leading-tight">
              <span className="block font-display text-[15px] font-bold">{inr(total)}</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-cream/80">
                View selection
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
