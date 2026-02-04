/**
 * Decision questions (hot questions) component
 * Displays provocative questions and 7-day experiment challenge
 */

import { Flame, Calendar } from "lucide-react";
import { DecisionQuestions as DecisionQuestionsType } from "@/lib/types/report";

interface DecisionQuestionsProps {
  data: DecisionQuestionsType;
}

export function DecisionQuestions({ data }: DecisionQuestionsProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#FFFFFF]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FEE2E2]">
          <Flame className="h-5 w-5 text-[#DC2626]" aria-hidden="true" />
        </div>
        <span className="text-[16px] font-semibold text-[#1A1A1A]">
          뜨거운 질문
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        {/* Question cards */}
        {data.questions.map((question, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-[#FFF7ED] p-3.5"
          >
            <span className="text-[11px] font-bold text-[#F97316]">
              Q{index + 1}
            </span>
            <p className="mt-1 text-[14px] font-medium leading-[1.5] text-[#1A1A1A]">
              {question}
            </p>
          </div>
        ))}

        {/* 7-day experiment section */}
        {data.sevenDayExperiment && (
          <div>
            <h4 className="mb-2 text-[13px] font-semibold text-[#1A1A1A]">
              7일 실험 과제
            </h4>
            <div className="flex gap-3 rounded-[10px] bg-[#EFF6FF] p-3.5">
              <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]" aria-hidden="true" />
              <div>
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  {data.sevenDayExperiment.title}
                </p>
                <p className="mt-1 text-[13px] text-[#6B7280]">
                  {data.sevenDayExperiment.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
