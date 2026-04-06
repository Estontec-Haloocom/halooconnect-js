"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import logo from "@/assets/haloo-connect-logo.png";

const ThankYouPageNext = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/50 py-6">
        <div className="container">
          <Link href="/">
            <img src={logo.src} alt="Haloo Connect" className="h-10 md:h-12" />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 animate-fade-in">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-14 w-14 text-primary" />
              </div>
            </div>

            <h1 className="mb-4 animate-fade-in text-4xl font-bold text-foreground md:text-5xl">
              Thank You!
            </h1>
            <p className="mb-8 animate-fade-in text-xl text-muted-foreground">
              Your demo request has been successfully submitted. Our team will contact
              you within 24 hours.
            </p>

            <Link href="/">
              <Button variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/contact" className="font-medium text-primary hover:underline">
                Contact Team
              </Link>
              <Link href="/analysis" className="font-medium text-primary hover:underline">
                AI Readiness Analyzer
              </Link>
              <Link href="/blog" className="font-medium text-primary hover:underline">
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          {"\u00A9"} 2024 Haloo Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ThankYouPageNext;
