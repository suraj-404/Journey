import { useState } from "react";
import { memories } from "../data/memories";
import Lightbox from "../components/Lightbox";
import SectionHeading from "../components/SectionHeading";
interface GalleryItem {
  src: string;
  alt: string;
  year: number;
  caption: string;
  type: "image" | "video";
}

const START_YEAR = 2015;
const currentYear = new Date().getFullYear();

function buildGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const memory of memories) {
    for (const img of memory.images) {
      items.push({
        src: img,
        alt: memory.title,
        year: memory.year,
        caption: memory.title,
        type: "image",
      });
    }
    for (const url of memory.videoUrls) {
      items.push({
        src: url,
        alt: memory.title,
        year: memory.year,
        caption: memory.title,
        type: "video",
      });
    }
  }
  return items;
}

const allItems = buildGalleryItems();

function buildYearRange(): number[] {
  const years: number[] = [];
  for (let y = START_YEAR; y <= currentYear; y++) years.push(y);
  return years;
}

export default function Gallery() {
  const [yearFilter, setYearFilter] = useState<number | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    yearFilter === "all" ? allItems : allItems.filter((i) => i.year === yearFilter);
  const imageItems = filtered.filter((i) => i.type === "image");

  const allYears = buildYearRange();

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="Gallery"
        subtitle="Photos and videos captured across the years."
      />

      {/* Year filter */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by year">
        <button
          onClick={() => setYearFilter("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
            yearFilter === "all"
              ? "bg-rose-500 text-white"
              : "bg-rose-50 border border-rose-200 text-stone-600 hover:border-rose-400 hover:text-rose-900"
          }`}
        >
          All
        </button>
        {allYears.map((year) => (
          <button
            key={year}
            onClick={() => setYearFilter(year)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
              yearFilter === year
                ? "bg-rose-500 text-white"
                : "bg-rose-50 border border-rose-200 text-stone-600 hover:border-rose-400 hover:text-rose-900"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-xl overflow-hidden bg-white border border-t-2 border-rose-100 border-t-rose-400/20 cursor-pointer hover:border-rose-400/20 hover:border-t-rose-400/40 transition-all duration-300 group"
              onClick={() => {
                if (item.type === "image") {
                  const idx = imageItems.findIndex((im) => im === item);
                  setLightboxIndex(idx);
                }
              }}
              role={item.type === "image" ? "button" : undefined}
              tabIndex={item.type === "image" ? 0 : undefined}
              aria-label={item.type === "image" ? `Open ${item.caption}` : undefined}
              onKeyDown={(e) => {
                if (e.key === "Enter" && item.type === "image") {
                  const idx = imageItems.findIndex((im) => im === item);
                  setLightboxIndex(idx);
                }
              }}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="aspect-video bg-rose-100 flex items-center justify-center text-4xl">
                  ▶
                </div>
              )}
              <div className="p-3">
                <p className="text-neutral-400 text-xs">{item.caption}</p>
                <p className="text-neutral-600 text-xs">{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-6xl mb-6">🖼️</p>
          <h3 className="text-rose-950 text-xl font-semibold mb-2">
            {yearFilter === "all" ? "No media yet" : `No media for ${yearFilter}`}
          </h3>
          <p className="text-neutral-500 max-w-md">
            Add image paths to <code className="text-rose-400 text-sm">src/data/memories.ts</code>{" "}
            and place files under <code className="text-rose-400 text-sm">public/images/</code>.
          </p>
        </div>
      )}

      {lightboxIndex !== null && imageItems.length > 0 && (
        <Lightbox
          items={imageItems.map((i) => ({ src: i.src, alt: i.alt }))}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </main>
  );
}
