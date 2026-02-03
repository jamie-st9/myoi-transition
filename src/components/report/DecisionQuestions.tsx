/**
 * 뜨거운질문 컴포넌트
 * 회피를 깨는 질문 표시 (노란/주황 테마)
 * Pencil 디자인 적용
 */

import { DecisionQuestions as DecisionQuestionsType } from "@/lib/types/report";

interface DecisionQuestionsProps {
  data: DecisionQuestionsType;
}

export function DecisionQuestions({ data }: DecisionQuestionsProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* 배지 */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          뜨거운질문
        </span>
      </div>

      {/* 섹션 제목 */}
      <h3 className="mb-4 text-base font-bold text-neutral-900">
        회피를 깨는 질문
      </h3>

      {/* 질문 목록 */}
      <div className="space-y-3">
        {data.questions.map((question, index) => (
          <div
            key={index}
            className="flex gap-2"
          >
            {/* 번호 */}
            <span className="flex-shrink-0 text-sm font-bold text-amber-600">
              {index + 1}.
            </span>
            {/* 질문 텍스트 */}
            <p className="text-sm text-neutral-700 leading-relaxed">
              {question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
