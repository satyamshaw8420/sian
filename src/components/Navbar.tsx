import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ExternalLink, ShoppingBag, X } from "lucide-react";
import { SITE } from "../data/site";
import { LOGO } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { scrollToId } from "../lib/scroll";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Visit Us", id: "visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setDrawerOpen } = useOrder();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 150 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/10 bg-charcoal/85 py-2.5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        {/* reading progress */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-chilli via-gold to-gold-light"
          aria-hidden
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Brand */}
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex items-center gap-3 text-left"
            aria-label={`${SITE.name} — back to top`}
          >
            <img
              src={LOGO}
              alt="Sian Kitchen emblem"
              className={`rounded-full object-cover shadow-[0_0_0_1.5px_rgba(201,154,82,0.55),0_6px_18px_-6px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:rotate-[8deg] ${
                scrolled ? "h-10 w-10 sm:h-11 sm:w-11" : "h-11 w-11 sm:h-12 sm:w-12"
              }`}
            />
            <span className="leading-none">
              <span className="block font-display text-lg font-black tracking-[0.08em] text-cream sm:text-xl">
                SIAN
              </span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.42em] text-gold">
                Kitchen
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group relative text-[12.5px] font-bold uppercase tracking-[0.16em] text-cream/75 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" aria-hidden />
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative hidden h-11 w-11 items-center justify-center border border-cream/20 text-cream transition-all duration-300 hover:border-gold hover:text-gold sm:flex"
              aria-label={`Open your selection (${count} items)`}
            >
              <ShoppingBag className="h-4.5 w-4.5" aria-hidden />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-chilli px-1 text-[10.5px] font-extrabold text-cream">
                  {count}
                </span>
              )}
            </button>
            <a
              href={SITE.delivery.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 bg-chilli px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep hover:shadow-[0_14px_30px_-10px_rgba(183,53,40,0.6)] lg:inline-flex"
            >
              Order Online <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-cream/20 text-cream transition-colors hover:border-gold lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <span className="block h-[2px] w-5 bg-current" />
              <span className="block h-[2px] w-3.5 self-end bg-gold" style={{ marginRight: "9px" }} />
              <span className="block h-[2px] w-5 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="noise fixed inset-0 z-[100] flex flex-col bg-wine-deep text-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="relative z-10 flex items-center justify-between px-5 py-5">
              <div className="flex items-center gap-3">
                <img src={LOGO} alt="" className="h-11 w-11 rounded-full object-cover shadow-[0_0_0_1.5px_rgba(201,154,82,0.55)]" />
                <span className="font-display text-lg font-black tracking-[0.08em]">SIAN</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center border border-cream/20 transition-colors hover:border-gold hover:text-gold"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav className="relative z-10 mt-4 flex flex-1 flex-col gap-1 overflow-y-auto px-8" aria-label="Mobile">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="group flex items-baseline gap-4 border-b border-cream/8 py-4 text-left"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-sm italic text-gold/70">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold text-cream transition-colors group-hover:text-gold sm:text-4xl">
                    {link.label}
                  </span>
                </motion.button>
              ))}

              <motion.div
                className="mt-8 flex flex-col gap-3 pb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <a
                  href={SITE.delivery.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-chilli px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-cream"
                >
                  Order Online <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(() => setDrawerOpen(true), 200);
                  }}
                  className="flex items-center justify-center gap-2 border border-gold/50 px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-gold"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden />
                  Your Selection {count > 0 && `(${count})`}
                </button>
                <p className="mt-2 text-center text-[11px] text-cream/40">
                  {SITE.address.line1} · {SITE.phoneDisplay}
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
