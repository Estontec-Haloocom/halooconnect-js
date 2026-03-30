import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="mb-4 text-4xl font-bold text-foreground">Page not found</h1>
        <p className="mb-8 text-muted-foreground">
          The page you requested does not exist or may have been moved.
        </p>
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
      </div>
    </main>
  );
}
