import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { friend } from "../data/friend";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24">
        <div className="max-w-3xl">
          <p className="text-rose-400 text-sm font-medium tracking-widest uppercase mb-6">
            Welcome
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 bg-gradient-to-r from-rose-500 to-rose-300 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-stone-400 mb-8 leading-relaxed">
            {profile.tagline}
          </p>
          <p className="text-stone-400 text-lg max-w-xl leading-relaxed mb-12">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-4">
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
        </div>

        <div aria-hidden="true" className="mt-16 text-neutral-600 text-xs tracking-widest uppercase animate-bounce self-start">
          ↓ scroll
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-rose-950 mb-12 tracking-tight">Who Are We</h2>

        {/* Me */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-4">About Me</p>
            <p className="text-stone-500 leading-relaxed mb-6">{profile.bio}</p>
            <p className="text-stone-400 text-sm flex items-center gap-2">
              <span>📍</span> {profile.location}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-rose-950 mb-4 tracking-tight">Interests</h3>
            <div className="flex flex-wrap gap-3">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-stone-600 text-sm hover:border-rose-400/30 hover:text-rose-400 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-rose-950 mt-10 mb-4 tracking-tight">What I Do</h3>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-rose-400/10 border border-rose-400/20 text-rose-500 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-rose-100 mb-16" />

        {/* Friend */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-rose-400 text-xs font-semibold uppercase tracking-widest mb-4">About Them</p>
            <p className="text-stone-500 leading-relaxed mb-6">{friend.bio}</p>
            <p className="text-stone-400 text-sm flex items-center gap-2">
              <span>📍</span> {friend.location}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-rose-950 mb-4 tracking-tight">Interests</h3>
            <div className="flex flex-wrap gap-3">
              {friend.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-stone-600 text-sm hover:border-rose-400/30 hover:text-rose-400 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-rose-950 mt-10 mb-4 tracking-tight">What They Do</h3>
            <div className="flex flex-wrap gap-3">
              {friend.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-rose-400/10 border border-rose-400/20 text-rose-500 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
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
