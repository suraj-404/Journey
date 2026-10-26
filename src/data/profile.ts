export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  interests: string[];
  skills: string[];
  socials: { label: string; url: string }[];
  avatar?: string;
}

export const profile: Profile = {
  name: "Suraj Sahu",
  avatar: "https://i.pravatar.cc/150?img=11",
  tagline: "Software Engineer · Explorer · Friend",
  bio: "A software engineer based in Bengaluru who finds joy in the little things — a good trek, an interesting café, trying food from a new place, or catching a game. Life is best lived with curiosity and good company.",
  location: "Bengaluru, India",
  interests: [
    "Adventure",
    "Music",
    "Food",
    "Movies",
    "Trekking",
  ],
  skills: [
    "Software Engineering",
    "Problem Solving",
    "Creativity",
    "Teamwork",
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/yourusername" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { label: "Instagram", url: "https://instagram.com/yourusername" },
  ],
};
