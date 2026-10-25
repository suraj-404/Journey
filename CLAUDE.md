# Personal Journey Website — Claude Code Project Instructions

## Project goal
Build a personal digital time capsule that celebrates my life and a close friendship, beginning in 2015 and continuing every year. The website will be gifted to my friend and should be simple for either of us to maintain.

## Design reference
- Reference: https://kaushik.elevenxstudios.com/
- Inspect the live reference (or request screenshots if browsing is unavailable) before choosing final design details.
- Aim for a similar dark, minimal, polished portfolio feel, with thoughtful typography, spacing, hover states, and subtle animation.
- Do not copy proprietary source code, text, logos, photos, or other protected assets. Build original components and use placeholders for personal content.
- Never claim exact color or font matches unless verified from the reference.

## Stack and deployment
- React + Vite + TypeScript + Tailwind CSS.
- Static site, no backend or database in v1.
- Host on Cloudflare Pages; domain is already registered with Cloudflare.
- GitHub for source control and automatic deployments.
- Prefer established, lightweight dependencies. Avoid adding libraries without a clear need.

## Pages / navigation
1. Home — Who I Am, What I Do, interests, personal introduction, hero section.
2. Our Journey — year selector from 2015 through the current year, inclusive. Derive the current year at runtime, not from a hard-coded end year. Display memories grouped by selected year and handle years with no content gracefully.
3. Friendship — my friend's profile, how we met, milestones, messages, shared memories.
4. Gallery — responsive photos and videos, year filtering, accessible lightbox, captions.
5. What's Next — bucket list, plans, aspirations, upcoming adventures.
6. Latest Updates — dated updates sorted newest first.

## Content and data
- Keep content outside UI components in typed data modules under `src/data/` (profile, friend, memories, plans, updates).
- Example memory fields: id, year, date, title, description, location (optional), tags, images, videoUrls.
- Place small optimized images under `public/images/<year>/`; use appropriate external video hosting or streaming for large videos.
- All personal details and media must be placeholders until supplied by the owner. Do not invent real events, quotes, names, or photographs.
- A new year should appear automatically. Adding memories should require editing data and assets only, not JSX.
- Include a README section with a concrete example showing how to add a memory, photo, video, and yearly update.
- Future editable admin UI is out of scope; do not pretend the static website allows visitors to upload content.

## Engineering standards
- Use reusable components, semantic HTML, accessible labels, keyboard navigation, visible focus states, and alt text.
- Make the site mobile-first and responsive across phone, tablet, and desktop.
- Lazy-load noncritical images and videos; optimize image dimensions and formats.
- Respect prefers-reduced-motion; avoid heavy animation.
- Keep TypeScript strict; avoid `any` where possible.
- Use clean routes/navigation and ensure direct URLs work on Cloudflare Pages if client-side routing is used.
- Never expose credentials, private data, or tokens in client-side code or commits.
- Treat all content as public unless an actual access-control system is implemented. Ask before publishing private memories.

## Working method
1. Inspect the reference and summarize the observed design system. If inaccessible, request screenshots and proceed with clearly labeled assumptions.
2. Create a brief implementation plan and update `progress.md`.
3. Implement a functional MVP with placeholders before polishing animations.
4. Build in small, reviewable stages: shell/navigation, Home, Journey, Friendship, Gallery, What's Next, Updates, polish.
5. After each meaningful stage, update `progress.md` with completed work, blockers, and next steps.
6. Before calling the project finished, run the project's typecheck, lint, tests (if configured), and production build; fix failures.
7. Use Playwright/browser automation when available to verify mobile layout, year selection, navigation, image behavior, and keyboard access. Do not claim browser testing if unavailable.
8. Prepare Cloudflare Pages deployment instructions: framework preset Vite, build command `npm run build`, output directory `dist`, connect GitHub, configure custom domain, verify HTTPS and both apex/www behavior.
9. Do not deploy, publish, modify DNS, or incur charges without explicit approval.

## Definition of done
- All six sections work with editable placeholder data.
- Year selector automatically spans 2015 through the current year.
- Responsive layout and basic accessibility checks pass.
- Build completes successfully.
- README explains local setup, yearly content updates, and Cloudflare Pages deployment.
- `progress.md` accurately records any remaining issues.

## Skills and tools
- Use the `frontend-design` skill if installed for visual design work.
- Use Playwright or browser automation if configured for visual and interaction checks.
- A dedicated Cloudflare or review skill is optional; do not block implementation if unavailable.

## Current design system (as implemented)
- Background: `bg-rose-50` (soft blush)
- Cards / panels: `bg-white` with `border-rose-100`
- Accent color: `rose-400` / `rose-500`
- Headings: `text-rose-950`
- Body text: `text-stone-500`
- Muted text: `text-stone-400`
- Borders: `rose-100` (subtle), `rose-200` (visible)
- Active buttons: `bg-rose-400 text-white`
- Skill pills: `bg-rose-400/10 border-rose-400/20 text-rose-500`
- Interest pills: `bg-rose-50 border-rose-200 text-stone-600`
- Hero name gradient: `from-rose-500 to-rose-300`

## Owner details (Suraj Sahu)
- Name: Suraj Sahu
- Role: Software Engineer
- Location: Bengaluru, India
- Interests: Adventure, Music, Food, Movies, Trekking
- Friendship started: 2015
