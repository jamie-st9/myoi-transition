/**
 * 진단 리포트 페이지
 * 3가지 리포트 카드와 이메일 CTA 표시
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CompleteReport } from "@/lib/types/report";
import { RealityReport } from "@/components/report/RealityReport";
import { IncomeMap } from "@/components/report/IncomeMap";
import { DecisionQuestions } from "@/components/report/DecisionQuestions";
import { EmailCTA } from "@/components/report/EmailCTA";

export default function ReportPage() {
  const [reportData, setReportData] = useState<CompleteReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // sessionStorage에서 리포트 데이터 로드
    try {
      const storedData = sessionStorage.getItem("myoi-report-data");

      if (!storedData) {
        setIsLoading(false);
        return;
      }

      const parsedData: CompleteReport = JSON.parse(storedData);
      setReportData(parsedData);
    } catch (error) {
      console.error("Failed to load report data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto" />
          <p className="text-base text-muted-foreground">
            리포트를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">
            리포트를 찾을 수 없습니다
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            진단을 먼저 완료해주세요. 입력 페이지로 이동하여 정보를 입력하면
            리포트를 받아보실 수 있습니다.
          </p>
          <Link
            href="/input"
            className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            입력 페이지로 이동
          </Link>
        </div>
      </div>
    );
  }

  // 리포트 표시
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
        {/* 헤더 */}
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            당신의 전환 진단 리포트
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            현실을 직시하고, 가능한 길을 찾아보세요
          </p>
        </div>

        {/* 리포트 카드들 */}
        <div className="space-y-6">
          {/* 1. 현실 진단 리포트 */}
          <RealityReport data={reportData.realityReport} />

          {/* 2. 경력 → 수익 전환 지도 */}
          <IncomeMap data={reportData.incomeMap} />

          {/* 3. 의사결정 질문 */}
          <DecisionQuestions data={reportData.decisionQuestions} />
        </div>

        {/* 이메일 CTA */}
        <div className="mt-12">
          <EmailCTA />
        </div>

        {/* 하단 네비게이션 */}
        <div className="mt-8 text-center">
          <Link
            href="/input"
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            ← 다시 진단하기
          </Link>
        </div>
      </div>
    </div>
  );
}
