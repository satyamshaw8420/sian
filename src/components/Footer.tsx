import { Link } from "react-router-dom";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "../data/site";
import { LOGO } from "../data/menu";
import { openWhatsApp } from "../lib/whatsapp";
import { scrollToId } from "../lib/scroll";

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "visit" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="noise relative overflow-hidden border-t border-gold/10 bg-charcoal text-cream">
      {/* Catchphrase strip — bridges the CTA and the footer */}
      <div className="marquee-mask relative z-10 overflow-hidden border-y border-gold/20 bg-coal py-6" role="presentation">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1 || undefined}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="whitespace-nowrap px-6 font-display text-2xl font-bold leading-none sm:text-4xl">
                    <span className="italic text-gold">Good food doesn't wait</span>
                    <span className="mx-4 text-chilli">—</span>
                    <span className="text-outline-cream">neither should you</span>
                  </span>
                  <svg width="11" height="11" viewBox="0 0 10 10" className="mx-7 shrink-0 text-chilli" aria-hidden>
                    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO}
                alt="Sian Kitchen emblem"
                className="h-13 w-13 rounded-full object-cover shadow-[0_0_0_1.5px_rgba(201,154,82,0.55)]"
                style={{ height: 52, width: 52 }}
              />
              <span className="leading-none">
                <span className="block font-display text-2xl font-black tracking-[0.08em]">SIAN</span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.42em] text-gold">Kitchen</span>
              </span>
            </div>
            <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream/60">
              {SITE.cuisines.join(" • ")}
            </p>
            <p className="mt-4 max-w-xs font-display text-lg italic text-cream/70">“{SITE.tagline}”</p>
            <p className="mt-5 inline-flex items-center gap-2 border border-gold/25 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
              {SITE.hours.label} · {SITE.hours.display}
            </p>
          </div>

          {/* Links */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-gold">Explore</h3>
            <ul className="mt-5 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className="text-[14px] text-cream/65 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Order */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-gold">Order</h3>
            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={SITE.delivery.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] text-cream/65 transition-colors hover:text-gold"
                >
                  Order Online ({SITE.delivery.swiggyLabel}) <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openWhatsApp(`Hello ${SITE.name},\n\nI'd like to place an order.\n`)}
                  className="inline-flex items-center gap-2 text-[14px] text-cream/65 transition-colors hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </button>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 text-[14px] text-cream/65 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-gold">Visit</h3>
            <address className="mt-5 flex items-start gap-2.5 text-[14px] not-italic leading-relaxed text-cream/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>
                {SITE.address.line1},<br />
                {SITE.address.line2}
                <span className="mt-1 block text-[12.5px] text-cream/45">{SITE.address.area}</span>
              </span>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/8 pt-6 sm:flex-row">
          <p className="text-[12px] text-cream/40">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[12px]">
            <Link to="/privacy" className="text-cream/50 transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-cream/50 transition-colors hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
