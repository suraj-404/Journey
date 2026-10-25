export interface Update {
  id: string;
  date: string;
  title: string;
  body: string;
  tags?: string[];
}

export const updates: Update[] = [
  {
    id: "u4",
    date: "2026-10-25",
    title: "New Adventures in 2026",
    body: "Placeholder update for 2026. Replace with what's happening right now — the moments, milestones, and things you're looking forward to.",
    tags: ["life", "2026"],
  },
  {
    id: "u3",
    date: "2025-10-01",
    title: "Latest Chapter",
    body: "Replace this with your most recent life update — what's happening now, what you're excited about, what changed.",
    tags: ["life"],
  },
  {
    id: "u2",
    date: "2025-01-15",
    title: "New Year, New Plans",
    body: "Placeholder update from early 2025. Replace with what was on your mind at the start of the year.",
    tags: ["reflection"],
  },
  {
    id: "u1",
    date: "2024-12-31",
    title: "Year in Review",
    body: "Placeholder year-end reflection for 2024. Replace with your own highlights, lessons, and gratitude.",
    tags: ["reflection", "2024"],
  },
];
