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
    defineField({
      name: "flashLight",
      title: "Blinking red light",
      type: "object",
      description:
        "Optional: a small red light that blinks on the hero photo, like a flash that is ready to fire. " +
        "Position in % of the photo: X from the left edge, Y from the top. Leave empty to hide it.",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "x", title: "X (%)", type: "number", validation: (rule) => rule.min(0).max(100) }),
        defineField({ name: "y", title: "Y (%)", type: "number", validation: (rule) => rule.min(0).max(100) }),
      ],
    }),
    imageWithAlt("portrait", "Your portrait", "Shown in the About section and next to blog posts."),
  ],
  preview: {
    select: { media: "heroImage" },
    prepare: ({ media }) => ({ title: "Home page", media }),
  },
});
