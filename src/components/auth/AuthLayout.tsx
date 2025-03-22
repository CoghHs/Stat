// components/auth/AuthLayout.tsx
import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 영역 */}
      <header className="py-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center">
            <Link href="/">
              <h1 className="font-extrabold text-3xl">STAT</h1>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
