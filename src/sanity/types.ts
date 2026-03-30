export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  author: string;
  read_time_minutes: number | null;
  published_at: string | null;
  created_at: string;
  updated_at?: string;
  category: string | null;
  tags: string[] | null;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string[] | string | null;
  og_image?: string | null;
  body?: unknown[];
  content?: string | null;
  legacyHtml?: string | null;
  source?: "sanity" | "supabase";
}

export interface BlogPost extends BlogPostSummary {
  updated_at: string;
}
