import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, MapPin, Star } from "lucide-react";
import { SITE, LINKS, isOpenNow } from "../data/site";
import { IMAGES, LOGO } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { fadeUp, stagger } from "./Reveal";

/** The original Sian Kitchen emblem with a rotating text ring — the site's signature mark. */
function HeroEmblem() {
  return (
    <div className="relative h-32 w-32 sm:h-40 sm:w-40">
      <span className="ring-pulse absolute inset-3 rounded-full border border-gold/40" aria-hidden />
      <img
        src={LOGO}
        alt="Sian Kitchen — original circular emblem"
        className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-full object-cover shadow-[0_0_0_2px_rgba(201,154,82,0.65),0_24px_50px_-14px_rgba(0,0,0,0.85)]"
      />
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id="stamp-circ" d="M60,60 m-55,0 a55,55 0 1,1 110,0 a55,55 0 1,1 -110,0" fill="none" />
        </defs>
        <text
          className="fill-gold uppercase"
          style={{ fontSize: "8.2px", letterSpacing: "2.4px", fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
        >
          <textPath href="#stamp-circ">Wok-fired · Dum-steamed · Tandoor-charred · Est. Kolkata ·</textPath>
        </text>
      </svg>
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
        {/* ── Copy column ── */}
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
            className="mt-7 font-display font-black leading-[0.85] tracking-tight text-cream"
          >
            <span className="block overflow-hidden">
              <motion.span className="block text-[21vw] sm:text-[19vw] lg:text-[10.5rem] xl:text-[12rem]"
                initial={{ y: "112%" }} animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {SITE.wordmark.first}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block pl-[0.55em] font-medium italic text-gold sm:pl-[0.7em] lg:text-[8.5rem] lg:pl-[0.8em] xl:text-[9.5rem] text-[17vw] sm:text-[15.5vw]"
                initial={{ y: "112%" }} animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Kitchen
              </motion.span>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 flex items-center gap-4">
            <span className="h-px w-14 shrink-0 bg-gold/70" aria-hidden />
            <span className="font-display text-xl italic text-gold-light sm:text-2xl">“{SITE.tagline}”</span>
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/65">
            {SITE.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => scrollToId("menu")}
              className="group inline-flex items-center gap-2 bg-chilli px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep hover:shadow-[0_18px_40px_-12px_rgba(183,53,40,0.6)]"
            >
              Explore Menu
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </button>
            <a
              href={SITE.delivery.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-cream/25 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              Order Online <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href={LINKS.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-2 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-cream/65 transition-colors hover:text-gold"
            >
              <MapPin className="h-4 w-4 text-gold" aria-hidden />
              <span className="border-b border-gold/40 pb-0.5 transition-colors group-hover:border-gold">
                Get Directions
              </span>
            </a>
          </motion.div>

          {/* meta strip */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-cream/10 pt-6"
          >
            <span className="flex items-center gap-2.5">
              <Star className="h-5 w-5 fill-gold text-gold" aria-hidden />
              <span className="font-display text-2xl font-bold text-cream">{SITE.rating}</span>
              <span className="text-[12px] leading-tight text-cream/50">
                {SITE.reviewCount}+ Google<br />reviews
              </span>
            </span>
            <span className="hidden h-9 w-px bg-cream/12 sm:block" aria-hidden />
            <span className="text-[12px] leading-tight text-cream/50">
              <span className="font-display text-2xl font-bold text-cream">₹{SITE.priceForTwo}</span>
              <br />approx. for two
            </span>
            <span className="hidden h-9 w-px bg-cream/12 sm:block" aria-hidden />
            <span className="text-[12px] leading-tight text-cream/50">
              <span className="font-display text-2xl font-bold text-cream">04</span>
              <br />cuisines, one kitchen
            </span>
          </motion.div>
        </motion.div>

        {/* ── Image column ── */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ y: driftImg }} className="relative">
            <div className="absolute -left-4 -top-4 h-full w-full border border-gold/40" aria-hidden />
            <div className="relative overflow-hidden">
              <img
                src={IMAGES.drums}
                alt="Drums of Heaven — crispy glazed chicken drumettes at Sian Kitchen"
                className="kenburns aspect-[4/5] w-full object-cover"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" aria-hidden />
              <p className="absolute bottom-4 left-4 text-[10.5px] font-bold uppercase tracking-[0.24em] text-cream/85">
                Drums of Heaven · house favourite
              </p>
            </div>

            <div className="absolute -bottom-10 -left-7 sm:-left-14">
              <HeroEmblem />
            </div>

            <p
              className="absolute -right-7 top-1/2 hidden -translate-y-1/2 rotate-180 text-[10.5px] font-bold uppercase tracking-[0.5em] text-cream/25 [writing-mode:vertical-rl] xl:block"
              aria-hidden
            >
              59B Chowringhee Road
            </p>
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
