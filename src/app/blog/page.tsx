import type { Metadata } from "next";
import Link from "next/link";
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
  title: "AI Call Center Blog | Cloud CX Insights",
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

const aiTechnologySections = [
  {
    title: "Conversational AI (voice and chat)",
    description:
      "Conversational AI handles high-volume queries such as order status, account checks, password reset, and appointment confirmations across voice, web chat, and WhatsApp.",
    benefits: [
      "Cuts average wait time by resolving repeat queries instantly",
      "Reduces agent workload so teams can focus on complex cases",
      "Maintains 24/7 service coverage across channels",
    ],
    implementation:
      "Start with 5 to 10 top intents from your ticket history, connect your bot to CRM or order systems for real answers, and set fallback routing to live agents when confidence drops.",
  },
  {
    title: "Agent Assist and real-time guidance",
    description:
      "Agent Assist listens to live interactions and suggests knowledge-base answers, compliance prompts, and next best actions while the conversation is active.",
    benefits: [
      "Improves first-contact resolution with guided responses",
      "Shortens ramp-up time for new agents",
      "Helps enforce quality and compliance consistently",
    ],
    implementation:
      "Deploy in shadow mode first, compare recommendations with QA outcomes, then turn on visible prompts for high-impact queues like billing, onboarding, and retention.",
  },
  {
    title: "Speech analytics and quality intelligence",
    description:
      "Speech analytics converts calls into searchable transcripts and detects sentiment, escalation triggers, objection patterns, and policy risk.",
    benefits: [
      "Surfaces coaching opportunities from every call, not small samples",
      "Detects recurring friction points that drive repeat contacts",
      "Supports faster root-cause analysis for CX and operations teams",
    ],
    implementation:
      "Define scorecard tags aligned to your QA framework, map tags to business KPIs, and run weekly calibration between QA, operations, and training leaders.",
  },
];

const caseStudies = [
  {
    title: "E-commerce support automation",
    challenge:
      "A seasonal spike created long queue times and lower CSAT for delivery and returns questions.",
    approach:
      "The team launched AI self-service on voice and WhatsApp for shipping updates, return policy queries, and store-credit flows with live-agent escalation for exceptions.",
    result:
      "Queue pressure dropped, response consistency improved, and agents shifted toward high-value retention conversations.",
  },
  {
    title: "Financial services compliance support",
    challenge:
      "Manual script adherence checks were slow and inconsistent across distributed teams.",
    approach:
      "They introduced real-time Agent Assist prompts and post-call speech analytics for disclosure checks and objection handling quality.",
    result:
      "Supervisors reviewed more interactions per week and improved coaching speed without increasing QA headcount.",
  },
];

const industryStats = [
  "Most contact center leaders now prioritize AI in roadmap discussions for cost control, quality consistency, and speed-to-resolution.",
  "Self-service containment rates improve when teams combine intent-focused bot design with clean handoff paths to human agents.",
  "Organizations see stronger ROI when AI programs are tied to measurable metrics such as CSAT, FCR, AHT, and repeat contact rate.",
];

const faqItems = [
  {
    question: "How expensive is AI for contact centers?",
    answer:
      "Cost depends on channels, volume, and integrations. Most teams begin with focused use cases, measure savings in handle time and deflection, then scale in phases to protect ROI.",
  },
  {
    question: "How long does implementation usually take?",
    answer:
      "A targeted pilot can go live in a few weeks when data sources are ready. Full rollout timelines vary based on integration depth, compliance requirements, and change management.",
  },
  {
    question: "Will AI replace contact center agents?",
    answer:
      "In most deployments, AI handles repetitive tasks while agents focus on complex, revenue-impacting, or emotionally sensitive interactions. The best outcomes come from human-plus-AI workflows.",
  },
  {
    question: "How do we prove ROI from AI initiatives?",
    answer:
      "Track baseline and post-launch performance on CSAT, first-contact resolution, average handle time, cost per contact, and escalation rate. Tie improvements to financial impact per queue.",
  },
];

export default async function BlogPage() {
  const data = await getAllBlogPosts();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Blog", path: "/blog" },
  ]);
  const webPageSchema = createWebPageSchema({
    title: "AI Call Center Blog | Cloud CX Insights",
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
    url: "https://connect.haloocom.com/blog",
    hasPart: data.slice(0, 12).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://connect.haloocom.com/blog/${post.slug}`,
      datePublished: post.published_at || post.created_at,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={collectionSchema} />
      <JsonLd data={faqSchema} />
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

        <section className="border-y border-border/60 bg-muted/20 py-8">
          <div className="container">
            <h2 className="text-xl font-semibold text-foreground">All Articles</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Crawlable index of every blog post for search engines and users.
            </p>
            <ul className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {data.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/analysis" className="font-medium text-primary hover:underline">
                Run AI Readiness Analyzer
              </Link>
              <Link href="/contact" className="font-medium text-primary hover:underline">
                Book a Demo
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container space-y-10">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                AI technologies shaping modern contact centers
              </h2>
              <p className="text-muted-foreground">
                Beyond general insights, this blog covers how specific AI capabilities work in
                production environments, when to deploy them, and how to measure business impact.
                Use the framework below as a starting point for implementation planning.
              </p>
            </div>

            <div className="grid gap-6">
              {aiTechnologySections.map((item) => (
                <article key={item.title} className="rounded-2xl border border-border/70 bg-card p-6">
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.description}</p>
                  <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-foreground/90">
                    Benefits
                  </h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {item.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-foreground/90">
                    Implementation strategy
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">{item.implementation}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container space-y-8">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                Real-world implementation examples
              </h2>
              <p className="text-muted-foreground">
                AI outcomes vary by use case maturity, data quality, and operational alignment.
                These examples show common rollout patterns and practical results.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {caseStudies.map((study) => (
                <article key={study.title} className="rounded-2xl border border-border/70 bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">{study.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Challenge:</span> {study.challenge}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Approach:</span> {study.approach}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Result:</span> {study.result}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container space-y-8">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                AI adoption trends in contact centers
              </h2>
              <p className="text-muted-foreground">
                Teams evaluating cloud contact center transformation typically benchmark performance
                using these industry-aligned indicators.
              </p>
            </div>
            <ul className="grid gap-4">
              {industryStats.map((stat) => (
                <li key={stat} className="rounded-xl border border-border/70 bg-card p-4 text-sm text-muted-foreground">
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container space-y-6">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                FAQ: AI in contact centers
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common planning and deployment questions.
              </p>
            </div>
            <div className="grid gap-4">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-border/70 bg-card p-6">
                  <h3 className="text-base font-semibold text-foreground">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <BlogListClient posts={data} />
        <FooterNext />
      </main>
    </>
  );
}
