/**
 * 경력 → 수익 전환 지도 컴포넌트
 * 기존 경력으로 수익화 가능한 방향과 학습 격차 표시
 */

import { IncomeMap as IncomeMapType } from "@/lib/types/report";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface IncomeMapProps {
  data: IncomeMapType;
}

export function IncomeMap({ data }: IncomeMapProps) {
  // 긴급도에 따른 스타일 결정
  const getUrgencyStyles = (urgency: "높음" | "중간" | "낮음") => {
    switch (urgency) {
      case "높음":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800";
      case "중간":
        return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800";
      case "낮음":
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">
          경력 → 수익 전환 지도
        </CardTitle>
        <CardDescription className="text-base">
          기존 경력으로 수익화 가능한 방향
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Section 1: 수익화 가능 역할 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            수익화 가능 역할
          </h3>
          <div className="space-y-4">
            {data.roles.map((role, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-5 shadow-sm"
              >
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-base font-bold text-foreground">
                      {role.role}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>
                    <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/20">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                        💰 수익화 경로
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-blue-700 dark:text-blue-300">
                        {role.monetizationPath}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 새로 배워야 하는 영역 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            새로 배워야 하는 영역
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.learningGaps.map((gap, index) => (
              <div
                key={index}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${getUrgencyStyles(gap.urgency)}`}
              >
                <span className="font-bold">{gap.area}</span>
                <span className="text-xs opacity-75">({gap.urgency})</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
