import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY, GALLERY_FILTERS, type GalleryCategory, type GalleryItem } from "../data/gallery";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [filter, setFilter] = useState<"All" | GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo<GalleryItem[]>(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="gallery" className="noise scroll-mt-20 bg-coal py-24 text-cream sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="light"
            eyebrow="Gallery"
            lines={["From the Wok,", <em key="t" className="text-gold">to the Table</em>]}
          />
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Gallery filters">
              {GALLERY_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    filter === f
                      ? "border-gold bg-gold text-charcoal"
                      : "border-cream/20 text-cream/70 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Masonry */}
        <div className="mt-12 columns-2 gap-4 lg:columns-3 [column-fill:balance]">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-cream/8 text-left focus-visible:outline-gold"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open photo: ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className={`${item.aspect} w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]`}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" aria-hidden />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    {item.categories.join(" · ")}
                  </span>
                  <span className="mt-0.5 block font-display text-lg font-bold text-cream">{item.title}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
