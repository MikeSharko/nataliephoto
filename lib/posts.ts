// Blog posts. In video 2 these move to Sanity, and Natalie writes them in Sanity Studio.
// TODO: Natalie should review and rewrite these starter articles in her own voice.

import type { Accent } from "@/lib/accents";
import type { Photo } from "@/lib/portfolio";

export type PostCategorySlug = "food" | "product" | "guides" | "behind-the-scenes";

export const postCategories: { slug: PostCategorySlug; label: string; accent: Accent }[] = [
  { slug: "food", label: "Food", accent: "clay" },
  { slug: "product", label: "Product", accent: "sage" },
  { slug: "guides", label: "Guides", accent: "neutral" },
  { slug: "behind-the-scenes", label: "Behind the scenes", accent: "neutral" },
];

// The article body is a list of simple blocks, rendered by components/blog/PostBody.tsx
export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; photo: Photo; caption?: string }
  | { type: "quote"; text: string }
  | { type: "checklist"; title: string; items: string[] };

export type Post = {
  slug: string; // becomes the URL: /blog/<slug>/
  title: string;
  excerpt: string; // used in cards and as the meta description
  category: PostCategorySlug;
  date?: string; // ISO date "2026-10-20"; set when the post is published
  featured?: boolean;
  cover: Photo;
  body: Block[];
};

const cover = (category: Photo["category"], alt: string): Photo => ({ alt, width: 1600, height: 1100, category });

export const posts: Post[] = [
  {
    slug: "how-to-prepare-for-a-restaurant-menu-photoshoot",
    title: "How to prepare your restaurant for a menu photoshoot",
    excerpt: "What to cook, what to bring, and how to plan the day so every dish is shot at its best.",
    category: "guides",
    featured: true,
    cover: cover("food", "Restaurant table laid out for a menu shoot"),
    body: [
      { type: "paragraph", text: "A menu shoot moves fast. The kitchen is cooking for the camera instead of for guests, the light changes through the day, and every dish needs to look as good in the photo as it does on the table. A little preparation makes the difference between a rushed day and a calm one." },
      { type: "heading", text: "1. Decide where the images will live" },
      { type: "paragraph", text: "Your website, delivery apps, printed menus and social posts all need different crops. Make a list of every place the photos will appear before the shoot, so the shot list covers wide, square and vertical formats." },
      { type: "heading", text: "2. Build the shot list with the kitchen" },
      { type: "paragraph", text: "Agree the order of dishes with the chef in advance. Grouping dishes that share a surface or a set means fewer changes during the day. A typical list covers:" },
      { type: "list", items: ["Hero dishes and bestsellers", "Drinks and desserts", "Details: hands, pours, fresh ingredients", "The room, the bar and the team"] },
      { type: "image", photo: { alt: "Fresh ingredients laid out before service", width: 1600, height: 1000, category: "food" } },
      { type: "heading", text: "3. Cook for the camera" },
      { type: "paragraph", text: "Plate one dish at a time, right before it is photographed. Vegetables hold their colour when slightly undercooked, and sauces and garnishes look freshest when added at the very last moment." },
      { type: "quote", text: "The best menu photos look like the dish just arrived at your table." },
      { type: "heading", text: "4. Plan the day around the light" },
      { type: "paragraph", text: "Book the shoot for the quietest part of the day, often between lunch and dinner service, and keep a table near a window free. Allow roughly ten to fifteen minutes per dish, plus time for drinks, details and the room." },
      { type: "checklist", title: "Shoot-day checklist", items: ["Final menu and agreed shot list", "Ingredients for two portions of each hero dish", "Clean plates, cutlery and glassware", "A free table near a window", "Someone from the kitchen on hand all day"] },
      { type: "paragraph", text: "Planning a menu shoot in San Diego? Get in touch and we can build the shot list together." },
    ],
  },
  {
    slug: "natural-light-vs-studio-light-for-food-photography",
    title: "Natural light vs. studio light for food photography",
    excerpt: "When window light is enough, when it isn't, and what changes for the final images.",
    category: "food",
    cover: cover("food", "Plated dish by a window"),
    body: [
      { type: "paragraph", text: "Both can produce beautiful food photos. The right choice depends less on taste and more on where the shoot happens, how long it lasts and how consistent the images need to be." },
      { type: "heading", text: "When window light is enough" },
      { type: "paragraph", text: "A large window with soft, indirect light is ideal for small menus, recipes and social content. It gives a natural, airy look and needs very little equipment, which keeps the shoot quick and unobtrusive in a working restaurant." },
      { type: "heading", text: "When studio light is the better choice" },
      { type: "paragraph", text: "Studio lights keep every image identical from the first dish to the last, which matters for large menus, delivery apps and e-commerce. They also make it possible to shoot at night or in rooms without good windows." },
      { type: "list", items: ["Many dishes that must match each other", "Long shoots where daylight would change", "Dark dining rooms or evening schedules", "Images that will be printed large"] },
      { type: "paragraph", text: "Often the best answer is both: daylight as the main source, with a light or reflector to keep it steady through the day." },
    ],
  },
  {
    slug: "shooting-skincare-labels-and-reflections",
    title: "Shooting skincare: getting labels and reflections right",
    excerpt: "Glass, gloss and tiny type: how to keep bottles looking clean and readable.",
    category: "product",
    cover: cover("product", "Serum bottle on a stone surface"),
    body: [
      { type: "paragraph", text: "Skincare packaging is some of the hardest to photograph well. Glass and glossy plastic reflect everything around them, and the label has to stay sharp and readable at every size." },
      { type: "heading", text: "Control what the bottle reflects" },
      { type: "paragraph", text: "A reflective product shows the room it sits in. Large, soft light sources placed to the side create clean highlights along the edges, while black cards remove unwanted reflections." },
      { type: "heading", text: "Keep the label readable" },
      { type: "paragraph", text: "Labels need even light and a straight-on angle, especially for e-commerce images that customers zoom into. Send samples with clean, undamaged labels, and a spare of each if you can." },
      { type: "list", items: ["Clean, unscratched samples", "One spare of each product", "Exact brand colours for any props or backgrounds", "A list of the angles each marketplace requires"] },
    ],
  },
  {
    slug: "packshots-vs-lifestyle-product-images",
    title: "Packshots vs. lifestyle images: which does your store need?",
    excerpt: "Where each kind of image works best, and how to plan a shoot that covers both.",
    category: "product",
    cover: cover("product", "Packshot on a white background"),
    body: [
      { type: "paragraph", text: "Most online stores need two kinds of product photos. They do different jobs, so it helps to plan both from the start." },
      { type: "heading", text: "Packshots sell the details" },
      { type: "paragraph", text: "Clean images on a plain background show exactly what the customer is buying. They are required by most marketplaces and keep a product range consistent on a category page." },
      { type: "heading", text: "Lifestyle images sell the feeling" },
      { type: "paragraph", text: "Products in context, with hands, surfaces and daylight, show how the product fits into someone's life. They work best on social media, in ads and on your homepage." },
      { type: "paragraph", text: "A single shoot can cover both: packshots first while the set is simple, then lifestyle scenes once the product details are done." },
    ],
  },
  {
    slug: "how-many-photos-does-a-restaurant-website-need",
    title: "How many photos does a restaurant website need?",
    excerpt: "A simple way to plan images for your homepage, menu, delivery apps and social.",
    category: "guides",
    cover: cover("food", "Cafe interior"),
    body: [
      { type: "paragraph", text: "The honest answer is fewer than you think, as long as each one has a job. Start from the pages and platforms you actually use, then count the images each one needs." },
      { type: "heading", text: "A practical starting point" },
      { type: "list", items: ["Homepage: one wide hero image and a few supporting shots", "Menu: one image per signature dish", "Delivery apps: a square image for every item you sell online", "About page: the team, the chef and the room", "Social: a monthly batch of verticals"] },
      { type: "paragraph", text: "Shooting everything in one well-planned day keeps the light and style consistent across every platform." },
    ],
  },
  {
    slug: "what-to-send-your-photographer-before-a-product-shoot",
    title: "What to send your photographer before a product shoot",
    excerpt: "Samples, references, specs and deadlines: the brief that saves a day of reshoots.",
    category: "guides",
    cover: cover("product", "Cream jar in hard light"),
    body: [
      { type: "paragraph", text: "A clear brief is the cheapest way to get the images you want on the first try. Here is what to include." },
      { type: "checklist", title: "Product shoot brief", items: ["Samples of every product, plus spares", "Where the images will be used and in what sizes", "Marketplace specs (Amazon, Shopify and others)", "Two or three reference images you like", "Brand colours, fonts and props to include or avoid", "Your deadline and how you want the files delivered"] },
      { type: "paragraph", text: "With this in hand, the shoot day is spent making images instead of making decisions." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPostCategory(slug: PostCategorySlug) {
  return postCategories.find((category) => category.slug === slug)!;
}

// Rough reading time: about 200 words per minute
export function getReadingTime(post: Post) {
  const words = post.body
    .map((block) => {
      if (block.type === "list" || block.type === "checklist") return block.items.join(" ");
      if (block.type === "image") return block.caption ?? "";
      return block.text;
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Up to `limit` other posts, same category first
export function getRelatedPosts(post: Post, limit = 3) {
  const others = posts.filter((other) => other.slug !== post.slug);
  const sameCategory = others.filter((other) => other.category === post.category);
  const rest = others.filter((other) => other.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

// "2026-10-20" → "October 20, 2026" (UTC, so the day doesn't shift by time zone)
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// The small set of fields cards need (keeps the article bodies out of the browser bundle)
export type PostSummary = Pick<Post, "slug" | "title" | "excerpt" | "category" | "date" | "featured" | "cover"> & {
  readingTime: number;
};

export function toSummary(post: Post): PostSummary {
  const { slug, title, excerpt, category, date, featured, cover } = post;
  return { slug, title, excerpt, category, date, featured, cover, readingTime: getReadingTime(post) };
}
