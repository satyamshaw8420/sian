/** Formats a number as Indian Rupees, e.g. 1299 → ₹1,299 */
export function inr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
