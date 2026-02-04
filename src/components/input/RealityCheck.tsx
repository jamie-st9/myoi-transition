/**
 * 현실 점검 입력 컴포넌트 (1단계)
 * 사용자의 시간/예산/실패 허용도 등 현실적 제약 조건 수집
 *
 * Pencil 디자인 적용:
 * - 카드 없이 직접 폼 표시
 * - 연한 베이지 배경 (#FAF8F5)
 * - 선택된 옵션 파란 테두리 (#2563EB)
 * - 실패 허용 정도 버튼 그룹 (가로 배치)
 */

'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft } from 'lucide-react';
import { validateRealityCheck } from '@/lib/utils/validation';
import { REALITY_CHECK_OPTIONS } from '@/lib/constants/config';
import type { RealityCheckInput, RealityCheckFormState } from '@/lib/types/input';
import { cn } from '@/lib/utils';

interface RealityCheckProps {
  /** 현재 입력 데이터 (allows empty initial values for select fields) */
  data: RealityCheckFormState;
  /** 데이터 변경 핸들러 */
  onChange: (data: RealityCheckFormState) => void;
  /** 다음 단계로 진행 핸들러 */
  onNext: () => void;
  /** 뒤로가기 핸들러 (선택사항) */
  onBack?: () => void;
}

/**
 * RealityCheck 컴포넌트
 *
 * 사용자의 현실적 제약 조건을 수집합니다:
 * - 주당 투입 가능 시간
 * - 예산 한도
 * - 실패 허용 정도
 */
export function RealityCheck({ data, onChange, onNext, onBack }: RealityCheckProps) {
  // Compute validation errors from data (absoluteConstraints excluded)
  const errors = useMemo(() => {
    return validateRealityCheck(data).filter(
      (error) => !error.includes('절대적 제약')
    );
  }, [data]);

  // 다음 단계로 진행 가능 여부
  const canProceed = errors.length === 0 &&
    data.weeklyHours &&
    data.budgetLimit &&
    data.failureTolerance;

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  // 실패 허용 정도 버튼 클릭 핸들러
  const handleFailureToleranceChange = (value: RealityCheckInput['failureTolerance']) => {
    onChange({
      ...data,
      failureTolerance: value,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-[#FAF8F5] border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">현실 점검</h1>
          <span className="text-sm text-gray-500 min-w-[40px] text-right">1/3</span>
        </div>
      </header>

      {/* 폼 컨텐츠 */}
      <main className="px-4 py-6 max-w-2xl mx-auto space-y-8">
        {/* 주당 투입 시간 */}
        <div className="space-y-3">
          <Label htmlFor="weekly-hours" className="text-base font-medium text-gray-900">
            주당 투입 가능 시간
          </Label>
          <RadioGroup
            id="weekly-hours"
            value={data.weeklyHours}
            onValueChange={(value) =>
              onChange({
                ...data,
                weeklyHours: value as RealityCheckInput['weeklyHours'],
              })
            }
            className="space-y-2"
          >
            {REALITY_CHECK_OPTIONS.weeklyHours.map((option) => (
              <label
                key={option}
                htmlFor={`weekly-${option}`}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl bg-white border-2 cursor-pointer transition-all',
                  data.weeklyHours === option
                    ? 'border-[#2563EB] bg-blue-50/30'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <RadioGroupItem
                  value={option}
                  id={`weekly-${option}`}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    data.weeklyHours === option
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-gray-300'
                  )}
                >
                  {data.weeklyHours === option && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-base text-gray-900">{option}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* 예산 한도 */}
        <div className="space-y-3">
          <Label htmlFor="budget-limit" className="text-base font-medium text-gray-900">
            예산 한도
          </Label>
          <RadioGroup
            id="budget-limit"
            value={data.budgetLimit}
            onValueChange={(value) =>
              onChange({
                ...data,
                budgetLimit: value as RealityCheckInput['budgetLimit'],
              })
            }
            className="space-y-2"
          >
            {REALITY_CHECK_OPTIONS.budgetLimit.map((option) => (
              <label
                key={option}
                htmlFor={`budget-${option}`}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl bg-white border-2 cursor-pointer transition-all',
                  data.budgetLimit === option
                    ? 'border-[#2563EB] bg-blue-50/30'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <RadioGroupItem
                  value={option}
                  id={`budget-${option}`}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    data.budgetLimit === option
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-gray-300'
                  )}
                >
                  {data.budgetLimit === option && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-base text-gray-900">{option}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* 실패 허용 정도 - 버튼 그룹 */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-gray-900">
            실패 허용 정도
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {REALITY_CHECK_OPTIONS.failureTolerance.map((option) => (
              <Button
                key={option}
                type="button"
                variant={data.failureTolerance === option ? 'default' : 'outline'}
                onClick={() => handleFailureToleranceChange(option)}
                className={cn(
                  'h-12 text-base font-medium rounded-xl transition-all',
                  data.failureTolerance === option
                    ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white border-[#2563EB]'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* 에러 메시지 표시 */}
        {errors.length > 0 && (
          <div className="space-y-2 p-4 rounded-xl bg-red-50 border border-red-200">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        )}

        {/* 다음 단계 버튼 */}
        <div className="pt-4">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={cn(
              'w-full h-14 text-lg font-semibold rounded-xl transition-all',
              canProceed
                ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            다음 단계
          </Button>
        </div>
      </main>
    </div>
  );
}
