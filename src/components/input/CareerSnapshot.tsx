/**
 * 커리어 스냅샷 입력 컴포넌트 (2단계)
 * 사용자의 이력서를 입력받고 간단한 확인 표시
 */

'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/input/FileUpload';
import { validateCareerSnapshot } from '@/lib/utils/validation';
import { APP_CONFIG } from '@/lib/constants/config';
import type { CareerSnapshotInput } from '@/lib/types/input';

interface CareerSnapshotProps {
  /** 현재 입력 데이터 */
  data: CareerSnapshotInput;
  /** 데이터 변경 핸들러 */
  onChange: (data: CareerSnapshotInput) => void;
  /** 다음 단계로 진행 핸들러 */
  onNext: () => void;
  /** 이전 단계로 돌아가기 핸들러 */
  onBack: () => void;
}

/**
 * CareerSnapshot 컴포넌트
 *
 * 사용자의 이력서를 입력받습니다:
 * - 이력서 텍스트 (최소 50자, 최대 5000자)
 * - 실시간 문자 수 표시
 * - 입력 완료 확인 메시지
 */
export function CareerSnapshot({ data, onChange, onNext, onBack }: CareerSnapshotProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 문자 수 계산
  const charCount = data.resumeText.trim().length;
  const isValidLength = charCount >= APP_CONFIG.minResumeLength &&
                        charCount <= APP_CONFIG.maxResumeLength;

  // 유효성 검증 (useMemo로 파생 상태 계산)
  const errors = useMemo(() => validateCareerSnapshot(data), [data]);

  // 다음 단계로 진행 가능 여부
  const canProceed = errors.length === 0 && isValidLength;

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 섹션 헤더 */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          이력서 파일 첨부 또는 직접 입력
        </h2>
        <p className="text-sm text-muted-foreground">
          PDF/DOCX 파일을 업로드하거나 직접 입력해주세요.
        </p>
      </div>

      {/* 파일 업로드 */}
      <FileUpload
        onTextExtracted={(text) => {
          onChange({ ...data, resumeText: text });
          setIsConfirmed(true);
        }}
        disabled={false}
      />

      {/* 구분선 */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted-foreground/25" />
        </div>
        <span className="relative bg-background px-4 text-sm text-muted-foreground">
          또는 직접 입력
        </span>
      </div>

      {/* 직접 입력 영역 */}
      <div className="space-y-3">
        {/* 예시 레이블 */}
        <p className="text-sm text-muted-foreground">예시:</p>

        <Textarea
          id="resume-text"
          value={data.resumeText}
          onChange={(e) => {
            onChange({
              ...data,
              resumeText: e.target.value,
            });
            // 직접 입력 시 확인 상태 초기화
            if (isConfirmed) {
              setIsConfirmed(false);
            }
          }}
          placeholder="- 삼성전자 반도체사업부 15년 근무&#10;- 공장관리팀 → 품질관리 팀장&#10;- 6시그마 블랙벨트, PMP 자격증&#10;- 해외 공장 설립 프로젝트 3건 리드&#10;- 연봉 약 8,000만원"
          className="min-h-48 text-base resize-none"
          maxLength={APP_CONFIG.maxResumeLength}
          aria-label="이력서 내용"
          aria-describedby="resume-help resume-counter"
        />

        {/* 도움말 및 문자 수 표시 */}
        <div className="flex items-center justify-between text-sm">
          <span
            id="resume-help"
            className={`${
              charCount < APP_CONFIG.minResumeLength && charCount > 0
                ? 'text-destructive'
                : 'text-muted-foreground'
            }`}
          >
            최소 {APP_CONFIG.minResumeLength}자 이상 입력해주세요.
          </span>
          <span
            id="resume-counter"
            className={`${
              charCount > APP_CONFIG.maxResumeLength
                ? 'text-destructive'
                : isValidLength
                ? 'text-green-600'
                : 'text-muted-foreground'
            }`}
          >
            {charCount.toLocaleString()} / {APP_CONFIG.maxResumeLength.toLocaleString()}자
          </span>
        </div>
      </div>

      {/* 확인 메시지 */}
      {isConfirmed && isValidLength && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200 font-medium">
            이력서가 입력되었습니다. ({charCount.toLocaleString()}자)
          </p>
        </div>
      )}

      {/* 에러 메시지 표시 */}
      {errors.length > 0 && (
        <div className="space-y-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-destructive">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* 버튼 그룹 */}
      <div className="flex flex-col gap-3 pt-4">
        {/* 다음 단계 버튼 */}
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          다음 단계
        </Button>

        {/* 이전 버튼 */}
        <Button
          onClick={onBack}
          variant="ghost"
          size="lg"
          className="w-full"
        >
          이전
        </Button>
      </div>
    </div>
  );
}
