import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "../data/gallery";

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const touchX = useRef<number | null>(null);
  const open = index !== null && index >= 0 && index < items.length;
  const item = open ? items[index as number] : null;

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    onNavigate((index + dir + items.length) % items.length);
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, items.length]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col bg-charcoal/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${item.title}`}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-cream/60">
              <span className="text-gold">{(index as number) + 1}</span> / {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close photo viewer"
              className="flex h-10 w-10 items-center justify-center border border-cream/20 text-cream transition-colors hover:border-chilli hover:bg-chilli"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center border border-cream/20 bg-charcoal/50 text-cream backdrop-blur transition-colors hover:border-gold hover:text-gold sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full flex-col items-center"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="max-h-[70svh] w-auto max-w-full border border-cream/10 object-contain shadow-2xl"
                  decoding="async"
                />
                <figcaption className="mt-4 text-center">
                  <span className="font-display text-xl font-bold text-cream">{item.title}</span>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-gold/80">
                    {item.categories.join(" · ")}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center border border-cream/20 bg-charcoal/50 text-cream backdrop-blur transition-colors hover:border-gold hover:text-gold sm:right-6"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
