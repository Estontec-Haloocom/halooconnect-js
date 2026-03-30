import Link from "next/link";

interface SeoContentSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  links?: Array<{
    href: string;
    label: string;
  }>;
}

const SeoContentSection = ({
  eyebrow,
  title,
  description,
  sections,
  links = [],
}: SeoContentSectionProps) => {
  return (
    <section className="border-y border-border/60 bg-muted/20 py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="text-base leading-8 text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {section.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground md:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SeoContentSection;
