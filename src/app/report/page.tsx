/**
 * Diagnostic report page
 * Displays 3 report cards, email CTA, and footer
 * Pencil design applied
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Share2, RotateCcw } from "lucide-react";
import { CompleteReport } from "@/lib/types/report";
import { RealityReport } from "@/components/report/RealityReport";
import { IncomeMap } from "@/components/report/IncomeMap";
import { DecisionQuestions } from "@/components/report/DecisionQuestions";
import { EmailCTA } from "@/components/report/EmailCTA";

/** Format today's date in Korean */
function formatKoreanDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}년 ${month}월 ${day}일 생성`;
}

export default function ReportPage() {
  const [reportData, setReportData] = useState<CompleteReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load report data from sessionStorage
    try {
      const storedData = sessionStorage.getItem("myoi-report-data");

      if (!storedData) {
        setIsLoading(false);
        return;
      }

      const parsedData: CompleteReport = JSON.parse(storedData);
      setReportData(parsedData);
    } catch (err) {
      console.error("Failed to load report data:", err);
      setError(
        "리포트 데이터를 불러오는 데 실패했습니다. 다시 진단을 진행해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#2563EB] border-t-transparent" />
          <p className="text-[14px] text-[#6B7280]">
            리포트를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6">
        <div className="max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl text-[#DC2626]">!</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            오류가 발생했습니다
          </h1>
          <p className="text-[14px] leading-relaxed text-[#6B7280]">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                try {
                  const storedData =
                    sessionStorage.getItem("myoi-report-data");
                  if (storedData) {
                    const parsedData: CompleteReport = JSON.parse(storedData);
                    setReportData(parsedData);
                  }
                } catch (retryErr) {
                  console.error("Retry failed:", retryErr);
                  setError(
                    "리포트 데이터를 불러오는 데 실패했습니다. 다시 진단을 진행해주세요."
                  );
                } finally {
                  setIsLoading(false);
                }
              }}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2563EB] px-8 font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              다시 시도
            </button>
            <Link
              href="/input"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#E5E7EB] px-8 font-semibold text-[#1A1A1A] transition-colors hover:bg-[#F5F2ED]"
            >
              입력 페이지로 이동
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!reportData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6">
        <div className="max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <span className="text-2xl text-[#F59E0B]">!</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            리포트를 찾을 수 없습니다
          </h1>
          <p className="text-[14px] leading-relaxed text-[#6B7280]">
            진단을 먼저 완료해주세요. 입력 페이지로 이동하여 정보를 입력하면
            리포트를 받아보실 수 있습니다.
          </p>
          <Link
            href="/input"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#2563EB] px-8 font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            입력 페이지로 이동
          </Link>
        </div>
      </div>
    );
  }

  // Report display
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="flex h-14 items-center justify-between px-6">
        <span className="text-[20px] font-bold text-[#2563EB]">MyOi</span>
        <button
          type="button"
          aria-label="공유하기"
          className="flex items-center justify-center"
        >
          <Share2 className="h-5 w-5 text-[#6B7280]" aria-hidden="true" />
        </button>
      </header>

      {/* Banner */}
      <div className="bg-[#2563EB] px-6 py-6 text-center">
        <p className="text-[12px] font-semibold tracking-[1px] text-white/60">
          TRANSITION 진단 결과
        </p>
        <h1 className="mt-1 text-[24px] font-bold tracking-[-0.5px] text-white">
          진단 결과 리포트
        </h1>
        <p className="mt-1 text-[13px] text-white/60">
          {formatKoreanDate()}
        </p>
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-lg px-6 py-6">
        {/* Report cards */}
        <div className="flex flex-col gap-5">
          {/* 1. Reality Check Report */}
          <RealityReport data={reportData.realityReport} />

          {/* 2. Skill Analysis */}
          <IncomeMap data={reportData.incomeMap} />

          {/* 3. Decision Questions */}
          <DecisionQuestions data={reportData.decisionQuestions} />
        </div>

        {/* Email CTA */}
        <div className="mt-5">
          <EmailCTA />
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center gap-3 pb-8">
          <Link
            href="/input"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] text-[14px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F5F2ED]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            다시 진단하기
          </Link>
          <span className="text-[11px] text-[#9CA3AF]">
            MyOi TRANSITION v1.0
          </span>
        </div>
      </div>
    </div>
  );
}
