import { SITE } from "../data/site";
import { MenuItem } from "../data/menu";

export interface WaLine {
  name: string;
  price: number;
  qty: number;
}

/**
 * Composes the order/enquiry message exactly as agreed with the restaurant.
 * WhatsApp only carries the message — it never handles payment, and the
 * restaurant confirms availability & totals manually.
 */
export function generateWhatsAppMessage(items: WaLine[]): string {
  const orderLines = items
    .map((line) => `${line.name} × ${line.qty} — ₹${line.price * line.qty}`)
    .join("\n");

  const total = items.reduce((sum, line) => sum + line.price * line.qty, 0);

  return [
    `Hello ${SITE.name},`,
    "",
    "I'd like to enquire/order:",
    "",
    orderLines,
    "",
    `Estimated Total: ₹${total.toLocaleString("en-IN")}`,
    "",
    "Please confirm availability and order details.",
  ].join("\n");
}

export function waUrl(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(waUrl(message), "_blank", "noopener,noreferrer");
}

/** Single-dish enquiry straight from the dish modal. */
export function openWhatsAppForDish(item: MenuItem, qty = 1): void {
  openWhatsApp(generateWhatsAppMessage([{ name: item.name, price: item.price, qty }]));
}
