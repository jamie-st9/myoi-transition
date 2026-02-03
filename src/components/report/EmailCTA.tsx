/**
 * 이메일 CTA 컴포넌트
 * 14일 전환 프로그램 신청
 */

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EmailCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("이메일 주소를 입력하세요");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("유효한 이메일 주소를 입력하세요");
      return;
    }

    // MVP: 콘솔에 로그만 출력
    console.log("Email submitted:", email);

    // 성공 상태로 변경
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-6 rounded-2xl shadow-xl">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        {/* 헤드라인 */}
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          지금 바로 14일 전환을 시작하세요
        </h2>

        {/* 서브텍스트 */}
        <p className="text-base md:text-lg text-slate-300">
          매일 하나의 실험과 질문으로 전환을 준비합니다
        </p>

        {/* 폼 또는 성공 메시지 */}
        {status === "success" ? (
          <div className="rounded-lg bg-green-500/20 border border-green-500 p-6">
            <p className="text-lg font-semibold text-green-100">
              감사합니다! 곧 연락드리겠습니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
              <Input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                  setErrorMessage("");
                }}
                className={`flex-1 bg-white text-base h-12 ${
                  status === "error"
                    ? "border-red-500 ring-red-500/20"
                    : "border-slate-300"
                }`}
                aria-invalid={status === "error"}
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                시작하기
              </Button>
            </div>

            {/* 에러 메시지 */}
            {status === "error" && (
              <p className="text-sm text-red-300 text-left">
                {errorMessage}
              </p>
            )}
          </form>
        )}

        {/* 부가 정보 */}
        <p className="text-sm text-slate-400">
          로그인 불필요 · 완전 무료
        </p>
      </div>
    </div>
  );
}
