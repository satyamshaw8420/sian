import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { SITE, LINKS, isOpenNow } from "../data/site";
import { openWhatsApp } from "../lib/whatsapp";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

export default function Location() {
  const open = isOpenNow();

  return (
    <section id="visit" className="scroll-mt-20 border-t border-charcoal/8 bg-sand py-24 text-charcoal sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Find us"
          lines={["Visit", <em key="s" className="text-chilli">Sian Kitchen</em>]}
          sub="Right on Chowringhee Road — easy to reach from Exide More, Park Street and Rabindra Sadan."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-4">
            <div className="border border-charcoal/10 bg-card p-7">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-charcoal text-gold">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-taupe">Address</h3>
                  <p className="mt-1.5 font-display text-xl font-bold leading-snug">{SITE.address.line1}</p>
                  <p className="text-[15px] text-ink/80">{SITE.address.line2}</p>
                  <p className="mt-1 text-[13px] font-semibold text-taupe">{SITE.address.area}</p>
                </div>
              </div>
            </div>

            <div className="border border-charcoal/10 bg-card p-7">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-charcoal text-gold">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-taupe">
                    Reservations &amp; Orders
                  </h3>
                  <a
                    href={SITE.phoneHref}
                    className="mt-1.5 block font-display text-xl font-bold transition-colors hover:text-chilli"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <p className="mt-1 text-[13px] text-taupe">Call for tables, takeaway and bulk orders.</p>
                </div>
              </div>
            </div>

            <div className="border border-charcoal/10 bg-card p-7">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-charcoal text-gold">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-taupe">Hours</h3>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.12em] ${
                        open ? "bg-[#1a7f37]/10 text-[#1a7f37]" : "bg-chilli/10 text-chilli"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-[#1a7f37]" : "bg-chilli"}`} aria-hidden />
                      {open ? "Open now" : "Closed now"}
                    </span>
                  </div>
                  <p className="mt-1.5 font-display text-xl font-bold">
                    {SITE.hours.label} · {SITE.hours.display}
                  </p>
                  <p className="mt-1 text-[13px] text-taupe">Kitchen takes last orders shortly before close.</p>
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={LINKS.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-chilli px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-chilli-deep"
              >
                <Navigation className="h-4 w-4" aria-hidden /> Get Directions
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 border-2 border-charcoal px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-cream"
              >
                <Phone className="h-4 w-4" aria-hidden /> Call Restaurant
              </a>
              <button
                type="button"
                onClick={() => openWhatsApp(`Hello ${SITE.name},\n\nI have a question about ordering / a table.\n`)}
                className="inline-flex items-center gap-2 border-2 border-wa px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-wa transition-all duration-300 hover:-translate-y-0.5 hover:bg-wa hover:text-cream"
              >
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="absolute -bottom-4 -right-4 hidden h-full w-full border border-gold/50 sm:block" aria-hidden />
            <div className="relative h-[380px] overflow-hidden border border-charcoal/15 bg-coal sm:h-full sm:min-h-[480px]">
              <iframe
                title="Sian Kitchen on Google Maps — 59B Chowringhee Road, Kolkata"
                src={LINKS.mapsEmbed}
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
