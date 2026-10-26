import { useState } from "react";
import { memories } from "../data/memories";
import Lightbox from "../components/Lightbox";
import SectionHeading from "../components/SectionHeading";

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

function buildGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const memory of memories) {
    for (const img of memory.images) {
      items.push({ src: img, alt: memory.title, caption: memory.title });
    }
  }
  return items;
}

const allItems = buildGalleryItems();

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="Gallery"
        subtitle="Photos captured across the years."
      />

      {allItems.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {allItems.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-xl overflow-hidden bg-white border border-t-2 border-rose-100 border-t-rose-400/20 cursor-pointer hover:border-rose-400/20 hover:border-t-rose-400/40 transition-all duration-300 group"
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.caption}`}
              onKeyDown={(e) => { if (e.key === "Enter") setLightboxIndex(i); }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="p-3">
                <p className="text-neutral-400 text-xs">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-6xl mb-6">🖼️</p>
          <h3 className="text-rose-950 text-xl font-semibold mb-2">No photos yet</h3>
          <p className="text-neutral-500 max-w-md">
            Add image paths to <code className="text-rose-400 text-sm">src/data/memories.ts</code> to populate the gallery.
          </p>
        </div>
      )}

      {lightboxIndex !== null && allItems.length > 0 && (
        <Lightbox
          items={allItems.map((i) => ({ src: i.src, alt: i.alt }))}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </main>
  );
}
