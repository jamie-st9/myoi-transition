/**
 * 현실점검 리포트 컴포넌트
 * 주의가 필요한 영역 표시 (빨간/분홍 테마)
 * Pencil 디자인 적용
 */

import { RealityReport as RealityReportType } from "@/lib/types/report";

interface RealityReportProps {
  data: RealityReportType;
}

export function RealityReport({ data }: RealityReportProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* 배지 */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
          현실점검 리포트
        </span>
      </div>

      {/* 섹션 제목 */}
      <h3 className="mb-4 text-base font-bold text-neutral-900">
        주의가 필요한 영역
      </h3>

      {/* 경고 목록 */}
      <div className="space-y-3">
        {data.warnings.map((warning, index) => (
          <div
            key={index}
            className="flex gap-3 items-start"
          >
            {/* 위험 아이콘 */}
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            {/* 텍스트 */}
            <p className="text-sm text-rose-700 leading-relaxed">
              {warning.title}
              {warning.reason && (
                <span className="text-rose-600"> - {warning.reason}</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
