import { Link } from "react-router-dom";
import { ExternalLink, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { SITE } from "../data/site";
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
    <footer className="noise border-t border-gold/10 bg-[#121010] text-cream">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <p className="font-display text-3xl font-black tracking-wide">
              {SITE.wordmark.first} <em className="text-gold">{SITE.wordmark.second.charAt(0) + SITE.wordmark.second.slice(1).toLowerCase()}</em>
            </p>
            <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream/50">
              {SITE.cuisines.join(" • ")}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 border border-gold/25 px-3.5 py-2 text-[12.5px] font-bold text-gold">
              <Star className="h-4 w-4 fill-gold" aria-hidden />
              {SITE.rating} · {SITE.reviewCount}+ Google reviews
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
              {SITE.tagline}. Wok-fired Chinese, dum biryani and North Indian classics on Chowringhee
              Road — open daily, {SITE.hours.display}.
            </p>
          </div>

          {/* Explore */}
          <nav className="md:col-span-2" aria-label="Footer">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold">Explore</h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.id + l.label}>
                  <button
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-cream/65 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Order */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold">Order</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={SITE.delivery.swiggyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/65 transition-colors hover:text-gold"
                >
                  Order on {SITE.delivery.swiggyLabel} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openWhatsApp(`Hello ${SITE.name},\n\nI'd like to place an order.\n`)}
                  className="inline-flex items-center gap-2 text-cream/65 transition-colors hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp order
                </button>
              </li>
              <li>
                <a href={SITE.phoneHref} className="inline-flex items-center gap-2 text-cream/65 transition-colors hover:text-gold">
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[11.5px] leading-relaxed text-cream/40">
              This site composes your order on WhatsApp — payment &amp; confirmation are handled by
              the restaurant.
            </p>
          </div>

          {/* Visit */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-gold">Visit</h3>
            <address className="mt-5 flex gap-3 text-sm not-italic leading-relaxed text-cream/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>
                {SITE.address.line1},<br />
                {SITE.address.line2}
                <span className="mt-1 block text-[12px] text-cream/40">{SITE.address.area}</span>
              </span>
            </address>
            <p className="mt-4 text-sm text-cream/65">
              <span className="font-bold text-gold">{SITE.hours.label}:</span> {SITE.hours.display}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-[12px] text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <span className="h-3 w-px bg-cream/20" aria-hidden />
            <Link to="/terms" className="transition-colors hover:text-gold">
              Terms
            </Link>
          </div>
          <p>Menu prices indicative · No online payment on this site</p>
        </div>
      </div>
    </footer>
  );
}
