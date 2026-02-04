/**
 * Skill analysis / Income map component
 * Displays recommended roles and learning gap areas with progress bars
 */

import { Target } from "lucide-react";
import { IncomeMap as IncomeMapType } from "@/lib/types/report";

interface IncomeMapProps {
  data: IncomeMapType;
}

/** Map urgency levels to approximate percentage values */
function urgencyToPercent(urgency: string): number {
  switch (urgency) {
    case '높음':
      return 85;
    case '중간':
      return 55;
    case '낮음':
      return 30;
    default:
      return 50;
  }
}

export function IncomeMap({ data }: IncomeMapProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#FFFFFF]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EFF6FF]">
          <Target className="h-5 w-5 text-[#2563EB]" aria-hidden="true" />
        </div>
        <span className="text-[16px] font-semibold text-[#1A1A1A]">
          스킬 분석
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E5E7EB]" />

      {/* Body */}
      <div className="flex flex-col gap-5 p-5">
        {/* Recommended roles section */}
        <div>
          <h4 className="mb-3 text-[13px] font-semibold text-[#1A1A1A]">
            추천 역할
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.roles.map((role, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-[20px] bg-[#EFF6FF] px-3 py-1.5 text-[12px] font-medium text-[#2563EB]"
                title={role.description}
              >
                {role.role}
              </span>
            ))}
          </div>
        </div>

        {/* Learning gap areas section */}
        {data.learningGaps.length > 0 && (
          <div>
            <h4 className="mb-3 text-[13px] font-semibold text-[#1A1A1A]">
              학습 필요 영역
            </h4>
            <div className="flex flex-col gap-3">
              {data.learningGaps.map((gap, index) => {
                const percent = urgencyToPercent(gap.urgency);
                return (
                  <div key={index}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[13px] text-[#1A1A1A]">
                        {gap.area}
                      </span>
                      <span className="text-[12px] text-[#6B7280]">
                        {percent}%
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-[3px] bg-[#E5E7EB]">
                      <div
                        className="h-full rounded-[3px] bg-[#2563EB] transition-all duration-500"
                        style={{ width: `${percent}%` }}
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${gap.area} ${percent}%`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
