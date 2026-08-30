import { Clock, Flame, MapPin, Soup, Star } from "lucide-react";
import { SITE } from "../data/site";
import { Reveal } from "./Reveal";

const FACTS = [
  {
    icon: Star,
    title: `${SITE.rating} Google Rating`,
    sub: `${SITE.reviewCount}+ reviews`,
  },
  {
    icon: Flame,
    title: "Chinese & Indo-Chinese",
    sub: "Wok-fired favourites",
  },
  {
    icon: Soup,
    title: "Indian & Biryani",
    sub: "Dum biryani & slow curries",
  },
  {
    icon: MapPin,
    title: "Exide More / Chowringhee",
    sub: "Near Rabindra Sadan",
  },
  {
    icon: Clock,
    title: SITE.hours.label,
    sub: SITE.hours.display,
  },
];

export default function QuickInfo() {
  return (
    <section aria-label="Restaurant quick facts" className="border-b border-gold/10 bg-charcoal">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-cream/6 px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-5">
        {FACTS.map((fact, i) => (
          <Reveal
            key={fact.title}
            delay={i * 0.06}
            className={`flex items-center gap-3.5 px-4 py-6 first:pl-0 sm:px-6 ${
              i >= 3 ? "border-t border-cream/6 lg:border-t-0" : ""
            } ${i === 2 ? "border-t border-cream/6 sm:border-t-0" : ""}`}
          >
            <fact.icon className="h-5 w-5 shrink-0 text-gold" aria-hidden />
            <div className="leading-tight">
              <p className="text-[13px] font-bold text-cream">{fact.title}</p>
              <p className="mt-0.5 text-[11.5px] text-taupe">{fact.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
