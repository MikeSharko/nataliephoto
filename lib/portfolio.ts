// Portfolio data. Texts for each category live here in code;
// the photos come from Sanity (galleries in the Studio). While a gallery is empty,
// the site shows labelled placeholder boxes instead.

import { cache } from "react";
import type { Accent } from "@/lib/accents";
import { client, imageFields, toPhoto, type SanityImage } from "@/lib/sanity";

export type CategorySlug = "food" | "product" | "people";

export type Photo = {
  src?: string; // image URL; no src = placeholder box
  alt: string;
  width: number;
  height: number;
  category: CategorySlug;
  focus?: { x: number; y: number }; // focus point chosen in Sanity (0–1), keeps it visible when cropped
  blurDataURL?: string; // tiny blurred preview shown while the photo loads
};

export type Category = {
  slug: CategorySlug;
  navLabel: string; // short name for menus and filters
  title: string; // full name for breadcrumbs and cards
  accent: Accent;
  headline: string;
  intro: string;
  metaDescription: string;
  layout: "masonry" | "grid";
  card: { description: string; linkLabel: string };
  services: { title: string; text: string }[];
  cta: { title: string; text: string };
  placeholders: Photo[]; // shown until the gallery in Sanity has photos
};

// Shortcut for placeholder photos: same width, different heights for the masonry rhythm
const photo = (category: CategorySlug, alt: string, height = 1400, width = 1200): Photo => ({
  alt,
  width,
  height,
  category,
});

export const categories: Category[] = [
  {
    slug: "food",
    navLabel: "Food",
    title: "Food",
    accent: "clay",
    headline: "Dishes that look the way they taste.",
    // TODO: two sentences from Natalie about her approach to food
    intro:
      "Natural light, real plating and close work with the chef, so every dish on the menu looks as good as it tastes.",
    metaDescription:
      "Food photography in San Diego: menus, restaurants and cafes, recipes, food styling and social content.",
    layout: "masonry",
    card: {
      description: "Menus, restaurant and cafe content, recipe and cookbook shoots, styling for social.",
      linkLabel: "View food work",
    },
    services: [
      { title: "Menu photography", text: "Full menu shot in a day, consistent light and angles across every dish." },
      { title: "Restaurants & cafes", text: "Food, drinks, room and atmosphere, shot on location during off-hours." },
      { title: "Recipes & cookbooks", text: "Step-by-step and hero images for publishers, blogs and brand recipe pages." },
      { title: "Food styling", text: "Props, surfaces and plating handled in-house, or alongside your stylist." },
      { title: "Social content", text: "Verticals and short clips delivered in batches for a month of posting." },
      { title: "Packaging & CPG", text: "Food and beverage products shot for packaging, listings and advertising." },
    ],
    cta: {
      title: "Have a menu to shoot?",
      text: "Send over the dishes, your dates and roughly what you need the images for.",
    },
    placeholders: [
      photo("food", "Plated dish", 1680),
      photo("food", "Table scene", 960),
      photo("food", "Drinks", 1240),
      photo("food", "Ingredients flat lay", 1100),
      photo("food", "Pour shot", 1800),
      photo("food", "Dessert detail", 960),
      photo("food", "Cafe interior", 1160),
      photo("food", "Hands at work", 1420),
      photo("food", "Menu hero", 1040),
    ],
  },
  {
    slug: "product",
    navLabel: "Product",
    title: "Product & Still Life",
    accent: "sage",
    headline: "Objects, lit with patience.",
    // TODO: two sentences from Natalie about her product work
    intro:
      "Clean surfaces, considered shadow and images that hold up next to the packaging itself.",
    metaDescription:
      "Product and still life photography in San Diego: e-commerce packshots, skincare and cosmetics, flat lays and creative still life.",
    layout: "masonry", // whole photos, never cropped
    card: {
      description: "Skincare and cosmetics, accessories, e-commerce packshots, creative still life.",
      linkLabel: "View product work",
    },
    services: [
      { title: "E-commerce packshots", text: "Clean images on white, consistent across a whole range, sized for any storefront." },
      { title: "Skincare & cosmetics", text: "Bottles, jars and textures, with the reflections and labels actually readable." },
      { title: "Creative still life", text: "Set-built images with colour, shadow and props, for campaigns and print." },
      { title: "Flat lays", text: "Overhead arrangements for social, lookbooks and seasonal launches." },
      { title: "Lifestyle product", text: "Products in context — hands, surfaces, daylight — for ads and brand pages." },
      { title: "Marketplace-ready", text: "Files prepared to Amazon and Shopify specs, delivered ready to upload." },
    ],
    cta: {
      title: "Launching something?",
      text: "Tell me how many products, where the images will live, and when you need them.",
    },
    placeholders: [
      photo("product", "Serum bottle"),
      photo("product", "Packshot on white"),
      photo("product", "Cream jar in hard light"),
      photo("product", "Texture swatch"),
      photo("product", "Accessories flat lay"),
      photo("product", "Full range group shot"),
      photo("product", "Jewellery detail"),
      photo("product", "Product in use"),
      photo("product", "Composed still life"),
    ],
  },
  {
    slug: "people",
    navLabel: "People",
    title: "People",
    accent: "plum",
    headline: "Real people, honest light.",
    // TODO: two sentences from Natalie about her portrait work
    intro:
      "Relaxed direction and natural light, for portraits that feel like the person rather than a stock photo.",
    metaDescription:
      "Portrait and brand photography in San Diego: brand portraits, headshots, chefs and restaurant teams, founders and makers.",
    layout: "masonry", // whole photos, never cropped
    card: {
      description: "Brand portraits, headshots, chefs and teams, founders and makers at work.",
      linkLabel: "View people work",
    },
    services: [
      { title: "Brand portraits", text: "Portraits for your website, press and social, in your space or on location." },
      { title: "Headshots", text: "Clean, consistent headshots for individuals and whole teams." },
      { title: "Chefs & restaurant teams", text: "The people behind the food: in the kitchen, at the pass, front of house." },
      { title: "Founders & makers", text: "Small-business owners and makers, photographed doing what they do." },
      { title: "Lifestyle with product", text: "Real people using your product, for ads, packaging and brand pages." },
      { title: "Content days", text: "A half or full day of portraits and behind-the-scenes images for social." },
    ],
    cta: {
      title: "Need new portraits?",
      text: "Tell me who we are photographing, where the images will be used, and when you need them.",
    },
    placeholders: [
      photo("people", "Brand portrait", 1500),
      photo("people", "Chef at work", 1500),
      photo("people", "Headshot", 1500),
      photo("people", "Founder in studio", 1500),
      photo("people", "Lifestyle with product", 1500),
      photo("people", "Team photo", 1500),
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

// --- Photos from Sanity ---------------------------------------------------

type GalleryResult = { _id: string; images: SanityImage[] | null };

// All three galleries in one request. cache() means one request per page,
// even when several components on the page ask for photos.
const getGalleries = cache(async () => {
  const result = await client.fetch<GalleryResult[]>(
    `*[_type == "gallery"]{ _id, "images": images[defined(asset)]{ ${imageFields} } }`,
  );

  const photos: Record<CategorySlug, Photo[]> = { food: [], product: [], people: [] };
  for (const gallery of result) {
    const slug = gallery._id.replace("gallery-", "") as CategorySlug; // "gallery-food" → "food"
    if (!(slug in photos)) continue;
    photos[slug] = (gallery.images ?? [])
      .map((image) => toPhoto(image, slug))
      .filter((item): item is Photo => item !== undefined);
  }
  return photos;
});

// Photos of one category, in the order Natalie set in the Studio
export async function getCategoryPhotos(slug: CategorySlug): Promise<Photo[]> {
  const galleries = await getGalleries();
  if (galleries[slug].length > 0) return galleries[slug];
  return getCategory(slug)?.placeholders ?? [];
}

// First photo of each gallery: used for the category cards on the home page
export async function getCoverPhoto(slug: CategorySlug): Promise<Photo> {
  const [first] = await getCategoryPhotos(slug);
  return first;
}

// Mixes lists together: food, product, people, food, product, ...
function interleave(lists: Photo[][]): Photo[] {
  const longest = Math.max(0, ...lists.map((list) => list.length));
  const mixed: Photo[] = [];
  for (let i = 0; i < longest; i++) {
    for (const list of lists) {
      if (list[i]) mixed.push(list[i]);
    }
  }
  return mixed;
}

// All categories mixed together for the Portfolio page
export async function getAllPhotos(): Promise<Photo[]> {
  const lists = await Promise.all(categories.map((category) => getCategoryPhotos(category.slug)));
  return interleave(lists);
}

// "Selected work" on the home page: the next photos after each gallery's cover,
// so the same photo doesn't appear twice on the page
export async function getSelectedWork(): Promise<Photo[]> {
  const lists = await Promise.all(categories.map((category) => getCategoryPhotos(category.slug)));
  const withoutCovers = interleave(lists.map((list) => list.slice(1)));
  return (withoutCovers.length > 0 ? withoutCovers : interleave(lists)).slice(0, 6);
}

// --- Home page photos (Studio → Home page) ----------------------------------

const heroPlaceholder = photo("food", "Overhead table scene", 1050, 2400);
const portraitPlaceholder = photo("people", "Portrait of Natalie", 1600);

const getHome = cache(async () =>
  client.fetch<{
    hero: SanityImage | null;
    heroDarkness: number | null;
    flashLight: { x?: number; y?: number } | null;
    portrait: SanityImage | null;
  } | null>(
    `*[_id == "home"][0]{
      "hero": heroImage{ ${imageFields} },
      heroDarkness,
      flashLight,
      "portrait": portrait{ ${imageFields} }
    }`,
  ),
);

// Hero photo from the Studio; until it's set, the first Food photo or a placeholder
export async function getHeroPhoto(): Promise<Photo> {
  const home = await getHome();
  return toPhoto(home?.hero, "food") ?? (await getGalleries()).food[0] ?? heroPlaceholder;
}

// How much the dark layer covers the hero photo, 0–90 (%). Default 40 until set in the Studio.
export async function getHeroDarkness(): Promise<number> {
  const home = await getHome();
  return Math.min(90, Math.max(0, home?.heroDarkness ?? 40));
}

// Blinking red light on the hero photo (position in % of the photo), or undefined when not set
export async function getHeroFlashLight(): Promise<{ x: number; y: number } | undefined> {
  const light = (await getHome())?.flashLight;
  if (typeof light?.x !== "number" || typeof light?.y !== "number") return undefined;
  return { x: light.x, y: light.y };
}

export async function getPortraitPhoto(): Promise<Photo> {
  const home = await getHome();
  return toPhoto(home?.portrait, "people") ?? portraitPlaceholder;
}
