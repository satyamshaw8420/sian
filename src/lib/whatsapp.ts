import { SITE } from "../data/site";

export interface WaLine {
  name: string;
  price: number | null; // null → price not printed on the menu
  qty: number;
}

/**
 * Builds the order/enquiry message exactly as agreed with the restaurant.
 * Items whose price is not printed are listed without a value and flagged —
 * the restaurant confirms them on WhatsApp.
 */
export function generateWhatsAppMessage(items: WaLine[]): string {
  const lines = items.map((i) => `• ${i.name} × ${i.qty}`);
  const priced = items.filter((i) => i.price !== null);
  const total = priced.reduce((sum, i) => sum + (i.price as number) * i.qty, 0);
  const hasUnpriced = items.some((i) => i.price === null);

  let msg = `Hello ${SITE.name},\n\nI'd like to enquire/order:\n\n${lines.join("\n")}\n`;
  if (priced.length > 0) msg += `\nEstimated Total: ₹${total.toLocaleString("en-IN")}\n`;
  if (hasUnpriced)
    msg += `\n(A few items don't have prices listed online — please confirm their prices too.)\n`;
  msg += `\nPlease confirm availability and order details.`;
  return msg;
}

/** Opens WhatsApp with a pre-filled message to the restaurant. */
export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Single-dish enquiry straight from the dish modal. */
export function openWhatsAppForDish(
  dish: { name: string; price: number | null },
  qty = 1
): void {
  openWhatsApp(generateWhatsAppMessage([{ name: dish.name, price: dish.price, qty }]));
}
