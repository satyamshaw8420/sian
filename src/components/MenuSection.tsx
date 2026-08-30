import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  SearchX,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  CATEGORIES,
  DEFAULT_FILTERS,
  MENU,
  filterMenu,
  groupsIn,
  LOGO,
  type CravingTag,
  type MenuFilters,
  type MenuItem,
} from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { inr } from "../lib/format";
import { Reveal } from "./Reveal";

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

/* ── veg mark for paper pages ──────────────────────────────────────────── */
function PaperVegDot({ type }: { type: MenuItem["type"] }) {
  const veg = type === "veg";
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] border-[1.5px] bg-card ${
        veg ? "border-[#1a7f37]" : "border-chilli"
      }`}
    >
      <span className={`h-[7px] w-[7px] rounded-full ${veg ? "bg-[#1a7f37]" : "bg-chilli"}`} />
    </span>
  );
}

/* ── price on paper ────────────────────────────────────────────────────── */
function PaperPrice({ item }: { item: MenuItem }) {
  if (item.price === null) {
    return <span className="text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-taupe">At restaurant</span>;
  }
  if (item.halfPrice !== undefined) {
    return (
      <span className="text-right leading-tight">
        <span className="block font-display text-[16px] font-black text-charcoal">{inr(item.price)}</span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-taupe">H {inr(item.halfPrice)}</span>
      </span>
    );
  }
  return <span className="font-display text-[16px] font-black text-charcoal">{inr(item.price)}</span>;
}

/* ── one dish row on a paper page, with add-to-order controls ─────────── */
function PaperRow({ item }: { item: MenuItem }) {
  const { add, setQty, cart, setSelected } = useOrder();
  const qty = cart[item.id] ?? 0;

  return (
    <div className="group -mx-2 flex items-center gap-2.5 border-b border-charcoal/[0.07] px-2 py-[9px] transition-colors duration-300 last:border-b-0 hover:bg-gold/[0.09] sm:gap-3">
      <button
        type="button"
        onClick={() => setSelected(item)}
        className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
        aria-label={`${item.name}${item.price !== null ? `, ${inr(item.price)}` : ""} — view details`}
      >
        <PaperVegDot type={item.type} />
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="font-display text-[15px] font-bold leading-snug text-charcoal transition-colors duration-300 group-hover:text-chilli-deep sm:text-[15.5px]">
              {item.name}
            </span>
            {item.popular && (
              <span className="inline-flex items-center gap-1 bg-gold/20 px-1.5 py-px text-[8.5px] font-extrabold uppercase tracking-[0.12em] text-[#8a6420]">
                <Star className="h-2.5 w-2.5 fill-[#8a6420]" aria-hidden /> Popular
              </span>
            )}
            {item.isNew && (
              <span className="border border-chilli/60 px-1.5 py-px text-[8.5px] font-extrabold uppercase tracking-[0.12em] text-chilli">
                New
              </span>
            )}
          </span>
          {item.description && (
            <span className="line-clamp-1 block max-w-md text-[11.5px] leading-relaxed text-taupe">{item.description}</span>
          )}
        </span>
      </button>

      <span className="dot-leader-dark hidden sm:block" aria-hidden />

      <span className="shrink-0">
        <PaperPrice item={item} />
      </span>

      <span className="shrink-0">
        {!item.available ? (
          <span className="px-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-charcoal/35">Unavailable</span>
        ) : qty === 0 ? (
          <button
            type="button"
            onClick={() => add(item.id)}
            aria-label={`Add ${item.name} to selection`}
            className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-chilli/70 text-chilli transition-all duration-300 hover:scale-110 hover:bg-chilli hover:text-cream"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <span className="flex items-center overflow-hidden rounded-full border-[1.5px] border-chilli bg-chilli/[0.06]">
            <button
              type="button"
              onClick={() => setQty(item.id, qty - 1)}
              className="flex h-8 w-7 items-center justify-center text-chilli transition-colors hover:bg-chilli hover:text-cream"
              aria-label={`Decrease ${item.name} quantity`}
            >
              −
            </button>
            <span className="w-5 text-center text-[12.5px] font-extrabold tabular-nums text-chilli-deep">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(item.id, qty + 1)}
              className="flex h-8 w-7 items-center justify-center text-chilli transition-colors hover:bg-chilli hover:text-cream"
              aria-label={`Increase ${item.name} quantity`}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </button>
          </span>
        )}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   THE MENU BOOK — one category per spread, flip instead of endless scroll
   ════════════════════════════════════════════════════════════════════════ */
export default function MenuSection({
  filters,
  onChange,
}: {
  filters: MenuFilters;
  onChange: (f: MenuFilters) => void;
}) {
  const isFiltering =
    filters.query.trim() !== "" || filters.type !== "all" || filters.tag !== null;

  const activeCat =
    filters.category !== "All" && CATEGORIES.includes(filters.category)
      ? filters.category
      : CATEGORIES[0];
  const activeIndex = CATEGORIES.indexOf(activeCat);

  /* per-category counts honour veg/non-veg + craving filters */
  const counts = useMemo(() => {
    const base: MenuFilters = { ...DEFAULT_FILTERS, type: filters.type, tag: filters.tag };
    return new Map(CATEGORIES.map((c) => [c, filterMenu({ ...base, category: c }).length]));
  }, [filters.type, filters.tag]);

  /* what the right-hand page shows */
  const pageItems = useMemo(
    () => (isFiltering ? filterMenu(filters) : filterMenu({ ...DEFAULT_FILTERS, category: activeCat })),
    [isFiltering, filters, activeCat]
  );

  const pageGroups = useMemo(() => {
    if (isFiltering) {
      return CATEGORIES.map((cat) => ({
        cat,
        groups: groupsIn(cat, pageItems).map((g) => ({
          group: g,
          items: pageItems.filter((i) => i.category === cat && i.group === g),
        })),
      })).filter((c) => c.groups.length > 0);
    }
    return [{ cat: activeCat, groups: groupsIn(activeCat, pageItems).map((g) => ({ group: g, items: pageItems.filter((i) => i.group === g) })) }];
  }, [isFiltering, pageItems, activeCat]);

  /* page-flip direction */
  const pageKey = isFiltering ? "results" : activeCat;
  const prevKeyRef = useRef(pageKey);
  const dir = useMemo(() => {
    const pi = CATEGORIES.indexOf(prevKeyRef.current);
    const ni = CATEGORIES.indexOf(pageKey);
    if (pi === -1 || ni === -1) return 1;
    return ni >= pi ? 1 : -1;
  }, [pageKey]);
  useEffect(() => {
    prevKeyRef.current = pageKey;
  }, [pageKey]);

  const goto = (cat: string) => onChange({ ...filters, category: cat });
  const gotoIndex = (i: number) => goto(CATEGORIES[(i + CATEGORIES.length) % CATEGORIES.length]);

  const reset = () => onChange({ ...DEFAULT_FILTERS });

  return (
    <section id="menu" className="noise relative scroll-mt-16 overflow-hidden bg-wine-deep py-24 text-cream sm:py-28">
      {/* ambient field */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-24 rounded-full bg-burgundy/60 blur-[130px]" style={{ width: 420, height: 420 }} />
        <div className="absolute -right-40 bottom-24 rounded-full bg-chilli/15 blur-[130px]" style={{ width: 420, height: 420 }} />
        <img src={LOGO} alt="" className="absolute -right-28 -top-28 h-[430px] w-[430px] rounded-full opacity-[0.05]" loading="lazy" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <Reveal className="text-center">
          <p className="flourish-divider mx-auto max-w-md text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
            <span className="px-3">The Menu Book</span>
          </p>
          <h2 className="mt-5 font-display text-5xl font-black text-cream sm:text-6xl lg:text-7xl">
            Our <em className="text-gold">Menu</em>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-display text-lg italic text-cream/60">
            {MENU.length} dishes, one page at a time — pick a chapter, add what tempts you.
          </p>
        </Reveal>

        {/* Controls */}
        <Reveal delay={0.1} className="mt-10 space-y-4">
          <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" aria-hidden />
              <input
                type="search"
                value={filters.query}
                onChange={(e) => onChange({ ...filters, query: e.target.value })}
                placeholder="Search the whole book — “biryani”, “hakka”, “momos”…"
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

          {/* Mobile / tablet chapter rail (the cover TOC covers desktop) */}
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:hidden" role="group" aria-label="Menu chapters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => goto(cat)}
                aria-pressed={!isFiltering && cat === activeCat}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-bold tracking-wide transition-all duration-300 ${
                  !isFiltering && cat === activeCat
                    ? "border-gold bg-gold text-wine-deep shadow-[var(--shadow-gold)]"
                    : "border-cream/15 bg-charcoal/40 text-cream/70 hover:border-gold/60 hover:text-gold"
                }`}
              >
                {cat} <span className="opacity-60">· {counts.get(cat)}</span>
              </button>
            ))}
          </div>

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
              Showing <span className="text-gold">{pageItems.length}</span> of {MENU.length} dishes
            </p>
          </div>
        </Reveal>

        {/* ── The open book ── */}
        <Reveal delay={0.15} className="relative mt-10 [perspective:1600px]">
          {/* stacked page edges behind the spread */}
          <div className="absolute inset-x-3 -bottom-2 h-full rounded-[3px] bg-parchment/25" aria-hidden />
          <div className="absolute inset-x-1.5 -bottom-1 h-full rounded-[3px] bg-parchment/45" aria-hidden />

          <div className="relative grid overflow-hidden rounded-[3px] shadow-[0_45px_90px_-30px_rgba(0,0,0,0.85)] lg:grid-cols-[330px_1fr]">
            {/* ═══ LEFT PAGE · wine-leather cover with table of contents ═══ */}
            <aside className="noise relative hidden flex-col border-r border-black/40 bg-wine-deep p-7 lg:flex" aria-label="Menu chapters">
              <div className="pointer-events-none absolute inset-3 border border-gold/25" aria-hidden />

              <div className="relative flex flex-col items-center pt-2 text-center">
                <span className="flex h-14 w-14 rotate-45 items-center justify-center border border-gold/70">
                  <span className="-rotate-45 font-display text-xl font-black italic text-gold">SK</span>
                </span>
                <p className="mt-4 font-display text-lg font-black tracking-[0.22em] text-cream">SIAN KITCHEN</p>
                <p className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.32em] text-gold/80">The Menu · Kolkata</p>
                <span className="mt-5 h-px w-16 bg-gold/40" aria-hidden />
                <p className="mt-5 text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold">Table of Contents</p>
              </div>

              <nav className="relative mt-4 flex-1" aria-label="Menu categories">
                {CATEGORIES.map((cat, i) => {
                  const active = !isFiltering && cat === activeCat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => goto(cat)}
                      aria-current={active ? "page" : undefined}
                      className={`group flex w-full items-baseline gap-2.5 px-2 py-[7.5px] text-left transition-all duration-300 ${
                        active ? "bg-cream/[0.07]" : "hover:bg-cream/[0.04]"
                      }`}
                    >
                      <span className={`w-5 shrink-0 font-display text-[11px] italic ${active ? "text-gold" : "text-gold/60"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {active && <span className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rotate-45 bg-chilli" aria-hidden />}
                      <span
                        className={`font-display text-[15px] font-bold leading-tight transition-colors duration-300 ${
                          active ? "text-gold" : "text-cream/75 group-hover:text-gold-light"
                        }`}
                      >
                        {cat}
                      </span>
                      <span className="mx-1 flex-1 -translate-y-[3px] border-b border-dotted border-cream/20" aria-hidden />
                      <span className="shrink-0 text-[10.5px] font-bold tabular-nums text-cream/40">{counts.get(cat)}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="relative mt-4 border-t border-gold/20 pt-4 text-center">
                <p className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/50">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-flex h-3 w-3 items-center justify-center rounded-[2px] border bg-card" aria-hidden>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1a7f37]" />
                    </span>
                    Veg
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-flex h-3 w-3 items-center justify-center rounded-[2px] border bg-card" aria-hidden>
                      <span className="h-1.5 w-1.5 rounded-full bg-chilli" />
                    </span>
                    Non-Veg
                  </span>
                </p>
                <p className="mt-1.5 text-[10px] text-cream/35">F = Full · H = Half · Prices in ₹</p>
              </div>
            </aside>

            {/* ═══ RIGHT PAGE · cream paper with the dishes ═══ */}
            <div className="relative min-h-[480px] bg-parchment text-charcoal shadow-[inset_28px_0_34px_-28px_rgba(23,20,18,0.55)]">
              {/* paper corner flourishes */}
              <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-gold/50" aria-hidden />
              <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-gold/50" aria-hidden />
              <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-gold/50" aria-hidden />
              <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-gold/50" aria-hidden />

              {/* flip arrows */}
              <button
                type="button"
                onClick={() => gotoIndex(activeIndex - 1)}
                aria-label="Previous chapter"
                className="absolute left-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-card text-charcoal/60 shadow-sm transition-all duration-300 hover:border-chilli hover:text-chilli lg:flex"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => gotoIndex(activeIndex + 1)}
                aria-label="Next chapter"
                className="absolute right-4 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-card text-charcoal/60 shadow-sm transition-all duration-300 hover:border-chilli hover:text-chilli lg:flex"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>

              <div className="flex h-full flex-col px-6 py-7 sm:px-10 lg:px-14">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={pageKey}
                    className="flex flex-1 flex-col"
                    style={{ transformOrigin: "left center" }}
                    initial={{ opacity: 0, rotateY: dir > 0 ? -13 : 13, x: dir > 0 ? 30 : -30 }}
                    animate={{ opacity: 1, rotateY: 0, x: 0 }}
                    exit={{ opacity: 0, rotateY: dir > 0 ? 9 : -9, x: dir > 0 ? -18 : 18 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* page header */}
                    <header className="border-b border-charcoal/12 pb-4 text-center">
                      {isFiltering ? (
                        <>
                          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.3em] text-chilli">Search &amp; Filters</p>
                          <h3 className="mt-1.5 font-display text-3xl font-black sm:text-4xl">
                            {filters.query ? `“${filters.query.trim()}”` : filters.tag ? TAG_LABEL[filters.tag] : "Filtered"}
                            <span className="text-chilli"> results</span>
                          </h3>
                          <p className="mt-1 text-[12.5px] text-taupe">
                            {pageItems.length} {pageItems.length === 1 ? "dish" : "dishes"} found across the book
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.3em] text-chilli">
                            Chapter {String(activeIndex + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-1.5 font-display text-3xl font-black sm:text-4xl">{activeCat}</h3>
                          <p className="mt-1 text-[12.5px] text-taupe">
                            {pageItems.length} {pageItems.length === 1 ? "dish" : "dishes"} · tap a dish for details, ⊕ to add
                          </p>
                        </>
                      )}
                    </header>

                    {/* page body */}
                    <div className="flex-1 pt-2">
                      {pageGroups.length === 0 ? (
                        <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                          <SearchX className="h-10 w-10 text-charcoal/30" aria-hidden />
                          <p className="mt-4 font-display text-2xl font-bold">Nothing on this page.</p>
                          <p className="mt-1.5 max-w-xs text-sm text-taupe">
                            Try another search, or ask us on WhatsApp — the kitchen loves a custom request.
                          </p>
                          <button
                            type="button"
                            onClick={reset}
                            className="mt-6 bg-chilli px-6 py-3 text-[11.5px] font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-chilli-deep"
                          >
                            Reset the book
                          </button>
                        </div>
                      ) : (
                        pageGroups.map(({ cat, groups }) => (
                          <div key={cat}>
                            {isFiltering && (
                              <div className="mb-1 mt-5 flex items-center gap-3 first:mt-2">
                                <h4 className="font-display text-lg font-black uppercase tracking-[0.14em] text-chilli-deep">{cat}</h4>
                                <span className="h-px flex-1 bg-charcoal/15" aria-hidden />
                              </div>
                            )}
                            {groups.map(({ group, items }) => (
                              <div key={group}>
                                {groups.length > 1 && (
                                  <p className="mb-0.5 mt-4 flex items-center gap-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.24em] text-[#8a6420] first:mt-2">
                                    <span className="inline-block h-1.5 w-1.5 rotate-45 bg-chilli" aria-hidden />
                                    {group}
                                    <span className="h-px flex-1 bg-charcoal/10" aria-hidden />
                                  </p>
                                )}
                                <div>
                                  {items.map((item) => (
                                    <PaperRow key={item.id} item={item} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      )}
                    </div>

                    {/* page footer */}
                    <footer className="mt-6 flex items-center justify-between border-t border-charcoal/12 pt-4">
                      <button
                        type="button"
                        onClick={() => gotoIndex(activeIndex - 1)}
                        className="group inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-charcoal/50 transition-colors hover:text-chilli"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
                        Prev
                      </button>
                      <p className="font-display text-[13px] font-bold italic text-charcoal/55">
                        — {String((isFiltering ? 0 : activeIndex) + 1).padStart(2, "0")} · {CATEGORIES.length} —
                      </p>
                      <button
                        type="button"
                        onClick={() => gotoIndex(activeIndex + 1)}
                        className="group inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-charcoal/50 transition-colors hover:text-chilli"
                      >
                        Next
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                      </button>
                    </footer>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[11.5px] text-cream/40">
            Prices indicative — the restaurant confirms availability &amp; final total when you order. Add dishes, then continue on WhatsApp.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
