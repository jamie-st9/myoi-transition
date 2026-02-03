/**
 * 진단 입력 메인 페이지
 * 3단계 입력 프로세스를 통합 관리
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressIndicator } from '@/components/input/ProgressIndicator';
import { RealityCheck } from '@/components/input/RealityCheck';
import { CareerSnapshot } from '@/components/input/CareerSnapshot';
import { IdeaInput } from '@/components/input/IdeaInput';
import type {
  CompleteInput,
  RealityCheckInput,
  CareerSnapshotInput,
  IdeaInput as IdeaInputType,
} from '@/lib/types/input';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants/config';

/**
 * InputPage 컴포넌트
 *
 * 3단계 진단 입력 프로세스:
 * 1. 현실 점검 (RealityCheck)
 * 2. 커리어 스냅샷 (CareerSnapshot)
 * 3. 아이디어 입력 (IdeaInput)
 *
 * 완료 후 API 호출 및 리포트 페이지로 이동
 */
export default function InputPage() {
  const router = useRouter();

  // 현재 단계 상태 (1-3)
  const [currentStep, setCurrentStep] = useState(1);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 에러 상태
  const [error, setError] = useState<string | null>(null);

  // 폼 데이터 상태
  const [formData, setFormData] = useState<CompleteInput>({
    realityCheck: {
      weeklyHours: '' as RealityCheckInput['weeklyHours'],
      budgetLimit: '' as RealityCheckInput['budgetLimit'],
      failureTolerance: '' as RealityCheckInput['failureTolerance'],
      absoluteConstraints: '',
    },
    careerSnapshot: {
      resumeText: '',
    },
    idea: {
      hasIdea: false,
    },
  });

  // 1단계: 현실 점검 데이터 변경 핸들러
  const handleRealityCheckChange = (data: RealityCheckInput) => {
    setFormData((prev) => ({
      ...prev,
      realityCheck: data,
    }));
  };

  // 2단계: 커리어 스냅샷 데이터 변경 핸들러
  const handleCareerSnapshotChange = (data: CareerSnapshotInput) => {
    setFormData((prev) => ({
      ...prev,
      careerSnapshot: data,
    }));
  };

  // 3단계: 아이디어 데이터 변경 핸들러
  const handleIdeaChange = (data: IdeaInputType) => {
    setFormData((prev) => ({
      ...prev,
      idea: data,
    }));
  };

  // 다음 단계로 이동
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      // 페이지 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 이전 단계로 이동
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      // 페이지 상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 최종 제출 및 리포트 생성
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // API 호출하여 리포트 생성
      const response = await fetch(API_ENDPOINTS.COMPLETE_REPORT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // HTTP 에러 처리
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || ERROR_MESSAGES.API_ERROR);
      }

      // 응답 데이터 파싱
      const reportData = await response.json();

      // sessionStorage에 리포트 데이터 저장
      sessionStorage.setItem('myoi-report-data', JSON.stringify(reportData));

      // 리포트 페이지로 이동
      router.push('/report');
    } catch (err) {
      // 에러 처리
      console.error('Report generation error:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(ERROR_MESSAGES.UNKNOWN_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center sm:text-2xl">
            MyOi TRANSITION
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            잘못된 전환을 막는 커리어 진단
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* 진행 상황 표시 */}
        <div className="mb-8 sm:mb-12">
          <ProgressIndicator currentStep={currentStep} />
        </div>

        {/* 단계별 컴포넌트 렌더링 */}
        <div className="mb-8">
          {currentStep === 1 && (
            <RealityCheck
              data={formData.realityCheck}
              onChange={handleRealityCheckChange}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <CareerSnapshot
              data={formData.careerSnapshot}
              onChange={handleCareerSnapshotChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <IdeaInput
              data={formData.idea}
              onChange={handleIdeaChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-2">오류가 발생했습니다</h3>
              <p className="text-sm text-destructive/90">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-3 text-sm text-destructive underline hover:no-underline"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 MyOi TRANSITION. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
