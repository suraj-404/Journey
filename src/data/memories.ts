export interface Memory {
  id: string;
  year: number;
  date: string;
  title: string;
  description: string;
  location?: string;
  tags: string[];
  images: string[];
  videoUrls: string[];
}

export const memories: Memory[] = [
  // ── 2015 ──────────────────────────────────────────────────────────────────
  {
    id: "2015-01",
    year: 2015,
    date: "2015-06-01",
    title: "The Beginning",
    description:
      "Placeholder description for a 2015 memory. Replace with your own story.",
    location: "Your City",
    tags: ["friendship", "beginnings"],
    images: [],
    videoUrls: [],
  },

  // ── 2016 ──────────────────────────────────────────────────────────────────
  {
    id: "2016-01",
    year: 2016,
    date: "2016-04-10",
    title: "First Adventure",
    description:
      "Placeholder description for a 2016 memory. Replace with your own story.",
    location: "Somewhere Special",
    tags: ["adventure", "travel"],
    images: [],
    videoUrls: [],
  },

  // ── 2017 ──────────────────────────────────────────────────────────────────
  {
    id: "2017-01",
    year: 2017,
    date: "2017-08-15",
    title: "A Milestone Moment",
    description:
      "Placeholder description for a 2017 memory. Replace with your own story.",
    tags: ["milestone"],
    images: [],
    videoUrls: [],
  },

  // ── 2018 ──────────────────────────────────────────────────────────────────
  {
    id: "2018-01",
    year: 2018,
    date: "2018-12-25",
    title: "Celebrations",
    description:
      "Placeholder description for a 2018 memory. Replace with your own story.",
    tags: ["celebration"],
    images: [],
    videoUrls: [],
  },

  // ── 2019 ──────────────────────────────────────────────────────────────────
  {
    id: "2019-01",
    year: 2019,
    date: "2019-07-04",
    title: "Summer Memories",
    description:
      "Placeholder description for a 2019 memory. Replace with your own story.",
    tags: ["summer"],
    images: [],
    videoUrls: [],
  },

  // ── 2020 ──────────────────────────────────────────────────────────────────
  {
    id: "2020-01",
    year: 2020,
    date: "2020-05-01",
    title: "Staying Connected",
    description:
      "Placeholder description for a 2020 memory — a year when staying connected mattered more than ever.",
    tags: ["connection"],
    images: [],
    videoUrls: [],
  },

  // ── 2021 ──────────────────────────────────────────────────────────────────
  {
    id: "2021-01",
    year: 2021,
    date: "2021-09-18",
    title: "New Beginnings",
    description:
      "Placeholder description for a 2021 memory. Replace with your own story.",
    tags: ["new-beginnings"],
    images: [],
    videoUrls: [],
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    id: "2022-01",
    year: 2022,
    date: "2022-03-22",
    title: "Making Memories",
    description:
      "Placeholder description for a 2022 memory. Replace with your own story.",
    tags: ["memories"],
    images: [],
    videoUrls: [],
  },

  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    id: "2023-01",
    year: 2023,
    date: "2023-11-11",
    title: "Reunion",
    description:
      "Placeholder description for a 2023 memory. Replace with your own story.",
    tags: ["reunion"],
    images: [],
    videoUrls: [],
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    id: "2024-01",
    year: 2024,
    date: "2024-02-14",
    title: "Another Chapter",
    description:
      "Placeholder description for a 2024 memory. Replace with your own story.",
    tags: ["chapter"],
    images: [],
    videoUrls: [],
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    id: "2025-01",
    year: 2025,
    date: "2025-06-01",
    title: "Still Going Strong",
    description:
      "Placeholder description for a 2025 memory. Replace with your own story.",
    tags: ["friendship"],
    images: [],
    videoUrls: [],
  },

  // ── 2026 ──────────────────────────────────────────────────────────────────
  {
    id: "2026-01",
    year: 2026,
    date: "2026-10-25",
    title: "The Story Continues",
    description:
      "Placeholder description for a 2026 memory. Replace with your own story.",
    tags: ["friendship"],
    images: [],
    videoUrls: [],
  },
];

export function getMemoriesByYear(year: number): Memory[] {
  return memories.filter((m) => m.year === year);
}

export function getYearsWithMemories(): number[] {
  return [...new Set(memories.map((m) => m.year))].sort();
}
