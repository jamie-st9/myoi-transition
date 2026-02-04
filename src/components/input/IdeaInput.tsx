/**
 * 아이디어 입력 컴포넌트 (3단계)
 * 사용자가 이미 가진 전환 아이디어 여부 확인
 */

'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Loader2 } from 'lucide-react';
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
export function IdeaInput({ data, onChange, onSubmit, isLoading }: IdeaInputProps) {
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
      {/* 토글 섹션 */}
      <div className="flex items-center justify-between py-4">
        <Label htmlFor="has-idea" className="text-base font-medium cursor-pointer">
          전환하고 싶은 아이디어가 있나요?
        </Label>
        <Switch
          id="has-idea"
          checked={data.hasIdea}
          onCheckedChange={handleHasIdeaChange}
          disabled={isLoading}
          className="data-[state=checked]:bg-blue-500"
        />
      </div>

      {/* 아이디어 설명 입력 (토글 ON일 때만 표시) */}
      {data.hasIdea && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label htmlFor="idea-summary" className="text-sm font-medium text-muted-foreground">
            아이디어 설명
          </Label>
          <Textarea
            id="idea-summary"
            value={data.ideaSummary || ''}
            onChange={(e) =>
              onChange({
                ...data,
                ideaSummary: e.target.value,
              })
            }
            placeholder="예: 퇴직 후 커피 로스팅 사업을 시작하고 싶습니다.&#10;온라인 판매와 소규모 카페를 생각하고 있어요."
            className="min-h-32 text-base bg-white rounded-xl border-gray-200 focus:border-gray-300"
            maxLength={1000}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center">
            {/* 최소 길이 안내 */}
            {data.ideaSummary && data.ideaSummary.trim().length < 10 ? (
              <p className="text-sm text-destructive">
                최소 10자 이상 입력해주세요
              </p>
            ) : (
              <span />
            )}
            <p className="text-xs text-muted-foreground">
              {(data.ideaSummary || '').length}/1000
            </p>
          </div>
        </div>
      )}

      {/* 안내 섹션 - 아이디어가 없어도 괜찮아요 */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-100">
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-stone-300 flex items-center justify-center mt-0.5">
          <HelpCircle className="w-3 h-3 text-stone-600" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-stone-700">
            아이디어가 없어도 괜찮아요
          </p>
          <p className="text-sm text-stone-500">
            아이디어 없이도 현실 점검과 수익화 지도를 받아보실 수 있습니다.
          </p>
        </div>
      </div>

      {/* 로딩 중 안내 메시지 */}
      {isLoading && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-sm text-blue-700 text-center font-medium">
            AI가 당신의 커리어를 분석하고 있습니다...
            <br />
            <span className="text-xs font-normal">잠시만 기다려주세요 (약 10-15초 소요)</span>
          </p>
        </div>
      )}

      {/* 진단 시작 버튼 */}
      <Button
        onClick={onSubmit}
        disabled={!canSubmit || isLoading}
        size="lg"
        className="w-full min-h-14 text-base font-semibold bg-[#1E3A5F] hover:bg-[#162d4a] text-white rounded-xl"
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
  );
}
