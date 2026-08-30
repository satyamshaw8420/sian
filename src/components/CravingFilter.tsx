import { Drumstick, Flame, Leaf, Sparkles, UtensilsCrossed, Wheat } from "lucide-react";
import { DEFAULT_FILTERS, type CravingTag, type MenuFilters } from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

const CRAVINGS: Array<{
  key: string;
  label: string;
  icon: typeof Flame;
  filters: Partial<MenuFilters>;
}> = [
  { key: "spicy", label: "Spicy", icon: Flame, filters: { tag: "spicy" as CravingTag } },
  { key: "crispy", label: "Something Crispy", icon: Sparkles, filters: { tag: "crispy" as CravingTag } },
  { key: "noodles", label: "Noodles", icon: UtensilsCrossed, filters: { tag: "noodles" as CravingTag } },
  { key: "rice", label: "Rice", icon: Wheat, filters: { tag: "rice" as CravingTag } },
  { key: "chicken", label: "Chicken", icon: Drumstick, filters: { tag: "chicken" as CravingTag } },
  { key: "veg", label: "Vegetarian", icon: Leaf, filters: { type: "veg", tag: null } },
];

export default function CravingFilter({
  filters,
  onChange,
}: {
  filters: MenuFilters;
  onChange: (f: MenuFilters) => void;
}) {
  const pick = (partial: Partial<MenuFilters>) => {
    onChange({
      ...DEFAULT_FILTERS,
      ...partial,
    });
    scrollToId("menu");
  };

  const isActive = (c: (typeof CRAVINGS)[number]) =>
    c.key === "veg" ? filters.type === "veg" && !filters.tag : filters.tag === c.filters.tag;

  return (
    <section id="craving" className="scroll-mt-20 border-b border-charcoal/8 bg-sand py-24 text-charcoal sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Can't decide?"
            lines={["What are you", <em key="c" className="text-chilli">craving?</em>]}
            sub="Pick a mood — we'll filter the menu for you."
          />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-6">
          {CRAVINGS.map((c, i) => {
            const active = isActive(c);
            return (
              <Reveal key={c.key} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => pick(c.filters)}
                  aria-pressed={active}
                  className={`group flex w-full flex-col items-start gap-5 border px-5 py-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] ${
                    active
                      ? "border-charcoal bg-charcoal text-cream"
                      : "border-charcoal/15 bg-card hover:border-chilli/50"
                  }`}
                >
                  <c.icon
                    className={`h-6 w-6 transition-colors duration-300 ${
                      active ? "text-gold" : "text-chilli group-hover:text-chilli-deep"
                    }`}
                    aria-hidden
                  />
                  <span
                    className={`font-display text-lg font-bold leading-tight ${
                      active ? "text-cream" : "text-charcoal"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span
                    className={`text-[10.5px] font-bold uppercase tracking-[0.18em] ${
                      active ? "text-gold" : "text-taupe"
                    }`}
                  >
                    {active ? "Showing ↓" : "Tap to filter"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
