import Link from "next/link";
import { ArrowRight, Sparkles, Timer, ShieldCheck, Brain } from "lucide-react";

export function Hero() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      {/* Top Bar */}
      <header className="px-6 py-4">
        <div className="mx-auto max-w-md">
          <span className="text-[20px] font-bold text-[#2563EB]">MyOi</span>
        </div>
      </header>

      {/* Hero Section - centered vertically */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-md w-full text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-[20px] bg-[#EFF6FF] px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-[#2563EB]" />
            <span className="text-sm font-medium text-[#2563EB]">
              AI 기반 커리어 진단
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="mb-4 text-[40px] font-[800] leading-[1.1] tracking-[-1px] text-[#1A1A1A]">
            3분 커리어
            <br />
            전환 진단
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-[16px] leading-relaxed text-[#6B7280]">
            당신의 경력과 상황에 맞는
            <br />
            현실적인 전환 방향을 AI가 분석합니다
          </p>

          {/* CTA Section */}
          <div className="space-y-3">
            <Link
              href="/input"
              className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#2563EB] text-[16px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              무료 진단 시작하기
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-[12px] text-[#9CA3AF]">
              3분이면 충분합니다 &middot; 무료 &middot; 로그인 불필요
            </p>
          </div>

          {/* Trust Section */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5">
              <Timer className="h-4 w-4 text-[#2563EB]" />
              <span className="text-[12px] font-medium text-[#6B7280]">3분 소요</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              <span className="text-[12px] font-medium text-[#6B7280]">데이터 보호</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-[#2563EB]" />
              <span className="text-[12px] font-medium text-[#6B7280]">AI 분석</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
