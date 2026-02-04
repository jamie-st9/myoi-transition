/**
 * Idea input component (Step 3)
 * Checks if user already has a career transition idea
 */

'use client';

import { Sparkles, Info, Loader2 } from 'lucide-react';
import type { IdeaInput } from '@/lib/types/input';
import { cn } from '@/lib/utils';

interface IdeaInputProps {
  /** Current input data */
  data: IdeaInput;
  /** Data change handler */
  onChange: (data: IdeaInput) => void;
  /** Submit handler */
  onSubmit: () => void;
  /** Previous step handler */
  onBack: () => void;
  /** Loading state */
  isLoading: boolean;
}

/**
 * IdeaInput component
 *
 * Checks whether user has a transition idea:
 * - Toggle for idea existence
 * - Idea description textarea (when toggled on)
 */
export function IdeaInput({ data, onChange, onSubmit, onBack, isLoading }: IdeaInputProps) {
  // Toggle handler for idea existence
  const handleHasIdeaChange = (checked: boolean) => {
    onChange({
      hasIdea: checked,
      ideaSummary: checked ? data.ideaSummary : undefined,
    });
  };

  // Whether submit is possible (no idea, or idea with 10+ chars)
  const canSubmit = !data.hasIdea ||
    (data.hasIdea && data.ideaSummary && data.ideaSummary.trim().length >= 10);

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div className="space-y-1.5">
        <p className="text-[13px] font-medium text-[#2563EB]">Step 3 of 3</p>
        <h2 className="text-[28px] font-bold tracking-[-0.5px] text-[#1A1A1A]">
          전환 아이디어
        </h2>
        <p className="text-[14px] text-[#6B7280]">
          이미 생각하고 있는 전환 방향이 있다면 알려주세요
        </p>
      </div>

      {/* Toggle section */}
      <div className="rounded-[12px] bg-[#FFFFFF] border border-[#E5E7EB] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium text-[#1A1A1A]">
            이미 전환 아이디어가 있나요?
          </span>
          {/* Toggle switch */}
          <button
            type="button"
            role="switch"
            aria-checked={data.hasIdea}
            onClick={() => handleHasIdeaChange(!data.hasIdea)}
            disabled={isLoading}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors',
              data.hasIdea ? 'bg-[#2563EB]' : 'bg-[#D1D5DB]',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform mt-0.5',
                data.hasIdea ? 'translate-x-[22px]' : 'translate-x-0.5'
              )}
            />
          </button>
        </div>
      </div>

      {/* Idea card (shown when toggled on) */}
      {data.hasIdea && (
        <div className="rounded-[12px] bg-[#FFFFFF] border border-[#E5E7EB] p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="text-[14px] font-semibold text-[#1A1A1A]">
            전환 아이디어 요약
          </label>
          <textarea
            value={data.ideaSummary || ''}
            onChange={(e) =>
              onChange({
                ...data,
                ideaSummary: e.target.value,
              })
            }
            placeholder={"예: 퇴직 후 커피 로스팅 사업을 시작하고 싶습니다.\n온라인 판매와 소규모 카페를 생각하고 있어요."}
            className="w-full h-[120px] rounded-[10px] border border-[#E5E7EB] bg-[#F5F2ED] px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
            maxLength={1000}
            disabled={isLoading}
          />
          {/* Min length warning */}
          {data.ideaSummary && data.ideaSummary.trim().length > 0 && data.ideaSummary.trim().length < 10 && (
            <p className="text-[12px] text-[#DC2626]">
              최소 10자 이상 입력해주세요
            </p>
          )}
          {/* Hint */}
          <div className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-[#9CA3AF] shrink-0" />
            <span className="text-[12px] text-[#9CA3AF]">
              없어도 괜찮습니다. AI가 방향을 제안합니다
            </span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="rounded-[12px] bg-[#EFF6FF] border border-[#2563EB]/20 p-4">
          <p className="text-[14px] text-[#2563EB] text-center font-medium">
            AI가 당신의 커리어를 분석하고 있습니다...
          </p>
          <p className="text-[12px] text-[#6B7280] text-center mt-1">
            잠시만 기다려주세요 (약 10-15초 소요)
          </p>
        </div>
      )}

      {/* Button row: Previous + Submit */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isLoading}
          className={cn(
            'flex flex-1 items-center justify-center h-[52px] rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] text-[16px] font-semibold text-[#6B7280] transition-colors',
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          )}
        >
          이전
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isLoading}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 h-[52px] rounded-[12px] text-[16px] font-semibold transition-all',
            canSubmit && !isLoading
              ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              진단 생성 중...
            </>
          ) : (
            <>
              진단 시작
              <Sparkles className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
