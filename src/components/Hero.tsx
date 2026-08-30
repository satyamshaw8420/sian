import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin, Star } from "lucide-react";
import { SITE } from "../data/site";
import { IMAGES } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { stagger, fadeUp } from "./Reveal";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <img
          src={IMAGES.hero}
          alt=""
          className="kenburns h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/78 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/70" />
      </div>

      {/* Vertical locality marker */}
      <p
        className="absolute right-7 top-1/2 hidden -translate-y-1/2 rotate-180 text-[11px] font-bold uppercase tracking-[0.5em] text-cream/25 [writing-mode:vertical-rl] xl:block"
        aria-hidden
      >
        Chowringhee — Kolkata 700020
      </p>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <motion.div
          className="max-w-2xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold"
          >
            <span className="h-px w-12 bg-gold/70" aria-hidden />
            Exide More · Chowringhee · Kolkata
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display font-black leading-[0.95] text-cream"
          >
            <span className="block text-6xl tracking-tight sm:text-8xl lg:text-[7.5rem]">
              {SITE.wordmark.first}
            </span>
            <span className="block text-6xl italic tracking-tight text-gold sm:text-8xl lg:text-[7.5rem]">
              {SITE.wordmark.second.charAt(0) + SITE.wordmark.second.slice(1).toLowerCase()}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 font-display text-xl italic text-gold-light sm:text-2xl"
          >
            “{SITE.tagline}”
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/70">
            {SITE.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => scrollToId("menu")}
              className="group inline-flex items-center gap-2 bg-chilli px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep hover:shadow-[0_16px_35px_-12px_rgba(183,53,40,0.55)]"
            >
              Explore Menu
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </button>
            <a
              href={SITE.delivery.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-cream/30 px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              Order Online
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-cream/70 underline decoration-gold/50 decoration-2 underline-offset-8 transition-colors hover:text-gold"
            >
              <MapPin className="h-4 w-4" aria-hidden />
              Get Directions
            </a>
          </motion.div>

          {/* Rating chip */}
          <motion.div
            variants={fadeUp}
            className="mt-12 inline-flex items-center gap-4 border border-cream/12 bg-charcoal/55 px-5 py-3.5 backdrop-blur-sm"
          >
            <span className="flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 fill-gold text-gold" aria-hidden />
              <span className="font-display text-2xl font-bold text-cream">{SITE.rating}</span>
            </span>
            <span className="h-8 w-px bg-cream/15" aria-hidden />
            <span className="text-[13px] leading-snug text-cream/65">
              {SITE.reviewCount}+ Google reviews
              <span className="block text-[11px] uppercase tracking-[0.14em] text-gold/80">
                {SITE.cuisines.join(" · ")}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex" aria-hidden>
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-cream/40">Scroll</span>
        <span className="block h-10 w-px overflow-hidden bg-cream/15">
          <span className="scrollcue block h-full w-full bg-gold" />
        </span>
      </div>
    </section>
  );
}
