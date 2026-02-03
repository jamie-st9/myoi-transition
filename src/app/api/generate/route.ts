/**
 * Claude API Route Handler
 * MyOi TRANSITION MVP - 진단 리포트 생성 API
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { CompleteInput } from '@/lib/types/input';
import type {
  CompleteReport,
  RealityReport,
  IncomeMap,
  DecisionQuestions,
} from '@/lib/types/report';
import { buildRealityReportPrompt } from '@/lib/prompts/reality-report';
import { buildIncomeMapPrompt } from '@/lib/prompts/income-map';
import { buildDecisionQuestionsPrompt } from '@/lib/prompts/decision-questions';
import { APP_CONFIG, ERROR_MESSAGES } from '@/lib/constants/config';

/**
 * Claude API 클라이언트 호출 (단일 요청)
 */
async function callClaude(
  client: Anthropic,
  system: string,
  user: string,
  signal?: AbortSignal
): Promise<string> {
  const response = await client.messages.create(
    {
      model: APP_CONFIG.claudeModel,
      max_tokens: 2048,
      system: system,
      messages: [{ role: 'user', content: user }],
    },
    { signal }
  );

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude API 응답에서 텍스트를 찾을 수 없습니다.');
  }

  return textBlock.text;
}

/**
 * Claude API 재시도 로직 포함 호출
 */
async function callClaudeWithRetry(
  client: Anthropic,
  system: string,
  user: string,
  maxRetries: number = APP_CONFIG.maxRetries,
  signal?: AbortSignal
): Promise<string> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await callClaude(client, system, user, signal);
    } catch (error) {
      // 마지막 재시도에서 실패하면 에러 발생
      if (attempt === maxRetries) throw error;

      // AbortSignal이 abort된 경우 재시도 중단
      if (signal?.aborted) throw error;

      // 1초 대기 후 재시도
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw new Error('최대 재시도 횟수를 초과했습니다.');
}

/**
 * JSON 응답 파싱 (Claude 응답에서 JSON 추출)
 */
function parseJsonResponse<T>(text: string, fallbackRetry?: () => Promise<string>): T {
  try {
    // Claude가 마크다운 코드 블록으로 감싼 경우 처리
    const jsonMatch = text.match(/```json\s*\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('응답에서 JSON을 찾을 수 없습니다.');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('JSON 파싱 실패:', text);
    throw new Error('응답 형식이 올바르지 않습니다.');
  }
}

/**
 * 입력 데이터 기본 검증
 */
function validateInput(input: unknown): input is CompleteInput {
  if (!input || typeof input !== 'object') {
    return false;
  }

  const data = input as Record<string, unknown>;

  // realityCheck 검증
  if (!data.realityCheck || typeof data.realityCheck !== 'object') {
    return false;
  }

  // careerSnapshot 검증
  if (!data.careerSnapshot || typeof data.careerSnapshot !== 'object') {
    return false;
  }

  const careerSnapshot = data.careerSnapshot as Record<string, unknown>;
  if (!careerSnapshot.resumeText || typeof careerSnapshot.resumeText !== 'string') {
    return false;
  }

  // idea 검증
  if (!data.idea || typeof data.idea !== 'object') {
    return false;
  }

  return true;
}

/**
 * POST /api/generate
 * 완전한 진단 리포트 생성
 */
export async function POST(request: NextRequest) {
  try {
    // 1. API 키 확인
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY 환경 변수가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: 'API 설정이 올바르지 않습니다.' },
        { status: 500 }
      );
    }

    // 2. 요청 본문 파싱
    let input: unknown;
    try {
      input = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.VALIDATION_ERROR },
        { status: 400 }
      );
    }

    // 3. 입력 데이터 검증
    if (!validateInput(input)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.VALIDATION_ERROR },
        { status: 400 }
      );
    }

    // 4. Anthropic 클라이언트 초기화
    const client = new Anthropic({ apiKey });

    // 5. 타임아웃 설정
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, APP_CONFIG.apiTimeout);

    try {
      // 6. 3개의 프롬프트 생성
      const realityPrompt = buildRealityReportPrompt(
        input.realityCheck,
        input.careerSnapshot
      );
      const incomePrompt = buildIncomeMapPrompt(input.careerSnapshot);
      const decisionPrompt = buildDecisionQuestionsPrompt(input);

      // 7. Claude API 병렬 호출 (Promise.all로 동시 실행)
      const [realityText, incomeText, decisionText] = await Promise.all([
        callClaudeWithRetry(
          client,
          realityPrompt.system,
          realityPrompt.user,
          APP_CONFIG.maxRetries,
          abortController.signal
        ),
        callClaudeWithRetry(
          client,
          incomePrompt.system,
          incomePrompt.user,
          APP_CONFIG.maxRetries,
          abortController.signal
        ),
        callClaudeWithRetry(
          client,
          decisionPrompt.system,
          decisionPrompt.user,
          APP_CONFIG.maxRetries,
          abortController.signal
        ),
      ]);

      // 타임아웃 해제
      clearTimeout(timeoutId);

      // 8. JSON 응답 파싱
      const realityReport = parseJsonResponse<RealityReport>(realityText);
      const incomeMap = parseJsonResponse<IncomeMap>(incomeText);
      const decisionQuestions = parseJsonResponse<DecisionQuestions>(decisionText);

      // 9. 통합 리포트 생성
      const completeReport: CompleteReport = {
        realityReport,
        incomeMap,
        decisionQuestions,
      };

      // 10. 성공 응답
      return NextResponse.json(completeReport, { status: 200 });
    } catch (error) {
      clearTimeout(timeoutId);

      // AbortController에 의한 타임아웃
      if (abortController.signal.aborted) {
        return NextResponse.json(
          { error: ERROR_MESSAGES.TIMEOUT_ERROR },
          { status: 408 }
        );
      }

      throw error;
    }
  } catch (error) {
    console.error('API 에러:', error);

    // Anthropic API 에러 처리
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API 에러:', error.status, error.message);

      if (error.status === 429) {
        return NextResponse.json(
          { error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
          { status: 429 }
        );
      }

      if (error.status === 401) {
        return NextResponse.json(
          { error: 'API 인증에 실패했습니다.' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: ERROR_MESSAGES.API_ERROR },
        { status: 500 }
      );
    }

    // 네트워크 에러
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NETWORK_ERROR },
        { status: 503 }
      );
    }

    // 기타 에러
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNKNOWN_ERROR },
      { status: 500 }
    );
  }
}

// Next.js App Router 설정
export const runtime = 'nodejs';
export const maxDuration = 30; // 30초 허용
