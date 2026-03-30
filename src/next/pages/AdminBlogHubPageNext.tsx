import Link from "next/link";
import logo from "@/assets/haloo-connect-logo.png";
import { Button } from "@/components/ui/button";
import { blogSourceMode, hasSanityEnv, isSanityOnlyBlogMode } from "@/sanity/env";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  Settings,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

const nextSteps = hasSanityEnv
  ? [
      "Open Sanity Studio and create all new articles there.",
      "Run the migration script if older Supabase posts still need to be imported.",
      "Review imported posts and convert priority articles from legacy HTML to Portable Text.",
      "Use the legacy editor only for reference or short-term cleanup during transition.",
    ]
  : [
      "Add NEXT_PUBLIC_SANITY_PROJECT_ID to the environment.",
      "Confirm NEXT_PUBLIC_SANITY_DATASET is correct for this project.",
      "Add SANITY_API_READ_TOKEN before running migration tasks.",
      "Open docs/sanity-migration.md and complete the setup checklist before publishing.",
    ];

export default function AdminBlogHubPageNext() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={logo.src} alt="Haloo Connect" className="h-10 w-auto" />
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Content Control</p>
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">Blog publishing now runs through Sanity</h1>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin">
                <ArrowLeft />
                Back to admin
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.9fr]">
            <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Sanity-first editorial workflow
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Use Studio for all new posts and SEO updates</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                The public blog now prefers Sanity content. This dashboard is the handoff point for your editorial team,
                migration tasks, and final cleanup of the old Supabase blog manager.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-background/80 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Open Sanity Studio</h3>
                      <p className="text-sm text-muted-foreground">Create, edit, schedule, and review blog content.</p>
                    </div>
                  </div>
                  <Button asChild className="w-full" variant="hero">
                    <Link href="/studio">
                      Launch Studio
                      <ExternalLink />
                    </Link>
                  </Button>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Legacy Supabase Editor</h3>
                      <p className="text-sm text-muted-foreground">Keep this only for transition support and old data checks.</p>
                    </div>
                  </div>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/admin/blog/legacy">Open legacy editor</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-3">
                  {hasSanityEnv ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <TriangleAlert className="h-5 w-5 text-amber-500" />
                  )}
                  <h2 className="text-lg font-semibold text-foreground">Sanity setup status</h2>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {hasSanityEnv
                    ? "Sanity environment variables are present, so the embedded studio route is ready."
                    : "Sanity credentials are not fully configured yet, so the embedded studio will stay blocked until setup is complete."}
                </p>
                <div className="mt-4 rounded-2xl bg-background/80 p-4 text-sm leading-6 text-muted-foreground">
                  <p>
                    Blog source mode:
                    <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                      {blogSourceMode}
                    </span>
                  </p>
                  <p className="mt-2">
                    {isSanityOnlyBlogMode
                      ? "Public blog pages now read from Sanity only. If a post is missing there, it will no longer fall back to Supabase."
                      : "Public blog pages still support Supabase fallback while migration is in progress. Switch NEXT_PUBLIC_BLOG_SOURCE_MODE to sanity-only when content is fully verified."}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Recommended next steps</h2>
                </div>
                <ol className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {nextSteps.map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
                <h2 className="text-lg font-semibold text-foreground">Migration reference</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The repo checklist lives in <code>docs/sanity-migration.md</code>. Use it alongside Studio while you
                  finish imports and verify legacy content before the final cleanup.
                </p>
                <div className="mt-4 rounded-2xl bg-background/80 p-4 text-sm leading-6 text-muted-foreground">
                  <p>
                    Recommended command:
                  </p>
                  <code className="mt-2 block rounded-lg border border-border/60 bg-card px-3 py-2 text-foreground">
                    npm run migrate:blog-to-sanity
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
