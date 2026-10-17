import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { fixedTypes, schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

// Studio configuration: which project it edits and what content types exist.
// The project ID is not a secret, it's also visible in the website's requests.
export default defineConfig({
  name: "default",
  title: "Natalie Photo",

  projectId: "1cywisbt",
  dataset: "production",

  plugins: [
    structureTool({ structure }), // the main content editor, with our custom menu
    visionTool(), // a playground to test GROQ queries
  ],

  schema: {
    types: schemaTypes,
    // The home page and the galleries are fixed, so hide them from the "Create" menu
    templates: (templates) => templates.filter((template) => !fixedTypes.includes(template.schemaType)),
  },

  document: {
    // ...and don't allow deleting or duplicating them
    actions: (actions, context) =>
      fixedTypes.includes(context.schemaType)
        ? actions.filter((action) => action.action !== "delete" && action.action !== "duplicate")
        : actions,
  },
});
