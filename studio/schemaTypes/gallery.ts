import { defineArrayMember, defineField, defineType } from "sanity";

// The three portfolio galleries. The site reads them by these IDs,
// and structure.ts shows exactly these three in the Studio menu.
export const galleries = [
  { id: "gallery-food", title: "Food" },
  { id: "gallery-product", title: "Product" },
  { id: "gallery-people", title: "People" },
];

// One gallery = one portfolio category with an ordered list of photos
export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description:
        "Drag photos here, several at once is fine. Drag to reorder: the first photos also appear on the home page.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true }, // lets Natalie choose the focus point for crops
          fields: [
            defineField({
              name: "alt",
              title: "Description",
              type: "string",
              description: "What's in the photo, e.g. \"Pasta with basil on a linen tablecloth\". Helps Google and screen readers.",
              validation: (rule) => rule.required().warning("Add a short description of the photo"),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { id: "_id", images: "images" },
    prepare({ id, images }) {
      const name = galleries.find((item) => id?.endsWith(item.id))?.title ?? "Gallery";
      const count = Array.isArray(images) ? images.length : 0;
      return { title: `${name} gallery`, subtitle: `${count} photos`, media: images?.[0] };
    },
  },
});
