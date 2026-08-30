import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import type { DishType } from "../data/menu";

/* ── Eyebrow label ─────────────────────────────────────────────────────── */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] ${
        tone === "dark" ? "text-chilli" : "text-gold"
      } ${className}`}
    >
      <span className={`h-px w-10 ${tone === "dark" ? "bg-chilli/60" : "bg-gold/60"}`} aria-hidden />
      {children}
    </p>
  );
}

/* ── Section heading with mask reveal ──────────────────────────────────── */
export function SectionHeading({
  eyebrow,
  lines,
  sub,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  lines: ReactNode[];
  sub?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <Reveal>
        <Eyebrow tone={tone} className={centered ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <h2
        className={`mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl ${
          tone === "dark" ? "text-charcoal" : "text-cream"
        }`}
      >
        <MaskLines lines={lines} />
      </h2>
      {sub && (
        <Reveal delay={0.15}>
          <p
            className={`mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${
              tone === "dark" ? "text-taupe" : "text-cream/60"
            } ${centered ? "mx-auto" : ""}`}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

import { motion } from "framer-motion";

function MaskLines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: "112%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, delay: 0.09 * i, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/* ── Indian veg / non-veg mark ─────────────────────────────────────────── */
export function VegMark({ type, size = "md" }: { type: DishType; size?: "sm" | "md" }) {
  const veg = type === "veg";
  const box = size === "sm" ? "h-3.5 w-3.5" : "h-[18px] w-[18px]";
  const dot = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  return (
    <span
      role="img"
      aria-label={veg ? "Vegetarian dish" : "Non-vegetarian dish"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`inline-flex shrink-0 items-center justify-center rounded-[3px] border-2 bg-card ${
        veg ? "border-[#1a7f37]" : "border-chilli"
      } ${box}`}
    >
      <span className={`rounded-full ${veg ? "bg-[#1a7f37]" : "bg-chilli"} ${dot}`} />
    </span>
  );
}

/* ── Quantity stepper ──────────────────────────────────────────────────── */
export function QtyStepper({
  qty,
  onChange,
  compact = false,
  tone = "dark",
}: {
  qty: number;
  onChange: (qty: number) => void;
  compact?: boolean;
  tone?: "dark" | "light";
}) {
  const btn = `flex items-center justify-center font-bold transition-colors duration-200 ${
    compact ? "h-7 w-7 text-sm" : "h-9 w-9 text-base"
  } ${
    tone === "dark"
      ? "text-charcoal hover:bg-charcoal hover:text-cream"
      : "text-cream hover:bg-cream hover:text-charcoal"
  }`;
  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-full border ${
        tone === "dark" ? "border-charcoal/25 bg-card" : "border-cream/30 bg-charcoal/40"
      }`}
      aria-label={`Quantity: ${qty}`}
    >
      <button type="button" className={btn} onClick={() => onChange(qty - 1)} aria-label="Decrease quantity">
        −
      </button>
      <span className={`${compact ? "w-6 text-xs" : "w-8 text-sm"} text-center font-bold tabular-nums`}>
        {qty}
      </span>
      <button type="button" className={btn} onClick={() => onChange(qty + 1)} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}
