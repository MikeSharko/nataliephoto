import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt } from "./imageWithAlt";

// A blog article
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description: "The end of the address: nataliephoto.com/blog/<this>. Click Generate to make it from the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Food", value: "food" },
          { title: "Product", value: "product" },
          { title: "Guides", value: "guides" },
          { title: "Behind the scenes", value: "behind-the-scenes" },
        ],
        layout: "radio",
      },
      initialValue: "guides",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published on",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "One or two sentences. Shown on the blog page and in Google results.",
      validation: (rule) => [rule.required(), rule.max(200).warning("Google shows about 160 characters")],
    }),
    imageWithAlt("coverImage", "Cover photo"),
    defineField({
      name: "featured",
      title: "Feature at the top of the blog",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Article",
      type: "array",
      of: [
        // Rich text: paragraphs, headings, quotes, bullet lists, bold, italic, links
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet list", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto"], allowRelative: true }),
                  }),
                ],
              }),
            ],
          },
        }),
        // Photo inside the article
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Description", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
        // Beige box with a checklist, like "Shoot-day checklist" in the design
        defineArrayMember({
          name: "checklist",
          title: "Checklist box",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare: ({ title, items }) => ({
              title: `Checklist: ${title ?? ""}`,
              subtitle: `${items?.length ?? 0} items`,
            }),
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", category: "category", media: "coverImage" },
    prepare: ({ title, category, media }) => ({ title, subtitle: category, media }),
  },
});
