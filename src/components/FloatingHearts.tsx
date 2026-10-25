const HEARTS: { left: string; size: number; delay: number; dur: number; color: string }[] = [
  { left: "7%",  size: 14, delay: 0,   dur: 7,   color: "rgba(251,113,133,0.30)" },
  { left: "16%", size: 18, delay: 2.5, dur: 9,   color: "rgba(253,164,175,0.25)" },
  { left: "27%", size: 12, delay: 4,   dur: 6.5, color: "rgba(254,205,211,0.35)" },
  { left: "38%", size: 16, delay: 1,   dur: 8,   color: "rgba(251,113,133,0.20)" },
  { left: "52%", size: 20, delay: 5.5, dur: 7.5, color: "rgba(253,164,175,0.30)" },
  { left: "63%", size: 13, delay: 3,   dur: 9.5, color: "rgba(254,205,211,0.28)" },
  { left: "73%", size: 17, delay: 6,   dur: 6,   color: "rgba(251,113,133,0.22)" },
  { left: "82%", size: 15, delay: 1.5, dur: 8.5, color: "rgba(253,164,175,0.32)" },
  { left: "91%", size: 11, delay: 7,   dur: 7,   color: "rgba(254,205,211,0.30)" },
  { left: "44%", size: 19, delay: 8.5, dur: 8,   color: "rgba(251,113,133,0.18)" },
];

export default function FloatingHearts() {
  return (
    <div
      aria-hidden="true"
      className="hearts-overlay fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {HEARTS.map((h, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            bottom: "2%",
            left: h.left,
            fontSize: `${h.size}px`,
            color: h.color,
            animation: `float-heart ${h.dur}s ease-in-out ${h.delay}s infinite`,
            willChange: "transform, opacity",
            lineHeight: 1,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
