import { useState } from "react";
import { getMemoriesByYear, getYearsWithMemories } from "../data/memories";
import MemoryCard from "../components/MemoryCard";
import SectionHeading from "../components/SectionHeading";
import FloatingHearts from "../components/FloatingHearts";

const START_YEAR = 2015;
const currentYear = new Date().getFullYear();

function buildYearRange(): number[] {
  const years: number[] = [];
  for (let y = START_YEAR; y <= currentYear; y++) years.push(y);
  return years;
}

export default function Journey() {
  const allYears = buildYearRange();
  const yearsWithContent = new Set(getYearsWithMemories());
  const [selected, setSelected] = useState(currentYear);
  const memories = getMemoriesByYear(selected);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <FloatingHearts />
      <SectionHeading
        title="Our Journey"
        subtitle="A year-by-year look at the memories, milestones, and moments that shaped us."
      />

      {/* Year selector */}
      <div
        role="tablist"
        aria-label="Select year"
        className="flex flex-wrap gap-2 mb-14"
      >
        {allYears.map((year) => (
          <button
            key={year}
            role="tab"
            aria-selected={year === selected}
            onClick={() => setSelected(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
              year === selected
                ? "bg-rose-500 text-white"
                : yearsWithContent.has(year)
                ? "bg-rose-50 border border-rose-200 text-stone-600 hover:border-rose-400 hover:text-rose-900"
                : "bg-rose-50 border border-rose-100 text-stone-400 hover:text-neutral-400"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Memory grid */}
      {memories.length > 0 ? (
        <div
          role="tabpanel"
          aria-label={`Memories from ${selected}`}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      ) : (
        <div
          role="tabpanel"
          aria-label={`Memories from ${selected}`}
          className="flex flex-col items-center justify-center py-32 text-center"
        >
          <p className="text-6xl mb-6">📭</p>
          <h3 className="text-rose-950 text-xl font-semibold mb-2">Nothing here yet</h3>
          <p className="text-neutral-500 max-w-md">
            No memories have been added for {selected} yet. Add an entry to{" "}
            <code className="text-rose-400 text-sm">src/data/memories.ts</code> to
            populate this year.
          </p>
        </div>
      )}
    </main>
  );
}
