import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SITE } from "../data/site";
import { MENU } from "../data/menu";
import { Reveal } from "./Reveal";

function useCountUp(target: number, decimals = 0, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduce, duration]);

  return { ref, text: val.toFixed(decimals) };
}

function Stat({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  sub,
  delay,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  delay: number;
}) {
  const { ref, text } = useCountUp(value, decimals);
  return (
    <Reveal delay={delay} className="relative px-6 py-8 sm:px-8">
      <p className="font-display text-4xl font-black leading-none text-cream sm:text-5xl">
        {prefix}
        <span ref={ref}>{text}</span>
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-3 text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-gold">{label}</p>
      <p className="mt-1 text-[12px] leading-snug text-cream/45">{sub}</p>
    </Reveal>
  );
}

export default function QuickInfo() {
  const dishCount = MENU.length;

  return (
    <section aria-label="Restaurant quick facts" className="relative border-y border-gold/12 bg-coal">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-cream/[0.06] px-5 sm:px-8 lg:grid-cols-5">
        <Stat
          value={SITE.rating}
          decimals={1}
          suffix="★"
          label="Google rating"
          sub={`From ${SITE.reviewCount}+ public reviews`}
          delay={0}
        />
        <Stat
          value={dishCount}
          suffix="+"
          label="Dishes on the menu"
          sub="Chinese, Indian, biryani & more"
          delay={0.07}
        />
        <Stat
          value={SITE.priceForTwo}
          prefix="₹"
          label="Approx. for two"
          sub="Online price positioning"
          delay={0.14}
        />
        <div className="relative border-t border-cream/[0.06] px-6 py-8 sm:px-8 lg:border-t-0">
          <Reveal delay={0.21}>
            <p className="font-display text-4xl font-black leading-none text-cream sm:text-5xl">
              11<span className="text-gold">–</span>11
            </p>
            <p className="mt-3 text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-gold">Open daily</p>
            <p className="mt-1 text-[12px] leading-snug text-cream/45">{SITE.hours.display}</p>
          </Reveal>
        </div>
        <div className="relative border-t border-cream/[0.06] px-6 py-8 sm:px-8 lg:border-t-0">
          <Reveal delay={0.28}>
            <p className="font-display text-4xl font-black leading-none text-cream sm:text-5xl">
              59<span className="text-gold">B</span>
            </p>
            <p className="mt-3 text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-gold">Chowringhee Rd</p>
            <p className="mt-1 text-[12px] leading-snug text-cream/45">Exide More · Rabindra Sadan</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
