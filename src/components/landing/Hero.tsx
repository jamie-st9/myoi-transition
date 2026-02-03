import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 배경 패턴 - 미묘한 그리드 효과 */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      {/* 메인 콘텐츠 */}
      <div className="relative mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">

          {/* 무료 진단 배지 */}
          <div className="mb-8 inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 ring-1 ring-blue-500/20">
            무료 진단
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            지금 당신의 조건으로
            <br />
            전환을 시도해도 되는지,
            <br />
            냉정하게 판단해 드립니다
          </h1>

          {/* 서브 헤드라인 */}
          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            10년 이상 경력자를 위한 커리어 전환 진단. 3분이면 충분합니다.
          </p>

          {/* 3가지 가치 제안 */}
          <div className="mb-12 grid w-full max-w-2xl gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-3 text-3xl">❌</div>
              <p className="text-sm leading-relaxed text-slate-200">
                하면 안 되는 선택을
                <br />
                먼저 제거
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-3 text-3xl">⭕</div>
              <p className="text-sm leading-relaxed text-slate-200">
                가능한 전환 방향만
                <br />
                좁혀 제시
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-3 text-3xl">❓</div>
              <p className="text-sm leading-relaxed text-slate-200">
                바로 실행 가능한
                <br />
                질문을 던짐
              </p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <Button
            asChild
            size="lg"
            className="h-14 w-full max-w-sm bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-700 md:w-auto"
          >
            <Link href="/input">3분 진단 시작하기</Link>
          </Button>

          {/* 추가 정보 */}
          <p className="mt-4 text-sm text-slate-400">
            로그인 불필요 · 완전 무료 · 3분 소요
          </p>
        </div>
      </div>
    </section>
  );
}
