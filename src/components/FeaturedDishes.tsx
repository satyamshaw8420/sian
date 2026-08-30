import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { POPULAR } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { inr } from "../lib/format";
import { scrollToId } from "../lib/scroll";
import { Reveal } from "./Reveal";
import { SectionHeading, VegMark } from "./ui";

export default function FeaturedDishes() {
  const { add, setSelected, cart } = useOrder();
  const dishes = POPULAR.slice(0, 8);

  return (
    <section id="featured" className="noise scroll-mt-20 bg-charcoal py-24 text-cream sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="light"
            eyebrow="Signatures"
            lines={["Worth Coming", <em key="e" className="text-gold">Hungry For</em>]}
          />
          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => scrollToId("menu")}
              className="group inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-[13px] font-bold uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light"
            >
              Full menu
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {dishes.map((dish, i) => (
            <Reveal key={dish.id} delay={(i % 4) * 0.08} as="article" className="group">
              <motion.button
                type="button"
                onClick={() => setSelected(dish)}
                className="relative block w-full overflow-hidden border border-cream/8 bg-coal text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[var(--shadow-lift)]"
                aria-label={`View ${dish.name} — ${inr(dish.price)}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" aria-hidden />

                  {/* index + veg mark */}
                  <div className="absolute left-4 top-4 flex items-center gap-2.5">
                    <span className="font-display text-lg italic text-gold/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <VegMark type={dish.type} size="sm" />
                  </div>

                  {/* meta */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-gold">
                      {dish.category}
                    </p>
                    <div className="mt-1.5 flex items-end justify-between gap-3">
                      <h3 className="font-display text-[1.35rem] font-bold leading-tight text-cream">
                        {dish.name}
                      </h3>
                      <p className="whitespace-nowrap font-display text-lg font-bold text-gold-light">
                        {inr(dish.price)}
                      </p>
                    </div>

                    <span
                      role="button"
                      tabIndex={-1}
                      className={`mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 ${
                        cart[dish.id]
                          ? "bg-gold text-charcoal"
                          : "bg-chilli text-cream group-hover:bg-chilli"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        add(dish.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          add(dish.id);
                        }
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                      {cart[dish.id] ? `Added × ${cart[dish.id]}` : "Add to order"}
                    </span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
