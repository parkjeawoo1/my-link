"use client";

import React, { useState } from "react";
import { Profile, LinkItem, SocialLinks } from "@/types/link";
import { AVATAR_PRESETS, DEV_BIO_TEMPLATES } from "@/data/defaultProfile";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  onSave: (updatedProfile: Profile) => void;
  onReset: () => void;
}

const CATEGORY_OPTIONS = [
  "웹사이트",
  "개발",
  "블로그",
  "소셜",
  "포트폴리오",
  "커뮤니티",
  "기타",
];

const ICON_PRESETS = ["🌐", "💻", "✍️", "📸", "💬", "⚡", "🚀", "🎨", "📧", "🎵", "📌"];

export default function ProfileEditModal({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
}: ProfileEditModalProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "socials" | "links">("basic");
  const [formData, setFormData] = useState<Profile>(profile);

  // Link edit state
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState<Partial<LinkItem>>({
    title: "",
    url: "",
    category: "웹사이트",
    icon: "🌐",
    description: "",
    featured: false,
    enabled: true,
  });

  if (!isOpen) return null;

  const handleBasicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...(prev.socials || {}),
        [name]: value,
      },
    }));
  };

  // Add Link
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;

    const item: LinkItem = {
      id: Date.now().toString(),
      title: newLink.title,
      url: newLink.url.startsWith("http") ? newLink.url : `https://${newLink.url}`,
      category: newLink.category || "웹사이트",
      icon: newLink.icon || "🌐",
      description: newLink.description || "",
      featured: !!newLink.featured,
      clickCount: 0,
      enabled: true,
    };

    setFormData((prev) => ({
      ...prev,
      links: [item, ...prev.links],
    }));

    // Reset form
    setNewLink({
      title: "",
      url: "",
      category: "웹사이트",
      icon: "🌐",
      description: "",
      featured: false,
      enabled: true,
    });
  };

  // Delete Link
  const handleDeleteLink = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((l) => l.id !== id),
    }));
  };

  // Toggle Featured
  const handleToggleFeatured = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((l) =>
        l.id === id ? { ...l, featured: !l.featured } : l
      ),
    }));
  };

  // Move Link Up/Down
  const handleMoveLink = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.links.length) return;

    const updatedLinks = [...formData.links];
    const temp = updatedLinks[index];
    updatedLinks[index] = updatedLinks[targetIndex];
    updatedLinks[targetIndex] = temp;

    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const handleSaveAll = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg font-bold text-white">프로필 편집</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "basic"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            👤 기본 정보
          </button>
          <button
            onClick={() => setActiveTab("socials")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "socials"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            🌐 소셜 계정
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "links"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            🔗 링크 관리 ({formData.links.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-slate-200">
          {/* TAB 1: BASIC INFO */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  아바타 선택 / 프리셋
                </label>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar preview"
                    className="w-14 h-14 rounded-full bg-slate-800 border-2 border-indigo-500 object-cover"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      name="avatarUrl"
                      value={formData.avatarUrl}
                      onChange={handleBasicChange}
                      placeholder="이미지 URL 직접 입력"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs text-slate-400 shrink-0">프리셋:</span>
                  {AVATAR_PRESETS.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, avatarUrl: url }))}
                      className="shrink-0 p-1 rounded-full border-2 border-transparent hover:border-indigo-400 bg-slate-800 transition"
                    >
                      <img src={url} alt="preset" className="w-8 h-8 rounded-full" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleBasicChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    핸들 (@아이디)
                  </label>
                  <input
                    type="text"
                    name="handle"
                    value={formData.handle}
                    onChange={handleBasicChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    직함 / 배지 태그
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleBasicChange}
                    placeholder="예: 💻 Fullstack Developer"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    위치 (Location)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleBasicChange}
                    placeholder="예: Seoul, South Korea 🇰🇷"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    소개글 (Bio)
                  </label>
                  <span className="text-[11px] text-indigo-400">
                    ✨ 개발자 추천 소개글 빠른 적용
                  </span>
                </div>

                {/* 개발자 추천 소개글 템플릿 목록 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
                  {DEV_BIO_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          title: tmpl.title,
                          bio: tmpl.bio,
                        }))
                      }
                      title="클릭하여 직함과 소개글에 자동 적용"
                      className="text-left p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-750 hover:border-indigo-500/60 transition cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-200 group-hover:text-indigo-300">
                          {tmpl.label}
                        </span>
                        <span className="text-[10px] text-slate-500 group-hover:text-indigo-400">
                          적용 &rarr;
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {tmpl.bio}
                      </p>
                    </button>
                  ))}
                </div>

                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleBasicChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  테마 컬러 (Theme Style)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: "indigo", label: "인디고", bg: "from-indigo-600 to-purple-600" },
                    { id: "purple", label: "퍼플", bg: "from-purple-600 to-pink-600" },
                    { id: "emerald", label: "에메랄드", bg: "from-emerald-600 to-teal-600" },
                    { id: "ocean", label: "오션", bg: "from-blue-600 to-cyan-600" },
                    { id: "sunset", label: "선셋", bg: "from-rose-600 to-amber-600" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          theme: t.id as Profile["theme"],
                        }))
                      }
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                        (formData.theme || "indigo") === t.id
                          ? "border-white ring-2 ring-indigo-400 bg-slate-800"
                          : "border-slate-700 bg-slate-800/50 hover:bg-slate-800"
                      }`}
                    >
                      <div className={`w-full h-3 rounded-full bg-gradient-to-r ${t.bg}`} />
                      <span className="text-[10px] text-slate-300 font-medium">
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SOCIAL LINKS */}
          {activeTab === "socials" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-2">
                소셜 미디어 URL을 입력하세요. 빈 칸으로 두면 해당 버튼이 숨겨집니다.
              </p>
              {[
                { name: "github", label: "GitHub", icon: "🐙", placeholder: "https://github.com/username" },
                { name: "instagram", label: "Instagram", icon: "📸", placeholder: "https://instagram.com/username" },
                { name: "twitter", label: "Twitter / X", icon: "🐦", placeholder: "https://x.com/username" },
                { name: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "https://linkedin.com/in/username" },
                { name: "youtube", label: "YouTube", icon: "▶️", placeholder: "https://youtube.com/@channel" },
                { name: "email", label: "Email", icon: "✉️", placeholder: "mailto:yourname@example.com" },
                { name: "website", label: "개인 웹사이트", icon: "🌐", placeholder: "https://yourwebsite.com" },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="w-8 text-center text-lg">{s.icon}</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      name={s.name}
                      value={(formData.socials as any)?.[s.name] || ""}
                      onChange={handleSocialChange}
                      placeholder={s.placeholder}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: LINKS MANAGEMENT */}
          {activeTab === "links" && (
            <div className="space-y-6">
              {/* Add Link Box */}
              <form
                onSubmit={handleAddLink}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3"
              >
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>➕</span> 새 링크 추가하기
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="제목 (예: 내 기술 블로그)"
                    value={newLink.title || ""}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="URL (예: https://...)"
                    value={newLink.url || ""}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">아이콘 선택</label>
                    <div className="flex items-center gap-1">
                      <select
                        value={newLink.icon || "🌐"}
                        onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
                      >
                        {ICON_PRESETS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">카테고리</label>
                    <select
                      value={newLink.category || "웹사이트"}
                      onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none"
                    >
                      {CATEGORY_OPTIONS.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer pb-2 text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={!!newLink.featured}
                        onChange={(e) => setNewLink({ ...newLink, featured: e.target.checked })}
                        className="w-4 h-4 accent-indigo-600 rounded"
                      />
                      ★ Highlight 강조
                    </label>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="짧은 설명 (선택사항)"
                  value={newLink.description || ""}
                  onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition shadow-md"
                >
                  링크 목록에 추가
                </button>
              </form>

              {/* Current Links List */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  현재 링크 목록 ({formData.links.length})
                </h3>

                {formData.links.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">
                    등록된 링크가 없습니다. 위 서식에서 새 링크를 추가하세요!
                  </p>
                ) : (
                  formData.links.map((link, idx) => (
                    <div
                      key={link.id}
                      className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex flex-col text-slate-500 text-xs gap-0.5">
                          <button
                            type="button"
                            onClick={() => handleMoveLink(idx, "up")}
                            disabled={idx === 0}
                            className="hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 cursor-pointer"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveLink(idx, "down")}
                            disabled={idx === formData.links.length - 1}
                            className="hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 cursor-pointer"
                          >
                            ▼
                          </button>
                        </div>
                        <span className="text-xl shrink-0">{link.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-white truncate">
                              {link.title}
                            </span>
                            {link.featured && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                Highlight
                              </span>
                            )}
                            {link.category && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                                {link.category}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {link.url}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(link.id)}
                          title="강조 설정 토글"
                          className={`p-1.5 rounded-lg text-xs transition ${
                            link.featured
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-700/60 text-slate-400 hover:text-white"
                          }`}
                        >
                          ★
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLink(link.id)}
                          title="삭제"
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 text-xs transition"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            기본값으로 초기화
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
