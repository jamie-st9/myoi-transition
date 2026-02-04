/**
 * Email CTA component
 * Allows users to receive the report via email
 */

"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function EmailCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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

    // MVP: Log to console only
    console.log("Email submitted:", email);

    // Set success state
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="rounded-2xl bg-[#FFFFFF] px-6 py-6">
      <div className="flex flex-col items-center text-center">
        {/* Mail icon */}
        <Mail className="mb-3 h-7 w-7 text-[#2563EB]" aria-hidden="true" />

        {/* Title */}
        <h3 className="mb-1 text-[16px] font-semibold text-[#1A1A1A]">
          결과를 이메일로 받아보세요
        </h3>

        {/* Description */}
        <p className="mb-4 text-[13px] text-[#6B7280]">
          진단 결과 전문을 이메일로 받아볼 수 있습니다
        </p>

        {/* Success message or form */}
        {status === "success" ? (
          <div className="w-full rounded-[10px] border border-green-200 bg-green-50 p-4">
            <p className="text-[13px] font-medium text-green-700">
              이메일로 전송되었습니다!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-2">
              {/* Email input */}
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                  setErrorMessage("");
                }}
                className={`h-11 flex-1 rounded-[10px] border bg-[#F5F2ED] px-3 text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none transition-colors ${
                  status === "error"
                    ? "border-[#DC2626]"
                    : "border-[#E5E7EB] focus:border-[#2563EB]"
                }`}
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "email-error" : undefined}
              />

              {/* Send button */}
              <button
                type="submit"
                className="h-11 w-20 flex-shrink-0 rounded-[10px] bg-[#2563EB] text-[14px] font-medium text-white transition-colors hover:bg-[#1D4ED8]"
              >
                전송
              </button>
            </div>

            {/* Error message */}
            {status === "error" && (
              <p id="email-error" className="mt-2 text-left text-[12px] text-[#DC2626]">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
