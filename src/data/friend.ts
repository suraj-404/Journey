export interface Friend {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  howWeMet: string;
  metYear: number;
  interests: string[];
  skills: string[];
  milestones: { year: number; event: string }[];
  messages: { from: string; text: string }[];
}

export const friend: Friend = {
  name: "Friend's Name",
  tagline: "The one who makes every adventure better",
  bio: "A short paragraph about your friend — their personality, what makes them special, and why this friendship matters so much to you.",
  location: "Their City, Country",
  howWeMet: "Describe how you two first crossed paths — the place, the moment, and what made it stick.",
  metYear: 2015,
  interests: [
    "Adventure",
    "Music",
    "Food",
    "Movies",
    "Travel",
  ],
  skills: [
    "Placeholder Skill 1",
    "Placeholder Skill 2",
    "Placeholder Skill 3",
  ],
  milestones: [
    { year: 2015, event: "First met — the beginning of something great." },
    { year: 2016, event: "First trip together — placeholder destination." },
    { year: 2017, event: "A milestone memory — describe it here." },
    { year: 2020, event: "Stayed connected despite the distance." },
    { year: 2023, event: "Reunited after a long time apart." },
  ],
  messages: [
    {
      from: "You",
      text: "A short heartfelt message to your friend. Replace with your own words.",
    },
    {
      from: "Friend's Name",
      text: "A message from your friend, if they'd like to add one.",
    },
  ],
};
