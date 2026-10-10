export interface LinkItem {
  id: string;
  title: string;
  url: string;
  category?: string;
  icon?: string;
  description?: string;
  featured?: boolean;
  clickCount?: number;
  enabled?: boolean;
}

export interface SocialLinks {
  github?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  email?: string;
  website?: string;
}

export interface Profile {
  name: string;
  handle: string;
  bio: string;
  title?: string;
  location?: string;
  avatarUrl: string;
  theme?: "indigo" | "purple" | "emerald" | "ocean" | "sunset";
  socials?: SocialLinks;
  links: LinkItem[];
}
