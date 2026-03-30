import { hasSanityEnv } from "@/sanity/env";
import SanityStudio from "@/sanity/components/SanityStudio";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!hasSanityEnv) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="mb-4 text-3xl font-bold">Sanity Studio Setup Required</h1>
          <p className="mb-4 text-base leading-7 text-slate-300">
            Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
            to your environment before using the embedded studio.
          </p>
          <div className="space-y-3 text-sm leading-6 text-slate-400">
            <p>
              The app is scaffolded and ready, but the studio is intentionally
              blocked until the project credentials are configured.
            </p>
            <p>
              Next steps:
            </p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Set `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env`.</li>
              <li>Confirm `NEXT_PUBLIC_SANITY_DATASET` is correct.</li>
              <li>Set `SANITY_API_READ_TOKEN` for migration/import tasks.</li>
              <li>Leave `NEXT_PUBLIC_BLOG_SOURCE_MODE="fallback"` until migrated posts are verified.</li>
              <li>Run `npm run sanity` to launch Studio locally.</li>
            </ol>
            <p>
              See `docs/sanity-migration.md` for the full migration checklist.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return <SanityStudio />;
}
