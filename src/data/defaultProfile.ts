import { Profile } from "@/types/link";

export const initialProfile: Profile = {
  name: "박제우",
  handle: "@jewoo_park",
  bio: "안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.",
  title: "🎓 대학생 & 개발 공부 중",
  location: "Seoul, South Korea",
  avatarUrl: "https://api.dicebear.com/7.x/notionists/svg?seed=Jewoo",
  theme: "indigo",
  socials: {
    github: "https://github.com",
    instagram: "https://instagram.com",
    email: "mailto:example@email.com",
  },
  links: [
    {
      id: "1",
      title: "💻 GitHub 저장소",
      url: "https://github.com",
      category: "개발",
      icon: "⚡",
      description: "배우고 있는 코딩 프로젝트 및 학습 기록",
      featured: true,
      clickCount: 12,
      enabled: true,
    },
    {
      id: "2",
      title: "✍️ 기술 학습 노트 & 블로그",
      url: "https://velog.io",
      category: "블로그",
      icon: "📝",
      description: "바이브 코딩 공부 내용 정리",
      featured: false,
      clickCount: 8,
      enabled: true,
    },
    {
      id: "3",
      title: "📸 인스타그램",
      url: "https://instagram.com",
      category: "소셜",
      icon: "✨",
      description: "일상 & 대학 생활",
      featured: false,
      clickCount: 15,
      enabled: true,
    },
  ],
};

export const AVATAR_PRESETS = [
  "https://api.dicebear.com/7.x/notionists/svg?seed=Jewoo",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Jewoo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jewoo",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=Jewoo",
  "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jewoo",
];
