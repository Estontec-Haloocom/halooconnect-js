"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, Tag, Filter } from "lucide-react";
import type { BlogPostSummary } from "@/sanity/types";

interface BlogListClientProps {
  posts: BlogPostSummary[];
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const BlogListClient = ({ posts }: BlogListClientProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(posts.map((post) => post.category).filter(Boolean))] as string[],
    [posts],
  );
  const allTags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags || []))],
    [posts],
  );

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        if (activeCategory && post.category !== activeCategory) return false;
        if (activeTag && !(post.tags || []).includes(activeTag)) return false;
        return true;
      }),
    [posts, activeCategory, activeTag],
  );

  return (
    <>
      {(categories.length > 0 || allTags.length > 0) && (
        <section className="border-b border-border bg-muted/30 py-6">
          <div className="container">
            {categories.length > 0 && (
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Filter className="h-4 w-4" /> Category:
                </span>
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    !activeCategory
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <Tag className="h-4 w-4" /> Tags:
                </span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                      activeTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="bg-background py-16 md:py-24">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-foreground">
                {activeCategory || activeTag ? "No posts found" : "Coming Soon"}
              </h2>
              <p className="text-muted-foreground">
                {activeCategory || activeTag
                  ? "Try a different filter"
                  : "We're working on great content for you. Stay tuned!"}
              </p>
              {(activeCategory || activeTag) && (
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setActiveTag(null);
                  }}
                  className="mt-4 text-sm text-primary underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
                >
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {post.category && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {post.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.published_at || post.created_at)}
                      </span>
                      {post.read_time_minutes && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {post.read_time_minutes} min
                        </span>
                      )}
                    </div>
                    <h2 className="mb-2 line-clamp-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogListClient;
