/**
 * Reality check report component
 * Displays warnings and suggestions with expandable card layout
 */

"use client";

import { useState } from "react";
import { TriangleAlert, ChevronDown, ChevronUp, CircleAlert, Lightbulb } from "lucide-react";
import { RealityReport as RealityReportType } from "@/lib/types/report";

interface RealityReportProps {
  data: RealityReportType;
}

export function RealityReport({ data }: RealityReportProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#FFFFFF]">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-5 py-4"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          {/* Warning badge icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#FEF3C7]">
            <TriangleAlert className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
          </div>
          <span className="text-[16px] font-semibold text-[#1A1A1A]">
            현실점검 리포트
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-[#9CA3AF]" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#9CA3AF]" aria-hidden="true" />
        )}
      </button>

      {isExpanded && (
        <>
          {/* Divider */}
          <div className="h-px bg-[#E5E7EB]" />

          {/* Body */}
          <div className="flex flex-col gap-4 p-5">
            {/* Warning items */}
            {data.warnings.map((warning, index) => (
              <div key={`warning-${index}`} className="flex gap-3">
                <CircleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#F59E0B]" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-semibold text-[#1A1A1A]">
                    {warning.title}
                  </p>
                  {warning.reason && (
                    <p className="mt-1 text-[13px] text-[#6B7280]">
                      {warning.reason}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Suggestion items */}
            {data.suggestions.map((suggestion, index) => (
              <div key={`suggestion-${index}`} className="flex gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]" aria-hidden="true" />
                <div>
                  <p className="text-[13px] font-semibold text-[#2563EB]">
                    {suggestion.direction}
                  </p>
                  {suggestion.reason && (
                    <p className="mt-1 text-[13px] text-[#6B7280]">
                      {suggestion.reason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
