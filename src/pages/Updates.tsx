import { updates } from "../data/updates";
import SectionHeading from "../components/SectionHeading";
import Tag from "../components/Tag";
import FadeIn from "../components/FadeIn";

export default function Updates() {
  const sorted = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="Latest Updates"
        subtitle="Recent news, reflections, and milestones — newest first."
      />

      <div className="max-w-2xl space-y-10">
        {sorted.map((update, i) => {
          const formatted = new Date(update.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <FadeIn key={update.id} delay={i * 80}>
            <article
              className="border-l-2 border-rose-200 pl-6 hover:border-rose-400/40 transition-colors duration-300"
            >
              <time dateTime={update.date} className="text-rose-400/70 text-xs font-medium uppercase tracking-wide">
                {formatted}
              </time>
              <h3 className="text-rose-950 text-xl font-semibold mt-2 mb-3">{update.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">{update.body}</p>
              {update.tags && update.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              )}
            </article>
            </FadeIn>
          );
        })}
      </div>
    </main>
  );
}
