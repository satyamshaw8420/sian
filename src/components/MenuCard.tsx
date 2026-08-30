import { Plus } from "lucide-react";
import type { MenuItem } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { inr } from "../lib/format";
import { QtyStepper, VegMark } from "./ui";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { add, setQty, cart, setSelected } = useOrder();
  const qty = cart[item.id] ?? 0;
  const soldOut = !item.available;

  return (
    <article
      className={`group flex cursor-pointer flex-col overflow-hidden border border-charcoal/10 bg-card transition-all duration-300 sm:flex-col ${
        soldOut
          ? "opacity-75"
          : "hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[var(--shadow-lift)]"
      }`}
      onClick={() => setSelected(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setSelected(item);
      }}
      tabIndex={0}
      aria-label={`${item.name}, ${inr(item.price)}, ${item.type === "veg" ? "vegetarian" : "non-vegetarian"}${
        soldOut ? ", unavailable today" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden sm:h-auto sm:w-full sm:aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] ${
            soldOut ? "grayscale" : ""
          }`}
        />
        {item.popular && !soldOut && (
          <span className="absolute left-2.5 top-2.5 bg-gold px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-charcoal">
            Popular
          </span>
        )}
        {soldOut && (
          <span className="absolute left-2.5 top-2.5 bg-charcoal/85 px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-cream">
            Unavailable today
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <VegMark type={item.type} />
            <h3 className="font-display text-[1.05rem] font-bold leading-snug text-charcoal transition-colors duration-300 group-hover:text-chilli">
              {item.name}
            </h3>
          </div>
        </div>

        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-taupe sm:line-clamp-2">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3.5">
          <p className="font-display text-lg font-bold text-charcoal">{inr(item.price)}</p>

          {soldOut ? (
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-taupe">
              Ask on WhatsApp
            </span>
          ) : qty === 0 ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-chilli px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep hover:shadow-[0_10px_20px_-8px_rgba(183,53,40,0.6)]"
              onClick={(e) => {
                e.stopPropagation();
                add(item.id);
              }}
              aria-label={`Add ${item.name} to your selection`}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden /> Add
            </button>
          ) : (
            <div onClick={(e) => e.stopPropagation()}>
              <QtyStepper compact qty={qty} onChange={(q) => setQty(item.id, q)} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
