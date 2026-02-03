/**
 * 현실 점검 입력 컴포넌트 (1단계)
 * 사용자의 시간/예산/실패 허용도 등 현실적 제약 조건 수집
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { validateRealityCheck } from '@/lib/utils/validation';
import { REALITY_CHECK_OPTIONS } from '@/lib/constants/config';
import type { RealityCheckInput } from '@/lib/types/input';

interface RealityCheckProps {
  /** 현재 입력 데이터 */
  data: RealityCheckInput;
  /** 데이터 변경 핸들러 */
  onChange: (data: RealityCheckInput) => void;
  /** 다음 단계로 진행 핸들러 */
  onNext: () => void;
}

/**
 * RealityCheck 컴포넌트
 *
 * 사용자의 현실적 제약 조건을 수집합니다:
 * - 주당 투입 가능 시간
 * - 예산 한도
 * - 실패 감내 수준
 * - 절대적 제약 조건
 */
export function RealityCheck({ data, onChange, onNext }: RealityCheckProps) {
  const [errors, setErrors] = useState<string[]>([]);

  // 데이터 변경 시 유효성 검증
  useEffect(() => {
    const validationErrors = validateRealityCheck(data);
    setErrors(validationErrors);
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

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">현실 점검</CardTitle>
          <CardDescription>
            커리어 전환을 위한 현실적인 제약 조건을 확인합니다.
            솔직하게 답변할수록 더 정확한 진단을 받을 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* 주당 투입 시간 */}
          <div className="space-y-4">
            <Label htmlFor="weekly-hours" className="text-base font-semibold">
              주당 투입 가능 시간
            </Label>
            <p className="text-sm text-muted-foreground">
              커리어 전환 준비를 위해 일주일에 투입할 수 있는 시간은 얼마나 되시나요?
            </p>
            <RadioGroup
              id="weekly-hours"
              value={data.weeklyHours}
              onValueChange={(value) =>
                onChange({
                  ...data,
                  weeklyHours: value as RealityCheckInput['weeklyHours'],
                })
              }
            >
              {REALITY_CHECK_OPTIONS.weeklyHours.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option} id={`weekly-${option}`} />
                  <Label
                    htmlFor={`weekly-${option}`}
                    className="flex-1 cursor-pointer font-normal text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 예산 한도 */}
          <div className="space-y-4">
            <Label htmlFor="budget-limit" className="text-base font-semibold">
              예산 한도
            </Label>
            <p className="text-sm text-muted-foreground">
              커리어 전환을 위해 투자할 수 있는 예산 규모는 얼마나 되시나요?
              (교육비, 자격증, 장비 구입 등)
            </p>
            <RadioGroup
              id="budget-limit"
              value={data.budgetLimit}
              onValueChange={(value) =>
                onChange({
                  ...data,
                  budgetLimit: value as RealityCheckInput['budgetLimit'],
                })
              }
            >
              {REALITY_CHECK_OPTIONS.budgetLimit.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option} id={`budget-${option}`} />
                  <Label
                    htmlFor={`budget-${option}`}
                    className="flex-1 cursor-pointer font-normal text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 실패 감내 수준 */}
          <div className="space-y-4">
            <Label htmlFor="failure-tolerance" className="text-base font-semibold">
              실패 감내 수준
            </Label>
            <p className="text-sm text-muted-foreground">
              커리어 전환이 실패했을 때 감내할 수 있는 수준은 어느 정도인가요?
            </p>
            <RadioGroup
              id="failure-tolerance"
              value={data.failureTolerance}
              onValueChange={(value) =>
                onChange({
                  ...data,
                  failureTolerance: value as RealityCheckInput['failureTolerance'],
                })
              }
            >
              {REALITY_CHECK_OPTIONS.failureTolerance.map((option) => (
                <div key={option} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option} id={`failure-${option}`} />
                  <Label
                    htmlFor={`failure-${option}`}
                    className="flex-1 cursor-pointer font-normal text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 절대적 제약 조건 */}
          <div className="space-y-4">
            <Label htmlFor="absolute-constraints" className="text-base font-semibold">
              절대적 제약 조건 (선택사항)
            </Label>
            <p className="text-sm text-muted-foreground">
              반드시 지켜야 하는 제약 조건이 있다면 입력해주세요.
              예: 주말 근무 불가, 대출 상환 중, 가족 돌봄 필요 등
            </p>
            <Textarea
              id="absolute-constraints"
              value={data.absoluteConstraints}
              onChange={(e) =>
                onChange({
                  ...data,
                  absoluteConstraints: e.target.value,
                })
              }
              placeholder="예: 주말 근무 불가, 대출 상환 중..."
              className="min-h-32 text-base"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {data.absoluteConstraints.length}/500
            </p>
          </div>

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

          {/* 다음 버튼 */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              size="lg"
              className="min-w-32"
            >
              다음
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
