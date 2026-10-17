// Global site settings: change them here and every page picks them up

export const site = {
  name: "Natalie",
  url: "https://nataliephoto.com",
  title: "Natalie — Food, Product & People Photography in San Diego",
  description:
    "Food, product and portrait photographer based in San Diego, working with restaurants, beverage, beauty and lifestyle brands across California.",
  location: "San Diego, California",
  // TODO: replace with a real inbox before going live (the contact form sends here)
  email: "hello@nataliephoto.com",
  // TODO: Instagram handle without "@"; leave empty to hide it
  instagram: "",
  // Sanity Studio (the admin panel). Linked from the name in the home page copyright line.
  studioUrl: "https://nataliephoto.sanity.studio/",
  // "Developed by" credit at the bottom of every page
  developer: { name: "reactdev101.com", url: "https://reactdev101.com" },
};

// Client names or logos for the "Selected clients" strip.
// The section stays hidden until this list has at least one item.
export const clients: { name: string; logo?: string }[] = [];
