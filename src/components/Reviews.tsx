import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { SITE } from "../data/site";
import { Reveal } from "./Reveal";

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className="relative inline-block h-7 w-7">
            <StarShape className="absolute inset-0 text-cream/15" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarShape className="h-7 w-7 text-gold" filled />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function StarShape({ className, filled = false }: { className: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.45 6.2 20.5l1.1-6.47L2.6 9.45l6.5-.95L12 2.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.4}
      />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="noise relative scroll-mt-20 overflow-hidden bg-charcoal py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-10 rounded-full bg-burgundy/45 blur-[120px]" style={{ width: 380, height: 380 }} />
        <Quote className="absolute -right-10 top-10 h-72 w-72 text-cream/[0.03]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        {/* Big rating */}
        <Reveal>
          <p className="flourish-divider max-w-xs text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
            <span className="px-3">Word on the street</span>
          </p>
          <h2 className="mt-5 font-display text-4xl font-black leading-[1.02] sm:text-5xl lg:text-6xl">
            What Our
            <span className="block">
              Guests <em className="text-gold">Say</em>
            </span>
          </h2>

          <div className="mt-9 flex items-end gap-6">
            <motion.p
              className="font-display text-[6.5rem] font-black leading-none text-gold sm:text-[8rem]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {SITE.rating}
            </motion.p>
            <div className="pb-4">
              <Stars value={SITE.rating} />
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-cream/55">
                {SITE.reviewCount}+ Google reviews
              </p>
            </div>
          </div>
        </Reveal>

        {/* Honest note + CTA */}
        <Reveal delay={0.15}>
          <div className="border border-gold/20 bg-coal/70 p-8 backdrop-blur-sm sm:p-10">
            <p className="font-display text-2xl font-bold leading-snug text-cream sm:text-[1.7rem]">
              Real plates, real opinions — <em className="text-gold">every review lives on Google.</em>
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.85] text-cream/60">
              We don't reprint cherry-picked quotes here. Open our Google profile to read all{" "}
              {SITE.reviewCount}+ reviews exactly as guests wrote them — the praise, the suggestions,
              everything. If you've eaten with us on Chowringhee, your review helps the next hungry
              Kolkata food-lover find us.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-gold px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-wine-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[var(--shadow-gold)]"
              >
                Read reviews on Google
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cream/25 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                Rate your visit
              </a>
            </div>
            <p className="mt-6 border-t border-cream/10 pt-5 text-[12px] leading-relaxed text-cream/40">
              Rating shown is the public Google rating for {SITE.name}, {SITE.address.line1},{" "}
              {SITE.address.line2}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
