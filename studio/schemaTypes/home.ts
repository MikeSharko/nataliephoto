import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./imageWithAlt";

// A single document with the photos used on the home page
export const home = defineType({
  name: "home",
  title: "Home page",
  type: "document",
  fields: [
    imageWithAlt("heroImage", "Hero photo", "The big photo at the top of the home page. Wide, landscape photos work best."),
    defineField({
      name: "heroDarkness",
      title: "Hero darkness (%)",
      type: "number",
      description: "Darkens the hero photo so the white text stays readable. 0 = original photo, 40 = default, 90 = almost black.",
      initialValue: 40,
      validation: (rule) => rule.min(0).max(90).integer(),
    }),
    imageWithAlt("portrait", "Your portrait", "Shown in the About section and next to blog posts."),
  ],
  preview: {
    select: { media: "heroImage" },
    prepare: ({ media }) => ({ title: "Home page", media }),
  },
});
