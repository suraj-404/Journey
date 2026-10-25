const PETALS: { left: string; w: number; h: number; delay: number; dur: number; rotate: number; color: string }[] = [
  { left: "5%",  w: 10, h: 16, delay: 0,   dur: 8,   rotate: 30,  color: "rgba(251,113,133,0.60)" },
  { left: "14%", w: 8,  h: 13, delay: 2,   dur: 10,  rotate: -20, color: "rgba(244,63,94,0.50)"   },
  { left: "25%", w: 12, h: 19, delay: 4.5, dur: 7,   rotate: 45,  color: "rgba(225,29,72,0.45)"   },
  { left: "35%", w: 9,  h: 15, delay: 1,   dur: 9,   rotate: -35, color: "rgba(251,113,133,0.55)" },
  { left: "48%", w: 13, h: 20, delay: 6,   dur: 8.5, rotate: 20,  color: "rgba(244,63,94,0.48)"   },
  { left: "58%", w: 7,  h: 12, delay: 3,   dur: 10,  rotate: -50, color: "rgba(251,113,133,0.52)" },
  { left: "69%", w: 11, h: 17, delay: 7,   dur: 6.5, rotate: 40,  color: "rgba(225,29,72,0.42)"   },
  { left: "78%", w: 8,  h: 14, delay: 1.5, dur: 9.5, rotate: -25, color: "rgba(244,63,94,0.55)"   },
  { left: "87%", w: 10, h: 16, delay: 5,   dur: 7.5, rotate: 60,  color: "rgba(251,113,133,0.50)" },
  { left: "93%", w: 12, h: 18, delay: 8,   dur: 8,   rotate: -15, color: "rgba(225,29,72,0.40)"   },
  { left: "41%", w: 9,  h: 15, delay: 9,   dur: 9,   rotate: 35,  color: "rgba(244,63,94,0.45)"   },
  { left: "20%", w: 14, h: 22, delay: 3.5, dur: 11,  rotate: -40, color: "rgba(251,113,133,0.48)" },
];

export default function FallingPetals() {
  return (
    <div
      aria-hidden="true"
      className="petals-overlay fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: "2%",
            left: p.left,
            display: "block",
            animation: `fall-petal ${p.dur}s ease-in-out ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        >
          <svg
            viewBox="0 0 20 30"
            width={p.w}
            height={p.h}
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <ellipse cx="10" cy="15" rx="7" ry="11" fill={p.color} />
          </svg>
        </span>
      ))}
    </div>
  );
}
