/**
 * 이메일 CTA 컴포넌트
 * 리포트를 이메일로 받기
 * Pencil 디자인 적용
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
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* 제목 */}
      <h3 className="text-base font-bold text-neutral-900 mb-2">
        리포트를 이메일로 받기
      </h3>

      {/* 설명 */}
      <p className="text-sm text-neutral-600 mb-4">
        진단 결과를 확인하고 나서도 다시 보실 수 있어요.
      </p>

      {/* 폼 또는 성공 메시지 */}
      {status === "success" ? (
        <div className="rounded-xl bg-green-50 border border-green-200 p-4">
          <p className="text-sm font-medium text-green-700">
            이메일로 전송되었습니다!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 이메일 입력 */}
          <Input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus("idle");
              setErrorMessage("");
            }}
            className={`w-full h-12 rounded-xl bg-neutral-100 border-0 text-sm placeholder:text-neutral-400 ${
              status === "error"
                ? "ring-2 ring-red-500"
                : ""
            }`}
            aria-invalid={status === "error"}
          />

          {/* 에러 메시지 */}
          {status === "error" && (
            <p className="text-xs text-red-500">
              {errorMessage}
            </p>
          )}

          {/* 버튼 */}
          <Button
            type="submit"
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm"
          >
            이메일로 보기
          </Button>
        </form>
      )}
    </div>
  );
}
