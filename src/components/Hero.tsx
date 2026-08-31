import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin, Star } from "lucide-react";
import { SITE, LINKS, isOpenNow } from "../data/site";
import { IMAGES } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { fadeUp, stagger } from "./Reveal";

function RotatingStamp() {
  return (
    <div className="relative h-28 w-28 sm:h-36 sm:w-36" aria-hidden>
      <svg viewBox="0 0 120 120" className="animate-spin-slow h-full w-full">
        <defs>
          <path id="stamp-circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" fill="none" />
        </defs>
        <text
          className="fill-gold uppercase"
          style={{ fontSize: "10px", letterSpacing: "2.6px", fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
        >
          <textPath href="#stamp-circ">Wok-fired · Dum-steamed · Tandoor-charred ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 10 10" className="text-chilli">
          <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const driftImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const open = isOpenNow();

  return (
    <section
      ref={ref}
      id="home"
      className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal"
    >
      {/* ambient field */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-chilli/[0.07] blur-[130px]" />
        <div className="absolute -right-32 -top-24 h-[560px] w-[560px] rounded-full bg-gold/[0.09] blur-[130px]" />
        <motion.span
          style={{ y: drift }}
          className="pointer-events-none absolute -right-[4%] top-[2%] select-none font-display text-[38vw] font-black leading-none text-outline-cream lg:text-[26rem]"
        >
          食
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-24 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <motion.div className="lg:col-span-7" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span
              className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.2em] ${
                open ? "border-[#1a7f37]/50 text-[#7ac790]" : "border-chilli/50 text-chilli"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`ring-pulse absolute inline-flex h-full w-full rounded-full ${open ? "bg-[#7ac790]" : "bg-chilli"}`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${open ? "bg-[#7ac790]" : "bg-chilli"}`} />
              </span>
              {open ? "Open now" : "Closed now"} · {SITE.hours.display}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cream/45">
              Exide More — Chowringhee — Kolkata
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display font-black leading-[0.88] tracking-tight text-cream sm:mt-7"
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem]"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {SITE.wordmark.first}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block pl-[0.3em] font-medium italic text-gold text-5xl sm:text-7xl md:text-8xl sm:pl-[0.5em] lg:text-[8.5rem] lg:pl-[0.8em] xl:text-[9.5rem]"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Kitchen
              </motion.span>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 flex items-center gap-3 sm:mt-7 sm:gap-4">
            <span className="h-px w-10 shrink-0 bg-gold/70 sm:w-14" aria-hidden />
            <span className="font-display text-lg italic text-gold-light sm:text-2xl">“{SITE.tagline}”</span>
          </motion.p>

          <motion.p variants={fadeUp} className="mt-3 max-w-md text-[14px] leading-relaxed text-cream/70 sm:mt-4 sm:text-[15px]">
            {SITE.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3.5">
              <button
                type="button"
                onClick={() => scrollToId("menu")}
                className="group inline-flex items-center justify-center gap-1.5 bg-chilli px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep hover:shadow-[0_18px_40px_-12px_rgba(183,53,40,0.6)] sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.18em]"
              >
                Explore Menu
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" aria-hidden />
              </button>
              <a
                href={SITE.delivery.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 border border-cream/25 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:px-7 sm:py-4 sm:text-[12px] sm:tracking-[0.18em]"
              >
                Order Online <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
              </a>
            </div>
            <a
              href={LINKS.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 py-2 text-[11.5px] font-bold uppercase tracking-[0.16em] text-cream/70 transition-colors hover:text-gold sm:justify-start sm:px-2 sm:py-4 sm:text-[12px] sm:tracking-[0.18em]"
            >
              <MapPin className="h-4 w-4 text-gold" aria-hidden />
              <span className="border-b border-gold/40 pb-0.5 transition-colors group-hover:border-gold">
                Get Directions
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 grid grid-cols-3 items-center divide-x divide-cream/15 border-y border-cream/10 py-3 text-center sm:mt-12 sm:flex sm:flex-wrap sm:divide-x-0 sm:border-y-0 sm:border-t sm:py-0 sm:pt-6 sm:text-left sm:gap-x-8 sm:gap-y-4"
          >
            <div className="flex flex-col items-center px-1 sm:flex-row sm:items-center sm:gap-2.5 sm:px-0">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-gold text-gold sm:h-5 sm:w-5" aria-hidden />
                <span className="font-display text-xl font-bold text-cream sm:text-2xl">{SITE.rating}</span>
              </div>
              <span className="text-[10.5px] leading-tight text-cream/50 sm:text-[12px]">
                {SITE.reviewCount}+ Google<br className="hidden sm:inline" /> reviews
              </span>
            </div>
            <span className="hidden h-9 w-px bg-cream/12 sm:block" aria-hidden />
            <div className="flex flex-col items-center px-1 sm:block sm:px-0">
              <span className="font-display text-xl font-bold text-cream sm:text-2xl">₹{SITE.priceForTwo}</span>
              <p className="text-[10.5px] leading-tight text-cream/50 sm:text-[12px]">approx. for two</p>
            </div>
            <span className="hidden h-9 w-px bg-cream/12 sm:block" aria-hidden />
            <div className="flex flex-col items-center px-1 sm:block sm:px-0">
              <span className="font-display text-xl font-bold text-cream sm:text-2xl">04</span>
              <p className="text-[10.5px] leading-tight text-cream/50 sm:text-[12px]">cuisines, 1 kitchen</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative mx-auto mt-4 w-full max-w-[320px] px-2 sm:mt-0 sm:max-w-md sm:px-0 lg:col-span-5 lg:max-w-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ y: driftImg }} className="relative mx-auto">
            <div className="absolute -left-2.5 -top-2.5 sm:-left-4 sm:-top-4 h-full w-full border border-gold/40" aria-hidden />
            <div className="relative overflow-hidden border border-gold/20 shadow-2xl">
              <img
                src={IMAGES.drums}
                alt="Drums of Heaven — crispy glazed chicken drumettes at Sian Kitchen"
                className="kenburns aspect-[4/5] w-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" aria-hidden />
              <p className="absolute bottom-3.5 left-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cream/90 sm:bottom-4 sm:left-4 sm:text-[10.5px]">
                Drums of Heaven · house favourite
              </p>
            </div>

            <div className="absolute -bottom-6 -left-4 scale-75 origin-bottom-left sm:scale-100 sm:-bottom-9 sm:-left-7">
              <RotatingStamp />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex" aria-hidden>
        <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-cream/35">Scroll</span>
        <span className="block h-10 w-px overflow-hidden bg-cream/15">
          <span className="scrollcue block h-full w-full bg-gold" />
        </span>
      </div>
    </section>
  );
}
