import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Menu, X } from "lucide-react";
import { SITE } from "../data/site";
import { scrollToId } from "../lib/scroll";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Visit Us", id: "visit" },
];

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 text-left"
      aria-label="Sian Kitchen — back to top"
    >
      <span className="flex h-10 w-10 items-center justify-center border border-gold/60 bg-charcoal/40 font-display text-xl font-bold italic text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal">
        S
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl font-extrabold tracking-wide text-cream">
          {SITE.wordmark.first}
        </span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-gold">
          {SITE.wordmark.second}
        </span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
    // wait a tick for the drawer to release body scroll
    window.setTimeout(() => scrollToId(id), open ? 60 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/10 bg-charcoal/90 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Wordmark onClick={() => go("home")} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group relative text-[13px] font-semibold uppercase tracking-[0.16em] text-cream/70 transition-colors duration-300 hover:text-cream"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.delivery.swiggyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 bg-chilli px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep sm:inline-flex"
            >
              Order Online
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="noise fixed inset-0 z-40 flex flex-col bg-charcoal px-6 pb-10 pt-28 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="group flex items-baseline gap-4 border-b border-cream/8 py-4 text-left"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-sm italic text-gold/70">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold text-cream transition-colors group-hover:text-gold">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="mt-auto space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <a
                href={SITE.delivery.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-chilli px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-cream"
              >
                Order Online <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
              <div className="flex items-center justify-between text-sm text-cream/60">
                <a href={SITE.phoneHref} className="hover:text-gold">
                  {SITE.phoneDisplay}
                </a>
                <span className="text-gold">{SITE.hours.display}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
