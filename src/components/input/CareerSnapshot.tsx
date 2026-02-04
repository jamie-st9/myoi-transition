/**
 * Career snapshot input component (Step 2)
 * Collects user resume via text input or file upload
 */

'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Upload } from 'lucide-react';
import { FileUpload } from '@/components/input/FileUpload';
import { validateCareerSnapshot } from '@/lib/utils/validation';
import { APP_CONFIG } from '@/lib/constants/config';
import type { CareerSnapshotInput } from '@/lib/types/input';
import { cn } from '@/lib/utils';

interface CareerSnapshotProps {
  /** Current input data */
  data: CareerSnapshotInput;
  /** Data change handler */
  onChange: (data: CareerSnapshotInput) => void;
  /** Next step handler */
  onNext: () => void;
  /** Previous step handler */
  onBack: () => void;
}

/**
 * CareerSnapshot component
 *
 * Collects resume data:
 * - Text input area (min 50 chars, max 5000 chars)
 * - File upload (PDF, DOCX)
 * - Real-time character count
 */
export function CareerSnapshot({ data, onChange, onNext, onBack }: CareerSnapshotProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  // Character count
  const charCount = data.resumeText.trim().length;
  const isValidLength = charCount >= APP_CONFIG.minResumeLength &&
                        charCount <= APP_CONFIG.maxResumeLength;

  // Validation errors (derived via useMemo)
  const errors = useMemo(() => validateCareerSnapshot(data), [data]);

  // Whether user can proceed
  const canProceed = errors.length === 0 && isValidLength;

  // Next button click handler
  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Title section */}
      <div className="space-y-1.5">
        <p className="text-[13px] font-medium text-[#2563EB]">Step 2 of 3</p>
        <h2 className="text-[28px] font-bold tracking-[-0.5px] text-[#1A1A1A]">
          커리어 스냅샷
        </h2>
        <p className="text-[14px] text-[#6B7280]">
          경력 요약을 입력하거나 이력서를 업로드하세요
        </p>
      </div>

      {/* Career textarea */}
      <div className="space-y-2">
        <label className="text-[14px] font-semibold text-[#1A1A1A]">
          경력 요약
        </label>
        <textarea
          value={data.resumeText}
          onChange={(e) => {
            onChange({
              ...data,
              resumeText: e.target.value,
            });
            if (isConfirmed) {
              setIsConfirmed(false);
            }
          }}
          placeholder={"예시:\n- 삼성전자 반도체사업부 15년 근무\n- 공장관리팀 → 품질관리 팀장\n- 6시그마 블랙벨트, PMP 자격증\n- 해외 공장 설립 프로젝트 3건 리드\n- 연봉 약 8,000만원"}
          className="w-full h-[160px] rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] px-4 py-4 text-[14px] text-[#1A1A1A] placeholder:text-[#9CA3AF] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors"
          maxLength={APP_CONFIG.maxResumeLength}
          aria-label="경력 요약"
        />
        {/* Character count */}
        <div className="flex items-center justify-between text-[12px]">
          <span className={charCount < APP_CONFIG.minResumeLength && charCount > 0 ? 'text-[#DC2626]' : 'text-[#9CA3AF]'}>
            최소 {APP_CONFIG.minResumeLength}자 이상 입력해주세요
          </span>
          <span className={charCount > APP_CONFIG.maxResumeLength ? 'text-[#DC2626]' : isValidLength ? 'text-[#16A34A]' : 'text-[#9CA3AF]'}>
            {charCount.toLocaleString()} / {APP_CONFIG.maxResumeLength.toLocaleString()}자
          </span>
        </div>
      </div>

      {/* "또는" divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E5E7EB]" />
        <span className="text-[12px] text-[#9CA3AF]">또는</span>
        <div className="flex-1 h-px bg-[#E5E7EB]" />
      </div>

      {/* Upload zone */}
      {showFileUpload ? (
        <FileUpload
          onTextExtracted={(text) => {
            onChange({ ...data, resumeText: text });
            setIsConfirmed(true);
            setShowFileUpload(false);
          }}
          disabled={false}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowFileUpload(true)}
          className="flex w-full flex-col items-center justify-center gap-2 h-[120px] rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#D1D5DB] transition-colors cursor-pointer"
        >
          <Upload className="h-7 w-7 text-[#9CA3AF]" />
          <span className="text-[14px] font-medium text-[#1A1A1A]">이력서 업로드</span>
          <span className="text-[12px] text-[#9CA3AF]">PDF, DOCX (최대 10MB)</span>
        </button>
      )}

      {/* Confirmation message */}
      {isConfirmed && isValidLength && (
        <div className="rounded-[10px] bg-green-50 border border-green-200 p-3">
          <p className="text-[13px] text-green-700 font-medium">
            이력서가 입력되었습니다. ({charCount.toLocaleString()}자)
          </p>
        </div>
      )}

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

      {/* Button row: Previous + Next */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex flex-1 items-center justify-center h-[52px] rounded-[12px] border border-[#E5E7EB] bg-[#FFFFFF] text-[16px] font-semibold text-[#6B7280] hover:bg-gray-50 transition-colors"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 h-[52px] rounded-[12px] text-[16px] font-semibold transition-all',
            canProceed
              ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          )}
        >
          다음
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
