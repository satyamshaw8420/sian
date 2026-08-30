import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { SITE } from "../data/site";
import { IMAGES } from "../data/menu";
import { Reveal, LineReveal } from "./Reveal";
import { Eyebrow } from "./ui";
import { scrollToId } from "../lib/scroll";

const STATS = [
  { value: "4", label: "Cuisines under one roof" },
  { value: `₹${SITE.priceForTwo}`, label: "Approximate for two" },
  { value: "11–11", label: "Open every day" },
  { value: `${SITE.rating}★`, label: "Google rating" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-cream py-24 text-charcoal sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Image */}
        <Reveal className="relative lg:col-span-5">
          <div className="absolute -left-4 -top-4 h-full w-full border border-gold/50" aria-hidden />
          <div className="relative overflow-hidden">
            <img
              src={IMAGES.interior}
              alt="The warm, amber-lit dining room at Sian Kitchen"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute -bottom-6 -right-3 flex items-center gap-3 border border-charcoal/10 bg-card px-5 py-4 shadow-[var(--shadow-card)] sm:-right-8">
            <Star className="h-6 w-6 fill-gold text-gold" aria-hidden />
            <div className="leading-tight">
              <p className="font-display text-xl font-bold">
                {SITE.rating} <span className="text-sm font-medium text-taupe">/ 5</span>
              </p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-taupe">
                {SITE.reviewCount}+ Google reviews
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <Eyebrow>About {SITE.name}</Eyebrow>
          </Reveal>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
            <LineReveal lines={["A Place For", <span key="i"><em className="text-chilli">Every</em> Craving</span>]} />
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl text-[15.5px] leading-[1.85] text-ink/85">
              On Chowringhee Road — between the bustle of Exide More and the calm of Rabindra Sadan —
              Sian Kitchen is a kitchen for every mood. Wok-fired Chinese and Indo-Chinese classics,
              dum biryanis sealed and steamed to order, and slow-cooked North Indian comfort food,
              all under one roof.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-4 max-w-xl text-[15.5px] leading-[1.85] text-taupe">
              Everything is cooked to order and priced for every day — around ₹{SITE.priceForTwo} for
              two — and the kitchen runs from {SITE.hours.display}, seven days a week. Dine in at
              Chowringhee, or get it delivered through {SITE.delivery.swiggyLabel}.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-charcoal/12 pt-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-bold text-chilli">{stat.value}</p>
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-taupe">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => scrollToId("menu")}
                className="group inline-flex items-center gap-2 border-b-2 border-chilli pb-1 text-[13px] font-bold uppercase tracking-[0.16em] text-chilli transition-colors hover:text-chilli-deep"
              >
                Explore the menu
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </button>
              <a
                href={SITE.delivery.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-taupe transition-colors hover:text-charcoal"
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
