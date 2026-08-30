/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SIAN KITCHEN — MENU DATA  ·  THE SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * Transcribed from the restaurant's own menu sheet. Every name, price,
 * category and availability flag below comes from that sheet — repeated
 * sections in the source were de-duplicated, nothing else was invented.
 *
 *   • `price: null`  → price not printed on the menu (confirmed at restaurant)
 *   • `halfPrice`    → Half (H) rate where the menu lists Full / Half
 *   • `popular`      → powers "Worth Coming Hungry For" + the ★ badge
 *   • `isNew`        → items the menu sheet marks 🆕 NEW
 *   • `group`        → sub-section heading inside a category tab
 *
 * Photography is representative; swap `image` values for the restaurant's
 * real photos without touching any component code.
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

/* Representative photography */
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

/* Compact factory keeps the 180-line menu readable */
const T_SPICY: CravingTag[] = ["spicy"];
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
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + `-${n}`;
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

  /* ═══ STARTER (VEG) ═══ */
  m("Veg Ball Manchurian", "Starters", "Starter — Veg", 129, "veg", IMG.paneer, { tags: ["spicy"] }),
  m("C.C.B.C", "Starters", "Starter — Veg", 159, "veg", IMG.paneer, {}),
  m("Dragon Potato", "Starters", "Starter — Veg", 119, "veg", IMG.paneer, { tags: ["crispy", "spicy"] }),
  m("Salt & Pepper Paneer", "Starters", "Starter — Veg", 179, "veg", IMG.paneer, { tags: ["crispy"] }),
  m("Crispy Chilli Mushroom", "Starters", "Starter — Veg", 169, "veg", IMG.paneer, { tags: ["crispy", "spicy"] }),

  /* ═══ TANDOOR CHICKEN DRY (F = Full · H = Half) ═══ */
  m("Ch. Tandoori", "Tandoor", "Tandoor Chicken Dry", 400, "non-veg", IMG.tandoor, {
    halfPrice: 210,
    popular: true,
    tags: ["tandoor", "chicken"],
  }),
  m("Ch. Tikka Kabab (6 Pcs)", "Tandoor", "Tandoor Chicken Dry", 220, "non-veg", IMG.tandoor, {
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

  /* ═══ STARTER (NON-VEG) ═══ */
  m("Spring Chicken (6 Pcs)", "Starters", "Starter — Non-Veg", 149, "non-veg", IMG.drums, {
    tags: ["crispy", "chicken"],
  }),
  m("Spring Ch. With Heaven Touch", "Starters", "Starter — Non-Veg", 159, "non-veg", IMG.drums, {
    tags: ["crispy", "chicken"],
  }),
  m("Drumsticks (6 Pcs)", "Starters", "Starter — Non-Veg", 149, "non-veg", IMG.drums, { tags: ["chicken"] }),
  m("Drums of Heaven (6 Pcs)", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.drums, {
    popular: true,
    tags: ["crispy", "spicy", "chicken"],
  }),
  m("Chicken 65 (8 Pcs)", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.drums, {
    popular: true,
    tags: ["spicy", "crispy", "chicken"],
  }),
  m("Honey BBQ Wings (6 Pcs)", "Starters", "Starter — Non-Veg", 179, "non-veg", IMG.drums, {
    tags: ["crispy", "chicken"],
  }),
  m("Kung Pao Chicken", "Starters", "Starter — Non-Veg", 179, "non-veg", IMG.drums, {
    tags: ["spicy", "chicken"],
  }),
  m("Salt & Pepper Chicken (8 Pcs)", "Starters", "Starter — Non-Veg", 179, "non-veg", IMG.drums, {
    tags: ["crispy", "chicken"],
  }),
  m("Smoke Ch. With Red Pepper (6 Pcs)", "Starters", "Starter — Non-Veg", 159, "non-veg", IMG.drums, {
    tags: ["spicy", "chicken"],
  }),
  m("Wings Heaven (6 Pcs)", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.drums, {
    tags: ["crispy", "chicken"],
  }),
  m("Lemon Chicken", "Starters", "Starter — Non-Veg", 169, "non-veg", IMG.drums, { tags: ["chicken"] }),

  /* ═══ FISH — STARTER (NEW) ═══ */
  m("Sweet n Sour Fish", "Starters", "Fish — Starter", 229, "non-veg", IMG.chilliChicken, {
    isNew: true,
    tags: ["prawn"],
  }),
  m("Salt n Pepper Fish", "Starters", "Fish — Starter", 199, "non-veg", IMG.chilliChicken, {
    isNew: true,
    tags: ["crispy", "prawn"],
  }),
  m("Lemon Fish", "Starters", "Fish — Starter", 219, "non-veg", IMG.chilliChicken, { isNew: true, tags: ["prawn"] }),
  m("Dragon Fish", "Starters", "Fish — Starter", 229, "non-veg", IMG.chilliChicken, {
    isNew: true,
    tags: ["spicy", "prawn"],
  }),

  /* ═══ FRIED MOMOS ═══ */
  m("Veg Momos (5 Pcs)", "Momos", "Fried Momos", 79, "veg", IMG.momos, { tags: ["momos", "crispy"] }),
  m("Veg Schezwan Momos (5 Pcs)", "Momos", "Fried Momos", 89, "veg", IMG.momos, { tags: ["momos", "crispy", "spicy"] }),
  m("Paneer Momos (5 Pcs)", "Momos", "Fried Momos", 109, "veg", IMG.momos, { tags: ["momos", "crispy"] }),
  m("Paneer Schezwan Momos (5 Pcs)", "Momos", "Fried Momos", 119, "veg", IMG.momos, {
    tags: ["momos", "crispy", "spicy"],
  }),
  m("Chicken Momos (5 Pcs)", "Momos", "Fried Momos", 99, "non-veg", IMG.momos, { tags: ["momos", "crispy", "chicken"] }),
  m("Chicken Schezwan Momos (5 Pcs)", "Momos", "Fried Momos", 109, "non-veg", IMG.momos, {
    tags: ["momos", "crispy", "spicy", "chicken"],
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

  /* ═══ RICE (NEW) ═══ */
  m("Steam Rice", "Rice & Pulao", "Rice", 40, "veg", IMG.hero, { isNew: true, tags: ["rice"] }),
  m("Jeera Rice", "Rice & Pulao", "Rice", 60, "veg", IMG.hero, { isNew: true, tags: ["rice"] }),
  m("Lemon Rice", "Rice & Pulao", "Rice", 60, "veg", IMG.hero, { isNew: true, tags: ["rice"] }),
  m("Coriander Rice", "Rice & Pulao", "Rice", 60, "veg", IMG.hero, { isNew: true, tags: ["rice"] }),

  /* ═══ PULAO (NEW) ═══ */
  m("Basanti Pulao", "Rice & Pulao", "Pulao", 100, "veg", IMG.biryani, { isNew: true, tags: ["rice"] }),
  m("Green Peas Pulao", "Rice & Pulao", "Pulao", 90, "veg", IMG.biryani, { isNew: true, tags: ["rice"] }),

  /* ═══ FRIED RICE ═══ */
  m("Veg Fried Rice", "Fried Rice", "Classic Fried Rice", 119, "veg", IMG.hero, { tags: ["rice"] }),
  m("Egg Fried Rice", "Fried Rice", "Classic Fried Rice", 139, "non-veg", IMG.hero, { tags: ["rice"] }),
  m("Chicken Fried Rice", "Fried Rice", "Classic Fried Rice", 149, "non-veg", IMG.hero, {
    tags: ["rice", "chicken"],
  }),
  m("Prawn Fried Rice", "Fried Rice", "Classic Fried Rice", 169, "non-veg", IMG.hero, { tags: ["rice", "prawn"] }),
  m("Mix Fried Rice", "Fried Rice", "Classic Fried Rice", 199, "non-veg", IMG.hero, { tags: ["rice"] }),

  /* ═══ MANCHURIAN FRIED RICE ═══ */
  m("Veg Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 129, "veg", IMG.hero, { tags: ["rice"] }),
  m("Egg Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 149, "non-veg", IMG.hero, { tags: ["rice"] }),
  m("Ch. Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 159, "non-veg", IMG.hero, {
    tags: ["rice", "chicken"],
  }),
  m("Prawn Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 175, "non-veg", IMG.hero, {
    tags: ["rice", "prawn"],
  }),
  m("Mix Manchurian Fried Rice", "Fried Rice", "Manchurian Fried Rice", 199, "non-veg", IMG.hero, { tags: ["rice"] }),

  /* ═══ SCHEZWAN FRIED RICE ═══ */
  m("Veg Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 129, "veg", IMG.hero, {
    tags: ["rice", "spicy"],
  }),
  m("Egg Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 149, "non-veg", IMG.hero, {
    tags: ["rice", "spicy"],
  }),
  m("Chicken Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 155, "non-veg", IMG.hero, {
    tags: ["rice", "spicy", "chicken"],
  }),
  m("Prawn Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 175, "non-veg", IMG.hero, {
    tags: ["rice", "spicy", "prawn"],
  }),
  m("Mix Schezwan Fried Rice", "Fried Rice", "Schezwan Fried Rice", 199, "non-veg", IMG.hero, {
    tags: ["rice", "spicy"],
  }),

  /* ═══ BURNT GARLIC FRIED RICE (NEW) ═══ */
  m("Veg Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 129, "veg", IMG.hero, {
    isNew: true,
    tags: ["rice"],
  }),
  m("Egg Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 139, "non-veg", IMG.hero, {
    isNew: true,
    tags: ["rice"],
  }),
  m("Chicken Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 149, "non-veg", IMG.hero, {
    isNew: true,
    tags: ["rice", "chicken"],
  }),
  m("Prawn Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 169, "non-veg", IMG.hero, {
    isNew: true,
    tags: ["rice", "prawn"],
  }),
  m("Mix Burnt Garlic Fried Rice", "Fried Rice", "Burnt Garlic Fried Rice", 199, "non-veg", IMG.hero, {
    isNew: true,
    tags: ["rice"],
  }),

  /* ═══ HAKKA (NEW) ═══ */
  m("Veg Hakka", "Noodles", "Hakka", 109, "veg", IMG.noodles, { isNew: true, tags: ["noodles"] }),
  m("Egg Hakka", "Noodles", "Hakka", 129, "non-veg", IMG.noodles, { isNew: true, tags: ["noodles"] }),
  m("Chicken Hakka", "Noodles", "Hakka", 149, "non-veg", IMG.noodles, {
    isNew: true,
    popular: true,
    tags: ["noodles", "chicken"],
  }),
  m("Prawn Hakka", "Noodles", "Hakka", 169, "non-veg", IMG.noodles, { isNew: true, tags: ["noodles", "prawn"] }),
  m("Mix Hakka", "Noodles", "Hakka", 199, "non-veg", IMG.noodles, { isNew: true, tags: ["noodles"] }),

  /* ═══ SCHEZWAN HAKKA (NEW) ═══ */
  m("Veg Schezwan Hakka", "Noodles", "Schezwan Hakka", 129, "veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy"],
  }),
  m("Egg Schezwan Hakka", "Noodles", "Schezwan Hakka", 139, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy"],
  }),
  m("Chicken Schezwan Hakka", "Noodles", "Schezwan Hakka", 169, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy", "chicken"],
  }),
  m("Prawn Schezwan Hakka", "Noodles", "Schezwan Hakka", 199, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy", "prawn"],
  }),

  /* ═══ CHILLI GARLIC HAKKA (NEW) ═══ */
  m("Veg Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 129, "veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy"],
  }),
  m("Egg Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 139, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy"],
  }),
  m("Chicken Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 169, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy", "chicken"],
  }),
  m("Prawn Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 189, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy", "prawn"],
  }),
  m("Mix Chilli Garlic Hakka", "Noodles", "Chilli Garlic Hakka", 199, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "spicy"],
  }),

  /* ═══ CANTONESE NOODLES (NEW) ═══ */
  m("Veg Cantonese Noodles", "Noodles", "Cantonese Noodles", 129, "veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles"],
  }),
  m("Egg Cantonese Noodles", "Noodles", "Cantonese Noodles", 149, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles"],
  }),
  m("Chicken Cantonese Noodles", "Noodles", "Cantonese Noodles", 169, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "chicken"],
  }),
  m("Prawn Cantonese Noodles", "Noodles", "Cantonese Noodles", 189, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "prawn"],
  }),
  m("Mix Cantonese Noodles", "Noodles", "Cantonese Noodles", 199, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles"],
  }),

  /* ═══ PAN FRIED GRAVY NOODLES (NEW) ═══ */
  m("Veg Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 139, "veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles"],
  }),
  m("Egg Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 159, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles"],
  }),
  m("Chicken Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 189, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "chicken"],
  }),
  m("Prawn Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 199, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles", "prawn"],
  }),
  m("Mix Pan Fried Gravy Noodles", "Noodles", "Pan Fried Gravy Noodles", 209, "non-veg", IMG.noodles, {
    isNew: true,
    tags: ["noodles"],
  }),

  /* ═══ AMERICAN CHOPSUEY ═══ */
  m("Veg American Chopsuey", "Noodles", "American Chopsuey", 145, "veg", IMG.noodles, { tags: ["noodles"] }),
  m("Chicken American Chopsuey", "Noodles", "American Chopsuey", 179, "non-veg", IMG.noodles, {
    tags: ["noodles", "chicken"],
  }),
  m("Prawn American Chopsuey", "Noodles", "American Chopsuey", 195, "non-veg", IMG.noodles, {
    tags: ["noodles", "prawn"],
  }),
  m("Mix American Chopsuey", "Noodles", "American Chopsuey", 199, "non-veg", IMG.noodles, { tags: ["noodles"] }),

  /* ═══ CHINESE CHOPSUEY ═══ */
  m("Veg Chinese Chopsuey", "Noodles", "Chinese Chopsuey", 139, "veg", IMG.noodles, { tags: ["noodles"] }),
  m("Chicken Chinese Chopsuey", "Noodles", "Chinese Chopsuey", 165, "non-veg", IMG.noodles, {
    tags: ["noodles", "chicken"],
  }),
  m("Prawn Chinese Chopsuey", "Noodles", "Chinese Chopsuey", 179, "non-veg", IMG.noodles, {
    tags: ["noodles", "prawn"],
  }),
  m("Mix Chinese Chopsuey", "Noodles", "Chinese Chopsuey", 199, "non-veg", IMG.noodles, { tags: ["noodles"] }),

  /* ═══ SIDE DISH — VEG ═══ */
  m("Chilli Paneer (8 Pcs)", "Chinese Sides", "Side Dish — Veg", 169, "veg", IMG.paneer, { tags: ["spicy"] }),
  m("Veg Ball Manchurian (8 Pcs)", "Chinese Sides", "Side Dish — Veg", 129, "veg", IMG.paneer, { tags: ["spicy"] }),
  m("Mushroom Chilli", "Chinese Sides", "Side Dish — Veg", 169, "veg", IMG.paneer, { tags: ["spicy"] }),
  m("Stir Fry Vegetable in Hot Garlic Sauce", "Chinese Sides", "Side Dish — Veg", 149, "veg", IMG.paneer, {
    tags: ["spicy"],
  }),

  /* ═══ SIDE DISH — NON-VEG ═══ */
  m("Chilli Chicken (8 Pcs)", "Chinese Sides", "Side Dish — Non-Veg", 159, "non-veg", IMG.chilliChicken, {
    popular: true,
    tags: ["spicy", "chicken"],
  }),
  m("Manchurian Chicken (8 Pcs)", "Chinese Sides", "Side Dish — Non-Veg", 179, "non-veg", IMG.chilliChicken, {
    tags: ["spicy", "chicken"],
  }),
  m("Schezwan Chicken (8 Pcs)", "Chinese Sides", "Side Dish — Non-Veg", 179, "non-veg", IMG.chilliChicken, {
    tags: ["spicy", "chicken"],
  }),
  m("Chicken with Hot Garlic Sauce", "Chinese Sides", "Side Dish — Non-Veg", 169, "non-veg", IMG.chilliChicken, {
    tags: ["spicy", "chicken"],
  }),
  m("Ginger Chicken", "Chinese Sides", "Side Dish — Non-Veg", 159, "non-veg", IMG.chilliChicken, {
    tags: ["chicken"],
  }),
  m("Hunan Chicken", "Chinese Sides", "Side Dish — Non-Veg", 179, "non-veg", IMG.chilliChicken, {
    tags: ["spicy", "chicken"],
  }),
  m("Garlic Chicken", "Chinese Sides", "Side Dish — Non-Veg", 159, "non-veg", IMG.chilliChicken, {
    tags: ["chicken"],
  }),
  m("Sweet & Sour Chicken", "Chinese Sides", "Side Dish — Non-Veg", 189, "non-veg", IMG.chilliChicken, {
    tags: ["chicken"],
  }),
  m("Chicken with Mix Vegetables", "Chinese Sides", "Side Dish — Non-Veg", 185, "non-veg", IMG.chilliChicken, {
    tags: ["chicken"],
  }),

  /* ═══ FISH (CHINESE) — SIDE DISH (NEW) ═══ */
  m("Chilli Fish", "Chinese Sides", "Fish — Chinese Side Dish", 189, "non-veg", IMG.chilliChicken, {
    isNew: true,
    tags: ["spicy", "prawn"],
  }),
  m("Hot Garlic Fish", "Chinese Sides", "Fish — Chinese Side Dish", 209, "non-veg", IMG.chilliChicken, {
    isNew: true,
    tags: ["spicy", "prawn"],
  }),
  m("Garlic Fish", "Chinese Sides", "Fish — Chinese Side Dish", 199, "non-veg", IMG.chilliChicken, {
    isNew: true,
    tags: ["prawn"],
  }),
  m("Schezwan Fish", "Chinese Sides", "Fish — Chinese Side Dish", 209, "non-veg", IMG.chilliChicken, {
    isNew: true,
    tags: ["spicy", "prawn"],
  }),

  /* ═══ INDIAN VEG (NEW) ═══ */
  m("Paneer Butter Masala", "Indian", "Indian Veg", 250, "veg", IMG.tandoor, {
    halfPrice: 120,
    isNew: true,
  }),
  m("Mix Veg", "Indian", "Indian Veg", 140, "veg", IMG.tandoor, { isNew: true }),
  m("Kashmiri Aloo Masala", "Indian", "Indian Veg", 120, "veg", IMG.tandoor, { isNew: true }),
  m("Matar Paneer", "Indian", "Indian Veg", 200, "veg", IMG.tandoor, { halfPrice: 120, isNew: true }),
  m("Palak Paneer", "Indian", "Indian Veg", 220, "veg", IMG.tandoor, { halfPrice: 120, isNew: true }),

  /* ═══ INDIAN NON-VEG (NEW) ═══ */
  m("Ch Butter Masala (4/2 Pcs)", "Indian", "Indian Non-Veg", 320, "non-veg", IMG.tandoor, {
    halfPrice: 170,
    isNew: true,
    tags: ["chicken"],
  }),
  m("Ch Tikka Butter Masala (6/3 Pcs)", "Indian", "Indian Non-Veg", 340, "non-veg", IMG.tandoor, {
    halfPrice: 180,
    isNew: true,
    tags: ["chicken"],
  }),
  m("Ch Reshmi Butter Masala (6/3 Pcs)", "Indian", "Indian Non-Veg", 360, "non-veg", IMG.tandoor, {
    halfPrice: 190,
    isNew: true,
    tags: ["chicken"],
  }),
  m("Ch Tangri Butter Masala (4/2 Pcs)", "Indian", "Indian Non-Veg", 400, "non-veg", IMG.tandoor, {
    halfPrice: 210,
    isNew: true,
    tags: ["chicken"],
  }),
  m("Ch Bharta", "Indian", "Indian Non-Veg", 200, "non-veg", IMG.tandoor, { isNew: true, tags: ["chicken"] }),
  m("Egg Curry", "Indian", "Indian Non-Veg", 160, "non-veg", IMG.tandoor, { isNew: true }),
  m("Egg Masala", "Indian", "Indian Non-Veg", 180, "non-veg", IMG.tandoor, { isNew: true }),

  /* ═══ CHICKEN (NEW) ═══ */
  m("Chicken Kassa (4/2 Pcs)", "Indian", "Chicken", 250, "non-veg", IMG.tandoor, {
    halfPrice: 150,
    isNew: true,
    tags: ["chicken"],
  }),
  m("Chicken Chap", "Indian", "Chicken", 150, "non-veg", IMG.tandoor, { isNew: true, tags: ["chicken"] }),
  m("Chicken Dahi Masala (4/2 Pcs)", "Indian", "Chicken", 260, "non-veg", IMG.tandoor, {
    halfPrice: 140,
    isNew: true,
    tags: ["chicken"],
  }),
  m("Chicken Kalia (1 Pcs)", "Indian", "Chicken", 140, "non-veg", IMG.tandoor, { isNew: true, tags: ["chicken"] }),

  /* ═══ MUTTON (NEW) ═══ */
  m("Mutton Kassa (4/2 Pcs)", "Indian", "Mutton", 300, "non-veg", IMG.tandoor, {
    halfPrice: 160,
    isNew: true,
    tags: ["mutton"],
  }),
  m("Mutton Chap", "Indian", "Mutton", 300, "non-veg", IMG.tandoor, { isNew: true, tags: ["mutton"] }),
  m("Mutton Dahi Masala (4/2 Pcs)", "Indian", "Mutton", 320, "non-veg", IMG.tandoor, {
    halfPrice: 170,
    isNew: true,
    tags: ["mutton"],
  }),
  m("Mutton Kalia (2 Pcs)", "Indian", "Mutton", 300, "non-veg", IMG.tandoor, { isNew: true, tags: ["mutton"] }),

  /* ═══ TADKA (NEW) ═══ */
  m("Plain Tadka", "Indian", "Tadka", 50, "veg", IMG.tandoor, { isNew: true }),
  m("Egg Tadka", "Indian", "Tadka", 60, "non-veg", IMG.tandoor, { isNew: true }),
  m("Chicken Tadka", "Indian", "Tadka", 90, "non-veg", IMG.tandoor, { isNew: true, tags: ["chicken"] }),
  m("Butter Plain Tadka", "Indian", "Tadka", 80, "veg", IMG.tandoor, { isNew: true }),

  /* ═══ ROTI ═══ */
  m("Tandoor Roti", "Breads", "Roti & Naan", 15, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Butter Roti", "Breads", "Roti & Naan", 20, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Plain Naan", "Breads", "Roti & Naan", 20, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Butter Naan", "Breads", "Roti & Naan", 30, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Garlic Naan", "Breads", "Roti & Naan", 40, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Masala Kulcha", "Breads", "Roti & Naan", 40, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Paneer Kulcha", "Breads", "Roti & Naan", 60, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Tandoori Lachha Paratha", "Breads", "Roti & Naan", 20, "veg", IMG.tandoor, { tags: ["tandoor"] }),
  m("Tandoori Butter Lachha Paratha", "Breads", "Roti & Naan", 30, "veg", IMG.tandoor, { tags: ["tandoor"] }),

  /* ═══ SIAN SPECIAL COMBO ═══ */
  m("Sian Special Veg Combo", "Combos", "Sian Special Combo", 549, "veg", IMG.hero, {
    description:
      "Paneer Tikka + Veg Fried Momo + Veg Chilli Garlic Hakka + Veg Paneer Biryani + Mix Veg + Masala Kulcha + 2 Cold Drinks",
    serves: "Full spread — built for sharing",
  }),
  m("Sian Special Non-Veg Combo", "Combos", "Sian Special Combo", 599, "non-veg", IMG.hero, {
    popular: true,
    description:
      "Drums of Heaven + Ch. Chilli Garlic Hakka + Chilli Ch. (Gravy) + Butter Naan + Ch. Dahi Masala + Egg Biryani + Tandoori Ch. + 2 Cold Drinks",
    serves: "Full spread — built for sharing",
    tags: ["chicken"],
  }),

  /* ═══ CHINESE COMBO — VEG (NEW) ═══ */
  m("Chinese Veg Combo — Mini", "Combos", "Chinese Combo — Veg", 419, "veg", IMG.hero, {
    isNew: true,
    description:
      "½ Classic Veg Fried Rice + 4 Pcs Chilli Paneer + 4 Pcs Veg Ball Manchurian + 2 Pcs Veg Pan Fried Momo + 1 Cold Drink",
  }),
  m("Chinese Veg Combo — Large", "Combos", "Chinese Combo — Veg", 449, "veg", IMG.hero, {
    isNew: true,
    description:
      "1 Classic Veg Fried Rice + 1 Veg Schezwan Hakka + 4 Pcs Chilli Paneer (Gravy) + 4 Pcs Veg Momo + 1 Cold Drink",
  }),

  /* ═══ CHINESE COMBO — NON-VEG (NEW) ═══ */
  m("Chinese Non-Veg Combo — Mini", "Combos", "Chinese Combo — Non-Veg", 429, "non-veg", IMG.hero, {
    isNew: true,
    description:
      "½ Mix Burnt Garlic Rice + ½ Egg Hakka + 4 Pcs Chicken Pan Fried Momo + 4 Pcs Chilli Chicken (Gravy) + 1 Cold Drink",
  }),
  m("Chinese Non-Veg Combo — Large", "Combos", "Chinese Combo — Non-Veg", 499, "non-veg", IMG.hero, {
    isNew: true,
    description:
      "1 Mix Fried Rice + 1 Chicken Chilli + 3 Pcs Garlic Noodles + 6 Pcs Dry Chilli Chicken + 4 Pcs Drums of Heaven + 1 Cold Drink",
  }),

  /* ═══ SALAD ═══ */
  m("Green Salad", "Extras", "Salad", 40, "veg", IMG.paneer, {}),
  m("Onion Salad", "Extras", "Salad", 30, "veg", IMG.paneer, {}),

  /* ═══ RAITA ═══ */
  m("Mix Raita", "Extras", "Raita", 30, "veg", IMG.biryani, {}),

  /* ═══ DESSERT (prices confirmed at the restaurant) ═══ */
  m("Firni", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Gulab Jamun", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Gajar Halwa", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Ice-Cream", "Extras", "Dessert", null, "veg", IMG.hero, {}),
  m("Rasgulla", "Extras", "Dessert", null, "veg", IMG.hero, {}),

  /* ═══ BEVERAGES (prices confirmed at the restaurant) ═══ */
  m("Lassi", "Extras", "Beverages", null, "veg", IMG.hero, {}),
  m("Cold Drinks", "Extras", "Beverages", null, "veg", IMG.hero, {}),
  m("Water 1/2 Ltr.", "Extras", "Beverages", null, "veg", IMG.hero, {}),
];

/* Tab order — only categories that exist in the data are shown */
const CATEGORY_ORDER = [
  "Starters",
  "Soups",
  "Tandoor",
  "Momos",
  "Biryani",
  "Rice & Pulao",
  "Fried Rice",
  "Noodles",
  "Chinese Sides",
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
