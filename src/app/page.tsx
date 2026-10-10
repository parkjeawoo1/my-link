"use client";

import { useState, useEffect, useMemo } from "react";
import Toast from "@/components/Toast";
import QRCodeModal from "@/components/QRCodeModal";
import ProfileEditModal from "@/components/ProfileEditModal";
import { Profile } from "@/types/link";
import { initialProfile } from "@/data/defaultProfile";

const LOCAL_STORAGE_KEY = "mylink_profile_jewoo_v1";

export default function Home() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modals & UI States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // 기존 대학생 소개글이 캐시되어 있는 경우 새 개발자 소개글로 자동 업데이트
        if (
          !parsed.bio ||
          parsed.bio === "안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다."
        ) {
          parsed.bio = initialProfile.bio;
          parsed.title = initialProfile.title;
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
        }
        setProfile(parsed);
      }
    } catch {
      console.error("Failed to load profile from localStorage");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when profile changes
  const saveProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
    } catch {
      console.error("Failed to save profile to localStorage");
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  // Handle Share URL
  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        triggerToast("링크가 클립보드에 복사되었습니다! 🎉");
      }
    } catch {
      triggerToast("링크 복사에 실패했습니다.");
    }
  };

  // Handle Link Click Count
  const handleLinkClick = (id: string) => {
    const updatedLinks = profile.links.map((link) =>
      link.id === id ? { ...link, clickCount: (link.clickCount || 0) + 1 } : link
    );
    const updatedProfile = { ...profile, links: updatedLinks };
    saveProfile(updatedProfile);
  };

  // Reset profile to initial default
  const handleResetProfile = () => {
    if (confirm("프로필 데이터를 기본 개발자 프로필 상태로 복원하시겠습니까?")) {
      saveProfile(initialProfile);
      triggerToast("기본 개발자 프로필로 복원되었습니다. 🚀");
    }
  };

  // Theme Gradients
  const themeGradients = {
    indigo: {
      ring: "from-indigo-500 via-purple-500 to-pink-500",
      featured:
        "bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 hover:from-indigo-600 hover:to-pink-600 ring-2 ring-indigo-400/50",
    },
    purple: {
      ring: "from-purple-500 via-fuchsia-500 to-pink-500",
      featured:
        "bg-gradient-to-r from-purple-600/90 via-fuchsia-600/90 to-pink-600/90 hover:from-purple-600 hover:to-pink-600 ring-2 ring-purple-400/50",
    },
    emerald: {
      ring: "from-emerald-400 via-teal-500 to-cyan-500",
      featured:
        "bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90 hover:from-emerald-600 hover:to-cyan-600 ring-2 ring-emerald-400/50",
    },
    ocean: {
      ring: "from-blue-500 via-indigo-500 to-cyan-400",
      featured:
        "bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-cyan-600/90 hover:from-blue-600 hover:to-cyan-600 ring-2 ring-blue-400/50",
    },
    sunset: {
      ring: "from-rose-500 via-orange-500 to-amber-400",
      featured:
        "bg-gradient-to-r from-rose-600/90 via-orange-600/90 to-amber-600/90 hover:from-rose-600 hover:to-amber-600 ring-2 ring-rose-400/50",
    },
  };

  const currentTheme = themeGradients[profile.theme || "indigo"];

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>로딩 중...</span>
        </div>
      </main>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://mylink.app";

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 flex flex-col items-center justify-between text-slate-100 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        {/* 상단 툴바 버튼 */}
        <div className="w-full flex items-center justify-between mb-8">
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          >
            <span>⚙️</span> 프로필 수정
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQRModal(true)}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-md active:scale-95"
              title="QR 코드 보기"
              aria-label="QR 코드"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer shadow-md active:scale-95"
              title="페이지 링크 복사"
              aria-label="공유하기"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 심플 중앙 정렬 프로필 헤더 */}
        <div className="flex flex-col items-center mb-8">
          {/* 아바타 */}
          <div className="relative mb-5 group">
            <div
              className={`w-28 h-28 rounded-full p-1 bg-gradient-to-tr ${currentTheme.ring} shadow-2xl ring-4 ring-slate-900 transition-transform duration-300 group-hover:scale-105`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover bg-slate-900"
              />
            </div>
          </div>

          {/* 이름 */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-1.5">
            {profile.name}
          </h1>

          {/* 핸들 / 태그 */}
          <p className="text-sm font-semibold text-indigo-400 mb-3">
            {profile.handle}
          </p>

          {/* 직함/신분 태그 */}
          {profile.title && (
            <div className="inline-block px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-medium text-slate-200 mb-4 shadow-sm">
              {profile.title}
            </div>
          )}

          {/* 소개글 */}
          <p className="text-sm text-slate-300 max-w-xs leading-relaxed font-normal px-2">
            {profile.bio}
          </p>

          {/* 소셜 링크 아이콘 */}
          {profile.socials && (
            <div className="flex items-center justify-center gap-3 mt-5">
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 border border-slate-700/70 text-slate-300 hover:text-white transition shadow-sm"
                  title="GitHub"
                >
                  🐙
                </a>
              )}
              {profile.socials.instagram && (
                <a
                  href={profile.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 border border-slate-700/70 text-slate-300 hover:text-white transition shadow-sm"
                  title="Instagram"
                >
                  📸
                </a>
              )}
              {profile.socials.email && (
                <a
                  href={profile.socials.email}
                  className="p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700 border border-slate-700/70 text-slate-300 hover:text-white transition shadow-sm"
                  title="Email"
                >
                  ✉️
                </a>
              )}
            </div>
          )}
        </div>

        {/* 링크 목록 (심플 중앙 카드) */}
        <div className="w-full space-y-3.5">
          {profile.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLinkClick(link.id)}
              className={`group block w-full p-4 rounded-2xl transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.98] ${
                link.featured
                  ? currentTheme.featured
                  : "bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                    {link.icon || "🌐"}
                  </span>
                  <div className="text-left min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base group-hover:text-white transition-colors truncate">
                        {link.title}
                      </span>
                      {link.featured && (
                        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                          ★ Highlight
                        </span>
                      )}
                    </div>
                    {link.description && (
                      <div className="text-xs text-slate-300/80 mt-0.5 truncate">
                        {link.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="mt-12 text-center text-xs text-slate-500 font-medium">
        <p>© {profile.name} &bull; MyLink Profile</p>
      </footer>

      {/* 모달 & 토스트 */}
      <Toast
        message={toastMessage}
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />

      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        profileUrl={currentUrl}
        profileName={profile.name}
      />

      <ProfileEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
        onSave={(updated) => {
          saveProfile(updated);
          triggerToast("프로필이 변경되었습니다!");
        }}
        onReset={handleResetProfile}
      />
    </main>
  );
}
