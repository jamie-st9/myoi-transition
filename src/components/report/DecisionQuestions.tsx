/**
 * 의사결정 질문 컴포넌트
 * 회피를 깨고 행동으로 이어지는 질문들 표시
 */

import { DecisionQuestions as DecisionQuestionsType } from "@/lib/types/report";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface DecisionQuestionsProps {
  data: DecisionQuestionsType;
}

export function DecisionQuestions({ data }: DecisionQuestionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">의사결정 질문</CardTitle>
        <CardDescription className="text-base">
          회피를 깨고 행동으로 이어지는 질문
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Section 1: 회피를 깨는 질문 5가지 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            회피를 깨는 질문 5가지
          </h3>
          <div className="space-y-3">
            {data.questions.map((question, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 bg-slate-50 pl-4 pr-3 py-3 dark:bg-slate-900/50"
              >
                <p className="text-base font-medium leading-relaxed text-foreground">
                  <span className="mr-2 font-bold text-blue-600 dark:text-blue-400">
                    {index + 1}.
                  </span>
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 가장 위험한 가정 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            가장 위험한 가정
          </h3>
          <div className="rounded-lg border-2 border-rose-500 bg-rose-50 p-5 dark:border-rose-800 dark:bg-rose-950/20">
            <p className="mb-2 text-base font-bold text-rose-900 dark:text-rose-200">
              ⚠️ 당신의 가장 위험한 가정:
            </p>
            <p className="text-base leading-relaxed text-rose-800 dark:text-rose-300">
              {data.dangerousAssumption}
            </p>
          </div>
        </div>

        {/* Section 3: 7일 실험 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">7일 실험</h3>
          <div className="rounded-lg border-2 border-indigo-500 bg-indigo-50 p-5 dark:border-indigo-800 dark:bg-indigo-950/20">
            <p className="mb-3 text-lg font-bold text-indigo-900 dark:text-indigo-200">
              {data.sevenDayExperiment.title}
            </p>
            <p className="mb-4 text-base leading-relaxed text-indigo-800 dark:text-indigo-300">
              {data.sevenDayExperiment.description}
            </p>
            <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
              💡 이번 주에 바로 시도해 보세요
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
