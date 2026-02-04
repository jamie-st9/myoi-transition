/**
 * API 유틸리티 함수
 * MyOi TRANSITION MVP - 클라이언트 사이드 API 호출 헬퍼
 */

'use client';

import React from 'react';
import type { CompleteInput } from '../types/input';
import type { CompleteReport } from '../types/report';
import { ERROR_MESSAGES } from '../constants/config';

/**
 * API 에러 응답 타입
 */
interface ApiErrorResponse {
  error: string;
}

/**
 * 진단 리포트 생성 API 호출
 *
 * @param input - 완전한 입력 데이터 (CompleteInput)
 * @returns 진단 리포트 (CompleteReport)
 * @throws 한국어 에러 메시지
 */
export async function generateReport(input: CompleteInput): Promise<CompleteReport> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    // 응답 실패 처리
    if (!response.ok) {
      let errorMessage: string = ERROR_MESSAGES.API_ERROR;

      try {
        const errorData = (await response.json()) as ApiErrorResponse;
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // JSON 파싱 실패 시 기본 에러 메시지 사용
      }

      throw new Error(errorMessage);
    }

    // 성공 응답 파싱
    const report = (await response.json()) as CompleteReport;
    return report;
  } catch (error) {
    // 네트워크 에러 처리
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    // 이미 에러 메시지가 있는 경우 그대로 전달
    if (error instanceof Error) {
      throw error;
    }

    // 알 수 없는 에러
    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
}

/**
 * 리포트 생성 상태 타입
 */
export type ReportGenerationStatus =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: CompleteReport }
  | { status: 'error'; error: string };

/**
 * 리포트 생성 훅 (React 컴포넌트에서 사용)
 *
 * @example
 * ```tsx
 * const { generateReportAsync, status } = useReportGeneration();
 *
 * const handleSubmit = async () => {
 *   try {
 *     const report = await generateReportAsync(input);
 *     console.log('리포트 생성 완료:', report);
 *   } catch (error) {
 *     console.error('리포트 생성 실패:', error);
 *   }
 * };
 * ```
 */
export function useReportGeneration() {
  const [status, setStatus] = React.useState<ReportGenerationStatus>({
    status: 'idle',
  });

  const generateReportAsync = React.useCallback(
    async (input: CompleteInput): Promise<CompleteReport> => {
      setStatus({ status: 'loading' });

      try {
        const report = await generateReport(input);
        setStatus({ status: 'success', data: report });
        return report;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
        setStatus({ status: 'error', error: errorMessage });
        throw error;
      }
    },
    []
  );

  const reset = React.useCallback(() => {
    setStatus({ status: 'idle' });
  }, []);

  return {
    /** 리포트 생성 함수 */
    generateReportAsync,
    /** 현재 상태 */
    status,
    /** 상태 초기화 */
    reset,
    /** 로딩 중 여부 */
    isLoading: status.status === 'loading',
    /** 성공 여부 */
    isSuccess: status.status === 'success',
    /** 에러 여부 */
    isError: status.status === 'error',
    /** 리포트 데이터 (성공 시) */
    data: status.status === 'success' ? status.data : undefined,
    /** 에러 메시지 (에러 시) */
    error: status.status === 'error' ? status.error : undefined,
  };
}
