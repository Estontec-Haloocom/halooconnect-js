import { groq } from "./client";

export const blogPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "cover_image": coverImage.asset->url,
    "author": coalesce(author->name, "Haloo Connect"),
    read_time_minutes,
    "published_at": publishedAt,
    "created_at": _createdAt,
    "updated_at": _updatedAt,
    "category": category->title,
    tags,
    "meta_title": seo.metaTitle,
    "meta_description": seo.metaDescription,
    "meta_keywords": seo.metaKeywords,
    "og_image": seo.ogImage.asset->url,
    legacyHtml
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "cover_image": coverImage.asset->url,
    "author": coalesce(author->name, "Haloo Connect"),
    read_time_minutes,
    "published_at": publishedAt,
    "created_at": _createdAt,
    "updated_at": _updatedAt,
    "category": category->title,
    tags,
    body,
    legacyHtml,
    "meta_title": seo.metaTitle,
    "meta_description": seo.metaDescription,
    "meta_keywords": seo.metaKeywords,
    "og_image": seo.ogImage.asset->url
  }
`;
