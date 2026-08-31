import { ArrowRight, ExternalLink } from "lucide-react";
import { SITE } from "../data/site";
import { IMAGES } from "../data/menu";
import { Reveal, LineReveal } from "./Reveal";
import { Eyebrow } from "./ui";
import { scrollToId } from "../lib/scroll";

const FIRES = [
  { n: "01", title: "The Wok", desc: "Chinese & Indo-Chinese — starters, hakka noodles, fried rice and schezwan heat." },
  { n: "02", title: "The Dum Handi", desc: "Biryani sealed and steamed to order — chicken, mutton, egg and paneer." },
  { n: "03", title: "The Tandoor", desc: "Charred kebabs and tikka — full and half portions, veg and non-veg." },
  { n: "04", title: "The Steamer", desc: "Momos, soups and comfort bowls for the lighter craving." },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 overflow-hidden bg-cream py-24 text-charcoal sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Sticky image stack */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal className="relative mx-auto max-w-sm sm:max-w-none">
              <div className="absolute -left-2.5 -top-2.5 sm:-left-4 sm:-top-4 h-full w-full border border-gold/60" aria-hidden />
              <div className="relative overflow-hidden">
                <img
                  src={IMAGES.interior}
                  alt="The warm, amber-lit dining room at Sian Kitchen"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="absolute -bottom-6 -right-1 sm:-bottom-8 sm:-right-8 w-[46%] rotate-[3deg] border-4 sm:border-[6px] border-card shadow-[var(--shadow-lift)] transition-transform duration-500 hover:rotate-0">
                <img
                  src={IMAGES.drums}
                  alt="Crispy glazed Drums of Heaven"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <span className="absolute -top-4 right-4 sm:-top-5 sm:right-6 bg-chilli px-3 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-cream shadow-lg">
                59B · Chowringhee
              </span>
            </Reveal>
          </div>
        </div>

        {/* Copy */}
        <div className="pt-8 lg:col-span-7 lg:pl-10 lg:pt-0">
          <Reveal>
            <Eyebrow>About {SITE.name}</Eyebrow>
          </Reveal>
          <h2 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
            <LineReveal
              lines={[
                "A Place For",
                <span key="i">
                  <em className="text-chilli">Every</em> Craving
                </span>,
              ]}
            />
          </h2>

          <Reveal delay={0.14}>
            <p className="mt-8 max-w-xl font-display text-[1.35rem] italic leading-[1.55] text-ink">
              Between the bustle of Exide More and the calm of Rabindra Sadan, one kitchen answers
              every mood on Chowringhee Road.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-taupe">
              Wok-fired Chinese and Indo-Chinese classics, dum biryanis sealed to order, tandoor-charred
              kebabs and North Indian comfort — everything cooked to order, priced for every day
              (around ₹{SITE.priceForTwo} for two), and served {SITE.hours.label.toLowerCase()} from{" "}
              {SITE.hours.display}. Dine in at Chowringhee, or get it delivered through{" "}
              {SITE.delivery.swiggyLabel}.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <p className="mt-11 text-[11px] font-extrabold uppercase tracking-[0.28em] text-chilli">
              Four fires, one kitchen
            </p>
          </Reveal>
          <div className="mt-4">
            {FIRES.map((fire, i) => (
              <Reveal key={fire.n} delay={0.3 + i * 0.07}>
                <div className="group flex items-baseline gap-5 border-t border-charcoal/12 py-5 transition-all duration-300 last:border-b hover:bg-card hover:pl-3 sm:gap-7">
                  <span className="font-display text-lg italic text-gold">{fire.n}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold leading-tight transition-colors group-hover:text-chilli sm:text-2xl">
                      {fire.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-taupe">{fire.desc}</p>
                  </div>
                  <ArrowRight
                    className="ml-auto h-5 w-5 shrink-0 -translate-x-2 text-chilli opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => scrollToId("menu")}
                className="group inline-flex items-center gap-2 bg-charcoal px-7 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[var(--shadow-lift)]"
              >
                Explore the menu
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </button>
              <a
                href={SITE.delivery.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-taupe transition-colors hover:text-chilli"
              >
                Order on {SITE.delivery.swiggyLabel}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
