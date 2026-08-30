import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SearchX, UtensilsCrossed, X } from "lucide-react";
import {
  CATEGORIES,
  MENU,
  filterMenu,
  groupsIn,
  LOGO,
  type CravingTag,
  type MenuFilters,
} from "../data/menu";
import { Reveal } from "./Reveal";
import MenuRow from "./MenuRow";

const TAG_LABEL: Record<CravingTag, string> = {
  spicy: "Spicy",
  crispy: "Crispy",
  noodles: "Noodles",
  rice: "Rice",
  chicken: "Chicken",
  prawn: "Fish & Prawn",
  mutton: "Mutton",
  tandoor: "Tandoor",
  momos: "Momos",
};

const TYPE_OPTIONS: Array<{ key: MenuFilters["type"]; label: string }> = [
  { key: "all", label: "All" },
  { key: "veg", label: "Veg" },
  { key: "non-veg", label: "Non-Veg" },
];

export default function MenuSection({
  filters,
  onChange,
}: {
  filters: MenuFilters;
  onChange: (f: MenuFilters) => void;
}) {
  const results = useMemo(() => filterMenu(filters), [filters]);

  /* group results for the menu-card layout */
  const grouped = useMemo(() => {
    const cats = filters.category === "All" ? CATEGORIES : [filters.category];
    return cats
      .map((cat) => ({
        cat,
        groups: groupsIn(cat, results).map((g) => ({
          group: g,
          items: results.filter((i) => i.category === cat && i.group === g),
        })),
      }))
      .filter((c) => c.groups.length > 0);
  }, [filters.category, results]);

  const reset = () => onChange({ category: "All", type: "all", query: "", tag: null });

  return (
    <section id="menu" className="noise relative scroll-mt-16 overflow-hidden bg-wine-deep py-24 text-cream sm:py-32">
      {/* ambient glows + emblem watermark */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-24 h-105 w-105 rounded-full bg-burgundy/60 blur-[130px]" style={{ width: 420, height: 420 }} />
        <div className="absolute -right-40 bottom-24 rounded-full bg-chilli/15 blur-[130px]" style={{ width: 420, height: 420 }} />
        <img
          src={LOGO}
          alt=""
          className="absolute -right-28 -top-28 h-[430px] w-[430px] rounded-full opacity-[0.05]"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <Reveal className="text-center">
          <p className="flourish-divider mx-auto max-w-md text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
            <span className="px-3">The Menu</span>
          </p>
          <h2 className="mt-5 font-display text-5xl font-black text-cream sm:text-6xl lg:text-7xl">
            Our <em className="text-gold">Menu</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-display text-lg italic text-cream/60">
            Something for every craving — {MENU.length} dishes, cooked to order.
          </p>
        </Reveal>

        {/* Controls */}
        <Reveal delay={0.1} className="mt-12 space-y-5">
          <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" aria-hidden />
              <input
                type="search"
                value={filters.query}
                onChange={(e) => onChange({ ...filters, query: e.target.value })}
                placeholder="Search — “biryani”, “hakka”, “momos”…"
                aria-label="Search the menu"
                className="w-full border border-gold/25 bg-charcoal/50 py-3.5 pl-11 pr-10 text-sm text-cream placeholder:text-cream/35 backdrop-blur transition-colors focus:border-gold focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, query: "" })}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-cream/50 hover:text-gold"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </label>

            <div
              className="inline-flex w-fit items-center rounded-full border border-gold/25 bg-charcoal/50 p-1 backdrop-blur"
              role="group"
              aria-label="Filter by food type"
            >
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onChange({ ...filters, type: opt.key })}
                  aria-pressed={filters.type === opt.key}
                  className={`rounded-full px-4 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                    filters.type === opt.key
                      ? opt.key === "veg"
                        ? "bg-[#1a7f37] text-cream"
                        : opt.key === "non-veg"
                          ? "bg-chilli text-cream"
                          : "bg-gold text-wine-deep"
                      : "text-cream/60 hover:text-gold"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category tabs */}
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onChange({ ...filters, category: cat })}
                aria-pressed={filters.category === cat}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-bold tracking-wide transition-all duration-300 ${
                  filters.category === cat
                    ? "border-gold bg-gold text-wine-deep shadow-[var(--shadow-gold)]"
                    : "border-cream/15 bg-charcoal/40 text-cream/70 hover:border-gold/60 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active craving chip + count */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.tag && (
              <button
                type="button"
                onClick={() => onChange({ ...filters, tag: null })}
                className="inline-flex items-center gap-2 rounded-full bg-chilli px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-chilli-deep"
                aria-label={`Clear craving filter: ${TAG_LABEL[filters.tag]}`}
              >
                <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />
                Craving: {TAG_LABEL[filters.tag]}
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-cream/45">
              Showing <span className="text-gold">{results.length}</span> of {MENU.length} dishes
            </p>
          </div>
        </Reveal>

        {/* Grouped menu card */}
        {grouped.length > 0 ? (
          <motion.div layout className="mt-10 border border-gold/20 bg-charcoal/35 p-3 backdrop-blur-sm sm:p-7">
            <AnimatePresence mode="popLayout">
              {grouped.map(({ cat, groups }) => (
                <motion.div
                  layout
                  key={cat}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {filters.category === "All" && (
                    <div className="mt-6 mb-2 flex items-center gap-4 first:mt-0">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" aria-hidden />
                      <h3 className="font-display text-xl font-black uppercase tracking-[0.18em] text-gold sm:text-2xl">
                        {cat}
                      </h3>
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" aria-hidden />
                    </div>
                  )}

                  {groups.map(({ group, items }) => (
                    <div key={group} className="mb-4">
                      {groups.length > 1 && (
                        <p className="mb-1 mt-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-gold/75 first:mt-2">
                          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-chilli" aria-hidden />
                          {group}
                          <span className="h-px flex-1 bg-cream/8" aria-hidden />
                        </p>
                      )}
                      <div>
                        {items.map((item, i) => (
                          <MenuRow key={item.id} item={item} index={i} />
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-10 flex flex-col items-center border border-dashed border-gold/25 bg-charcoal/30 px-6 py-16 text-center">
            <SearchX className="h-10 w-10 text-gold/60" aria-hidden />
            <p className="mt-4 font-display text-2xl font-bold">Nothing matches that craving.</p>
            <p className="mt-1.5 max-w-sm text-sm text-cream/55">
              Try a different search — or ask us on WhatsApp, the kitchen loves a custom request.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 bg-chilli px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-chilli-deep"
            >
              Reset filters
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-[12px] text-cream/40">
          Prices are as printed on our menu and may change. <span className="text-gold/70">F = Full · H = Half.</span>{" "}
          Availability is confirmed by the restaurant when you order.
        </p>
      </div>
    </section>
  );
}
