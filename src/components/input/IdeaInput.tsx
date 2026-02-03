/**
 * 아이디어 입력 컴포넌트 (3단계)
 * 사용자가 이미 가진 전환 아이디어 여부 확인
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import type { IdeaInput } from '@/lib/types/input';

interface IdeaInputProps {
  /** 현재 입력 데이터 */
  data: IdeaInput;
  /** 데이터 변경 핸들러 */
  onChange: (data: IdeaInput) => void;
  /** 진단 시작 핸들러 */
  onSubmit: () => void;
  /** 이전 단계로 돌아가기 핸들러 */
  onBack: () => void;
  /** 로딩 상태 */
  isLoading: boolean;
}

/**
 * IdeaInput 컴포넌트
 *
 * 사용자의 전환 아이디어 보유 여부를 확인합니다:
 * - 아이디어 보유 여부 (토글)
 * - 아이디어 설명 (보유 시)
 */
export function IdeaInput({ data, onChange, onSubmit, onBack, isLoading }: IdeaInputProps) {
  // 아이디어 보유 여부 토글 핸들러
  const handleHasIdeaChange = (checked: boolean) => {
    onChange({
      hasIdea: checked,
      ideaSummary: checked ? data.ideaSummary : undefined,
    });
  };

  // 제출 가능 여부 (아이디어가 없거나, 있으면 설명이 10자 이상)
  const canSubmit = !data.hasIdea ||
    (data.hasIdea && data.ideaSummary && data.ideaSummary.trim().length >= 10);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">아이디어</CardTitle>
          <CardDescription>
            이미 생각하고 있는 커리어 전환 아이디어가 있으신가요?
            없어도 괜찮습니다. MyOi가 함께 찾아드립니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 아이디어 보유 여부 토글 */}
          <div className="flex items-center justify-between p-6 rounded-lg border bg-card">
            <div className="space-y-1">
              <Label htmlFor="has-idea" className="text-base font-semibold cursor-pointer">
                아이디어가 있습니다
              </Label>
              <p className="text-sm text-muted-foreground">
                구체적인 전환 계획이나 방향이 있다면 켜주세요
              </p>
            </div>
            <Switch
              id="has-idea"
              checked={data.hasIdea}
              onCheckedChange={handleHasIdeaChange}
              disabled={isLoading}
            />
          </div>

          {/* 아이디어 설명 입력 (토글 ON일 때만 표시) */}
          {data.hasIdea && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="idea-summary" className="text-base font-semibold">
                아이디어 설명
              </Label>
              <p className="text-sm text-muted-foreground">
                어떤 방향으로 전환을 생각하고 계신가요?
                구체적일수록 더 정확한 진단을 받을 수 있습니다.
              </p>
              <Textarea
                id="idea-summary"
                value={data.ideaSummary || ''}
                onChange={(e) =>
                  onChange({
                    ...data,
                    ideaSummary: e.target.value,
                  })
                }
                placeholder="예시:&#10;&#10;마케팅 경력을 살려서 프리랜서 콘텐츠 크리에이터로 전환하고 싶습니다.&#10;특히 유튜브와 인스타그램을 활용한 브랜드 콘텐츠 제작에 관심이 있습니다."
                className="min-h-40 text-base"
                maxLength={1000}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground text-right">
                {(data.ideaSummary || '').length}/1000
              </p>

              {/* 최소 길이 안내 */}
              {data.ideaSummary && data.ideaSummary.trim().length < 10 && (
                <p className="text-sm text-destructive">
                  최소 10자 이상 입력해주세요
                </p>
              )}
            </div>
          )}

          {/* 아이디어 없을 때 안내 메시지 */}
          {!data.hasIdea && (
            <div className="p-6 rounded-lg bg-muted/50 border border-dashed">
              <p className="text-sm text-muted-foreground text-center">
                걱정하지 마세요! 💡<br />
                MyOi가 당신의 경력과 현실 조건을 분석하여<br />
                최적의 전환 방향을 제시해드립니다.
              </p>
            </div>
          )}

          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            {/* 이전 버튼 */}
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="sm:flex-1"
              disabled={isLoading}
            >
              이전
            </Button>

            {/* 진단 시작 버튼 */}
            <Button
              onClick={onSubmit}
              disabled={!canSubmit || isLoading}
              size="lg"
              className="sm:flex-[2] min-h-12 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  진단 생성 중...
                </>
              ) : (
                '진단 시작'
              )}
            </Button>
          </div>

          {/* 로딩 중 안내 메시지 */}
          {isLoading && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary text-center font-medium">
                AI가 당신의 커리어를 분석하고 있습니다...<br />
                <span className="text-xs">잠시만 기다려주세요 (약 10-15초 소요)</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 안내 카드 */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">📋 진단 완료 후</h3>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li>• Reality Report: 당신의 현실적 전환 가능성 분석</li>
            <li>• Income Map: 수익 창출 경로 및 예상 타임라인</li>
            <li>• Decision Questions: 전환 결정을 위한 핵심 질문들</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
