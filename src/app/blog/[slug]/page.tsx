import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderNext from "@/next/components/HeaderNext";
import FooterNext from "@/next/components/FooterNext";
import HeroFormNext from "@/next/components/HeroFormNext";
import BlogShareButton from "@/next/components/BlogShareButton";
import JsonLd from "@/next/components/JsonLd";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import heroContactCenterVideo from "@/assets/hero-contact-center.mp4";
import heroContactCenterPoster from "@/assets/hero-contact-center.jpg";
import { DEFAULT_OG_IMAGE, SITE_URL, buildMetadata, createBreadcrumbSchema } from "@/lib/seo";
import { getBlogPostBySlug } from "@/lib/blog";
import { portableTextComponents } from "@/sanity/components/PortableTextComponents";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  return getBlogPostBySlug(slug);
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || post.title,
    path: `/blog/${post.slug}`,
    keywords: Array.isArray(post.meta_keywords)
      ? post.meta_keywords
      : typeof post.meta_keywords === "string"
        ? post.meta_keywords.split(",").map((keyword: string) => keyword.trim()).filter(Boolean)
        : post.tags || [],
    type: "article",
    images: [post.og_image || post.cover_image || DEFAULT_OG_IMAGE],
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.meta_description,
    author: { "@type": "Person", name: post.author },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    publisher: {
      "@type": "Organization",
      name: "Haloo Connect",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    articleSection: post.category || "Blog",
    keywords: post.tags || [],
    image: post.og_image || post.cover_image || DEFAULT_OG_IMAGE,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the key takeaway from "${post.title}"?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: post.excerpt || "The article explains practical contact center implementation insights and operational recommendations.",
        },
      },
      {
        "@type": "Question",
        name: "How can teams apply these contact center insights?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with the highest-friction workflows, measure baseline KPIs, and deploy improvements in phases so impact is visible and manageable.",
        },
      },
      {
        "@type": "Question",
        name: "Which KPIs should be tracked after implementation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Track first-contact resolution, average handle time, queue wait, repeat contact rate, and customer satisfaction to verify performance gains.",
        },
      },
    ],
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${post.slug}#webpage`,
    url: `${SITE_URL}/blog/${post.slug}`,
    name: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || post.title,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <main className="min-h-screen">
        <HeaderNext />
        <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden pt-20 pb-8 md:pt-24 md:pb-16">
          <div className="absolute inset-0">
            <video
              src={heroContactCenterVideo}
              poster={heroContactCenterPoster.src}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/45" />
          </div>

          <div className="container relative z-10 flex flex-1 flex-col">
            <div className="flex-1 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-1 text-center lg:text-left">
                <Link
                  href="/blog"
                  className="mb-4 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>
                <h1 className="mb-4 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mb-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" /> {formatDate(post.published_at || post.created_at)}
                  </span>
                  {post.read_time_minutes && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {post.read_time_minutes} min read
                    </span>
                  )}
                </div>
              </div>
              <div className="order-2 flex justify-center lg:justify-end">
                <HeroFormNext />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-8 md:py-16">
          <div className="container max-w-4xl">
            <div className="mb-6 flex items-center justify-end">
              <BlogShareButton title={post.title} />
            </div>
            <section className="mb-8 rounded-2xl border border-border/70 bg-muted/20 p-5">
              <h2 className="text-xl font-semibold text-foreground">TL;DR</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt || "This article covers practical AI contact center implementation guidance and measurable improvement strategies."}
              </p>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                What should teams do first after reading this?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Prioritize one high-impact queue, define KPI baselines, and launch controlled workflow changes before scaling.
              </p>
            </section>

            {post.cover_image && (
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img src={post.cover_image} alt={post.title} className="h-auto w-full" />
              </div>
            )}

            <article className="blog-content prose prose-lg max-w-none prose-headings:text-foreground prose-headings:mt-8 prose-headings:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-a:text-primary prose-strong:text-foreground prose-img:rounded-xl prose-li:text-muted-foreground prose-li:leading-relaxed prose-ul:my-4 prose-ol:my-4 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-table:border-collapse prose-td:border prose-td:border-border prose-td:p-3 prose-th:border prose-th:border-border prose-th:p-3 prose-th:bg-muted/50 prose-hr:my-8 prose-pre:bg-muted prose-code:text-primary">
              {post.source === "sanity" && post.body ? (
                <PortableText value={post.body as any} components={portableTextComponents} />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content || post.legacyHtml || "",
                  }}
                />
              )}
            </article>

            <div className="mt-12 border-t border-border pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all articles
              </Link>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link href="/analysis" className="font-medium text-primary hover:underline">
                  Run AI Readiness Analyzer
                </Link>
                <Link href="/contact" className="font-medium text-primary hover:underline">
                  Talk to Sales
                </Link>
                <Link href="/" className="font-medium text-primary hover:underline">
                  Explore Platform
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FooterNext />
      </main>
    </>
  );
}
