/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SIAN KITCHEN — MENU DATA · THE SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * Consolidated from the restaurant's own menu sheets. Rules applied:
 *   • Every repeated item across pages appears exactly ONCE.
 *   • `price: null`  → price not printed on the menu (confirmed at restaurant).
 *   • `halfPrice`    → Half (H) rate where the sheet lists Full / Half.
 *   • `popular`      → powers "Worth Coming Hungry For" + the ★ badge.
 *   • `group`        → sub-section heading inside a category chapter.
 *   • Drums of Heaven printed ₹169 on one sheet and ₹149 on another — kept at
 *     the starter-sheet price; flagged for the restaurant to confirm.
 * Photography is representative; swap `image` values for real photos anytime.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type DishType = "veg" | "non-veg";

export type CravingTag =
  | "spicy"
  | "crispy"
  | "noodles"
  | "rice"
  | "chicken"
  | "prawn"
  | "mutton"
  | "tandoor"
  | "momos";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  group: string;
  price: number | null;
  halfPrice?: number;
  type: DishType;
  description?: string;
  image: string;
  popular?: boolean;
  isNew?: boolean;
  available: boolean;
  serves?: string;
  tags?: CravingTag[];
}

export interface MenuFilters {
  category: string;
  type: "all" | DishType;
  query: string;
  tag: CravingTag | null;
}

const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/1468606e-db6b-4ee5-981f-b03dc0bd27c5/_result.png",
  drums: "https://image.qwenlm.ai/generated-images/d931f7bd-64a4-4b3f-884d-616955af9f34/_result.png",
  chilliChicken: "https://image.qwenlm.ai/generated-images/e74e47bf-c6cd-4fac-94e2-a83f1319dac0/_result.png",
  paneer: "https://image.qwenlm.ai/generated-images/2f238d61-9a3f-469c-ad78-68bb3a962aab/_result.png",
  noodles: "https://image.qwenlm.ai/generated-images/326bd4ae-946c-4db0-9d84-f885fd5319f3/_result.png",
  biryani: "https://image.qwenlm.ai/generated-images/b10d1a80-a580-47b0-99dd-85a0dcc4792a/_result.png",
  momos: "https://image.qwenlm.ai/generated-images/d52a9fcb-f1ee-4801-8b58-e06f0c6c5dce/_result.png",
  soup: "https://image.qwenlm.ai/generated-images/f0bef476-fc7d-47cd-918a-2bb06ae80e79/_result.png",
  tandoor: "https://image.qwenlm.ai/generated-images/ad47ef65-c9ac-4935-b947-ca66c658f386/_result.png",
  interior: "https://image.qwenlm.ai/generated-images/3d59b4cd-38f9-4922-8474-e45d02e9c4fc/_result.png",
};

export const IMAGES = IMG;
export const LOGO = "https://image.qwenlm.ai/generated-images/40356127-f875-4f4d-9173-c600ccaa485e/_result.png";

let n = 0;
function m(
  name: string,
  category: string,
  group: string,
  price: number | null,
  type: DishType,
  image: string,
  opts: Partial<Omit<MenuItem, "id" | "name" | "category" | "group" | "price" | "type" | "image">> = {}
): MenuItem {
  n += 1;
  const id =
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + `-${n}`;
  return { id, name, category, group, price, type, image, available: true, ...opts };
}

export const MENU: MenuItem[] = [
  /* ═══ BIRYANI ═══ */
  m("Chicken Egg Biryani", "Biryani", "Biryani", 200, "non-veg", IMG.biryani, { tags: ["rice", "chicken"] }),
  m("Shan Ch. Spl Biryani", "Biryani", "Biryani", 280, "non-veg", IMG.biryani, {
    popular: true,
    serves: "House special — serves 1 generously",
    tags: ["rice", "chicken"],
  }),
  m("Mutton Egg Biryani", "Biryani", "Biryani", 240, "non-veg", IMG.biryani, { tags: ["rice", "mutton"] }),
  m("Shan Mutton Spl Biryani", "Biryani", "Biryani", 300, "non-veg", IMG.biryani, {
    serves: "House special — serves 1 generously",
    tags: ["rice", "mutton"],
  }),
  m("Egg Biryani", "Biryani", "Biryani", 130, "non-veg", IMG.biryani, { tags: ["rice"] }),
  m("Veg Paneer Biryani", "Biryani", "Biryani", 160, "veg", IMG.biryani, { tags: ["rice"] }),

  /* ═══ SOUPS ═══ */
  m("Ch. Clear Soup", "Soups", "Soups", 99, "non-veg", IMG.soup, { tags: ["chicken"] }),
  m("Ch. Hot & Sour Soup", "Soups", "Soups", 129, "non-veg", IMG.soup, { tags: ["spicy", "chicken"] }),
  m("Mix Hot & Sour Soup", "Soups", "Soups", 149, "non-veg", IMG.soup, { tags: ["spicy"] }),
  m("Ch. Lemon Coriander Soup", "Soups", "Soups", 129, "non-veg", IMG.soup, { tags: ["chicken"] }),
  m("Mix Lemon Coriander Soup", "Soups", "Soups", 149, "non-veg", IMG.soup, {}),
  m("Ch. Manchow Soup", "Soups", "Soups", 129, "non-veg", IMG.soup, { tags: ["spicy", "chicken"] }),
  m("Mix Manchow Soup", "Soups", "Soups", 149, "non-veg", IMG.soup, { tags: ["spicy"] }),
  m("Ch. Sweetcorn Soup", "Soups", "Soups", 129, "non-veg", IMG.soup, { tags: ["chicken"] }),
  m("Mix Sweetcorn Soup", "Soups", "Soups", 149, "non-veg", IMG.soup, {}),

  /* ═══ STARTER — VEG ═══ */
  m("Veg Ball Manchurian", "Starters", "Starter — Veg", 129, "veg", IMG.paneer, { tags: ["spicy"] }),
  m("C.C.B.C", "Starters", "Starter — Veg", 159, "veg", IMG.paneer, {}),
  m("Dragon Potato", "Starters", "Starter — Veg", 119, "veg", IMG.paneer, { tags: ["crispy", "spicy"] }),
  m("Salt & Pepper Paneer", "Starters", "Starter — Veg", 179, "veg", IMG.paneer, {
    popular: true,
    tags: ["crispy"],
  }),
  m("Crispy Chilli Mushroom", "Starters", "Starter — Veg", 169, "veg", IMG.paneer, { tags: ["crispy", "spicy"] }),

  /* ═══ STARTER — NON-VEG ═══ */
  m("Spring Chicken (6 Pcs)", "Starters", "Starter — Non-Veg", 149, "non-veg", IMG.drums, { tags: ["crispy", "chicken"] }),
  m("Spring Ch. With Heaven Touch", "Starters", "Starter — Non-Veg", 159, "non-veg", IMG.drums, { tags: ["chicken"] }),
  m("Drumsticks (6 Pcs)", "Starters", "Starter — Non-Veg", 149, "non-veg", IMG.drums, { tags: ["crispy", "chicken"] }),
  m("Drums of Heaven (6 Pcs)", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.drums, {
    popular: true,
    tags: ["crispy", "spicy", "chicken"],
  }),
  m("Chicken 65 (8 Pcs)", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.chilliChicken, {
    popular: true,
    tags: ["spicy", "crispy", "chicken"],
  }),
  m("Honey BBQ Wings (6 Pcs)", "Starters", "Starter — Non-Veg", 179, "non-veg", IMG.drums, { tags: ["chicken"] }),
  m("Kung Pao Chicken", "Starters", "Starter — Non-Veg", 179, "non-veg", IMG.chilliChicken, { tags: ["spicy", "chicken"] }),
  m("Salt & Pepper Chicken (8 Pcs)", "Starters", "Starter — Non-Veg", 179, "non-veg", IMG.drums, { tags: ["crispy", "chicken"] }),
  m("Smoke Ch. With Red Pepper (6 Pcs)", "Starters", "Starter — Non-Veg", 159, "non-veg", IMG.chilliChicken, { tags: ["chicken"] }),
  m("Wings Heaven (6 Pcs)", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.drums, { tags: ["chicken"] }),
  m("Lemon Chicken", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.chilliChicken, { tags: ["chicken"] }),

  /* ═══ TANDOOR CHICKEN DRY (F = Full · H = Half) ═══ */
  m("Ch. Tandoori", "Tandoor", "Tandoor Chicken Dry", 400, "non-veg", IMG.tandoor, {
    halfPrice: 210,
    popular: true,
    tags: ["tandoor", "chicken"],
  }),
  m("Ch. Tikka Kabab (6 Pcs)", "Tandoor", "Tandoor Chicken Dry", 220, "non-veg", IMG.tandoor, {
    popular: true,
    tags: ["tandoor", "chicken"],
  }),
  m("Ch. Reshmi Kabab (6 Pcs)", "Tandoor", "Tandoor Chicken Dry", 240, "non-veg", IMG.tandoor, {
    tags: ["tandoor", "chicken"],
  }),
  m("Ch. Tangri Kabab (4 Pcs)", "Tandoor", "Tandoor Chicken Dry", 290, "non-veg", IMG.tandoor, {
    halfPrice: 150,
    tags: ["tandoor", "chicken"],
  }),
  m("Ch. Aachari Kabab (6 Pcs)", "Tandoor", "Tandoor Chicken Dry", 220, "non-veg", IMG.tandoor, {
    tags: ["tandoor", "spicy", "chicken"],
  }),
  m("Mutton Barra Kabab (6 Pcs)", "Tandoor", "Tandoor Chicken Dry", 240, "non-veg", IMG.tandoor, {
    tags: ["tandoor", "mutton"],
  }),

  /* ═══ TANDOOR VEG DRY ═══ */
  m("Veg Seekh Kebab (6 Pcs)", "Tandoor", "Tandoor Veg Dry", 220, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Paneer Tikka (6 Pcs)", "Tandoor", "Tandoor Veg Dry", 200, "veg", IMG.tandoor, {
    popular: true,
    tags: ["tandoor"],
  }),
  m("Kashmiri Aloo Kebab", "Tandoor", "Tandoor Veg Dry", 200, "veg", IMG.tandoor, { tags: ["tandoor"] }),

  /* ═══ FRIED MOMOS ═══ */
  m("Veg Momos (5 Pcs)", "Momos", "Fried Momos", 79, "veg", IMG.momos, { tags: ["momos", "crispy"] }),
  m("Veg Schezwan Momos (5 Pcs)", "Momos", "Fried Momos", 89, "veg", IMG.momos, { tags: ["momos", "spicy"] }),
  m("Paneer Momos (5 Pcs)", "Momos", "Fried Momos", 109, "veg", IMG.momos, { tags: ["momos"] }),
  m("Paneer Schezwan Momos (5 Pcs)", "Momos", "Fried Momos", 119, "veg", IMG.momos, { tags: ["momos", "spicy"] }),
  m("Chicken Momos (5 Pcs)", "Momos", "Fried Momos", 99, "non-veg", IMG.momos, { tags: ["momos", "chicken"] }),
  m("Chicken Schezwan Momos (5 Pcs)", "Momos", "Fried Momos", 109, "non-veg", IMG.momos, {
    tags: ["momos", "spicy", "chicken"],
  }),

  /* ═══ PAN FRIED MOMOS ═══ */
  m("Veg Momos", "Momos", "Pan Fried Momos", 99, "veg", IMG.momos, { tags: ["momos"] }),
  m("Veg Schezwan Momos", "Momos", "Pan Fried Momos", 119, "veg", IMG.momos, { tags: ["momos", "spicy"] }),
  m("Paneer Momos", "Momos", "Pan Fried Momos", 129, "veg", IMG.momos, { tags: ["momos"] }),
  m("Paneer Schezwan Momos", "Momos", "Pan Fried Momos", 139, "veg", IMG.momos, { tags: ["momos", "spicy"] }),
  m("Chicken Momos", "Momos", "Pan Fried Momos", 119, "non-veg", IMG.momos, { tags: ["momos", "chicken"] }),
  m("Chicken Schezwan Momos", "Momos", "Pan Fried Momos", 129, "non-veg", IMG.momos, {
    tags: ["momos", "spicy", "chicken"],
  }),

  /* ═══ RICE & PULAO ═══ */
  m("Steam Rice", "Rice & Pulao", "Rice", 40, "veg", IMG.hero, { tags: ["rice"] }),
  m("Jeera Rice", "Rice & Pulao", "Rice", 60, "veg", IMG.hero, { tags: ["rice"] }),
  m("Lemon Rice", "Rice & Pulao", "Rice", 60, "veg", IMG.hero, { tags: ["rice"] }),
  m("Coriander Rice", "Rice & Pulao", "Rice", 60, "veg", IMG.hero, { tags: ["rice"] }),
  m("Basanti Pulao", "Rice & Pulao", "Pulao", 100, "veg", IMG.hero, { tags: ["rice"] }),
  m("Green Peas Pulao", "Rice & Pulao", "Pulao", 90, "veg", IMG.hero, { tags: ["rice"] }),

  /* ═══ FRIED RICE ═══ */
  m("Veg Fried Rice", "Fried Rice", "Fried Rice", 119, "veg", IMG.hero, { tags: ["rice"] }),
  m("Egg Fried Rice", "Fried Rice", "Fried Rice", 139, "non-veg", IMG.hero, { tags: ["rice"] }),
  m("Chicken Fried Rice", "Fried Rice", "Fried Rice", 149, "non-veg", IMG.hero, { tags: ["rice", "chicken"] }),
  m("Prawn Fried Rice", "Fried Rice", "Fried Rice", 169, "non-veg", IMG.hero, { tags: ["rice", "prawn"] }),
  m("Mix Fried Rice", "Fried Rice", "Fried Rice", 199, "non-veg", IMG.hero, { tags: ["rice"] }),

  /* ═══ MANCHURIAN FRIED RICE ═══ */
  m("Veg Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 129, "veg", IMG.hero, { tags: ["rice", "spicy"] }),
  m("Egg Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 149, "non-veg", IMG.hero, { tags: ["rice", "spicy"] }),
  m("Ch. Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 159, "non-veg", IMG.hero, {
    tags: ["rice", "spicy", "chicken"],
  }),
  m("Prawn Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 175, "non-veg", IMG.hero, {
    tags: ["rice", "spicy", "prawn"],
  }),
  m("Mix Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 199, "non-veg", IMG.hero, {
    tags: ["rice", "spicy"],
  }),

  /* ═══ SCHEZWAN FRIED RICE ═══ */
  m("Veg Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 129, "veg", IMG.hero, { tags: ["rice", "spicy"] }),
  m("Egg Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 149, "non-veg", IMG.hero, { tags: ["rice", "spicy"] }),
  m("Chicken Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 155, "non-veg", IMG.hero, {
    tags: ["rice", "spicy", "chicken"],
  }),
  m("Prawn Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 175, "non-veg", IMG.hero, {
    tags: ["rice", "spicy", "prawn"],
  }),
  m("Mix Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 199, "non-veg", IMG.hero, {
    tags: ["rice", "spicy"],
  }),

  /* ═══ BURNT GARLIC FRIED RICE ═══ */
  m("Veg Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 129, "veg", IMG.hero, { tags: ["rice"] }),
  m("Egg Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 139, "non-veg", IMG.hero, { tags: ["rice"] }),
  m("Chicken Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 149, "non-veg", IMG.hero, {
    tags: ["rice", "chicken"],
  }),
  m("Prawn Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 169, "non-veg", IMG.hero, {
    tags: ["rice", "prawn"],
  }),
  m("Mix Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 199, "non-veg", IMG.hero, {
    tags: ["rice"],
  }),

  /* ═══ HAKKA ═══ */
  m("Veg Hakka", "Noodles", "Hakka", 109, "veg", IMG.noodles, { tags: ["noodles"] }),
  m("Egg Hakka", "Noodles", "Hakka", 129, "non-veg", IMG.noodles, { tags: ["noodles"] }),
  m("Chicken Hakka", "Noodles", "Hakka", 149, "non-veg", IMG.noodles, { tags: ["noodles", "chicken"] }),
  m("Prawn Hakka", "Noodles", "Hakka", 169, "non-veg", IMG.noodles, { tags: ["noodles", "prawn"] }),
  m("Mix Hakka", "Noodles", "Hakka", 199, "non-veg", IMG.noodles, { popular: true, tags: ["noodles"] }),

  /* ═══ SCHEZWAN HAKKA (Mix not printed on the sheet — not invented) ═══ */
  m("Veg Schezwan Hakka", "Noodles", "Schezwan Hakka", 129, "veg", IMG.noodles, { tags: ["noodles", "spicy"] }),
  m("Egg Schezwan Hakka", "Noodles", "Schezwan Hakka", 139, "non-veg", IMG.noodles, { tags: ["noodles", "spicy"] }),
  m("Chicken Schezwan Hakka", "Noodles", "Schezwan Hakka", 169, "non-veg", IMG.noodles, {
    tags: ["noodles", "spicy", "chicken"],
  }),
  m("Prawn Schezwan Hakka", "Noodles", "Schezwan Hakka", 199, "non-veg", IMG.noodles, {
    tags: ["noodles", "spicy", "prawn"],
  }),

  /* ═══ CHILLI GARLIC HAKKA ═══ */
  m("Veg Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 129, "veg", IMG.noodles, { tags: ["noodles", "spicy"] }),
  m("Egg Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 139, "non-veg", IMG.noodles, {
    tags: ["noodles", "spicy"],
  }),
  m("Chicken Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 169, "non-veg", IMG.noodles, {
    tags: ["noodles", "spicy", "chicken"],
  }),
  m("Prawn Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 189, "non-veg", IMG.noodles, {
    tags: ["noodles", "spicy", "prawn"],
  }),
  m("Mix Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 199, "non-veg", IMG.noodles, {
    tags: ["noodles", "spicy"],
  }),

  /* ═══ CANTONESE NOODLES ═══ */
  m("Veg Cantonese Noodles", "Noodles", "Cantonese Noodles", 129, "veg", IMG.noodles, { tags: ["noodles"] }),
  m("Egg Cantonese Noodles", "Noodles", "Cantonese Noodles", 149, "non-veg", IMG.noodles, { tags: ["noodles"] }),
  m("Chicken Cantonese Noodles", "Noodles", "Cantonese Noodles", 169, "non-veg", IMG.noodles, {
    tags: ["noodles", "chicken"],
  }),
  m("Prawn Cantonese Noodles", "Noodles", "Cantonese Noodles", 189, "non-veg", IMG.noodles, {
    tags: ["noodles", "prawn"],
  }),
  m("Mix Cantonese Noodles", "Noodles", "Cantonese Noodles", 199, "non-veg", IMG.noodles, { tags: ["noodles"] }),

  /* ═══ PAN FRIED GRAVY NOODLES ═══ */
  m("Veg Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 139, "veg", IMG.noodles, { tags: ["noodles"] }),
  m("Egg Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 159, "non-veg", IMG.noodles, {
    tags: ["noodles"],
  }),
  m("Chicken Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 189, "non-veg", IMG.noodles, {
    tags: ["noodles", "chicken"],
  }),
  m("Prawn Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 199, "non-veg", IMG.noodles, {
    tags: ["noodles", "prawn"],
  }),
  m("Mix Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 209, "non-veg", IMG.noodles, {
    tags: ["noodles"],
  }),

  /* ═══ INDIAN — CHICKEN ═══ */
  m("Chicken Kassa (4/2 Pcs)", "Indian", "Chicken", 250, "non-veg", IMG.tandoor, {
    halfPrice: 150,
    tags: ["chicken"],
  }),
  m("Chicken Chap", "Indian", "Chicken", 150, "non-veg", IMG.tandoor, { tags: ["chicken"] }),
  m("Chicken Dahi Masala (4/2 Pcs)", "Indian", "Chicken", 260, "non-veg", IMG.tandoor, {
    halfPrice: 140,
    tags: ["chicken"],
  }),
  m("Chicken Kalia (1 Pcs)", "Indian", "Chicken", 140, "non-veg", IMG.tandoor, { tags: ["chicken"] }),

  /* ═══ INDIAN — MUTTON ═══ */
  m("Mutton Kassa (4/2 Pcs)", "Indian", "Mutton", 300, "non-veg", IMG.tandoor, { halfPrice: 160, tags: ["mutton"] }),
  m("Mutton Chap", "Indian", "Mutton", 300, "non-veg", IMG.tandoor, { tags: ["mutton"] }),
  m("Mutton Dahi Masala (4/2 Pcs)", "Indian", "Mutton", 320, "non-veg", IMG.tandoor, { halfPrice: 170, tags: ["mutton"] }),
  m("Mutton Kalia (2 Pcs)", "Indian", "Mutton", 300, "non-veg", IMG.tandoor, { tags: ["mutton"] }),

  /* ═══ INDIAN NON-VEG ═══ */
  m("Ch Butter Masala (4/2 Pcs)", "Indian", "Indian Non-Veg", 320, "non-veg", IMG.tandoor, {
    halfPrice: 170,
    tags: ["chicken"],
  }),
  m("Ch Tikka Butter Masala (6/3 Pcs)", "Indian", "Indian Non-Veg", 340, "non-veg", IMG.tandoor, {
    halfPrice: 180,
    tags: ["chicken"],
  }),
  m("Ch Reshmi Butter Masala (6/3 Pcs)", "Indian", "Indian Non-Veg", 360, "non-veg", IMG.tandoor, {
    halfPrice: 190,
    tags: ["chicken"],
  }),
  m("Ch Tangri Butter Masala (4/2 Pcs)", "Indian", "Indian Non-Veg", 400, "non-veg", IMG.tandoor, {
    halfPrice: 210,
    tags: ["chicken"],
  }),
  m("Ch Bharta", "Indian", "Indian Non-Veg", 200, "non-veg", IMG.tandoor, { tags: ["chicken"] }),
  m("Egg Curry", "Indian", "Indian Non-Veg", 160, "non-veg", IMG.tandoor, {}),
  m("Egg Masala", "Indian", "Indian Non-Veg", 180, "non-veg", IMG.tandoor, {}),

  /* ═══ INDIAN VEG (Matar Paneer printed twice on the sheet — kept once) ═══ */
  m("Paneer Butter Masala", "Indian", "Indian Veg", 250, "veg", IMG.tandoor, { halfPrice: 120 }),
  m("Mix Veg", "Indian", "Indian Veg", 140, "veg", IMG.tandoor, {}),
  m("Kashmiri Aloo Masala", "Indian", "Indian Veg", 120, "veg", IMG.tandoor, {}),
  m("Matar Paneer", "Indian", "Indian Veg", 200, "veg", IMG.tandoor, { halfPrice: 120 }),
  m("Palak Paneer", "Indian", "Indian Veg", 220, "veg", IMG.tandoor, { halfPrice: 120 }),

  /* ═══ TADKA ═══ */
  m("Plain Tadka", "Indian", "Tadka", 50, "veg", IMG.tandoor, {}),
  m("Egg Tadka", "Indian", "Tadka", 60, "non-veg", IMG.tandoor, {}),
  m("Chicken Tadka", "Indian", "Tadka", 90, "non-veg", IMG.tandoor, { tags: ["chicken"] }),
  m("Butter Plain Tadka", "Indian", "Tadka", 80, "veg", IMG.tandoor, {}),

  /* ═══ BREADS (prices confirmed at the restaurant) ═══ */
  m("Tandoori Roti", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Butter Roti", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Plain Naan", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Butter Naan", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Garlic Naan", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Masala Kulcha", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Paneer Kulcha", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Tandoori Lachha Paratha", "Breads", "Breads", null, "veg", IMG.tandoor, {}),
  m("Tandoori Butter Lachha Paratha", "Breads", "Breads", null, "veg", IMG.tandoor, {}),

  /* ═══ CHINESE COMBOS ═══ */
  m("Chinese Combo Non-Veg — Large", "Combos", "Chinese Combo — Non-Veg", 499, "non-veg", IMG.hero, {
    serves: "For 2–3",
    description:
      "1 Mix Fried Rice · 1 Chicken Chilli · 6 Pcs Dry Chilli Chicken · 4 Pcs Drums of Heaven · 1 Cold Drink",
    tags: ["rice", "noodles", "chicken"],
  }),
  m("Chinese Combo Non-Veg — Mini", "Combos", "Chinese Combo — Non-Veg", 429, "non-veg", IMG.hero, {
    serves: "For 1–2",
    description:
      "1/2 Mix Burnt Garlic Rice · 1/2 Egg Hakka · 4 Pcs Chicken Pan Fried Momo · 4 Pcs Chilli Chicken (Gravy) · 1 Cold Drink",
    tags: ["rice", "noodles", "chicken"],
  }),
  m("Chinese Combo Veg — Large", "Combos", "Chinese Combo — Veg", 449, "veg", IMG.hero, {
    serves: "For 2–3",
    description:
      "1 Classic Veg Fried Rice · 1 Veg Schezwan Hakka · 4 Pcs Chilli Paneer (Gravy) · 4 Pcs Veg Momo · 1 Cold Drink",
    tags: ["rice", "noodles"],
  }),
  m("Chinese Combo Veg — Mini", "Combos", "Chinese Combo — Veg", 419, "veg", IMG.hero, {
    serves: "For 1–2",
    description:
      "1/2 Classic Veg Fried Rice · 4 Pcs Chilli Paneer · 4 Pcs Veg Ball Manchurian · 2 Pcs Veg Pan Fried Momo · 1 Cold Drink",
    tags: ["rice", "momos"],
  }),

  /* ═══ SIAN SPECIAL COMBOS (contents & price confirmed at restaurant) ═══ */
  m("Sian Special Veg Combo", "Combos", "Sian Special Combos", null, "veg", IMG.hero, {
    description: "Full combo contents & price available at the restaurant.",
    tags: ["rice"],
  }),
  m("Sian Special Non-Veg Combo", "Combos", "Sian Special Combos", null, "non-veg", IMG.hero, {
    description: "Full combo contents & price available at the restaurant.",
    tags: ["rice", "chicken"],
  }),

  /* ═══ EXTRAS — SALAD & RAITA ═══ */
  m("Mix Raita", "Extras", "Salad & Raita", null, "veg", IMG.hero, {}),
  m("Green Salad", "Extras", "Salad & Raita", null, "veg", IMG.hero, {}),
  m("Onion Salad", "Extras", "Salad & Raita", null, "veg", IMG.hero, {}),

  /* ═══ EXTRAS — DESSERT ═══ */
  m("Firni", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Gulab Jamun", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Gajar Halwa", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Ice Cream", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Rasgulla", "Extras", "Dessert", null, "veg", IMG.hero, {}),

  /* ═══ EXTRAS — BEVERAGES (prices confirmed at the restaurant) ═══ */
  m("Lassi", "Extras", "Beverages", null, "veg", IMG.hero, {}),
  m("Cold Drinks", "Extras", "Beverages", null, "veg", IMG.hero, {}),
  m("Water 1/2 Ltr.", "Extras", "Beverages", null, "veg", IMG.hero, {}),
];

/* Tab order — only chapters that exist in the data are shown */
const CATEGORY_ORDER = [
  "Starters",
  "Soups",
  "Tandoor",
  "Momos",
  "Biryani",
  "Rice & Pulao",
  "Fried Rice",
  "Noodles",
  "Indian",
  "Breads",
  "Combos",
  "Extras",
];

export const CATEGORIES: string[] = CATEGORY_ORDER.filter((c) =>
  MENU.some((item) => item.category === c)
);

/** Ordered unique groups inside a category (preserves menu-sheet order). */
export function groupsIn(category: string, items: MenuItem[]): string[] {
  const seen: string[] = [];
  for (const item of items) {
    if (item.category === category && !seen.includes(item.group)) seen.push(item.group);
  }
  return seen;
}

export const POPULAR: MenuItem[] = MENU.filter((item) => item.popular && item.available);

export const DEFAULT_FILTERS: MenuFilters = {
  category: "All",
  type: "all",
  query: "",
  tag: null,
};

export function filterMenu(filters: MenuFilters): MenuItem[] {
  const q = filters.query.trim().toLowerCase();
  return MENU.filter((item) => {
    if (filters.category !== "All" && item.category !== filters.category) return false;
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.tag && !(item.tags ?? []).includes(filters.tag)) return false;
    if (q) {
      const haystack = `${item.name} ${item.description ?? ""} ${item.category} ${item.group}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
