import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Full-bleed image break with scroll parallax + an editorial line. */
export default function ParallaxDivider({
  src,
  alt,
  line,
  sub,
}: {
  src: string;
  alt: string;
  line: string;
  sub?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section ref={ref} className="relative h-[54svh] min-h-[380px] overflow-hidden" aria-label={line}>
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 h-[128%] w-full object-cover"
        style={{ y }}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-charcoal/62" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" aria-hidden />

      <div className="relative z-10 flex h-full items-center justify-center px-5">
        <div className="text-center">
          <motion.p
            className="flourish-divider mx-auto max-w-sm text-[10.5px] font-bold uppercase tracking-[0.34em] text-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-3">Sian Kitchen</span>
          </motion.p>
          <motion.p
            className="mt-5 font-display text-4xl font-black italic leading-tight text-cream sm:text-6xl"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.p>
          {sub && (
            <motion.p
              className="mx-auto mt-4 max-w-md text-[13.5px] leading-relaxed text-cream/65"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {sub}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
