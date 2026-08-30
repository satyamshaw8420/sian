import { ArrowUpRight, Star } from "lucide-react";
import { SITE, LINKS } from "../data/site";
import { POPULAR } from "../data/menu";
import { inr } from "../lib/format";
import { scrollToId } from "../lib/scroll";
import { Reveal } from "./Reveal";
import { SectionHeading, VegMark } from "./ui";

function Stars({ value }: { value: number }) {
  const pct = (value / 5) * 100;
  return (
    <div className="relative inline-flex" role="img" aria-label={`Rated ${value} out of 5 stars`}>
      <div className="flex gap-1 text-charcoal/20">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-6 w-6 fill-current" aria-hidden />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <div className="flex gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-6 w-6 shrink-0 fill-current" aria-hidden />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const loved = POPULAR.slice(0, 5);

  return (
    <section id="reviews" className="scroll-mt-20 bg-cream py-24 text-charcoal sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Rating block */}
        <div>
          <SectionHeading eyebrow="Google Reviews" lines={["What Our", <em key="g" className="text-chilli">Guests Say</em>]} />
          <Reveal delay={0.15} className="mt-10 flex items-end gap-6">
            <p className="font-display text-[7rem] font-black leading-[0.8] sm:text-[9rem]">
              {SITE.rating}
            </p>
            <div className="pb-3">
              <Stars value={SITE.rating} />
              <p className="mt-2.5 text-sm font-semibold text-taupe">
                Based on <span className="font-bold text-charcoal">{SITE.reviewCount}+ Google reviews</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-taupe">
              Every review we show lives on our public Google profile — written by real guests,
              unedited and unfiltered. Read them all before you visit.
            </p>
            <a
              href={LINKS.mapsSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 bg-charcoal px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
            >
              Read reviews on Google
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </Reveal>
        </div>

        {/* Most ordered — honest social proof from the live menu */}
        <Reveal delay={0.1} className="relative">
          <div className="absolute -right-3 -top-3 h-full w-full border border-gold/60" aria-hidden />
          <div className="relative border border-charcoal/10 bg-card p-7 shadow-[var(--shadow-card)] sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl font-bold">What people come for</h3>
              <span className="bg-gold/15 px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-gold">
                Most loved
              </span>
            </div>
            <ul className="mt-6 divide-y divide-charcoal/8">
              {loved.map((dish, i) => (
                <li key={dish.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId("menu")}
                    className="group flex w-full items-center gap-4 py-3.5 text-left"
                    aria-label={`See ${dish.name} on the menu`}
                  >
                    <span className="font-display text-sm italic text-gold">0{i + 1}</span>
                    <img
                      src={dish.image}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-sm object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <VegMark type={dish.type} size="sm" />
                        <span className="truncate font-display text-[15.5px] font-bold transition-colors group-hover:text-chilli">
                          {dish.name}
                        </span>
                      </span>
                    </span>
                    <span className="font-display text-[15px] font-bold text-taupe">{inr(dish.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-charcoal/10 pt-4 text-[11.5px] text-taupe">
              Pulled live from the dishes our menu marks as house favourites.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
