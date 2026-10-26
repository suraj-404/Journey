import { useState, useRef, useEffect } from "react";

interface Track {
  title: string;
  artist: string;
  url: string;
}

const playlist: Track[] = [
  { title: "Our Song", artist: "Placeholder Artist", url: "" },
  { title: "Road Trip Vibes", artist: "Placeholder Artist", url: "" },
  { title: "That One Night", artist: "Placeholder Artist", url: "" },
];

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = playlist[current];

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing && track.url) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing, current]);

  function prev() {
    setCurrent((c) => (c - 1 + playlist.length) % playlist.length);
    setPlaying(false);
  }
  function next() {
    setCurrent((c) => (c + 1) % playlist.length);
    setPlaying(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="bg-white border border-rose-100 rounded-2xl shadow-lg p-4 w-64 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Playlist</p>
          <div className="space-y-1 mb-4">
            {playlist.map((t, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPlaying(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  i === current
                    ? "bg-rose-50 text-rose-500 font-medium"
                    : "text-stone-500 hover:bg-rose-50"
                }`}
              >
                <span className="block truncate">{t.title}</span>
                <span className="block text-xs text-stone-400 truncate">{t.artist}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-rose-100 pt-3">
            <p className="text-rose-950 text-sm font-semibold truncate">{track.title}</p>
            <p className="text-stone-400 text-xs truncate mb-3">{track.artist}</p>
            <div className="flex items-center justify-center gap-4">
              <button onClick={prev} aria-label="Previous" className="text-stone-400 hover:text-rose-400 transition-colors text-lg">⏮</button>
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="w-9 h-9 rounded-full bg-rose-400 text-white flex items-center justify-center hover:bg-rose-300 transition-colors text-sm"
              >
                {playing ? "⏸" : "▶"}
              </button>
              <button onClick={next} aria-label="Next" className="text-stone-400 hover:text-rose-400 transition-colors text-lg">⏭</button>
            </div>
          </div>

          {track.url && <audio ref={audioRef} src={track.url} onEnded={next} />}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close music player" : "Open music player"}
        className="w-12 h-12 rounded-full bg-rose-400 text-white shadow-lg flex items-center justify-center hover:bg-rose-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 text-xl"
      >
        🎵
      </button>
    </div>
  );
}
