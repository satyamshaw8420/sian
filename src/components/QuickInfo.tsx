import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { MENU } from "../data/menu";
import { SITE } from "../data/site";

function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const text = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: <CountUp to={SITE.rating} decimals={1} suffix="★" />,
    label: "Google rating",
    sub: `${SITE.reviewCount}+ reviews`,
  },
  {
    value: <CountUp to={MENU.length} suffix="+" />,
    label: "Dishes on the sheet",
    sub: "Wok · tandoor · dum · steamer",
  },
  {
    value: <CountUp to={SITE.priceForTwo} prefix="₹" />,
    label: "Approx. for two",
    sub: "Everyday-friendly pricing",
  },
  {
    value: <>11–11</>,
    label: SITE.hours.label,
    sub: SITE.hours.display,
  },
  {
    value: <>59B</>,
    label: "Chowringhee Road",
    sub: "Exide More, Kolkata",
  },
];

export default function QuickInfo() {
  return (
    <section aria-label="Restaurant quick facts" className="border-b border-gold/10 bg-charcoal">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-cream/6 px-5 sm:grid-cols-3 sm:px-8 lg:grid-cols-5">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`group px-4 py-7 transition-colors duration-300 hover:bg-cream/[0.03] sm:px-6 ${
              i >= 3 ? "border-t border-cream/6 lg:border-t-0" : ""
            } ${i === 2 ? "border-t border-cream/6 sm:border-t-0" : ""}`}
          >
            <p className="font-display text-3xl font-black text-gold-light transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-cream">{stat.label}</p>
            <p className="mt-0.5 text-[11.5px] text-taupe">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
