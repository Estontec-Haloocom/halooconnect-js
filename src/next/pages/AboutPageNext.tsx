"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Globe, Award, Target, Lightbulb, Heart } from "lucide-react";
import HeaderNext from "@/next/components/HeaderNext";
import FooterNext from "@/next/components/FooterNext";
import FloatingCTA from "@/components/FloatingCTA";

const AboutPageNext = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "500+", label: t("aboutUs.stats.customers") },
    { value: "120K+", label: t("aboutUs.stats.users") },
    { value: "5+", label: t("aboutUs.stats.countries") },
    { value: "1K+", label: t("aboutUs.stats.projects") },
  ];

  const values = [
    {
      icon: Target,
      title: t("aboutUs.values.customerFirst.title"),
      description: t("aboutUs.values.customerFirst.description"),
    },
    {
      icon: Lightbulb,
      title: t("aboutUs.values.innovation.title"),
      description: t("aboutUs.values.innovation.description"),
    },
    {
      icon: Heart,
      title: t("aboutUs.values.dedication.title"),
      description: t("aboutUs.values.dedication.description"),
    },
  ];

  return (
    <main className="min-h-screen">
      <HeaderNext />
      <section className="bg-gradient-to-b from-primary/5 to-background pt-32 pb-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("aboutUs.label")}
            </span>
            <h1 className="mt-4 mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              {t("aboutUs.hero.title")}{" "}
              <span className="text-gradient">{t("aboutUs.hero.titleHighlight")}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl">
              {t("aboutUs.hero.description")}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-4xl font-bold text-gradient md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                {t("aboutUs.story.label")}
              </span>
              <h2 className="mt-3 mb-6 text-3xl font-bold text-foreground md:text-4xl">
                {t("aboutUs.story.title")}
              </h2>
              <p className="mb-4 text-muted-foreground">{t("aboutUs.story.paragraph1")}</p>
              <p className="mb-4 text-muted-foreground">{t("aboutUs.story.paragraph2")}</p>
              <p className="mb-6 text-muted-foreground">{t("aboutUs.story.paragraph3")}</p>
              <Link href="/contact">
                <Button variant="hero" size="lg">
                  {t("aboutUs.story.cta")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-card p-6 shadow-soft">
                    <Users className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-bold text-foreground">{t("aboutUs.features.expertTeam.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("aboutUs.features.expertTeam.description")}</p>
                  </div>
                  <div className="rounded-2xl bg-card p-6 shadow-soft">
                    <Globe className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-bold text-foreground">{t("aboutUs.features.globalReach.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("aboutUs.features.globalReach.description")}</p>
                  </div>
                  <div className="rounded-2xl bg-card p-6 shadow-soft">
                    <Award className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-bold text-foreground">{t("aboutUs.features.industryLeader.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("aboutUs.features.industryLeader.description")}</p>
                  </div>
                  <div className="rounded-2xl bg-card p-6 shadow-soft">
                    <Lightbulb className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-bold text-foreground">{t("aboutUs.features.innovation.title")}</h3>
                    <p className="text-sm text-muted-foreground">{t("aboutUs.features.innovation.description")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("aboutUs.valuesSection.label")}
            </span>
            <h2 className="mt-3 mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {t("aboutUs.valuesSection.title")}
            </h2>
            <p className="text-muted-foreground">{t("aboutUs.valuesSection.description")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border/50 bg-card p-8 text-center shadow-soft">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-primary to-secondary py-20 md:py-28">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            {t("aboutUs.cta.title")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80">
            {t("aboutUs.cta.description")}
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              {t("aboutUs.cta.button")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      <section className="border-t border-border/60 bg-background py-12">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">TL;DR: Haloo Connect at a Glance</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>We build AI-powered cloud contact center software for regional and enterprise teams.</li>
            <li>We focus on measurable improvements in response speed, quality, and operational visibility.</li>
            <li>We support deployment planning across Singapore, UAE, Malaysia, Philippines, and India.</li>
          </ul>
          <h3 className="text-xl font-semibold text-foreground">What does Haloo Connect do?</h3>
          <p className="text-muted-foreground">
            Haloo Connect helps customer-facing teams modernize communication operations by combining omnichannel
            routing, automation, and analytics in one cloud platform.
          </p>
          <h3 className="text-xl font-semibold text-foreground">
            Why do teams choose an AI-first contact center approach?
          </h3>
          <p className="text-muted-foreground">
            Teams choose AI-first architecture to reduce repetitive workload, improve consistency, and scale customer
            service outcomes without increasing operational complexity at the same pace.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/contact" className="font-medium text-primary hover:underline">Talk to Sales</Link>
            <Link href="/analysis" className="font-medium text-primary hover:underline">Run Readiness Audit</Link>
            <Link href="/blog" className="font-medium text-primary hover:underline">Read Blog</Link>
          </div>
        </div>
      </section>
      <FooterNext />
      <FloatingCTA />
    </main>
  );
};

export default AboutPageNext;
