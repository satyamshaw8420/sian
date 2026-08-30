import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MessageCircle } from "lucide-react";
import { SITE } from "../data/site";
import { IMAGES } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { openWhatsApp } from "../lib/whatsapp";
import { fadeUp, stagger, LineReveal } from "./Reveal";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-cream sm:py-40" aria-label="Final call to action">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={IMAGES.hero}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/70 to-charcoal" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.32em] text-gold">
          {SITE.hours.label} · {SITE.hours.display}
        </motion.p>

        <h2 className="mt-6 font-display text-6xl font-black leading-[0.95] sm:text-8xl">
          <LineReveal
            lines={[
              "Come",
              <em key="h" className="text-gold">Hungry.</em>,
            ]}
          />
        </h2>

        <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-lg font-display text-xl italic text-cream/80 sm:text-2xl">
          Your next favourite dish is waiting.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-11 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => scrollToId("menu")}
            className="group inline-flex items-center gap-2 bg-chilli px-8 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep hover:shadow-[0_18px_40px_-12px_rgba(183,53,40,0.6)]"
          >
            Explore Menu
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </button>
          <a
            href={SITE.delivery.swiggyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-cream/35 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
          >
            Order Online <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => openWhatsApp(`Hello ${SITE.name},\n\nI'd like to place an order.\n`)}
            className="inline-flex items-center gap-2 border border-wa/70 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-wa transition-all duration-300 hover:-translate-y-0.5 hover:bg-wa hover:text-cream"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
