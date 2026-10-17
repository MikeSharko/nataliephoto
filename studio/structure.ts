import type { StructureResolver } from "sanity/structure";
import { galleries } from "./schemaTypes/gallery";

// The left-hand menu of the Studio:
//   Home page
//   Portfolio → Food gallery / Product gallery / People gallery
//   Blog posts
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("home")
        .title("Home page")
        .child(S.document().schemaType("home").documentId("home").title("Home page")),
      S.listItem()
        .title("Portfolio")
        .child(
          S.list()
            .title("Portfolio")
            .items(
              galleries.map((item) =>
                S.listItem()
                  .id(item.id)
                  .title(`${item.title} gallery`)
                  .child(
                    // Always opens the same document, so there is exactly one gallery per category
                    S.document().schemaType("gallery").documentId(item.id).title(`${item.title} gallery`),
                  ),
              ),
            ),
        ),
      S.divider(),
      S.documentTypeListItem("post").title("Blog posts"),
    ]);
