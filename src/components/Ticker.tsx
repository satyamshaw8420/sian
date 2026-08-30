import { MENU } from "../data/menu";

/** Scrolling marquee of dish names — the site's ambient signature motion. */
export default function Ticker() {
  const names = MENU.filter((m) => m.available)
    .slice(0, 14)
    .map((m) => m.name);

  const row = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {names.map((name) => (
        <span key={`${hidden}-${name}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-lg italic text-gold/85 sm:text-xl">
            {name}
          </span>
          <svg width="9" height="9" viewBox="0 0 10 10" className="text-chilli" aria-hidden>
            <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-mask overflow-hidden border-y border-gold/12 bg-coal py-4" role="presentation">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
