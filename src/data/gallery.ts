import { IMAGES } from "./menu";

/**
 * Gallery entries — placeholder photography. Swap `src` values for the
 * restaurant's real photos; filters are derived from `categories`.
 */
export type GalleryCategory = "Food" | "Restaurant" | "Ambience" | "Specials";

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  alt: string;
  categories: GalleryCategory[];
  aspect: string; // tailwind aspect class, controls masonry rhythm
}

export const GALLERY_FILTERS: Array<"All" | GalleryCategory> = [
  "All",
  "Food",
  "Restaurant",
  "Ambience",
  "Specials",
];

export const GALLERY: GalleryItem[] = [
  {
    id: "g-spread",
    src: IMAGES.hero,
    title: "The Sian Spread",
    alt: "Wok-tossed noodles, dum biryani and chilli chicken served together on a dark wood table",
    categories: ["Food", "Ambience"],
    aspect: "aspect-[4/3]",
  },
  {
    id: "g-drums",
    src: IMAGES.drums,
    title: "Drums of Heaven",
    alt: "Crispy glazed chicken drumettes with sesame and scallion in a dark ceramic bowl",
    categories: ["Specials"],
    aspect: "aspect-square",
  },
  {
    id: "g-noodles",
    src: IMAGES.noodles,
    title: "Mix Hakka",
    alt: "Steaming mix hakka noodles with shredded chicken and vegetables on a dark plate",
    categories: ["Food"],
    aspect: "aspect-[3/4]",
  },
  {
    id: "g-biryani",
    src: IMAGES.biryani,
    title: "Special Sian Chicken Biryani",
    alt: "Saffron chicken dum biryani in a copper handi with mint raita, steam rising",
    categories: ["Specials"],
    aspect: "aspect-[4/5]",
  },
  {
    id: "g-chilli-chicken",
    src: IMAGES.chilliChicken,
    title: "Schezwan Chicken",
    alt: "Glossy schezwan chicken with dried red chillies and peppers in black stoneware",
    categories: ["Food"],
    aspect: "aspect-square",
  },
  {
    id: "g-momos",
    src: IMAGES.momos,
    title: "Steamed Momos",
    alt: "Steamed chicken momos in a bamboo basket with fiery red chutney",
    categories: ["Food"],
    aspect: "aspect-[3/4]",
  },
  {
    id: "g-room",
    src: IMAGES.interior,
    title: "The Dining Room",
    alt: "Warm amber-lit dining room with dark wood tables and brass pendant lights",
    categories: ["Restaurant", "Ambience"],
    aspect: "aspect-[4/5]",
  },
  {
    id: "g-paneer",
    src: IMAGES.paneer,
    title: "Chilli Paneer",
    alt: "Seared paneer with charred capsicum in a glossy soy-chilli sauce",
    categories: ["Food"],
    aspect: "aspect-[4/3]",
  },
  {
    id: "g-tandoor",
    src: IMAGES.tandoor,
    title: "From the Tandoor",
    alt: "Charred chicken tikka skewers with a brass kadai of butter chicken gravy",
    categories: ["Specials"],
    aspect: "aspect-[3/4]",
  },
  {
    id: "g-soup",
    src: IMAGES.soup,
    title: "Hot & Sour Soup",
    alt: "Hot and sour soup with egg ribbons and scallions, steam rising from a dark bowl",
    categories: ["Food"],
    aspect: "aspect-square",
  },
];
