import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  DEFAULT_FILTERS,
  MENU,
  filterMenu,
  type CravingTag,
  type MenuFilters,
} from "../data/menu";
import { scrollToId } from "../lib/scroll";
import { Reveal, LineReveal } from "./Reveal";
import { Eyebrow } from "./ui";

const CRAVINGS: Array<{ key: string; label: string; filters: Partial<MenuFilters> }> = [
  { key: "spicy", label: "Spicy", filters: { tag: "spicy" as CravingTag } },
  { key: "crispy", label: "Something Crispy", filters: { tag: "crispy" as CravingTag } },
  { key: "noodles", label: "Noodles", filters: { tag: "noodles" as CravingTag } },
  { key: "rice", label: "Rice", filters: { tag: "rice" as CravingTag } },
  { key: "chicken", label: "Chicken", filters: { tag: "chicken" as CravingTag } },
  { key: "veg", label: "Vegetarian", filters: { type: "veg", tag: null } },
];

export default function CravingFilter({
  filters,
  onChange,
}: {
  filters: MenuFilters;
  onChange: (f: MenuFilters) => void;
}) {
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of CRAVINGS) {
      map.set(
        c.key,
        filterMenu({ ...DEFAULT_FILTERS, ...c.filters }).length
      );
    }
    return map;
  }, []);

  const pick = (partial: Partial<MenuFilters>) => {
    onChange({ ...DEFAULT_FILTERS, ...partial });
    scrollToId("menu");
  };

  const isActive = (c: (typeof CRAVINGS)[number]) =>
    c.key === "veg" ? filters.type === "veg" && !filters.tag : filters.tag === c.filters.tag;

  const active = CRAVINGS.find(isActive);

  return (
    <section id="craving" className="scroll-mt-20 overflow-hidden bg-sand py-24 text-charcoal sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Sticky intro */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>Can't decide?</Eyebrow>
            </Reveal>
            <h2 className="mt-5 font-display text-5xl font-bold leading-[1.02] sm:text-6xl">
              <LineReveal
                lines={[
                  "What are",
                  "you",
                  <em key="c" className="text-chilli">craving?</em>,
                ]}
              />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-taupe">
                Pick a mood and the menu below reshapes itself around it — dishes, counts and all.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <p
                className={`mt-8 inline-flex items-center gap-2.5 border px-4 py-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active ? "border-chilli bg-chilli text-cream" : "border-charcoal/20 text-taupe"
                }`}
                aria-live="polite"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-cream" : "bg-chilli"}`} aria-hidden />
                {active
                  ? `Showing ${active.label} · ${counts.get(active.key)} dishes`
                  : `All ${MENU.length} dishes live on the menu`}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Typographic mood rows */}
        <div className="lg:col-span-8">
          {CRAVINGS.map((c, i) => {
            const activeRow = isActive(c);
            return (
              <Reveal key={c.key} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => pick(c.filters)}
                  aria-pressed={activeRow}
                  className={`group flex w-full items-center gap-5 border-t border-charcoal/15 px-2 py-6 text-left transition-all duration-400 last:border-b hover:bg-charcoal hover:pl-5 sm:gap-8 sm:px-4 sm:py-7 ${
                    activeRow ? "bg-charcoal pl-5" : ""
                  }`}
                >
                  <span
                    className={`font-display text-sm italic transition-colors duration-300 ${
                      activeRow ? "text-gold" : "text-chilli/70 group-hover:text-gold"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`font-display text-3xl font-bold leading-none transition-colors duration-300 sm:text-5xl ${
                      activeRow ? "text-cream" : "text-charcoal group-hover:text-cream"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span
                    className={`ml-auto hidden text-[11px] font-extrabold uppercase tracking-[0.18em] sm:block ${
                      activeRow ? "text-gold" : "text-taupe group-hover:text-cream/50"
                    }`}
                  >
                    {counts.get(c.key)} dishes
                  </span>
                  <ArrowUpRight
                    className={`h-6 w-6 shrink-0 transition-all duration-300 sm:h-8 sm:w-8 ${
                      activeRow
                        ? "text-gold"
                        : "text-charcoal/30 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                    }`}
                    aria-hidden
                  />
                </button>
              </Reveal>
            );
          })}
          <p className="mt-6 text-[12.5px] text-taupe">
            Counts update automatically as the menu sheet changes — nothing here is hardcoded.
          </p>
        </div>
      </div>
    </section>
  );
}
