/**
 * Reality check input component (Step 1)
 * Collects user constraints: time, budget, failure tolerance, absolute constraints
 */

'use client';

import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { validateRealityCheck } from '@/lib/utils/validation';
import { REALITY_CHECK_OPTIONS } from '@/lib/constants/config';
import type { RealityCheckInput, RealityCheckFormState } from '@/lib/types/input';
import { cn } from '@/lib/utils';

interface RealityCheckProps {
  /** Current input data (allows empty initial values for select fields) */
  data: RealityCheckFormState;
  /** Data change handler */
  onChange: (data: RealityCheckFormState) => void;
  /** Next step handler */
  onNext: () => void;
  /** Back handler (optional) */
  onBack?: () => void;
}

/**
 * RealityCheck component
 *
 * Collects realistic constraints:
 * - Weekly available hours
 * - Budget limit
 * - Failure tolerance
 * - Absolute constraints (optional textarea)
 */
export function RealityCheck({ data, onChange, onNext }: RealityCheckProps) {
  // Compute validation errors from data (absoluteConstraints excluded)
  const errors = useMemo(() => {
    return validateRealityCheck(data).filter(
      (error) => !error.includes('절대적 제약')
    );
  }, [data]);

  // Whether user can proceed
  const canProceed = errors.length === 0 &&
    data.weeklyHours &&
    data.budgetLimit &&
    data.failureTolerance;

  // Next button click handler
  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  // Failure tolerance button click handler
  const handleFailureToleranceChange = (value: RealityCheckInput['failureTolerance']) => {
    onChange({
      ...data,
      failureTolerance: value,
    });
  };

  // Budget label formatting for compact cards
  const budgetLabels: Record<string, { line1: string; line2: string }> = {
    '100만원 미만': { line1: '100만원', line2: '미만' },
    '100-500만원': { line1: '100-500', line2: '만원' },
    '500-1000만원': { line1: '500-1000', line2: '만원' },
    '1000만원 이상': { line1: '1000만원', line2: '이상' },
  };

  return (
    <div className="space-y-7">
      {/* Title section */}
      <div className="space-y-1.5">
        <p className="text-[13px] font-medium text-[#2563EB]">Step 1 of 3</p>
        <h2 className="text-[28px] font-bold tracking-[-0.5px] text-[#1A1A1A]">
          현실 점검
        </h2>
        <p className="text-[14px] text-[#6B7280]">
          전환에 투입할 수 있는 현실적인 자원을 확인합니다
        </p>
      </div>

      {/* Q1: Weekly available hours - vertical radio */}
      <div className="space-y-2.5">
        <label className="text-[14px] font-semibold text-[#1A1A1A]">
          주당 투입 가능 시간
        </label>
        <div className="space-y-2">
          {REALITY_CHECK_OPTIONS.weeklyHours.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                onChange({
                  ...data,
                  weeklyHours: option as RealityCheckInput['weeklyHours'],
                })
              }
              className={cn(
                'flex w-full items-center h-[44px] px-4 rounded-[10px] text-[14px] transition-all',
                data.weeklyHours === option
                  ? 'bg-[#EFF6FF] border-[1.5px] border-[#2563EB] text-[#2563EB] font-medium'
                  : 'bg-[#FFFFFF] border border-[#E5E7EB] text-[#1A1A1A] hover:border-[#D1D5DB]'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Budget limit - 4 horizontal cards */}
      <div className="space-y-2.5">
        <label className="text-[14px] font-semibold text-[#1A1A1A]">
          예산 한도
        </label>
        <div className="grid grid-cols-4 gap-2">
          {REALITY_CHECK_OPTIONS.budgetLimit.map((option) => {
            const label = budgetLabels[option];
            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    budgetLimit: option as RealityCheckInput['budgetLimit'],
                  })
                }
                className={cn(
                  'flex flex-col items-center justify-center h-[48px] rounded-[10px] text-[11px] text-center transition-all',
                  data.budgetLimit === option
                    ? 'bg-[#EFF6FF] border-[1.5px] border-[#2563EB] text-[#2563EB] font-medium'
                    : 'bg-[#FFFFFF] border border-[#E5E7EB] text-[#1A1A1A] hover:border-[#D1D5DB]'
                )}
              >
                <span>{label.line1}</span>
                <span>{label.line2}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Q3: Failure tolerance - 3 horizontal buttons */}
      <div className="space-y-2.5">
        <label className="text-[14px] font-semibold text-[#1A1A1A]">
          실패 허용 정도
        </label>
        <div className="grid grid-cols-3 gap-2">
          {REALITY_CHECK_OPTIONS.failureTolerance.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleFailureToleranceChange(option)}
              className={cn(
                'flex items-center justify-center h-[40px] rounded-[10px] text-[13px] transition-all',
                data.failureTolerance === option
                  ? 'bg-[#EFF6FF] border-[1.5px] border-[#2563EB] text-[#2563EB] font-medium'
                  : 'bg-[#FFFFFF] border border-[#E5E7EB] text-[#1A1A1A] hover:border-[#D1D5DB]'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Q4: Absolute constraints - optional textarea */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[14px] font-semibold text-[#1A1A1A]">
            절대적 제약 조건
          </label>
          <span className="text-[12px] text-[#9CA3AF]">선택사항</span>
        </div>
        <textarea
          value={data.absoluteConstraints}
          onChange={(e) =>
            onChange({
              ...data,
              absoluteConstraints: e.target.value,
            })
          }
          placeholder="예: 서울 거주 필수, 주말 근무 불가 등"
          className="w-full h-[80px] rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
          maxLength={500}
        />
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="space-y-2 rounded-[10px] bg-red-50 border border-red-200 p-3">
          {errors.map((error, index) => (
            <p key={index} className="text-[13px] text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!canProceed}
        className={cn(
          'flex w-full items-center justify-center gap-2 h-[52px] rounded-[12px] text-[16px] font-semibold transition-all',
          canProceed
            ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
            : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
        )}
      >
        다음
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
