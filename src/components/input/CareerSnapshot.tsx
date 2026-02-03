/**
 * 커리어 스냅샷 입력 컴포넌트 (2단계)
 * 사용자의 이력서를 입력받고 간단한 확인 표시
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  const [errors, setErrors] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 문자 수 계산
  const charCount = data.resumeText.trim().length;
  const isValidLength = charCount >= APP_CONFIG.minResumeLength &&
                        charCount <= APP_CONFIG.maxResumeLength;

  // 데이터 변경 시 유효성 검증
  useEffect(() => {
    const validationErrors = validateCareerSnapshot(data);
    setErrors(validationErrors);

    // 이력서 내용이 변경되면 확인 상태 초기화
    if (data.resumeText.trim().length > 0) {
      setIsConfirmed(false);
    }
  }, [data]);

  // 다음 단계로 진행 가능 여부
  const canProceed = errors.length === 0 && isValidLength;

  // 이력서 분석 (MVP에서는 간단한 확인만 수행)
  const handleAnalyze = () => {
    if (isValidLength) {
      setIsConfirmed(true);
    }
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">커리어 스냅샷</CardTitle>
          <CardDescription>
            지금까지의 커리어를 이력서 형태로 입력해주세요.
            상세할수록 더 정확한 진단을 받을 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 이력서 입력 */}
          <div className="space-y-4">
            <Label htmlFor="resume-text" className="text-base font-semibold">
              이력서
            </Label>
            <p className="text-sm text-muted-foreground">
              경력, 학력, 보유 기술, 주요 업무 등을 자유롭게 작성해주세요.
              기존 이력서를 복사하여 붙여넣기 하셔도 좋습니다.
            </p>
            <Textarea
              id="resume-text"
              value={data.resumeText}
              onChange={(e) =>
                onChange({
                  ...data,
                  resumeText: e.target.value,
                })
              }
              placeholder="예시:&#10;&#10;[경력]&#10;- 2018-2023: ABC 회사 마케팅팀 과장&#10;- SNS 마케팅 캠페인 기획 및 실행&#10;- 월평균 100건 이상의 콘텐츠 제작&#10;&#10;[보유 기술]&#10;- 포토샵, 일러스트레이터&#10;- 구글 애널리틱스&#10;- 페이스북/인스타그램 광고 운영&#10;&#10;[학력]&#10;- 2014: OO대학교 경영학과 졸업"
              className="min-h-80 text-base font-mono"
              maxLength={APP_CONFIG.maxResumeLength}
            />

            {/* 문자 수 표시 */}
            <div className="flex items-center justify-between text-sm">
              <span className={`${
                charCount < APP_CONFIG.minResumeLength
                  ? 'text-destructive'
                  : 'text-muted-foreground'
              }`}>
                {charCount < APP_CONFIG.minResumeLength &&
                  `최소 ${APP_CONFIG.minResumeLength}자 이상 입력해주세요`}
              </span>
              <span className={`${
                charCount > APP_CONFIG.maxResumeLength
                  ? 'text-destructive'
                  : isValidLength
                  ? 'text-green-600'
                  : 'text-muted-foreground'
              }`}>
                {charCount.toLocaleString()}/{APP_CONFIG.maxResumeLength.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 확인 메시지 */}
          {isConfirmed && isValidLength && (
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                ✓ 이력서가 입력되었습니다. ({charCount.toLocaleString()}자)
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                실제 분석은 진단 시작 시 수행됩니다.
              </p>
            </div>
          )}

          {/* 에러 메시지 표시 */}
          {errors.length > 0 && (
            <div className="space-y-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-destructive">
                  • {error}
                </p>
              ))}
            </div>
          )}

          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {/* 이전 버튼 */}
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="sm:flex-1"
            >
              이전
            </Button>

            {/* 분석하기 버튼 (선택사항) */}
            {!isConfirmed && isValidLength && (
              <Button
                onClick={handleAnalyze}
                variant="secondary"
                size="lg"
                className="sm:flex-1"
              >
                분석하기
              </Button>
            )}

            {/* 다음 버튼 */}
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              size="lg"
              className="sm:flex-1"
            >
              다음
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 도움말 카드 */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">💡 작성 팁</h3>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>• 최근 경력부터 시간 순서대로 작성하면 좋습니다</li>
            <li>• 반복적으로 수행한 업무를 구체적으로 적어주세요</li>
            <li>• 사용한 도구나 기술을 명시하면 더 정확한 진단이 가능합니다</li>
            <li>• 성과나 수치가 있다면 함께 작성해주세요</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
