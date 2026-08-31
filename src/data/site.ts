/**
 * SIAN KITCHEN — BUSINESS DATA (single source of truth).
 * Every phone number, address, hour and link reads from this file.
 */

export const SITE = {
  name: "Sian Kitchen",
  wordmark: { first: "SIAN", second: "KITCHEN" },
  tagline: "Kolkata's Flavours, Served Your Way",
  intro:
    "Chinese favourites, comforting Indian classics and signature dishes crafted for every craving.",

  cuisines: ["Chinese", "Indo-Chinese", "North Indian", "Biryani"],
  priceForTwo: 400,

  address: {
    line1: "59B, Chowringhee Road",
    line2: "Kolkata, West Bengal 700020",
    area: "Exide More / Chowringhee / Rabindra Sadan",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700020",
    country: "India",
  },

  phoneDisplay: "+91 99033 95544",
  phoneHref: "tel:+919903395544",
  whatsappNumber: "919903395544",

  rating: 4.1,
  reviewCount: 265,

  hours: {
    label: "Open Daily",
    display: "11:00 AM – 11:00 PM",
    open24: { open: 11, close: 23 },
  },

  /* Publicly listed on Swiggy. No verified restaurant deep-link supplied yet —
     link to a platform search, never a fabricated restaurant URL. */
  delivery: {
    swiggyLabel: "Swiggy",
    swiggyUrl: "https://www.swiggy.com/search?query=sian%20kitchen%20kolkata",
  },

  mapsQuery: "Sian Kitchen, 59B Chowringhee Road, Kolkata, West Bengal 700020",
} as const;

export const LINKS = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`,
  mapsSearch: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`,
};

export function isOpenNow(date = new Date()): boolean {
  const h = date.getHours();
  return h >= SITE.hours.open24.open && h < SITE.hours.open24.close;
}
