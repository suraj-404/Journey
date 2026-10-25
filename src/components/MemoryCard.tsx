import type { Memory } from "../data/memories";
import Tag from "./Tag";

interface MemoryCardProps {
  memory: Memory;
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const formattedDate = new Date(memory.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group bg-white border border-rose-100 border-t-2 border-t-rose-400/20 rounded-2xl p-6 hover:border-rose-400/20 hover:border-t-rose-400/40 hover:-translate-y-1 transition-all duration-300">
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

      {memory.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {memory.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
