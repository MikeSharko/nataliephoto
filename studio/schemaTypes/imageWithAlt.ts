import { defineField } from "sanity";

// Image field with a focus point (hotspot) and a description (alt text).
// Reused by the home page, blog cover photos and photos inside articles.
export function imageWithAlt(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Description",
        type: "string",
        description: "What's in the photo. Helps Google and screen readers.",
        validation: (rule) => rule.required().warning("Add a short description of the photo"),
      }),
    ],
  });
}
