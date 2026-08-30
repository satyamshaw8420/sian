import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, MessageCircle } from "lucide-react";
import { SITE } from "../data/site";
import { IMAGES } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { openWhatsApp } from "../lib/whatsapp";
import { fadeUp, stagger } from "./Reveal";

export default function ContactCTA() {
  return (
    <section className="noise relative overflow-hidden bg-charcoal py-28 text-cream sm:py-40" aria-label="Final call to action">
      <div className="absolute inset-0" aria-hidden>
        <img
          src={IMAGES.hero}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/60 to-charcoal" />
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-chilli/[0.08] blur-[120px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p variants={fadeUp} className="flourish-divider mx-auto max-w-md text-[11px] font-bold uppercase tracking-[0.32em] text-gold">
          {SITE.hours.label} · {SITE.hours.display}
        </motion.p>

        <h2 className="mt-8 font-display leading-[0.88]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-7xl font-black text-outline-cream sm:text-9xl lg:text-[11rem]"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Come
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.em
              className="block pl-[0.6em] text-7xl font-bold italic text-gold sm:pl-[0.8em] sm:text-9xl lg:text-[11rem]"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Hungry.
            </motion.em>
          </span>
        </h2>

        <motion.p variants={fadeUp} className="mx-auto mt-8 max-w-lg font-display text-xl italic text-cream/80 sm:text-2xl">
          Your next favourite dish is waiting on Chowringhee Road.
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
