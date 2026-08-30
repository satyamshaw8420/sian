import { MENU } from "../data/menu";

function Row({ names, reverse = false, hidden = false }: { names: string[]; reverse?: boolean; hidden?: boolean }) {
  return (
    <div className={`flex shrink-0 items-center ${reverse ? "animate-marquee-rev" : "animate-marquee"}`} aria-hidden={hidden || undefined}>
      {names.map((name, i) => (
        <span key={`${hidden}-${name}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-lg italic text-gold/90 sm:text-xl">{name}</span>
          <svg width="9" height="9" viewBox="0 0 10 10" className="text-chilli" aria-hidden>
            <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Twin marquees of real dish names pulled straight from the menu sheet. */
export default function Ticker() {
  const available = MENU.filter((m) => m.available && m.price !== null);
  const names = available.map((m) => `${m.name} · ₹${m.price}`);
  const half = Math.ceil(names.length / 2);
  const rowA = names.slice(0, half);
  const rowB = names.slice(half);

  return (
    <div className="marquee-mask overflow-hidden border-y border-gold/12 bg-coal py-4" role="presentation">
      <div className="flex w-max items-center gap-2">
        <Row names={rowA} />
        <Row names={rowA} hidden />
        <Row names={rowB} reverse />
        <Row names={rowB} reverse hidden />
      </div>
    </div>
  );
}
