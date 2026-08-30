import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { GALLERY, GALLERY_FILTERS, type GalleryCategory } from "../data/gallery";
import { Reveal } from "./Reveal";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const [filter, setFilter] = useState<"All" | GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.categories.includes(filter))),
    [filter]
  );

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="noise relative scroll-mt-20 overflow-hidden bg-coal py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-32 top-10 rounded-full bg-burgundy/40 blur-[120px]" style={{ width: 400, height: 400 }} />
      </div>

      <div className="relative z-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
          <Reveal>
            <p className="flourish-divider max-w-xs text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              <span className="px-3">From our kitchen</span>
            </p>
            <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">
              The <em className="text-gold">Gallery</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Scroll gallery left"
                className="flex h-11 w-11 items-center justify-center border border-cream/20 text-cream transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <ArrowLeft className="h-4.5 w-4.5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Scroll gallery right"
                className="flex h-11 w-11 items-center justify-center border border-cream/20 text-cream transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <ArrowRight className="h-4.5 w-4.5" aria-hidden />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delay={0.12} className="mx-auto mt-9 flex max-w-7xl flex-wrap gap-2 px-5 sm:px-8">
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                filter === f
                  ? "border-gold bg-gold text-wine-deep"
                  : "border-cream/15 text-cream/60 hover:border-gold/60 hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* Drag strip */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-10 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 active:cursor-grabbing sm:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          role="region"
          aria-label="Photo gallery — drag or use arrow buttons"
        >
          {items.map((item, i) => (
            <motion.figure
              key={item.id}
              layout
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-[78vw] max-w-[420px] shrink-0 snap-start overflow-hidden border border-cream/10 bg-charcoal sm:w-[34vw] sm:max-w-[400px]"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="block w-full text-left"
                aria-label={`Open photo: ${item.title}`}
              >
                <div className={`${item.aspect} w-full overflow-hidden`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <span>
                    <span className="block font-display text-lg font-bold leading-tight text-cream">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold/75">
                      {item.categories.join(" · ")}
                    </span>
                  </span>
                  <Camera className="h-4.5 w-4.5 shrink-0 text-cream/30 transition-colors duration-300 group-hover:text-gold" aria-hidden />
                </figcaption>
              </button>
              <span className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-gold/0 transition-all duration-300 group-hover:border-gold/70" aria-hidden />
              <span className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-gold/0 transition-all duration-300 group-hover:border-gold/70" aria-hidden />
            </motion.figure>
          ))}

          {/* End card */}
          <div className="flex w-[60vw] max-w-[300px] shrink-0 snap-start flex-col items-center justify-center border border-dashed border-gold/30 px-6 text-center">
            <p className="font-display text-2xl font-bold italic text-gold">Hungry yet?</p>
            <p className="mt-2 text-[12.5px] text-cream/50">Every plate above is on the menu.</p>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-cream/35">
          Drag · swipe · or use the arrows
        </p>
      </div>

      <Lightbox items={items} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </section>
  );
}
