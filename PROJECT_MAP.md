# Journey Site — Project Map

A quick-reference document for any agent or developer. Every file, what it owns, what it exports, and where to go to make a specific change.

---

## Stack & Commands

| | |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | TypeScript 6 (strict) |
| Styling | Tailwind CSS 4 |
| Routing | react-router-dom v7 |
| Deployment | Cloudflare Pages (GitHub → auto-deploy) |
| Repo | `suraj-404/Journey` on GitHub, branch `main` |

```bash
npm run dev       # local dev server
npm run build     # tsc + vite build → dist/
npm run lint      # oxlint
npm run preview   # preview dist/ locally
```

---

## Root Files

| File | Purpose |
|---|---|
| `index.html` | Entry HTML. Sets `<title>`, loads Google Fonts (Inter, Dancing Script, Playfair Display), mounts `#root` |
| `vite.config.ts` | Vite config with `@vitejs/plugin-react` and Tailwind |
| `tsconfig.app.json` | TS config for src/ |
| `wrangler.toml` | Cloudflare Pages config |
| `progress.md` | Running log of completed stages and known issues |
| `README.md` | Setup, content editing guide, deployment instructions |

---

## Entry Points

### `src/main.tsx`
Mounts `<App />` into `#root`. Nothing else lives here.

### `src/App.tsx`
Root component. Owns:
- `<BrowserRouter>` wrapping all routes
- `<FallingPetals />` — global petal animation (renders on every page)
- `<MusicPlayer />` — global sticky music widget (bottom-right, every page)
- `<Navbar />` — fixed top nav
- `<Routes>` — all six page routes (see Pages section)
- `<Footer />` — site footer

**To add a new page:** add a `<Route>` here and create a file in `src/pages/`.

---

## Pages (`src/pages/`)

### `Home.tsx`
**Route:** `/`
**Sections (top to bottom):**
1. **Hero** — "Welcome" label (large, tracked), italic Playfair Display "Our Story" headline, Dancing Script "Aayushi & Suraj" names, italic one-liner, Est. + cities, live years-counter
2. **On This Day** — conditionally rendered banner if any memory matches today's month/day (from prior years)
3. **Who Are We** — two-column cards: Aayushi (left) and Suraj (right), each with avatar + label + bio + location
4. **How We Met** — card with `friend.howWeMet` text + `friend.metYear`; CTA buttons ("Explore Our Journey →" and "View Gallery") live here
5. **Milestones** — vertical timeline from `friend.milestones`
6. **Explore** — quick-link cards to all other sections

**To change:** one-liner text → edit directly in `Home.tsx` line ~70. "Together since" counter → `useYearsSince` hook inline in same file. "On this day" logic → `useOnThisDay` hook inline in same file.

---

### `Journey.tsx`
**Route:** `/journey`
**Sections:**
1. **Timeline scrubber** — horizontal scrollable track of dots (2015 → current year). Active year highlighted, filled dots = years with content
2. **Year summary card** — shows memory count, locations, top tags for selected year (only when memories exist)
3. **Memory grid** — `MemoryCard` components for selected year; empty state if none

**Key logic:**
- `START_YEAR = 2015`, `currentYear` derived at runtime
- `getMemoriesByYear(year)` from `src/data/memories.ts`
- `getYearsWithMemories()` controls which dots are filled
- `getTopTags(year)` and `getLocations(year)` — local helper functions in this file

**To add a memory:** edit `src/data/memories.ts` only. No JSX changes needed.

---

### `Gallery.tsx`
**Route:** `/gallery`
**What it does:** Masonry grid of all images from all memories. No year filter. Clicking an image opens the Lightbox.

**Key logic:**
- Pulls `images` arrays from every entry in `src/data/memories.ts`
- `imageItems` array built at module level from `buildGalleryItems()`
- Lightbox controlled by `lightboxIndex` state (index into `imageItems`)

**To add photos:** add image URLs/paths to the `images: []` array of any memory in `src/data/memories.ts`.

---

### `Friendship.tsx`
**Route:** `/friendship` *(linked from Navbar)*
**Sections:**
1. **Stat counters** — 4 animated count-up cards: years of friendship, memories captured, milestones shared, chapters written. Triggered by scroll via `useIntersectionObserver`
2. **Profile card** — Aayushi's avatar, name (Dancing Script), tagline, bio, location
3. **How We Met card** + interests pills
4. **Milestones timeline** — from `friend.milestones`
5. **Messages** — chat-bubble layout from `friend.messages`

---

### `WhatsNext.tsx`
**Route:** `/whats-next`
**Sections:**
1. **Progress bar** — shows X of Y bucket list items done for current filter
2. **Category filter** — all / travel / experience / personal / together
3. **Bucket list grid** — `FadeIn`-wrapped cards, done items faded with strikethrough

**To add a bucket list item:** edit `src/data/plans.ts`.

---

### `Updates.tsx`
**Route:** `/updates`
Sorted newest-first list of dated updates. Each entry is `FadeIn`-wrapped with stagger delay.

**To add an update:** edit `src/data/updates.ts`.

---

### `BookMeeting.tsx`
**Route:** `/book`
Password-gated booking page. Submits to a Google Apps Script webhook.

**Config:** `src/data/booking.ts` — `webhookUrl`, `durationMinutes`, `availableHours`, `slotIntervalMinutes`, `timezone`.

---

## Components (`src/components/`)

| File | What it does | Key props |
|---|---|---|
| `Navbar.tsx` | Fixed top nav. Logo = "Sushi ♥" in Dancing Script gradient. Hamburger on mobile. Highlights active route. | — |
| `Footer.tsx` | Bottom bar. Shows `profile.name`, current year, social links from `profile.socials`. | — |
| `SectionHeading.tsx` | Decorative heading with a rose dash + dot accent above the title. | `title`, `subtitle?` |
| `Tag.tsx` | Small rose pill badge. | `label` |
| `MemoryCard.tsx` | Memory card with 3D flip (click to flip if image exists), reaction heart toggle (session only). Front: image, title, date, location, description, tags, heart button. Back: full image + title. | `memory: Memory` |
| `Lightbox.tsx` | Full-screen image overlay. Keyboard: `←` prev, `→` next, `Esc` close. Touch: swipe left/right. Shows `index / total` counter. | `items`, `index`, `onClose`, `onChange` |
| `FadeIn.tsx` | Wraps children. Fades + slides up when scrolled into view via `IntersectionObserver`. | `children`, `className?`, `delay?` (ms) |
| `FallingPetals.tsx` | CSS-animated falling petals. Renders globally via `App.tsx`. Respects `prefers-reduced-motion`. | — |
| `FloatingHearts.tsx` | Floating heart animation. **Currently unused** — removed from all pages. Component file kept. | — |
| `MusicPlayer.tsx` | Sticky bottom-right 🎵 button. Opens playlist panel with prev/next/play controls. Playlist lives inside this file (`playlist` array). | — |

**To change the music playlist:** edit the `playlist` array at the top of `src/components/MusicPlayer.tsx`. Each track: `{ title, artist, url }`. Set `url` to an audio file path or streaming URL.

---

## Hooks (`src/hooks/`)

| File | What it does | Usage |
|---|---|---|
| `useIntersectionObserver.ts` | Returns `{ ref, isVisible }`. Sets `isVisible = true` once element enters viewport (fires once, then disconnects). | `FadeIn.tsx`, `Friendship.tsx` stat cards |
| `useCountUp.ts` | Animates a number from 0 to `target` over `duration` ms with ease-out cubic. Only starts when `trigger = true`. | `Friendship.tsx` stat cards |

---

## Data (`src/data/`)

### `profile.ts`
**Exports:** `Profile` interface + `profile` object
**Fields:** `name`, `tagline`, `bio`, `location`, `interests[]`, `skills[]`, `socials[]`, `avatar?`
**Who uses it:** `Home.tsx`, `Navbar.tsx` (previously), `Footer.tsx`
**To update Suraj's details:** edit `profile` object here.

---

### `friend.ts`
**Exports:** `Friend` interface + `friend` object
**Fields:** `name`, `tagline`, `bio`, `location`, `howWeMet`, `metYear`, `interests[]`, `skills[]`, `milestones[]`, `messages[]`, `avatar?`
**Current values:** name = `"Aayushi"`, location = `"Mumbai, India"`, metYear = `2015`
**Who uses it:** `Home.tsx`, `Friendship.tsx`, `Navbar.tsx` (indirectly via profile), live counter in `Home.tsx`
**To update Aayushi's details:** edit `friend` object here.

---

### `memories.ts`
**Exports:** `Memory` interface + `memories[]` array + helpers
**Fields per memory:** `id`, `year`, `date`, `title`, `description`, `location?`, `tags[]`, `images[]`, `videoUrls[]`
**Helper functions:**
- `getMemoriesByYear(year)` → used by `Journey.tsx`
- `getYearsWithMemories()` → used by `Journey.tsx` to fill timeline dots
**Years covered:** 2015 – 2026 (auto-extends: new year buttons appear automatically)
**Images:** currently using `picsum.photos` placeholders. Replace with real paths (`/images/2025/photo.jpg`) or URLs.
**Who uses it:** `Journey.tsx`, `Gallery.tsx`, `Home.tsx` (On This Day logic)

**To add a memory:**
```ts
{
  id: "2026-02",
  year: 2026,
  date: "2026-11-01",
  title: "Our Title",
  description: "Description here.",
  location: "City Name",        // optional
  tags: ["tag1", "tag2"],
  images: ["/images/2026/photo.jpg"],
  videoUrls: [],
}
```

---

### `plans.ts`
**Exports:** `BucketItem` interface + `bucketList[]` array
**Fields:** `id`, `title`, `description`, `category` (`"travel"|"experience"|"personal"|"together"`), `done`, `targetYear?`
**Who uses it:** `WhatsNext.tsx`

---

### `updates.ts`
**Exports:** `Update` interface + `updates[]` array
**Fields:** `id`, `date`, `title`, `body`, `tags?[]`
**Sorted:** newest-first at render time in `Updates.tsx`
**Who uses it:** `Updates.tsx`

---

### `booking.ts`
**Exports:** `bookingConfig` object
**Fields:** `webhookUrl`, `durationMinutes`, `timezone`, `availableHours`, `slotIntervalMinutes`
**Who uses it:** `BookMeeting.tsx`

---

## Avatars & Images

| Asset | Where to put it | How to reference |
|---|---|---|
| Suraj's photo | `public/images/profile/suraj.jpg` | Set `profile.avatar` in `src/data/profile.ts` |
| Aayushi's photo | `public/images/profile/friend.jpg` | Set `friend.avatar` in `src/data/friend.ts` |
| Memory photos | `public/images/<year>/filename.jpg` | Add path to `images[]` in `src/data/memories.ts` |

**Current placeholder values:**
- `profile.avatar` = `https://i.pravatar.cc/150?img=11`
- `friend.avatar` = `https://i.pravatar.cc/150?img=47`
- Memory images = `https://picsum.photos/seed/<seed>/800/500`

---

## Design System (Tailwind classes in use)

| Token | Class |
|---|---|
| Page background | `bg-rose-50` |
| Cards / panels | `bg-white border border-rose-100` |
| Primary accent | `rose-400` / `rose-500` |
| Headings | `text-rose-950` |
| Body text | `text-stone-500` |
| Muted text | `text-stone-400` / `text-neutral-400` |
| Borders subtle | `border-rose-100` |
| Borders visible | `border-rose-200` |
| Active buttons | `bg-rose-400 text-white` |
| Tag pills | `bg-rose-100 text-stone-500 border-rose-200` |
| Gradient headline | `from-rose-500 to-rose-300` (hero uses `from-rose-600 via-rose-400 to-rose-300`) |

**Fonts loaded (index.html):**
- `Inter` (400–800) — body, UI
- `Dancing Script` (700) — names (Aayushi & Suraj labels, Navbar logo "Sushi ♥"), friendship page name heading
- `Playfair Display` (700, italic) — "Our Story" hero headline

---

## Routing Table

| URL | Component | Notes |
|---|---|---|
| `/` | `Home.tsx` | Hero, Who Are We, How We Met, Milestones, Explore |
| `/journey` | `Journey.tsx` | Timeline scrubber + year memory grid |
| `/gallery` | `Gallery.tsx` | Masonry photo grid + lightbox |
| `/friendship` | `Friendship.tsx` | Aayushi's profile, stats, milestones, messages |
| `/whats-next` | `WhatsNext.tsx` | Bucket list with filter + progress bar |
| `/updates` | `Updates.tsx` | Dated updates, newest first |
| `/book` | `BookMeeting.tsx` | Password-gated meeting scheduler |

Direct URLs work on Cloudflare Pages via catch-all `_redirects` or Cloudflare Pages SPA routing.

---

## Common Edit Tasks (quick reference)

| What to change | File to edit |
|---|---|
| Suraj's bio, location, socials | `src/data/profile.ts` |
| Aayushi's bio, name, location, how we met | `src/data/friend.ts` |
| Add / edit a memory | `src/data/memories.ts` |
| Add a gallery photo | Add URL to `images[]` in `src/data/memories.ts` |
| Add a bucket list item | `src/data/plans.ts` |
| Post a new update | `src/data/updates.ts` |
| Change music playlist | `playlist` array in `src/components/MusicPlayer.tsx` |
| Change navbar logo text | `src/components/Navbar.tsx` line ~37 |
| Change hero one-liner | `src/pages/Home.tsx` ~line 70 |
| Change page `<title>` | `index.html` `<title>` tag |
| Change Google Fonts | `index.html` `<link>` tag |
| Change booking webhook | `src/data/booking.ts` `webhookUrl` |
