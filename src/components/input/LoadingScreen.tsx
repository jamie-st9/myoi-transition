/**
 * AI 분석 로딩 화면 컴포넌트
 * 진단 리포트 생성 중 진행 상태를 시각적으로 표시
 */

import { Check, Loader2 } from 'lucide-react';

/** 각 단계의 진행 상태 타입 */
type ProgressStatus = 'pending' | 'loading' | 'complete';

interface LoadingScreenProps {
  /** 각 단계별 진행 상태 */
  progress: {
    /** 현실 점검 리포트 생성 상태 */
    realityReport: ProgressStatus;
    /** 수익화 지도 생성 상태 */
    incomeMap: ProgressStatus;
    /** 결정 질문 생성 상태 */
    decisionQuestions: ProgressStatus;
  };
}

/** 진행 단계 정의 */
const PROGRESS_STEPS = [
  { key: 'realityReport', label: '현실 점검 리포트 생성' },
  { key: 'incomeMap', label: '수익화 지도 생성' },
  { key: 'decisionQuestions', label: '결정 질문 생성' },
] as const;

/**
 * LoadingScreen 컴포넌트
 *
 * AI가 사용자 입력 데이터를 분석하여 맞춤형 진단 리포트를 생성하는 동안
 * 진행 상태를 시각적으로 표시합니다.
 *
 * 디자인 특징:
 * - 전체 화면 중앙 정렬
 * - 연한 베이지 배경색
 * - 큰 로딩 스피너 (네이비 색상)
 * - 진행 상태 체크리스트
 */
export function LoadingScreen({ progress }: LoadingScreenProps) {
  /**
   * 진행 상태에 따른 아이콘 및 스타일 렌더링
   */
  const renderStatusIcon = (status: ProgressStatus) => {
    switch (status) {
      case 'complete':
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E3A5F]">
            <Check className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
        );
      case 'loading':
        return (
          <div className="flex h-6 w-6 items-center justify-center">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1E3A5F] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#1E3A5F]" />
            </span>
          </div>
        );
      case 'pending':
      default:
        return (
          <div className="flex h-6 w-6 items-center justify-center">
            <span className="h-3 w-3 rounded-full bg-gray-300" />
          </div>
        );
    }
  };

  /**
   * 진행 상태에 따른 텍스트 스타일
   */
  const getStatusTextStyle = (status: ProgressStatus) => {
    switch (status) {
      case 'complete':
        return 'text-[#1E3A5F] font-medium';
      case 'loading':
        return 'text-[#1E3A5F] font-medium';
      case 'pending':
      default:
        return 'text-gray-400';
    }
  };

  /**
   * 진행 상태에 따른 접미사 텍스트
   */
  const getStatusSuffix = (status: ProgressStatus) => {
    switch (status) {
      case 'complete':
        return ' 완료';
      case 'loading':
        return ' 중...';
      case 'pending':
      default:
        return '';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center px-6 text-center">
        {/* 로딩 스피너 */}
        <div className="mb-8">
          <Loader2
            className="h-16 w-16 animate-spin text-[#1E3A5F]"
            aria-hidden="true"
          />
        </div>

        {/* 헤드라인 */}
        <h1 className="mb-4 text-2xl font-bold text-[#1E3A5F] sm:text-3xl">
          AI가 분석 중입니다
        </h1>

        {/* 설명 텍스트 */}
        <div className="mb-8 space-y-1">
          <p className="text-base text-gray-600 sm:text-lg">
            입력하신 정보를 바탕으로
          </p>
          <p className="text-base text-gray-600 sm:text-lg">
            맞춤형 진단 리포트를 생성하고 있습니다.
          </p>
        </div>

        {/* 진행 상태 체크리스트 */}
        <div className="mb-8 w-full max-w-sm space-y-4">
          {PROGRESS_STEPS.map((step) => {
            const status = progress[step.key as keyof typeof progress];
            return (
              <div
                key={step.key}
                className="flex items-center gap-3"
              >
                {renderStatusIcon(status)}
                <span className={`text-left text-sm sm:text-base ${getStatusTextStyle(status)}`}>
                  {step.label}
                  {getStatusSuffix(status)}
                </span>
              </div>
            );
          })}
        </div>

        {/* 하단 안내 */}
        <p className="text-sm text-gray-500">
          약 10-15초 소요됩니다
        </p>
      </div>
    </div>
  );
}
