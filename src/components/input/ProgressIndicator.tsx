/**
 * 진단 프로세스 진행 상황 표시 컴포넌트
 * 3단계 입력 프로세스의 현재 위치를 시각적으로 표시
 */

import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  /** 현재 단계 (1-3) */
  currentStep: number;
}

/** 각 단계의 이름 */
const STEP_NAMES = ['현실 점검', '경력 스냅샷', '아이디어'] as const;

/**
 * ProgressIndicator 컴포넌트
 *
 * 현재 진행 중인 단계를 표시하고 전체 진행률을 시각화합니다.
 * 모바일 환경에서도 명확하게 보이도록 큰 폰트와 명확한 색상을 사용합니다.
 */
export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  // 진행률 계산 (1단계: 33%, 2단계: 66%, 3단계: 100%)
  const progressValue = (currentStep / 3) * 100;

  return (
    <div className="w-full space-y-4">
      {/* 단계 텍스트 표시 */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          단계 {currentStep}/3
        </h2>
        <span className="text-sm text-muted-foreground">
          {STEP_NAMES[currentStep - 1]}
        </span>
      </div>

      {/* 진행률 바 */}
      <Progress value={progressValue} className="h-2" />

      {/* 단계 인디케이터 (점 3개) */}
      <div className="flex items-center justify-center gap-3">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex flex-col items-center gap-2 ${
              step === currentStep ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {/* 단계 번호 원 */}
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step}
            </div>
            {/* 단계 이름 (모바일에서는 축약) */}
            <span className="text-xs text-muted-foreground hidden sm:block">
              {STEP_NAMES[step - 1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
