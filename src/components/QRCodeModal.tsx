"use client";

import React, { useState } from "react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileUrl: string;
  profileName: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  profileUrl,
  profileName,
}: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    profileUrl
  )}&color=090d16&bgcolor=ffffff&margin=10`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy link");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center relative text-center animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition"
          aria-label="닫기"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-white mb-1">
          {profileName}의 QR 코드
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          카메라로 스캔하여 프로필 페이지에 바로 접속하세요!
        </p>

        <div className="bg-white p-4 rounded-2xl shadow-inner mb-6 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrImageUrl}
            alt="프로필 QR 코드"
            className="w-48 h-48 object-contain"
          />
        </div>

        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={handleCopyLink}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4 text-emerald-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                복사되었습니다!
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                프로필 URL 복사
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
