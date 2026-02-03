/**
 * 현실 진단 리포트 컴포넌트
 * 하면 안 되는 선택과 가능한 전환 방향 표시
 */

import { RealityReport as RealityReportType } from "@/lib/types/report";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface RealityReportProps {
  data: RealityReportType;
}

export function RealityReport({ data }: RealityReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">현실 진단 리포트</CardTitle>
        <CardDescription className="text-base">
          지금 조건에서 하면 안 되는 선택
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Section 1: 하면 안 되는 선택 TOP 3 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            하면 안 되는 선택 TOP 3
          </h3>
          <div className="space-y-3">
            {data.warnings.map((warning, index) => (
              <div
                key={index}
                className="rounded-lg border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/20"
              >
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-base font-bold text-rose-900 dark:text-rose-200">
                      {warning.title}
                    </p>
                    <p className="text-sm leading-relaxed text-rose-700 dark:text-rose-300">
                      {warning.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 가능한 전환 방향 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            가능한 전환 방향
          </h3>
          <div className="space-y-3">
            {data.suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20"
              >
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                      {suggestion.direction}
                    </p>
                    <p className="text-sm leading-relaxed text-emerald-700 dark:text-emerald-300">
                      {suggestion.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
