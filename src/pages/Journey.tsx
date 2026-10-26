import { useState, useRef } from "react";
import { getMemoriesByYear, getYearsWithMemories, memories as allMemories } from "../data/memories";
import MemoryCard from "../components/MemoryCard";
import SectionHeading from "../components/SectionHeading";
const START_YEAR = 2015;
const currentYear = new Date().getFullYear();

function buildYearRange(): number[] {
  const years: number[] = [];
  for (let y = START_YEAR; y <= currentYear; y++) years.push(y);
  return years;
}

function getTopTags(year: number): string[] {
  const tagCounts: Record<string, number> = {};
  allMemories.filter((m) => m.year === year).forEach((m) => {
    m.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] ?? 0) + 1; });
  });
  return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([t]) => t);
}

function getLocations(year: number): string[] {
  return [...new Set(allMemories.filter((m) => m.year === year && m.location).map((m) => m.location as string))];
}

export default function Journey() {
  const allYears = buildYearRange();
  const yearsWithContent = new Set(getYearsWithMemories());
  const [selected, setSelected] = useState(currentYear);
  const memories = getMemoriesByYear(selected);
  const trackRef = useRef<HTMLDivElement>(null);

  function selectYear(year: number) {
    setSelected(year);
    // scroll the selected button into view within the track
    setTimeout(() => {
      const btn = trackRef.current?.querySelector(`[data-year="${year}"]`) as HTMLElement | null;
      btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, 0);
  }

  const topTags = getTopTags(selected);
  const locations = getLocations(selected);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="Our Journey"
        subtitle="A year-by-year look at the memories, milestones, and moments that shaped us."
      />

      {/* Timeline scrubber */}
      <div className="relative mb-10">
        {/* track line */}
        <div className="absolute top-[22px] left-0 right-0 h-px bg-rose-200 pointer-events-none" />
        <div
          ref={trackRef}
          role="tablist"
          aria-label="Select year"
          className="flex gap-0 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {allYears.map((year) => {
            const hasContent = yearsWithContent.has(year);
            const isSelected = year === selected;
            return (
              <button
                key={year}
                data-year={year}
                role="tab"
                aria-selected={isSelected}
                onClick={() => selectYear(year)}
                className="flex flex-col items-center flex-shrink-0 px-3 pt-1 pb-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded group"
              >
                {/* dot */}
                <span
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-200 z-10 ${
                    isSelected
                      ? "bg-rose-500 border-rose-500 scale-125"
                      : hasContent
                      ? "bg-rose-300 border-rose-300 group-hover:bg-rose-400"
                      : "bg-rose-100 border-rose-200 group-hover:bg-rose-200"
                  }`}
                />
                {/* label */}
                <span
                  className={`mt-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap ${
                    isSelected
                      ? "text-rose-500"
                      : hasContent
                      ? "text-stone-500 group-hover:text-rose-400"
                      : "text-stone-300 group-hover:text-stone-400"
                  }`}
                >
                  {year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Year summary card */}
      {memories.length > 0 && (
        <div className="bg-white border border-rose-100 rounded-2xl p-5 mb-10 flex flex-wrap gap-6 items-center">
          <div>
            <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-1">{selected}</p>
            <p className="text-rose-950 font-bold text-2xl">{memories.length} {memories.length === 1 ? "memory" : "memories"}</p>
          </div>
          {locations.length > 0 && (
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Places</p>
              <p className="text-stone-600 text-sm">{locations.join(" · ")}</p>
            </div>
          )}
          {topTags.length > 0 && (
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Top tags</p>
              <div className="flex flex-wrap gap-2">
                {topTags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-500 text-xs">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
