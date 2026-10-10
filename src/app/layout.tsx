import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyLink - 나만의 링크 모음",
  description: "소셜 미디어와 모든 중요 링크를 한 곳에서 관리하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
