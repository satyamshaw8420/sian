import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SITE } from "../data/site";

const CONTENT: Record<
  "privacy" | "terms",
  { title: string; updated: string; blocks: Array<{ h: string; p: string }> }
> = {
  privacy: {
    title: "Privacy Policy",
    updated: "This page explains, in plain language, how this website treats your information.",
    blocks: [
      {
        h: "What we collect",
        p: "This website does not require accounts, logins or sign-ups. We do not collect your name, phone number or address through forms. Standard, anonymous web-server logs (such as pages viewed) may be maintained by our hosting provider.",
      },
      {
        h: "Your selection & cart",
        p: "When you add dishes to your selection, that list is stored only in your own browser (local storage) so it survives a page refresh. It is never uploaded to our servers and you can clear it at any time from the selection drawer.",
      },
      {
        h: "WhatsApp orders",
        p: "Choosing “Continue on WhatsApp” opens WhatsApp on your device with a message we pre-fill for you. The message is sent by you, through WhatsApp, directly to the restaurant. WhatsApp's own privacy policy governs that conversation.",
      },
      {
        h: "Contact",
        p: `For any privacy question, call or WhatsApp us at ${SITE.phoneDisplay}, or visit us at ${SITE.address.line1}, ${SITE.address.line2}.`,
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    updated: "By using this website you agree to the short, honest terms below.",
    blocks: [
      {
        h: "Menu, prices & availability",
        p: "Dish names, prices and availability shown on this site are indicative and can change without notice. Items shown as “At restaurant” have prices confirmed by the restaurant when you order. The restaurant confirms the final price and availability by phone, WhatsApp or a delivery partner.",
      },
      {
        h: "Orders & payment",
        p: "This website does not take payments and is not a payment gateway. Orders composed here are sent as WhatsApp enquiries; a confirmed order, its total and payment method are agreed directly with the restaurant. Delivery via partners such as Swiggy follows those platforms' own terms.",
      },
      {
        h: "Information accuracy",
        p: `We work to keep business details accurate — including our address at ${SITE.address.line1}, ${SITE.address.line2}, phone ${SITE.phoneDisplay}, and hours (${SITE.hours.label}, ${SITE.hours.display}) — but please call ahead for time-sensitive plans.`,
      },
      {
        h: "Content & ownership",
        p: "The Sian Kitchen name, logo, photography and design on this site belong to the restaurant and may not be reproduced without permission.",
      },
    ],
  },
};

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const content = CONTENT[kind];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [kind]);

  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to {SITE.name}
        </Link>

        <h1 className="mt-8 font-display text-4xl font-black sm:text-5xl">{content.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-cream/60">{content.updated}</p>

        <div className="mt-12 space-y-10">
          {content.blocks.map((block, i) => (
            <section key={block.h}>
              <h2 className="flex items-baseline gap-3 font-display text-xl font-bold text-gold">
                <span className="text-sm italic text-gold/60">0{i + 1}</span>
                {block.h}
              </h2>
              <p className="mt-3 text-[14.5px] leading-[1.85] text-cream/75">{block.p}</p>
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-cream/10 pt-6 text-[12px] text-cream/40">
          © {new Date().getFullYear()} {SITE.name} · {SITE.address.line1}, {SITE.address.line2} ·{" "}
          {SITE.phoneDisplay}
        </p>
      </div>
    </div>
  );
}
