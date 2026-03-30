interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  intro: string;
  items: FaqItem[];
}

const FaqSection = ({ title, intro, items }: FaqSectionProps) => {
  return (
    <section className="bg-background py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {title}
            </h2>
            <p className="text-base leading-8 text-muted-foreground md:text-lg">
              {intro}
            </p>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border/60 bg-card p-6"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-foreground">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
