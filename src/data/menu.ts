/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SIAN KITCHEN — MENU DATA  ·  THE SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  PLACEHOLDER DATASET.
 * This file currently holds the launch-candidate menu. When the restaurant's
 * FINAL menu is supplied, replace the entries in `MENU` below 1:1 —
 * names, prices, categories, descriptions and availability.
 *
 * Rules baked into the architecture:
 *   • Nothing in any component is hardcoded — the whole site renders from
 *     this array (featured dishes, menu grid, gallery links, WhatsApp orders).
 *   • `popular: true`  → powers the "Worth Coming Hungry For" section + badge.
 *   • `available`      → controls "Unavailable today" state & ordering.
 *   • `tags`           → power the "What are you craving?" discovery filter.
 *   • `image`          → swap for final photography without touching any code.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type DishType = "veg" | "non-veg";

export type CravingTag = "spicy" | "crispy" | "noodles" | "rice" | "chicken";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number; // ₹
  type: DishType;
  description: string;
  image: string;
  popular?: boolean;
  available: boolean;
  serves?: string;
  tags?: CravingTag[];
}

export interface MenuFilters {
  category: string; // "All" or a category name
  type: "all" | DishType;
  query: string;
  tag: CravingTag | null;
}

/* Placeholder photography — replace with the restaurant's real images. */
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

export const MENU: MenuItem[] = [
  /* ── Starters ─────────────────────────────────────────────────────────── */
  {
    id: "drums-of-heaven",
    name: "Drums of Heaven",
    category: "Starters",
    price: 209,
    type: "non-veg",
    description:
      "Crackly fried chicken drumettes lacquered in a sticky garlic-chilli glaze, finished with sesame and scallion.",
    image: IMG.drums,
    popular: true,
    available: true,
    tags: ["crispy", "chicken"],
  },
  {
    id: "schezwan-chicken",
    name: "Schezwan Chicken",
    category: "Starters",
    price: 219,
    type: "non-veg",
    description:
      "Golden-fried chicken tossed through fiery schezwan sauce with dried red chillies and crunchy peppers.",
    image: IMG.chilliChicken,
    popular: true,
    available: true,
    tags: ["spicy", "chicken"],
  },
  {
    id: "garlic-chicken",
    name: "Garlic Chicken",
    category: "Starters",
    price: 219,
    type: "non-veg",
    description:
      "Wok-tossed chicken in a glossy roasted-garlic and soy sauce — savoury, sticky, impossible to share.",
    image: IMG.chilliChicken,
    popular: true,
    available: true,
    tags: ["chicken"],
  },
  {
    id: "chicken-65",
    name: "Chicken 65",
    category: "Starters",
    price: 229,
    type: "non-veg",
    description:
      "Fiery South-Indian style fried chicken bites with curry leaf, dried red chilli and a squeeze of lime.",
    image: IMG.chilliChicken,
    popular: true,
    available: true,
    tags: ["spicy", "crispy", "chicken"],
  },
  {
    id: "chilli-paneer",
    name: "Chilli Paneer",
    category: "Starters",
    price: 209,
    type: "veg",
    description:
      "Seared paneer cubes flash-tossed with charred capsicum, onion petals and a glossy soy-chilli sauce.",
    image: IMG.paneer,
    popular: true,
    available: true,
    tags: ["spicy"],
  },
  {
    id: "chicken-tikka-kebab",
    name: "Chicken Tikka Kebab",
    category: "Starters",
    price: 239,
    type: "non-veg",
    description:
      "Smoky clay-oven chicken tikka, charred at the edges, served with laccha onions and mint chutney.",
    image: IMG.tandoor,
    popular: true,
    available: true,
    tags: ["chicken"],
  },
  {
    id: "gobi-manchurian",
    name: "Gobi Manchurian",
    category: "Starters",
    price: 189,
    type: "veg",
    description: "Crisp cauliflower florets in a sweet-spicy Manchurian glaze with spring onion.",
    image: IMG.paneer,
    available: true,
    tags: ["crispy"],
  },
  {
    id: "paneer-65",
    name: "Paneer 65",
    category: "Starters",
    price: 219,
    type: "veg",
    description: "Crisp paneer bites coated in the classic 65 masala — curry leaf, red chilli and lime.",
    image: IMG.paneer,
    available: true,
    tags: ["spicy", "crispy"],
  },

  /* ── Soups ────────────────────────────────────────────────────────────── */
  {
    id: "veg-hot-and-sour",
    name: "Veg Hot & Sour Soup",
    category: "Soups",
    price: 149,
    type: "veg",
    description:
      "Silky broth with shredded vegetables and tofu — hot with white pepper, bright with vinegar.",
    image: IMG.soup,
    available: true,
    tags: ["spicy"],
  },
  {
    id: "chicken-hot-and-sour",
    name: "Chicken Hot & Sour Soup",
    category: "Soups",
    price: 169,
    type: "non-veg",
    description: "The classic Indo-Chinese opener — shredded chicken in a peppery, tangy broth.",
    image: IMG.soup,
    available: true,
    tags: ["spicy", "chicken"],
  },
  {
    id: "chicken-sweet-corn",
    name: "Chicken Sweet Corn Soup",
    category: "Soups",
    price: 169,
    type: "non-veg",
    description: "Comforting sweet corn and chicken ribbons in a silky, lightly seasoned broth.",
    image: IMG.soup,
    available: true,
    tags: ["chicken"],
  },

  /* ── Momos ────────────────────────────────────────────────────────────── */
  {
    id: "steamed-chicken-momos",
    name: "Steamed Chicken Momos",
    category: "Momos",
    price: 149,
    type: "non-veg",
    description: "Hand-pleated steamed dumplings with a juicy chicken filling and fiery red chutney.",
    image: IMG.momos,
    available: true,
    tags: ["chicken"],
  },
  {
    id: "fried-chicken-momos",
    name: "Fried Chicken Momos",
    category: "Momos",
    price: 169,
    type: "non-veg",
    description: "Golden, crackly fried momos with a juicy chicken heart — crunch outside, steam inside.",
    image: IMG.momos,
    available: true,
    tags: ["crispy", "chicken"],
  },
  {
    id: "steamed-veg-momos",
    name: "Steamed Veg Momos",
    category: "Momos",
    price: 129,
    type: "veg",
    description: "Garden vegetables folded into delicate wrappers, served with chilli-garlic chutney.",
    image: IMG.momos,
    available: true,
  },
  {
    id: "chilli-garlic-momos",
    name: "Chilli Garlic Momos",
    category: "Momos",
    price: 179,
    type: "non-veg",
    description: "Pan-fired chicken momos glazed in a pungent chilli-garlic sauce with scallion and sesame.",
    image: IMG.momos,
    available: true,
    tags: ["spicy", "chicken"],
  },

  /* ── Rice ─────────────────────────────────────────────────────────────── */
  {
    id: "chicken-65-rice-bowl",
    name: "Chicken 65 Rice Bowl",
    category: "Rice",
    price: 249,
    type: "non-veg",
    description: "Steamed rice piled high with fiery chicken 65 — one bowl, every craving.",
    image: IMG.chilliChicken,
    available: true,
    tags: ["spicy", "rice", "chicken"],
  },
  {
    id: "schezwan-chicken-rice-bowl",
    name: "Schezwan Chicken Rice Bowl",
    category: "Rice",
    price: 249,
    type: "non-veg",
    description: "Wok-fried rice finished with schezwan chicken and spring onion. Heat guaranteed.",
    image: IMG.chilliChicken,
    available: true,
    tags: ["spicy", "rice", "chicken"],
  },

  /* ── Fried Rice ───────────────────────────────────────────────────────── */
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    category: "Fried Rice",
    price: 199,
    type: "non-veg",
    description: "Wok-breathed rice with tender chicken, egg and spring onion — the Indo-Chinese classic.",
    image: IMG.hero,
    available: true,
    tags: ["rice", "chicken"],
  },
  {
    id: "egg-fried-rice",
    name: "Egg Fried Rice",
    category: "Fried Rice",
    price: 189,
    type: "non-veg",
    description: "Smoky, golden egg fried rice tossed over a roaring flame.",
    image: IMG.hero,
    available: true,
    tags: ["rice"],
  },
  {
    id: "veg-fried-rice",
    name: "Veg Fried Rice",
    category: "Fried Rice",
    price: 179,
    type: "veg",
    description: "Garden vegetables and fragrant rice, wok-tossed the classic way.",
    image: IMG.hero,
    available: true,
    tags: ["rice"],
  },
  {
    id: "schezwan-chicken-fried-rice",
    name: "Schezwan Chicken Fried Rice",
    category: "Fried Rice",
    price: 219,
    type: "non-veg",
    description: "Fried rice with a fiery schezwan kick, loaded with chicken and peppers.",
    image: IMG.hero,
    available: true,
    tags: ["spicy", "rice", "chicken"],
  },

  /* ── Noodles ──────────────────────────────────────────────────────────── */
  {
    id: "mix-hakka",
    name: "Mix Hakka",
    category: "Noodles",
    price: 209,
    type: "non-veg",
    description:
      "Kolkata's favourite — chicken, egg and vegetables tossed with springy hakka noodles in soy and vinegar.",
    image: IMG.noodles,
    popular: true,
    available: true,
    tags: ["noodles", "chicken"],
  },
  {
    id: "chicken-hakka",
    name: "Chicken Hakka",
    category: "Noodles",
    price: 199,
    type: "non-veg",
    description: "Springy hakka noodles wok-tossed with tender chicken and crunchy vegetables.",
    image: IMG.noodles,
    available: true,
    tags: ["noodles", "chicken"],
  },
  {
    id: "veg-hakka",
    name: "Veg Hakka",
    category: "Noodles",
    price: 179,
    type: "veg",
    description: "Classic hakka noodles with crisp seasonal vegetables and a light soy finish.",
    image: IMG.noodles,
    available: true,
    tags: ["noodles"],
  },
  {
    id: "schezwan-chicken-noodles",
    name: "Schezwan Chicken Noodles",
    category: "Noodles",
    price: 219,
    type: "non-veg",
    description: "Hakka noodles coated in fiery schezwan sauce with chicken and peppers.",
    image: IMG.noodles,
    available: true,
    tags: ["spicy", "noodles", "chicken"],
  },

  /* ── Biryani ──────────────────────────────────────────────────────────── */
  {
    id: "special-sian-chicken-biryani",
    name: "Special Sian Chicken Biryani",
    category: "Biryani",
    price: 269,
    type: "non-veg",
    description:
      "Our signature dum biryani — saffron rice layered over slow-cooked chicken, sealed and steamed to order.",
    image: IMG.biryani,
    popular: true,
    available: true,
    serves: "Serves 1 generously",
    tags: ["rice", "chicken"],
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    category: "Biryani",
    price: 329,
    type: "non-veg",
    description: "Fragrant dum biryani with slow-cooked mutton, whole spices and saffron rice.",
    image: IMG.biryani,
    available: true,
    serves: "Serves 1 generously",
    tags: ["rice"],
  },
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    category: "Biryani",
    price: 219,
    type: "veg",
    description: "Garden vegetables layered with saffron rice, served with mint raita.",
    image: IMG.biryani,
    available: true,
    tags: ["rice"],
  },

  /* ── Indian ───────────────────────────────────────────────────────────── */
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    category: "Indian",
    price: 279,
    type: "non-veg",
    description:
      "Tandoor-charred chicken simmered in a silky tomato-butter gravy, finished with cream and kasuri methi.",
    image: IMG.tandoor,
    available: true,
    tags: ["chicken"],
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    category: "Indian",
    price: 249,
    type: "veg",
    description: "Soft paneer simmered in a rich, mildly sweet tomato-cashew gravy.",
    image: IMG.tandoor,
    available: true,
  },
  {
    id: "dal-tadka",
    name: "Dal Tadka",
    category: "Indian",
    price: 189,
    type: "veg",
    description: "Slow-cooked yellow lentils finished with a smoky ghee, garlic and cumin tempering.",
    image: IMG.tandoor,
    available: true,
  },

  /* ── Chicken ──────────────────────────────────────────────────────────── */
  {
    id: "chicken-kasha",
    name: "Chicken Kasha",
    category: "Chicken",
    price: 259,
    type: "non-veg",
    description:
      "Kolkata-style slow-braised chicken in a deep, dark onion-and-spice gravy — best with rice or roti.",
    image: IMG.tandoor,
    available: true,
    tags: ["chicken"],
  },
  {
    id: "chicken-rezala",
    name: "Chicken Rezala",
    category: "Chicken",
    price: 269,
    type: "non-veg",
    description: "Royal Kolkata rezala — chicken in a fragrant white yogurt and kewra gravy.",
    image: IMG.tandoor,
    available: false,
    tags: ["chicken"],
  },

  /* ── Mutton ───────────────────────────────────────────────────────────── */
  {
    id: "mutton-kosha",
    name: "Mutton Kosha",
    category: "Mutton",
    price: 339,
    type: "non-veg",
    description: "Slow-cooked Bengali mutton kosha — dark, caramelised, fall-apart tender.",
    image: IMG.tandoor,
    available: true,
  },

  /* ── Combos ───────────────────────────────────────────────────────────── */
  {
    id: "sian-chinese-combo",
    name: "Sian Chinese Combo",
    category: "Combos",
    price: 449,
    type: "non-veg",
    description: "Drums of Heaven, Chicken Hakka and Chicken Fried Rice — the full Kolkata-Chinese spread.",
    image: IMG.hero,
    available: true,
    serves: "For 2",
    tags: ["chicken", "noodles", "rice"],
  },
  {
    id: "biryani-feast-for-two",
    name: "Biryani Feast for Two",
    category: "Combos",
    price: 599,
    type: "non-veg",
    description: "Two Special Sian Chicken Biryanis with mint raita, salan and laccha salad.",
    image: IMG.biryani,
    available: true,
    serves: "For 2",
    tags: ["rice", "chicken"],
  },

  /* ── Sides ────────────────────────────────────────────────────────────── */
  {
    id: "mint-raita",
    name: "Mint Raita",
    category: "Sides",
    price: 49,
    type: "veg",
    description: "Cool whipped yogurt with fresh mint — the biryani's best friend.",
    image: IMG.biryani,
    available: true,
  },
  {
    id: "laccha-onion-salad",
    name: "Laccha Onion Salad",
    category: "Sides",
    price: 59,
    type: "veg",
    description: "Paper-thin onions with lime, green chilli and coriander.",
    image: IMG.tandoor,
    available: true,
  },
];

/* Preferred tab order — tabs that actually have dishes are derived from MENU. */
const CATEGORY_ORDER = [
  "Starters",
  "Soups",
  "Momos",
  "Rice",
  "Fried Rice",
  "Noodles",
  "Biryani",
  "Indian",
  "Chicken",
  "Mutton",
  "Combos",
  "Sides",
];

export const CATEGORIES: string[] = CATEGORY_ORDER.filter((c) =>
  MENU.some((item) => item.category === c)
);

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
      const haystack = `${item.name} ${item.description} ${item.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
