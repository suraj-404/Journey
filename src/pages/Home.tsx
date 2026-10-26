import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { friend } from "../data/friend";
import { memories } from "../data/memories";

function useYearsSince(year: number) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    function calc() {
      const now = new Date();
      const start = new Date(year, 0, 1);
      const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
      const totalYears = (now.getTime() - start.getTime()) / msPerYear;
      const years = Math.floor(totalYears);
      const days = Math.floor((totalYears - years) * 365.25);
      setDisplay(`${years} years, ${days} days`);
    }
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [year]);
  return display;
}

function useOnThisDay() {
  return useMemo(() => {
    const today = new Date();
    const mm = today.getMonth() + 1;
    const dd = today.getDate();
    return memories.find((m) => {
      const d = new Date(m.date);
      return d.getMonth() + 1 === mm && d.getDate() === dd && d.getFullYear() < today.getFullYear();
    }) ?? null;
  }, []);
}

export default function Home() {
  const yearsSince = useYearsSince(friend.metYear);
  const onThisDay = useOnThisDay();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24">
        <div className="max-w-3xl">

          {/* Welcome */}
          <p className="text-rose-400 text-xl md:text-2xl font-semibold tracking-[0.3em] uppercase mb-8">
            Welcome
          </p>

          {/* Headline */}
          <h1
            className="text-6xl md:text-8xl leading-tight mb-6 bg-gradient-to-br from-rose-600 via-rose-400 to-rose-300 bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            Our Story
          </h1>

          {/* Names */}
          <p
            className="text-2xl md:text-3xl text-rose-400/80 mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Aayushi &amp; Suraj
          </p>

          {/* One-liner */}
          <p className="text-stone-400 text-base md:text-lg italic mb-4 leading-relaxed">
            Some friendships are rare — the kind that feel like home no matter how far apart you are.
          </p>

          {/* Est. */}
          <p className="text-rose-300/80 text-xs tracking-[0.25em] uppercase mb-8">
            Est. {friend.metYear} · Mumbai &amp; Bengaluru
          </p>

          {yearsSince && (
            <p className="text-rose-400/70 text-sm flex items-center gap-2">
              <span>🤝</span>
              Together since {friend.metYear} — <span className="font-semibold text-rose-400">{yearsSince}</span>
            </p>
          )}
        </div>
      </section>

      {/* On This Day */}
      {onThisDay && (
        <section className="py-10 px-6 max-w-6xl mx-auto">
          <div className="bg-rose-400/10 border border-rose-400/20 rounded-2xl px-6 py-4 flex gap-4 items-start">
            <span className="text-2xl mt-0.5">📅</span>
            <div>
              <p className="text-rose-500 text-xs font-semibold uppercase tracking-widest mb-1">On this day in {new Date(onThisDay.date).getFullYear()}</p>
              <p className="text-rose-950 font-semibold">{onThisDay.title}</p>
              <p className="text-stone-500 text-sm leading-relaxed mt-1">{onThisDay.description}</p>
              <Link to="/journey" className="text-rose-400 text-xs hover:underline mt-2 inline-block">See memory →</Link>
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-rose-950 mb-12 tracking-tight">Who Are We</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Aayushi first */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              {friend.avatar ? (
                <img src={friend.avatar} alt={friend.name} className="w-14 h-14 rounded-full object-cover border-2 border-rose-200" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-rose-100 border-2 border-rose-200 flex items-center justify-center text-rose-400 text-xl font-bold">
                  {friend.name.charAt(0)}
                </div>
              )}
              <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest">About Aayushi</p>
            </div>
            <p className="text-stone-500 leading-relaxed mb-4">{friend.bio}</p>
            <p className="text-stone-400 text-sm flex items-center gap-2"><span>📍</span> {friend.location}</p>
          </div>

          {/* Suraj second */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-14 h-14 rounded-full object-cover border-2 border-rose-200" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-rose-100 border-2 border-rose-200 flex items-center justify-center text-rose-400 text-xl font-bold">
                  {profile.name.charAt(0)}
                </div>
              )}
              <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest">About Suraj</p>
            </div>
            <p className="text-stone-500 leading-relaxed mb-4">{profile.bio}</p>
            <p className="text-stone-400 text-sm flex items-center gap-2"><span>📍</span> {profile.location}</p>
          </div>
        </div>

      </section>

      {/* How We Met */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-rose-100">
        <h2 className="text-3xl font-bold text-rose-950 mb-8 tracking-tight">How We Met</h2>
        <div className="bg-white border border-rose-100 rounded-2xl p-8 max-w-2xl">
          <p className="text-stone-500 leading-relaxed">{friend.howWeMet}</p>
          <p className="text-rose-400/70 text-sm mt-4">Since {friend.metYear}</p>
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link
            to="/journey"
            className="px-6 py-3 rounded-full bg-rose-400 text-white font-semibold text-sm hover:bg-rose-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50"
          >
            Explore Our Journey →
          </Link>
          <Link
            to="/gallery"
            className="px-6 py-3 rounded-full border border-rose-200 text-stone-600 text-sm hover:border-rose-300 hover:text-rose-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-rose-100">
        <h2 className="text-3xl font-bold text-rose-950 mb-10 tracking-tight">Milestones</h2>
        <ol className="relative border-l border-rose-200 space-y-8 pl-8">
          {friend.milestones.map((m, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[calc(2rem+0.375rem)] top-1 w-3 h-3 rounded-full bg-rose-400/60 border-2 border-rose-50" />
              <time className="text-rose-400/70 text-xs font-semibold uppercase tracking-wider">{m.year}</time>
              <p className="text-stone-500 text-sm mt-1">{m.event}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Quick links */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-rose-200">
        <h2 className="text-3xl font-bold text-rose-950 mb-12 tracking-tight">Explore</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: "Our Journey", desc: "Years of memories from 2015 to today.", to: "/journey" },
            { label: "Gallery", desc: "Photos and videos across the years.", to: "/gallery" },
            { label: "What's Next", desc: "Adventures and dreams still ahead of us.", to: "/whats-next" },
            { label: "Latest Updates", desc: "Recent news, milestones, and reflections.", to: "/updates" },
            { label: "Book a Meeting", desc: "Schedule a call with Suraj.", to: "/book" },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group p-6 rounded-2xl bg-white border border-rose-100 hover:border-rose-400/20 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-2xl"
            >
              <h3 className="text-rose-950 font-semibold mb-2 group-hover:text-rose-400 transition-colors">
                {card.label}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
