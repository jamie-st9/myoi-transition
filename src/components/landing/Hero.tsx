import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] px-6 py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          {/* 무료 진단 배지 */}
          <div className="mb-8 inline-flex items-center rounded-full bg-white/[0.08] px-5 py-2 text-sm text-white/90">
            무료 진단
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="mb-6 text-[22px] font-normal leading-[1.15] tracking-[-0.5px] text-white">
            MyOi TRANSITION
            <br />
            성공적인 커리어 전환을 도와드립니다.
          </h1>

          {/* 서브라인 */}
          <p className="mb-10 text-[15px] leading-[1.5] text-white/70">
            40-50대 직장인을 위한 AI 커리어 리얼리티 체크.
            <br />
            잘못된 전환을 막는 커리어 진단 플랫폼
            <br />
            3분 입력, 즉시 진단 리포트를 받아보세요.
          </p>

          {/* CTA 버튼 */}
          <Button
            asChild
            className="h-12 w-full rounded-lg bg-[#2563EB] text-base font-medium text-white hover:bg-[#1D4ED8]"
          >
            <Link href="/input">3분 진단 시작하기</Link>
          </Button>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-md">
          <h2 className="mb-8 text-center text-xl font-semibold text-gray-900">
            왜 MyOi TRANSITION인가?
          </h2>

          <div className="space-y-4">
            {/* 판단 능력 리포트 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                판단 능력 리포트
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                우선 하면 안 될 일을 걸러내고, 해볼 수 있을지 현실 점검
              </p>
            </div>

            {/* 수익화 지도 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                수익화 지도
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                가능한 역할을 당신 조건에 맞게 3개 추천, 도달 격차 계산
              </p>
            </div>

            {/* 결정 돕는 질의서 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                결정 돕는 질의서
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                결정 장벽을 극복할 질문과 7일간 미니 실험 제안
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works / Trust Section */}
      <section className="bg-[#FAF8F5] px-6 py-16">
        <div className="mx-auto max-w-md">
          <h2 className="mb-8 text-center text-xl font-semibold text-gray-900">
            자격 및 신뢰성
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* 신뢰 배지들 */}
            <div className="rounded-xl bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#1E3A5F]">50%</p>
              <p className="mt-1 text-xs text-gray-600">
                기존 대비 월 수입 향상
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#1E3A5F]">10배</p>
              <p className="mt-1 text-xs text-gray-600">가격 대비 가치</p>
            </div>

            <div className="rounded-xl bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#1E3A5F]">AI</p>
              <p className="mt-1 text-xs text-gray-600">최신 분석 기술</p>
            </div>

            <div className="rounded-xl bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-[#1E3A5F]">3분</p>
              <p className="mt-1 text-xs text-gray-600">빠른 진단 완료</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#1E3A5F] px-6 py-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="mb-6 text-xl font-semibold text-white">
            지금 바로 진단받으세요
          </h2>

          {/* 혜택 목록 */}
          <ul className="mb-8 space-y-3 text-left">
            <li className="flex items-center gap-3 text-sm text-white/80">
              <Check className="h-4 w-4 shrink-0 text-green-400" />
              <span>로그인 없이 바로 시작</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/80">
              <Check className="h-4 w-4 shrink-0 text-green-400" />
              <span>3분 입력으로 즉시 결과 확인</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/80">
              <Check className="h-4 w-4 shrink-0 text-green-400" />
              <span>AI 기반 맞춤형 커리어 분석</span>
            </li>
          </ul>

          {/* CTA 버튼 */}
          <Button
            asChild
            className="h-12 w-full rounded-lg bg-white text-base font-medium text-[#1E3A5F] hover:bg-gray-100"
          >
            <Link href="/input">무료 · 빠른 진단 시작</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF8F5] px-6 py-8">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-2 text-sm font-medium text-gray-700">
            MyOi TRANSITION
          </p>
          <p className="text-xs text-gray-500">
            &copy; 2025 MyOi. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
