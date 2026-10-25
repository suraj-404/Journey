import { friend } from "../data/friend";
import SectionHeading from "../components/SectionHeading";

export default function Friendship() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <SectionHeading
        title="Our Friendship"
        subtitle="The story of two people who somehow found each other and decided to never let go."
      />

      {/* Profile */}
      <section className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-white border border-rose-100 rounded-2xl p-8">
          <div className="w-20 h-20 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-3xl mb-6">
            👤
          </div>
          <h3 className="text-rose-950 text-2xl font-bold mb-1">{friend.name}</h3>
          <p className="text-rose-400 text-sm mb-4">{friend.tagline}</p>
          <p className="text-neutral-400 text-sm leading-relaxed mb-4">{friend.bio}</p>
          <p className="text-neutral-500 text-sm">📍 {friend.location}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-rose-100 rounded-2xl p-6">
            <h4 className="text-rose-950 font-semibold mb-3">How We Met</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">{friend.howWeMet}</p>
            <p className="text-rose-400/70 text-xs mt-3">Since {friend.metYear}</p>
          </div>

          <div className="bg-white border border-rose-100 rounded-2xl p-6">
            <h4 className="text-rose-950 font-semibold mb-3">Their Interests</h4>
            <div className="flex flex-wrap gap-2">
              {friend.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-stone-600 text-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-rose-950 mb-8 tracking-tight">Milestones</h2>
        <ol className="relative border-l border-rose-200 space-y-8 pl-6">
          {friend.milestones.map((m, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[calc(1.5rem+0.375rem)] top-1 w-3 h-3 rounded-full bg-rose-400/60 border-2 border-rose-50" />
              <time className="text-rose-400/70 text-xs font-medium">{m.year}</time>
              <p className="text-neutral-300 text-sm mt-1">{m.event}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Messages */}
      <section>
        <h2 className="text-2xl font-bold text-rose-950 mb-8 tracking-tight">Messages</h2>
        <div className="space-y-6">
          {friend.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-lg rounded-2xl p-5 ${
                  i % 2 === 0
                    ? "bg-white border border-rose-100 rounded-tl-sm"
                    : "bg-rose-400/10 border border-rose-400/20 rounded-tr-sm"
                }`}
              >
                <p className="text-xs font-medium text-rose-400 mb-2">{msg.from}</p>
                <p className="text-neutral-300 text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
