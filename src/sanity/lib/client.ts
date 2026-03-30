import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, hasSanityEnv, projectId, useCdn } from "../env";

export { groq };

export const sanityClient = hasSanityEnv
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      perspective: "published",
    })
  : null;

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<T>(
    query,
    params,
    tags.length > 0
      ? {
          next: {
            tags,
          },
        }
      : undefined,
  );
}
