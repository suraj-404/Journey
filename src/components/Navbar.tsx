import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { profile } from "../data/profile";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Journey", to: "/journey" },
  { label: "Friendship", to: "/friendship" },
  { label: "Gallery", to: "/gallery" },
  { label: "What's Next", to: "/whats-next" },
  { label: "Updates", to: "/updates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-rose-50/90 backdrop-blur-md border-b border-rose-200" : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="text-rose-950 font-semibold text-lg tracking-tight hover:text-rose-400 transition-colors"
        >
          {profile.name.split(" ")[0]}
        </NavLink>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-rose-400"
                      : "text-stone-500 hover:text-rose-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-500 hover:text-rose-900 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition-transform" />
          <span className="block w-5 h-0.5 bg-current mb-1 transition-transform" />
          <span className="block w-5 h-0.5 bg-current transition-transform" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-rose-50/95 backdrop-blur-md border-b border-rose-200 px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm py-1 transition-colors duration-200 ${
                      isActive
                        ? "text-rose-400"
                        : "text-stone-500 hover:text-rose-900"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
