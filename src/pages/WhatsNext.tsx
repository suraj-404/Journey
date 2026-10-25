import { bucketList } from "../data/plans";
import SectionHeading from "../components/SectionHeading";

const categories = ["all", "travel", "experience", "personal", "together"] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<string, string> = {
  all: "All",
  travel: "Travel",
  experience: "Experiences",
  personal: "Personal",
  together: "Together",
};

import { useState } from "react";

export default function WhatsNext() {
  const [filter, setFilter] = useState<Category>("all");

  const filtered =
    filter === "all" ? bucketList : bucketList.filter((b) => b.category === filter);
  const done = filtered.filter((b) => b.done).length;

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="What's Next"
        subtitle="Dreams, plans, and adventures waiting to be lived."
      />

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm text-neutral-500 mb-2">
          <span>{done} of {filtered.length} done</span>
          <span>{Math.round((done / Math.max(filtered.length, 1)) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-400 rounded-full transition-all duration-500"
            style={{ width: `${(done / Math.max(filtered.length, 1)) * 100}%` }}
            role="progressbar"
            aria-label="Bucket list completion"
            aria-valuenow={done}
            aria-valuemin={0}
            aria-valuemax={filtered.length}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
              filter === cat
                ? "bg-rose-500 text-white"
                : "bg-rose-50 border border-rose-200 text-stone-600 hover:border-rose-400 hover:text-rose-900"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Bucket list */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <article
            key={item.id}
            className={`relative p-6 rounded-2xl border transition-all duration-300 ${
              item.done
                ? "bg-rose-50 border-rose-100 opacity-60"
                : "bg-white border-t-2 border-rose-100 border-t-rose-400/20 hover:border-rose-400/20 hover:border-t-rose-400/40 hover:-translate-y-1"
            }`}
          >
            {item.done && (
              <span className="absolute top-4 right-4 text-xs bg-rose-400/10 text-rose-400 border border-rose-400/20 rounded-full px-2 py-0.5">
                Done ✓
              </span>
            )}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl mt-0.5">
                {item.category === "travel"
                  ? "✈️"
                  : item.category === "experience"
                  ? "⭐"
                  : item.category === "together"
                  ? "🤝"
                  : "🎯"}
              </span>
              <div>
                <h3
                  className={`font-semibold text-base leading-snug ${
                    item.done ? "line-through text-neutral-500" : "text-rose-950"
                  }`}
                >
                  {item.title}
                </h3>
                {item.targetYear && !item.done && (
                  <p className="text-rose-400/70 text-xs mt-0.5">Target: {item.targetYear}</p>
                )}
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
