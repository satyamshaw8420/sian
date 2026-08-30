import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, LINKS } from "../data/site";
import { LOGO } from "../data/menu";
import { openWhatsApp } from "../lib/whatsapp";
import { scrollToId } from "../lib/scroll";

const EXPLORE = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "visit" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <img
                src={LOGO}
                alt="Sian Kitchen emblem"
                className="h-16 w-16 rounded-full object-cover shadow-[0_0_0_1.5px_rgba(201,154,82,0.55)]"
              />
              <div>
                <p className="font-display text-2xl font-black tracking-[0.06em]">SIAN KITCHEN</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
                  {SITE.cuisines.join(" • ")}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-cream/55">
              {SITE.tagline}. Chinese favourites, comforting Indian classics and signature dishes —
              cooked to order on Chowringhee Road.
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-cream/40">
              ≈ ₹{SITE.priceForTwo} for two · {SITE.hours.label}, {SITE.hours.display}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-gold">Explore</h3>
            <ul className="mt-5 space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.id + l.label}>
                  <button
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className="text-[13.5px] text-cream/65 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={SITE.delivery.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13.5px] text-cream/65 transition-colors hover:text-gold"
                >
                  Order Online <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openWhatsApp(`Hello ${SITE.name},\n\nI'd like to place an order.\n`)}
                  className="inline-flex items-center gap-1.5 text-[13.5px] text-cream/65 transition-colors hover:text-gold"
                >
                  WhatsApp <MessageCircle className="h-3 w-3" aria-hidden />
                </button>
              </li>
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-gold">Visit</h3>
            <address className="mt-5 space-y-3 text-[13.5px] not-italic leading-relaxed text-cream/65">
              <p className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {SITE.address.line1},<br />
                  {SITE.address.line2}
                </span>
              </p>
              <p className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href={SITE.phoneHref} className="transition-colors hover:text-gold">
                  {SITE.phoneDisplay}
                </a>
              </p>
            </address>
            <a
              href={LINKS.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block border-b border-gold/50 pb-0.5 text-[12px] font-bold uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-light"
            >
              Get Directions →
            </a>
          </div>

          {/* Hours + delivery */}
          <div>
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.26em] text-gold">Kitchen Hours</h3>
            <p className="mt-5 font-display text-3xl font-black text-cream">
              11 <span className="text-gold">AM</span> – 11 <span className="text-gold">PM</span>
            </p>
            <p className="mt-1 text-[12.5px] uppercase tracking-[0.16em] text-cream/50">{SITE.hours.label} · all week</p>
            <div className="mt-6 border border-cream/12 bg-coal/60 p-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-cream/60">Delivery partner</p>
              <a
                href={SITE.delivery.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 font-display text-lg font-bold text-gold transition-colors hover:text-gold-light"
              >
                {SITE.delivery.swiggyLabel} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 sm:flex-row">
          <p className="text-[12px] text-cream/40">
            © {new Date().getFullYear()} {SITE.name} · {SITE.address.area}
          </p>
          <div className="flex items-center gap-6 text-[12px]">
            <a href="#/privacy" className="text-cream/55 transition-colors hover:text-gold">
              Privacy Policy
            </a>
            <a href="#/terms" className="text-cream/55 transition-colors hover:text-gold">
              Terms
            </a>
            <span className="flex items-center gap-1.5 text-cream/35">
              Crafted with <span className="text-chilli">♦</span> in Kolkata
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
