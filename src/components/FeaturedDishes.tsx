import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import { MENU, POPULAR } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { scrollToId } from "../lib/scroll";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";
import { PriceLabel } from "./MenuRow";

/** Pointer-driven 3D tilt with a travelling gold glare. */
function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 170, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 170, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["-55%", "55%"]);
  const glareY = useTransform(my, [0, 1], ["-55%", "55%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(400px circle at calc(50% + ${x}) calc(50% + ${y}), rgba(242,196,61,0.14), transparent 55%)`
  );

  return (
    <div className="perspective-1200 h-full">
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className={`relative h-full ${className}`}
      >
        {children}
        <motion.span
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
          aria-hidden
        />
      </motion.div>
    </div>
  );
}

export default function FeaturedDishes() {
  const { add, setQty, setSelected, cart } = useOrder();
  const trackRef = useRef<HTMLDivElement>(null);
  const dishes = POPULAR.slice(0, 8);
  const [progress, setProgress] = useState(0);

  /* live drag/swipe progress of the strip */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? Math.min(1, el.scrollLeft / max) : 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * 360, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="featured" className="noise relative scroll-mt-20 overflow-hidden bg-charcoal py-24 text-cream sm:py-32">
      {/* vertical accent — 招牌菜 means “house signature dishes” */}
      <div
        className="pointer-events-none absolute right-7 top-1/2 z-0 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
        aria-hidden
      >
        <span className="h-20 w-px bg-gradient-to-b from-transparent to-gold/60" />
        <p className="font-display text-[2.6rem] font-black leading-[1.45] text-outline-gold [writing-mode:vertical-rl]">
          招牌菜
        </p>
        <span className="h-1.5 w-1.5 rotate-45 bg-chilli" />
        <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-gold/55 [writing-mode:vertical-rl]">
          House Favourites
        </p>
        <span className="h-20 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="From the menu sheet"
            lines={["Worth Coming", <em key="e" className="text-gold">Hungry For</em>]}
            sub="The dishes our menu marks as house favourites — flagged popular by the kitchen itself."
          />
          <Reveal delay={0.2} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll featured dishes left"
              className="hidden h-12 w-12 items-center justify-center border border-cream/20 text-cream transition-all duration-300 hover:border-gold hover:text-gold sm:flex"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll featured dishes right"
              className="hidden h-12 w-12 items-center justify-center border border-cream/20 text-cream transition-all duration-300 hover:border-gold hover:text-gold sm:flex"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToId("menu")}
              className="group inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-[12.5px] font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light"
            >
              Full menu
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </button>
          </Reveal>
        </div>

        {/* Horizontal strip */}
        <Reveal delay={0.15}>
          <div
            ref={trackRef}
            className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {dishes.map((dish, i) => {
              const qty = cart[dish.id] ?? 0;
              return (
                <article key={dish.id} className="group relative w-[76vw] shrink-0 snap-start sm:w-[330px]">
                  <span
                    className="pointer-events-none absolute -top-7 left-2 z-10 font-display text-7xl font-black text-outline-gold sm:text-8xl"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <Tilt>
                    <div className="relative overflow-hidden border border-cream/10 bg-coal transition-all duration-400 group-hover:border-gold/40 group-hover:shadow-[var(--shadow-lift)]">
                      <button
                        type="button"
                        onClick={() => setSelected(dish)}
                        className="block w-full text-left"
                        aria-label={`View ${dish.name}`}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" aria-hidden />
                          <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 bg-charcoal/80 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-gold backdrop-blur">
                            <Star className="h-3 w-3 fill-gold" aria-hidden /> Popular
                          </span>
                        </div>
                        <div className="p-5">
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold/80">
                            {dish.category}
                          </p>
                          <h3 className="mt-1.5 font-display text-[1.35rem] font-bold leading-tight text-cream transition-colors group-hover:text-gold-light">
                            {dish.name}
                          </h3>
                          <div className="mt-3 flex items-end justify-between gap-3 border-t border-cream/8 pt-3">
                            <PriceLabel item={dish} />
                            <span className="text-[10.5px] uppercase tracking-[0.14em] text-cream/40">
                              Tap for details
                            </span>
                          </div>
                        </div>
                      </button>

                      {!dish.available ? (
                        <span className="absolute bottom-5 right-5 text-[10px] font-bold uppercase tracking-[0.12em] text-cream/35">
                          Unavailable
                        </span>
                      ) : qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => add(dish.id)}
                          aria-label={`Add ${dish.name} to selection`}
                          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-chilli text-cream shadow-lg transition-all duration-300 hover:scale-110 hover:bg-chilli-deep group-hover:bg-gold group-hover:text-charcoal"
                        >
                          <Plus className="h-5 w-5" aria-hidden />
                        </button>
                      ) : (
                        <div className="absolute bottom-4 right-4 flex items-center overflow-hidden rounded-full border border-gold/60 bg-charcoal/90 backdrop-blur">
                          <button
                            type="button"
                            onClick={() => setQty(dish.id, qty - 1)}
                            aria-label={`Decrease ${dish.name} quantity`}
                            className="flex h-10 w-8 items-center justify-center text-gold transition-colors hover:bg-gold hover:text-charcoal"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm font-extrabold tabular-nums text-gold-light">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(dish.id, qty + 1)}
                            aria-label={`Increase ${dish.name} quantity`}
                            className="flex h-10 w-8 items-center justify-center text-gold transition-colors hover:bg-gold hover:text-charcoal"
                          >
                            <Plus className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                      )}
                    </div>
                  </Tilt>
                </article>
              );
            })}

            {/* end card */}
            <div className="flex w-[76vw] shrink-0 snap-start flex-col items-start justify-center border border-dashed border-gold/30 p-8 sm:w-[330px]">
              <p className="font-display text-3xl font-bold italic text-gold">…and {MENU.length - dishes.length}+ more</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-cream/55">
                Soups, momos, tandoor, biryani, Indian classics, breads and combos — the full sheet is
                one flip away.
              </p>
              <button
                type="button"
                onClick={() => scrollToId("menu")}
                className="group mt-6 inline-flex items-center gap-2 border-b border-gold/60 pb-1 text-[12px] font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light"
              >
                Browse the full menu
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </button>
            </div>
          </div>
        </Reveal>

        {/* drag / swipe progress bar */}
        <Reveal delay={0.22}>
          <div className="mx-auto mt-7 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.24em] text-cream/45">
              Drag · Swipe
            </span>
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-cream/10" aria-hidden>
              <div
                className="h-full rounded-full bg-gradient-to-r from-chilli via-gold to-gold-bright transition-[width] duration-200 ease-out"
                style={{ width: `${Math.max(7, progress * 100)}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.24em] text-cream/45">
              {String(dishes.length).padStart(2, "0")} / {MENU.length} dishes
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
