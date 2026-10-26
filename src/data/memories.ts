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
    location: "Bengaluru",
    tags: ["friendship", "beginnings"],
    images: [
      "https://picsum.photos/seed/2015a/800/500",
      "https://picsum.photos/seed/2015b/800/500",
    ],
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
    images: [
      "https://picsum.photos/seed/2016a/800/500",
      "https://picsum.photos/seed/2016b/800/600",
    ],
    videoUrls: [],
  },
  {
    id: "2016-02",
    year: 2016,
    date: "2016-11-20",
    title: "Road Trip",
    description:
      "A spontaneous road trip that turned into one of the best memories.",
    location: "Highway 1",
    tags: ["road-trip", "adventure"],
    images: [
      "https://picsum.photos/seed/2016c/800/500",
    ],
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
    images: [
      "https://picsum.photos/seed/2017a/800/500",
      "https://picsum.photos/seed/2017b/800/700",
    ],
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
    location: "Mumbai",
    tags: ["celebration"],
    images: [
      "https://picsum.photos/seed/2018a/800/500",
    ],
    videoUrls: [],
  },
  {
    id: "2018-02",
    year: 2018,
    date: "2018-07-14",
    title: "Monsoon Memories",
    description:
      "Getting drenched in the rain and not caring one bit.",
    location: "Mumbai",
    tags: ["monsoon", "fun"],
    images: [
      "https://picsum.photos/seed/2018b/800/600",
      "https://picsum.photos/seed/2018c/800/500",
    ],
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
    location: "Goa",
    tags: ["summer", "beach"],
    images: [
      "https://picsum.photos/seed/2019a/800/500",
      "https://picsum.photos/seed/2019b/800/600",
    ],
    videoUrls: [],
  },
  {
    id: "2019-02",
    year: 2019,
    date: "2019-10-02",
    title: "Trek to the Top",
    description:
      "That one trek where we almost gave up but made it to the summit anyway.",
    location: "Western Ghats",
    tags: ["trekking", "adventure"],
    images: [
      "https://picsum.photos/seed/2019c/800/500",
    ],
    videoUrls: [],
  },

  // ── 2020 ──────────────────────────────────────────────────────────────────
  {
    id: "2020-01",
    year: 2020,
    date: "2020-05-01",
    title: "Staying Connected",
    description:
      "A year when staying connected mattered more than ever. Late night calls and shared playlists kept us close.",
    tags: ["connection", "pandemic"],
    images: [
      "https://picsum.photos/seed/2020a/800/500",
    ],
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
    location: "Bengaluru",
    tags: ["new-beginnings"],
    images: [
      "https://picsum.photos/seed/2021a/800/500",
      "https://picsum.photos/seed/2021b/800/600",
    ],
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
    location: "Coorg",
    tags: ["memories", "nature"],
    images: [
      "https://picsum.photos/seed/2022a/800/500",
    ],
    videoUrls: [],
  },
  {
    id: "2022-02",
    year: 2022,
    date: "2022-08-10",
    title: "Late Night Café",
    description:
      "Some of the best conversations happen over bad coffee at 2 AM.",
    location: "Bengaluru",
    tags: ["food", "conversations"],
    images: [
      "https://picsum.photos/seed/2022b/800/500",
      "https://picsum.photos/seed/2022c/800/700",
    ],
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
    location: "Mumbai",
    tags: ["reunion"],
    images: [
      "https://picsum.photos/seed/2023a/800/500",
      "https://picsum.photos/seed/2023b/800/600",
    ],
    videoUrls: [],
  },
  {
    id: "2023-02",
    year: 2023,
    date: "2023-04-05",
    title: "Festival Season",
    description:
      "Colors, lights, and the kind of energy you only get during festival season.",
    location: "Bengaluru",
    tags: ["festival", "celebration"],
    images: [
      "https://picsum.photos/seed/2023c/800/500",
    ],
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
    location: "Pondicherry",
    tags: ["chapter", "travel"],
    images: [
      "https://picsum.photos/seed/2024a/800/500",
      "https://picsum.photos/seed/2024b/800/600",
    ],
    videoUrls: [],
  },
  {
    id: "2024-02",
    year: 2024,
    date: "2024-09-20",
    title: "Weekend Getaway",
    description:
      "Spontaneous plans always make the best memories.",
    location: "Hampi",
    tags: ["travel", "adventure"],
    images: [
      "https://picsum.photos/seed/2024c/800/500",
    ],
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
    location: "Bengaluru",
    tags: ["friendship"],
    images: [
      "https://picsum.photos/seed/2025a/800/500",
      "https://picsum.photos/seed/2025b/800/600",
    ],
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
    location: "Mumbai",
    tags: ["friendship"],
    images: [
      "https://picsum.photos/seed/2026a/800/500",
    ],
    videoUrls: [],
  },
];

export function getMemoriesByYear(year: number): Memory[] {
  return memories.filter((m) => m.year === year);
}

export function getYearsWithMemories(): number[] {
  return [...new Set(memories.map((m) => m.year))].sort();
}
