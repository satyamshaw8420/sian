import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SearchX, X } from "lucide-react";
import {
  CATEGORIES,
  MENU,
  filterMenu,
  type MenuFilters,
  type CravingTag,
} from "../data/menu";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";
import MenuCard from "./MenuCard";

const TAG_LABEL: Record<CravingTag, string> = {
  spicy: "Spicy",
  crispy: "Something Crispy",
  noodles: "Noodles",
  rice: "Rice",
  chicken: "Chicken",
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

  const reset = () =>
    onChange({ category: "All", type: "all", query: "", tag: null });

  return (
    <section id="menu" className="scroll-mt-16 bg-cream py-24 text-charcoal sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Menu"
          lines={["Our Menu"]}
          sub="Something for every craving."
        />

        {/* Filters */}
        <Reveal delay={0.1} className="mt-10 space-y-4">
          <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <label className="relative block w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" aria-hidden />
              <input
                type="search"
                value={filters.query}
                onChange={(e) => onChange({ ...filters, query: e.target.value })}
                placeholder="Search dishes — try “biryani” or “hakka”"
                aria-label="Search the menu"
                className="w-full border border-charcoal/15 bg-card py-3 pl-11 pr-10 text-sm text-charcoal placeholder:text-taupe/80 focus:border-chilli focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => onChange({ ...filters, query: "" })}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-taupe hover:text-chilli"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </label>

            {/* Veg / Non-veg toggle */}
            <div
              className="inline-flex w-fit items-center rounded-full border border-charcoal/15 bg-card p-1"
              role="group"
              aria-label="Filter by food type"
            >
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onChange({ ...filters, type: opt.key })}
                  aria-pressed={filters.type === opt.key}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                    filters.type === opt.key
                      ? opt.key === "veg"
                        ? "bg-[#1a7f37] text-cream"
                        : opt.key === "non-veg"
                          ? "bg-chilli text-cream"
                          : "bg-charcoal text-cream"
                      : "text-taupe hover:text-charcoal"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category tabs */}
          <div
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
            aria-label="Menu categories"
          >
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={filters.category === cat}
                onClick={() => onChange({ ...filters, category: cat })}
                className={`whitespace-nowrap rounded-full border px-4.5 py-2 text-[12.5px] font-bold tracking-wide transition-all duration-300 ${
                  filters.category === cat
                    ? "border-chilli bg-chilli text-cream shadow-[0_8px_20px_-8px_rgba(183,53,40,0.6)]"
                    : "border-charcoal/15 bg-card text-ink hover:border-chilli/50 hover:text-chilli"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active craving + count */}
          <div className="flex flex-wrap items-center gap-3">
            {filters.tag && (
              <button
                type="button"
                onClick={() => onChange({ ...filters, tag: null })}
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-gold transition-colors hover:bg-ink"
                aria-label={`Clear craving filter: ${TAG_LABEL[filters.tag]}`}
              >
                Craving: {TAG_LABEL[filters.tag]}
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
            <p className="text-[12.5px] font-semibold text-taupe">
              Showing <span className="text-charcoal">{results.length}</span> of {MENU.length} dishes
            </p>
          </div>
        </Reveal>

        {/* Grid */}
        {results.length > 0 ? (
          <motion.div layout className="mt-8 grid grid-cols-1 gap-4 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {results.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-12 flex flex-col items-center border border-dashed border-charcoal/20 bg-card px-6 py-16 text-center">
            <SearchX className="h-10 w-10 text-taupe" aria-hidden />
            <p className="mt-4 font-display text-2xl font-bold">Nothing matches that craving.</p>
            <p className="mt-1.5 max-w-sm text-sm text-taupe">
              Try a different search, or ask us directly — the kitchen loves a custom request.
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

        <p className="mt-8 text-center text-[12px] text-taupe">
          Prices are indicative and may change. Availability is confirmed by the restaurant when you order.
        </p>
      </div>
    </section>
  );
}
