import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

if (!projectId) {
  throw new Error(
    "Missing Sanity project ID. Set SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID in your environment.",
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
