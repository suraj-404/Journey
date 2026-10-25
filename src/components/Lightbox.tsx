import { useEffect, useCallback } from "react";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt, onClose }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-img"
      className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-rose-100 hover:text-white text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ×
      </button>
      <img
        id="lightbox-img"
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
