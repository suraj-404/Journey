import { profile } from "../data/profile";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-rose-200 py-10 px-6 text-center">
      <p className="text-neutral-500 text-sm">
        © {year} {profile.name} · A personal time capsule built with love.
      </p>
      <div className="flex justify-center gap-6 mt-4">
        {profile.socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-rose-400 text-sm transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
