import type { Metadata } from "next";
import HeaderNext from "@/next/components/HeaderNext";
import FooterNext from "@/next/components/FooterNext";
import HeroFormNext from "@/next/components/HeroFormNext";
import BlogListClient from "@/next/components/BlogListClient";
import JsonLd from "@/next/components/JsonLd";
import heroContactCenterVideo from "@/assets/hero-contact-center.mp4";
import heroContactCenterPoster from "@/assets/hero-contact-center.jpg";
import {
  buildMetadata,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/seo";
import { getAllBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "AI Contact Center Blog | Cloud Call Center & CX Insights",
  description:
    "Explore articles on AI contact center software, cloud call center migration, WhatsApp customer service, IVR, predictive dialer strategy, and customer support automation.",
  path: "/blog",
  keywords: [
    "AI contact center blog",
    "cloud call center blog",
    "WhatsApp customer service blog",
    "predictive dialer best practices",
    "contact center automation articles",
  ],
});

export default async function BlogPage() {
  const data = await getAllBlogPosts();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Blog", path: "/blog" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "AI Contact Center Blog | Cloud Call Center & CX Insights",
    description:
      "Explore articles on AI contact center software, cloud call center migration, WhatsApp customer service, IVR, predictive dialer strategy, and customer support automation.",
    path: "/blog",
    about: [
      "AI contact center blog",
      "cloud call center insights",
      "customer service automation articles",
    ],
  });
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Haloo Connect Blog",
    description:
      "Expert articles on AI contact center software, call center automation, and omnichannel customer service strategy.",
    url: "https://halooconnect.com/blog",
    hasPart: data.slice(0, 12).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://halooconnect.com/blog/${post.slug}`,
      datePublished: post.published_at || post.created_at,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={collectionSchema} />
      <main className="min-h-screen">
        <HeaderNext />
        <section className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden pt-20 pb-8 md:pt-24 md:pb-16">
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
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/55 to-black/45" />
          </div>
          <div className="container relative z-10 flex flex-1 flex-col">
            <div className="flex-1 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-1 text-center lg:text-left">
                <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
                  AI Contact Center <span className="text-primary">Insights</span>
                </h1>
                <p className="mx-auto mb-6 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl lg:mx-0">
                  Articles on cloud call center software, omnichannel customer
                  service, AI voice automation, WhatsApp support, and CX best practices.
                </p>
              </div>
              <div className="order-2 flex justify-center lg:justify-end">
                <HeroFormNext />
              </div>
            </div>
          </div>
        </section>

        <BlogListClient posts={data} />
        <FooterNext />
      </main>
    </>
  );
}
