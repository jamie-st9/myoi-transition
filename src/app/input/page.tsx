/**
 * 진단 입력 메인 페이지
 * 3단계 입력 프로세스를 통합 관리
 * Pencil 디자인 적용: 연한 베이지 배경, 각 Step 자체 헤더 포함
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RealityCheck } from '@/components/input/RealityCheck';
import { CareerSnapshot } from '@/components/input/CareerSnapshot';
import { IdeaInput } from '@/components/input/IdeaInput';
import { LoadingScreen } from '@/components/input/LoadingScreen';
import type {
  CompleteInputFormState,
  RealityCheckFormState,
  CareerSnapshotInput,
  IdeaInput as IdeaInputType,
} from '@/lib/types/input';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants/config';

/** 로딩 진행 상태 타입 */
type ProgressStatus = 'pending' | 'loading' | 'complete';

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

  // 로딩 진행률 상태 (LoadingScreen에서 사용)
  const [loadingProgress, setLoadingProgress] = useState<{
    realityReport: ProgressStatus;
    incomeMap: ProgressStatus;
    decisionQuestions: ProgressStatus;
  }>({
    realityReport: 'pending',
    incomeMap: 'pending',
    decisionQuestions: 'pending',
  });

  // 에러 상태
  const [error, setError] = useState<string | null>(null);

  // 폼 데이터 상태
  const [formData, setFormData] = useState<CompleteInputFormState>({
    realityCheck: {
      weeklyHours: '',
      budgetLimit: '',
      failureTolerance: '',
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
  const handleRealityCheckChange = (data: RealityCheckFormState) => {
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
    // Validate required select fields before submission
    const { weeklyHours, budgetLimit, failureTolerance } = formData.realityCheck;
    if (!weeklyHours || !budgetLimit || !failureTolerance) {
      setError('현실 점검 항목을 모두 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // 로딩 진행률 초기화
    setLoadingProgress({
      realityReport: 'loading',
      incomeMap: 'pending',
      decisionQuestions: 'pending',
    });

    try {
      // API 호출하여 리포트 생성
      const response = await fetch(API_ENDPOINTS.COMPLETE_REPORT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // 진행률 업데이트: 현실 점검 리포트 완료, 수익화 지도 시작
      setLoadingProgress({
        realityReport: 'complete',
        incomeMap: 'loading',
        decisionQuestions: 'pending',
      });

      if (!response.ok) {
        // HTTP 에러 처리
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || ERROR_MESSAGES.API_ERROR);
      }

      // 응답 데이터 파싱
      const reportData = await response.json();

      // 진행률 업데이트: 수익화 지도 완료, 결정 질문 시작
      setLoadingProgress({
        realityReport: 'complete',
        incomeMap: 'complete',
        decisionQuestions: 'loading',
      });

      // 짧은 지연 후 완료 상태로 전환 (시각적 피드백)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 진행률 업데이트: 모든 단계 완료
      setLoadingProgress({
        realityReport: 'complete',
        incomeMap: 'complete',
        decisionQuestions: 'complete',
      });

      // 완료 애니메이션을 위한 짧은 지연
      await new Promise((resolve) => setTimeout(resolve, 300));

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

      // 로딩 진행률 초기화
      setLoadingProgress({
        realityReport: 'pending',
        incomeMap: 'pending',
        decisionQuestions: 'pending',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 로딩 중일 때 LoadingScreen 표시
  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* 메인 컨텐츠 - 각 Step 컴포넌트가 자체 헤더를 포함 */}
      <main className="container mx-auto px-4 py-6">
        {/* 단계별 컴포넌트 렌더링 */}
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

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="max-w-2xl mx-auto mt-6">
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <h3 className="font-semibold text-red-700 mb-2">오류가 발생했습니다</h3>
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-3 text-sm text-red-700 underline hover:no-underline"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
