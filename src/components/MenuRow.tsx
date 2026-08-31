import { Plus, Star } from "lucide-react";
import type { MenuItem } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { inr } from "../lib/format";

export function PriceLabel({ item, className = "" }: { item: MenuItem; className?: string }) {
  if (item.price === null) {
    return (
      <span className={`text-[12px] font-bold uppercase tracking-[0.1em] text-cream/45 ${className}`}>
        At restaurant
      </span>
    );
  }
  if (item.halfPrice !== undefined) {
    return (
      <span className={`text-right leading-tight ${className}`}>
        <span className="block font-display text-lg font-bold text-gold-light">{inr(item.price)}</span>
        <span className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-cream/50">
          Half {inr(item.halfPrice)}
        </span>
      </span>
    );
  }
  return <span className={`font-display text-lg font-bold text-gold-light ${className}`}>{inr(item.price)}</span>;
}

function VegDot({ type }: { type: MenuItem["type"] }) {
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

/** One dish row — veg mark, name, dotted leader, price, add control. */
export default function MenuRow({ item, index }: { item: MenuItem; index: number }) {
  const { add, setQty, cart, setSelected } = useOrder();
  const qty = cart[item.id] ?? 0;

  return (
    <div
      className="group flex items-center gap-3 border-b border-cream/[0.06] px-2 py-3 transition-colors duration-300 hover:bg-cream/[0.045] sm:gap-4 sm:px-3"
      style={{ transitionDelay: `${Math.min(index, 8) * 12}ms` }}
    >
      <button
        type="button"
        onClick={() => setSelected(item)}
        className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-sm border border-gold/25 transition-colors duration-300 group-hover:border-gold/70"
        aria-label={`View details for ${item.name}`}
      >
        <img
          src={item.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </button>

      <button
        type="button"
        onClick={() => setSelected(item)}
        className="min-w-0 flex-1 text-left"
        aria-label={`${item.name}${item.price !== null ? `, ${inr(item.price)}` : ""} — view details`}
      >
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <VegDot type={item.type} />
          <span className="font-display text-[16px] font-bold leading-snug text-cream transition-colors duration-300 group-hover:text-gold-light sm:text-[17px]">
            {item.name}
          </span>
          {item.popular && (
            <span className="inline-flex items-center gap-1 rounded-sm bg-gold/15 px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-gold">
              <Star className="h-2.5 w-2.5 fill-gold" aria-hidden /> Popular
            </span>
          )}
          {item.isNew && (
            <span className="rounded-sm border border-chilli/70 px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-chilli">
              New
            </span>
          )}
        </span>
        {item.description && (
          <span className="mt-1 line-clamp-1 block max-w-xl text-[12px] leading-relaxed text-cream/45">
            {item.description}
          </span>
        )}
      </button>

      <span className="dot-leader hidden md:block" aria-hidden />

      <div className="shrink-0">
        <PriceLabel item={item} />
      </div>

      <div className="shrink-0">
        {!item.available ? (
          <span className="px-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-cream/35">
            Unavailable
          </span>
        ) : qty === 0 ? (
          <button
            type="button"
            onClick={() => add(item.id)}
            aria-label={`Add ${item.name} to selection`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 text-gold transition-all duration-300 hover:scale-110 hover:border-gold hover:bg-gold hover:text-wine-deep group-hover:border-gold/80"
          >
            <Plus className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <div className="flex items-center overflow-hidden rounded-full border border-gold/50 bg-gold/10">
            <button
              type="button"
              onClick={() => setQty(item.id, qty - 1)}
              className="flex h-9 w-8 items-center justify-center text-gold transition-colors hover:bg-gold hover:text-wine-deep"
              aria-label={`Decrease ${item.name} quantity`}
            >
              −
            </button>
            <span className="w-6 text-center text-[13px] font-extrabold tabular-nums text-gold-light">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(item.id, qty + 1)}
              className="flex h-9 w-8 items-center justify-center text-gold transition-colors hover:bg-gold hover:text-wine-deep"
              aria-label={`Increase ${item.name} quantity`}
            >
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
