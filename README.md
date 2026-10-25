# Journey Site

A personal digital time capsule celebrating a decade-long friendship, from 2015 to the present. Built with React, Vite, TypeScript, and Tailwind CSS and hosted on Cloudflare Pages, the site lets two people browse yearly memories, a shared gallery, messages, and life updates — all maintained by editing plain TypeScript data files.

---

## Local development

**Prerequisites:** Node 18+ and npm.

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd journey-site

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Visit http://localhost:5173 in your browser.

---

## Project structure

```
journey-site/
├── public/
│   └── images/
│       ├── 2015/   ← place photos here, year by year
│       ├── 2016/
│       └── ...
├── src/
│   ├── components/ ← reusable UI components
│   ├── data/       ← all editable content lives here
│   │   ├── memories.ts
│   │   ├── updates.ts
│   │   ├── profile.ts
│   │   ├── friend.ts
│   │   └── plans.ts
│   ├── pages/      ← one file per route
│   └── styles/
├── index.html
└── vite.config.ts
```

---

## How to add a new memory

This is the most common task. All memories live in `src/data/memories.ts`.

1. Open `src/data/memories.ts`.
2. Add a new object to the `memories` array. Order doesn't matter — the site sorts by year automatically.

**Example (filled in):**

```ts
{
  id: "2026-02",
  year: 2026,
  date: "2026-07-04",
  title: "Road trip to Big Sur",
  description: "We finally did the California coast drive we'd been planning for three years. Camped two nights, watched the sun set over the cliffs, and ate way too many fish tacos.",
  location: "Big Sur, CA",
  tags: ["travel", "road-trip"],
  images: ["/images/2026/big-sur-sunset.jpg", "/images/2026/campfire.jpg"],
  videoUrls: ["https://www.youtube.com/embed/dQw4w9WgXcQ"],
},
```

3. **Adding a photo:** copy the image file into `public/images/<year>/` (e.g. `public/images/2026/big-sur-sunset.jpg`), then reference it as `"/images/2026/big-sur-sunset.jpg"` in the `images` array. Keep images optimized (under ~300 KB each; use JPEG or WebP).

4. **Adding a video:** upload the video to YouTube (or another host), grab the embed URL, and add it to `videoUrls`. Do not commit large video files to the repo.

5. No other changes needed. The year selector on the Journey page picks up new years automatically.

---

## How to add a yearly update

Updates appear on the Latest Updates page, sorted newest first at runtime.

Open `src/data/updates.ts` and prepend a new entry:

```ts
{
  id: "u5",           // unique id — increment the number
  date: "2026-12-31",
  title: "End of Year Reflections",
  body: "A year full of surprises. We hiked more trails, tried more restaurants, and somehow found time to start that side project we kept talking about. Looking forward to what's next.",
  tags: ["reflection", "2026"],
},
```

The `tags` field is optional.

---

## How to add a new year

You don't need to do anything. The Journey page computes the list of years from 2015 through the current year at runtime (`new Date().getFullYear()`). Just add memories for the new year in `memories.ts` and they appear automatically.

---

## Building for production

```bash
npm run build
```

The compiled site is written to `dist/`. You can preview it locally with:

```bash
npm run preview
```

---

## Deployment on Cloudflare Pages

1. Push the repo to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your GitHub repo.
4. Set the build configuration:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Cloudflare builds and publishes the site automatically on every push to `main`.
6. **Custom domain:** in Pages → your project → **Custom domains**, add your domain (e.g. `yourname.com`). Cloudflare handles HTTPS and both apex (`yourname.com`) and `www` automatically since DNS is already managed there.

---

## Keeping content private

All content in `src/data/` is bundled into the public site. Do not include private addresses, phone numbers, or any details you would not share publicly. Photos are served from the `public/` folder and are publicly accessible once deployed.
