import { Profile } from "@/types/link";

export const initialProfile: Profile = {
  name: "박제우",
  handle: "@jewoo_park",
  bio: "문제를 해결하는 코드와 직관적인 사용자 경험을 만드는 개발자 박제우입니다. 배움과 기록을 즐기며, 가치 있는 프로덕트를 만들어갑니다. 💻✨",
  title: "🚀 성장하는 소프트웨어 엔지니어",
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
      description: "개인 프로젝트, 오픈소스 기여 및 학습 기록",
      featured: true,
      clickCount: 12,
      enabled: true,
    },
    {
      id: "2",
      title: "✍️ 기술 블로그",
      url: "https://velog.io",
      category: "블로그",
      icon: "📝",
      description: "문제 해결 과정과 개발 지식을 공유하는 블로그",
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

export interface BioTemplate {
  label: string;
  title: string;
  bio: string;
}

export const DEV_BIO_TEMPLATES: BioTemplate[] = [
  {
    label: "🚀 모던 웹 & 프로덕트",
    title: "🚀 성장하는 소프트웨어 엔지니어",
    bio: "문제를 해결하는 코드와 직관적인 사용자 경험을 만드는 개발자 박제우입니다. 배움과 기록을 즐기며, 가치 있는 프로덕트를 만들어갑니다. 💻✨",
  },
  {
    label: "🎨 프론트엔드 & UI/UX",
    title: "🎨 사용자 경험을 고민하는 프론트엔드 개발자",
    bio: "디테일한 인터랙션과 깔끔한 인터페이스를 구현하는 프론트엔드 개발자입니다. 기술로 사람과 서비스를 잇는 가치를 만듭니다. 🌐",
  },
  {
    label: "⚡ 도전 & 풀스택 지향",
    title: "⚡ 빠른 학습과 도전을 즐기는 풀스택 지향 개발자",
    bio: "아이디어를 실제 동작하는 소프트웨어로 빠르게 구현합니다. 최신 웹 기술과 클라우드, 바이브 코딩을 탐구하고 있습니다. 🛠️",
  },
  {
    label: "🤝 실용주의 & 클린코드",
    title: "💡 본질에 집중하는 실용주의 개발자",
    bio: "복잡한 문제를 단순하고 유지보수하기 쉬운 코드로 풀어냅니다. 원활한 소통과 협업을 통해 함께 성장하는 가치를 믿습니다. 🌱",
  },
];
