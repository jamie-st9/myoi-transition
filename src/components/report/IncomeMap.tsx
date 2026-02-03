/**
 * 스킬분석 컴포넌트
 * 추천 역할 3가지 표시 (파란 테마)
 * Pencil 디자인 적용
 */

import { IncomeMap as IncomeMapType } from "@/lib/types/report";

interface IncomeMapProps {
  data: IncomeMapType;
}

export function IncomeMap({ data }: IncomeMapProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* 배지 */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          스킬분석
        </span>
      </div>

      {/* 섹션 제목 */}
      <h3 className="mb-4 text-base font-bold text-neutral-900">
        추천 역할 3가지
      </h3>

      {/* 역할 카드들 */}
      <div className="space-y-3">
        {data.roles.map((role, index) => (
          <div
            key={index}
            className="rounded-xl bg-blue-50 p-4"
          >
            {/* 역할명 */}
            <p className="text-sm font-bold text-neutral-900 mb-1">
              {role.role}
            </p>
            {/* 설명 (수익화 경로 포함) */}
            <p className="text-sm text-neutral-600 leading-relaxed">
              {role.description}
              {role.monetizationPath && (
                <span className="text-blue-600"> ({role.monetizationPath})</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
