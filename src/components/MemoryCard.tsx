import { useState } from "react";
import type { Memory } from "../data/memories";
import Tag from "./Tag";

interface MemoryCardProps {
  memory: Memory;
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [liked, setLiked] = useState(false);

  const formattedDate = new Date(memory.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className="group relative"
      style={{ perspective: "1000px" }}
      onClick={() => memory.images.length > 0 && setFlipped((f) => !f)}
    >
      <div
        className="relative transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <article
          className="bg-white border border-rose-100 border-t-2 border-t-rose-400/20 rounded-2xl p-6 hover:border-rose-400/20 hover:border-t-rose-400/40 hover:-translate-y-1 transition-all duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          {memory.images.length > 0 && (
            <div className="mb-4 rounded-xl overflow-hidden aspect-video bg-rose-100">
              <img
                src={memory.images[0]}
                alt={memory.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-rose-950 font-semibold text-lg leading-snug group-hover:text-rose-400 transition-colors">
              {memory.title}
            </h3>
            <time className="text-neutral-500 text-xs whitespace-nowrap pt-1">{formattedDate}</time>
          </div>

          {memory.location && (
            <p className="text-rose-400/70 text-xs mb-2">📍 {memory.location}</p>
          )}

          <p className="text-neutral-400 text-sm leading-relaxed mb-4">{memory.description}</p>

          <div className="flex items-center justify-between">
            {memory.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
              aria-label={liked ? "Unlike memory" : "Like memory"}
              className={`ml-auto flex items-center gap-1 text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded px-1 ${
                liked ? "text-rose-400 scale-110" : "text-stone-300 hover:text-rose-300"
              }`}
            >
              {liked ? "♥" : "♡"}
            </button>
          </div>

          {memory.images.length > 0 && (
            <p className="text-stone-300 text-xs mt-3 text-center">Click to flip ↺</p>
          )}
        </article>

        {/* Back */}
        <article
          className="absolute inset-0 bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {memory.images.length > 0 && (
            <img
              src={memory.images[0]}
              alt={memory.title}
              loading="lazy"
              className="w-full rounded-xl object-cover max-h-60 mb-4"
            />
          )}
          <h3 className="text-rose-950 font-semibold text-center mb-1">{memory.title}</h3>
          {memory.location && (
            <p className="text-rose-400/70 text-xs">📍 {memory.location}</p>
          )}
          <p className="text-stone-300 text-xs mt-4 text-center">Click to flip back ↺</p>
        </article>
      </div>
    </div>
  );
}
