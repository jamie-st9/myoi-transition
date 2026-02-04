/**
 * AI analysis loading screen component
 * Displays progress phases while generating the diagnostic report
 */

import { Brain, CheckCircle, Loader, Circle } from 'lucide-react';

/** Progress status type for each phase */
type ProgressStatus = 'pending' | 'loading' | 'complete';

interface LoadingScreenProps {
  /** Progress status for each phase */
  progress: {
    /** Reality report generation status */
    realityReport: ProgressStatus;
    /** Income map generation status */
    incomeMap: ProgressStatus;
    /** Decision questions generation status */
    decisionQuestions: ProgressStatus;
  };
}

/** Phase definitions */
const PROGRESS_STEPS = [
  { key: 'realityReport', label: '현실점검 리포트' },
  { key: 'incomeMap', label: '수익화 지도' },
  { key: 'decisionQuestions', label: '결정 질문' },
] as const;

/**
 * LoadingScreen component
 *
 * Displays a full-page loading screen with animated spinner,
 * brain icon, and phase progress indicators while the AI
 * generates the diagnostic report.
 */
export function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5]"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center">
        {/* Spinner with brain icon */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer ring - border stroke */}
          <div className="absolute h-16 w-16 rounded-full border-[4px] border-[#E5E7EB]" />
          {/* Animated arc - primary stroke */}
          <div className="absolute h-16 w-16 animate-spin rounded-full border-[4px] border-transparent border-t-[#2563EB]" />
          {/* Brain icon in center */}
          <Brain className="h-8 w-8 text-[#2563EB]" aria-hidden="true" />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-[20px] font-semibold text-[#1A1A1A]">
          AI가 분석 중입니다...
        </h1>

        {/* Description */}
        <p className="mb-8 text-center text-[14px] leading-[1.5] text-[#6B7280]">
          입력하신 정보를 바탕으로
          <br />
          맞춤형 진단 리포트를 생성하고 있습니다
        </p>

        {/* Phase progress items */}
        <div className="flex w-full flex-col gap-3 px-8">
          {PROGRESS_STEPS.map((step) => {
            const status = progress[step.key as keyof typeof progress];
            return (
              <PhaseItem
                key={step.key}
                label={step.label}
                status={status}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Individual phase progress item */
function PhaseItem({
  label,
  status,
}: {
  label: string;
  status: ProgressStatus;
}) {
  if (status === 'complete') {
    return (
      <div className="flex h-12 items-center rounded-xl bg-[#FFFFFF] px-4">
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#16A34A]" aria-hidden="true" />
        <span className="ml-3 flex-1 text-[14px] font-medium text-[#1A1A1A]">
          {label}
        </span>
        <span className="text-[12px] font-medium text-[#16A34A]">
          완료
        </span>
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="flex h-12 items-center rounded-xl border border-[#2563EB] bg-[#EFF6FF] px-4">
        <Loader className="h-5 w-5 flex-shrink-0 animate-spin text-[#2563EB]" aria-hidden="true" />
        <span className="ml-3 flex-1 text-[14px] font-medium text-[#2563EB]">
          {label}
        </span>
        <span className="text-[12px] font-medium text-[#2563EB]">
          분석 중...
        </span>
      </div>
    );
  }

  // pending
  return (
    <div className="flex h-12 items-center rounded-xl bg-[#FFFFFF] px-4">
      <Circle className="h-5 w-5 flex-shrink-0 text-[#D1D5DB]" strokeWidth={2} aria-hidden="true" />
      <span className="ml-3 flex-1 text-[14px] font-medium text-[#9CA3AF]">
        {label}
      </span>
      <span className="text-[12px] font-medium text-[#9CA3AF]">
        대기
      </span>
    </div>
  );
}
