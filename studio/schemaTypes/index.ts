import type { SchemaTypeDefinition } from "sanity";
import { gallery } from "./gallery";
import { home } from "./home";
import { post } from "./post";

// Every content type Natalie can create in the Studio
export const schemaTypes: SchemaTypeDefinition[] = [home, gallery, post];

// Types that always have exactly one document per item (no "Create", "Delete" or "Duplicate")
export const fixedTypes = ["home", "gallery"];
