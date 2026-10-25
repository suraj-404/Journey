export interface BucketItem {
  id: string;
  title: string;
  description: string;
  category: "travel" | "experience" | "personal" | "together";
  done: boolean;
  targetYear?: number;
}

export const bucketList: BucketItem[] = [
  {
    id: "b1",
    title: "Visit [Dream Destination]",
    description: "A place you've always wanted to see — describe why it matters.",
    category: "travel",
    done: false,
    targetYear: 2026,
  },
  {
    id: "b2",
    title: "Learn [New Skill]",
    description: "Something you want to master — music, language, sport.",
    category: "personal",
    done: false,
  },
  {
    id: "b3",
    title: "Take a Road Trip Together",
    description: "Pick up and go — no fixed destination, just the journey.",
    category: "together",
    done: false,
    targetYear: 2027,
  },
  {
    id: "b4",
    title: "Watch the Sunrise from a Mountain",
    description: "A moment worth waking up early for.",
    category: "experience",
    done: false,
  },
  {
    id: "b5",
    title: "Complete [Personal Goal]",
    description: "Replace this with something meaningful to you.",
    category: "personal",
    done: false,
  },
  {
    id: "b6",
    title: "Attend a Live [Concert / Sports Event]",
    description: "A shared experience you've been putting off.",
    category: "together",
    done: true,
  },
];
