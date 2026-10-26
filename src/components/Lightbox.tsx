import { useEffect, useCallback, useRef } from "react";

interface LightboxItem {
  src: string;
  alt: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export default function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => onChange((index - 1 + items.length) % items.length), [index, items.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % items.length), [index, items.length, onChange]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [onClose, prev, next]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-img"
      className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/90 backdrop-blur-sm p-4"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
        touchStartX.current = null;
      }}
    >
      <button
        className="absolute top-4 right-4 text-rose-100 hover:text-white text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {items.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-100 hover:text-white text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded px-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="absolute right-12 top-1/2 -translate-y-1/2 text-rose-100 hover:text-white text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded px-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      <img
        id="lightbox-img"
        src={item.src}
        alt={item.alt}
        className="max-w-full max-h-[90vh] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {items.length > 1 && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-rose-200/70 text-xs">
          {index + 1} / {items.length}
        </p>
      )}
    </div>
  );
}
