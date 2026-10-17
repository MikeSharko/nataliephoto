import { defineCliConfig } from "sanity/cli";

// Settings for `sanity dev`, `sanity build` and `sanity deploy` in this folder
export default defineCliConfig({
  api: {
    projectId: "1cywisbt",
    dataset: "production",
  },
});
