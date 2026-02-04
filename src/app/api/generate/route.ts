/**
 * Gemini API Route Handler
 * MyOi TRANSITION MVP - 진단 리포트 생성 API
 */

import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
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
 * Gemini API 클라이언트 호출 (단일 요청)
 */
async function callGemini(
  genAI: GoogleGenerativeAI,
  system: string,
  user: string,
  signal?: AbortSignal
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: APP_CONFIG.geminiModel,
    systemInstruction: system,
  });

  const apiPromise = model.generateContent({
    contents: [{ role: 'user', parts: [{ text: user }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 2048,
    },
  });

  let result;
  if (signal) {
    // AbortSignal을 Promise.race로 적용 (SDK가 signal을 직접 지원하지 않음)
    const abortPromise = new Promise<never>((_, reject) => {
      if (signal.aborted) {
        reject(new DOMException('The operation was aborted.', 'AbortError'));
        return;
      }
      signal.addEventListener(
        'abort',
        () => reject(new DOMException('The operation was aborted.', 'AbortError')),
        { once: true }
      );
    });
    result = await Promise.race([apiPromise, abortPromise]);
  } else {
    result = await apiPromise;
  }

  const responseText = result.response.text();

  if (!responseText) {
    throw new Error('Gemini API 응답에서 텍스트를 찾을 수 없습니다.');
  }

  return responseText;
}

/**
 * Gemini API 재시도 로직 포함 호출
 */
async function callGeminiWithRetry(
  genAI: GoogleGenerativeAI,
  system: string,
  user: string,
  maxRetries: number = APP_CONFIG.maxRetries,
  signal?: AbortSignal
): Promise<string> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await callGemini(genAI, system, user, signal);
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
 * JSON 응답 파싱 (Gemini 응답에서 JSON 추출)
 */
function parseJsonResponse<T>(text: string): T {
  try {
    // Gemini가 마크다운 코드 블록으로 감싼 경우 처리
    const jsonMatch = text.match(/```json\s*\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('응답에서 JSON을 찾을 수 없습니다.');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];
    return JSON.parse(jsonText);
  } catch {
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
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      const errorMsg = 'GOOGLE_AI_API_KEY 환경 변수가 설정되지 않았습니다. Vercel 대시보드에서 환경 변수를 설정해주세요.';
      console.error(errorMsg);
      console.error('Environment check:', {
        isDefined: !!process.env.GOOGLE_AI_API_KEY,
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        {
          error: 'API 설정이 올바르지 않습니다.',
          debug: process.env.NODE_ENV === 'development' ? errorMsg : undefined,
        },
        { status: 500 }
      );
    }

    // Validate API key format (should start with AIza for Gemini API)
    if (!apiKey.startsWith('AIza')) {
      console.error('Invalid API key format detected');
      return NextResponse.json(
        { error: 'API 키가 유효하지 않습니다.' },
        { status: 500 }
      );
    }

    // 2. 요청 본문 파싱
    let input: unknown;
    try {
      input = await request.json();
    } catch {
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

    // 4. Google Generative AI 클라이언트 초기화
    const genAI = new GoogleGenerativeAI(apiKey);

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

      // 7. Gemini API 병렬 호출 (Promise.all로 동시 실행)
      const [realityText, incomeText, decisionText] = await Promise.all([
        callGeminiWithRetry(
          genAI,
          realityPrompt.system,
          realityPrompt.user,
          APP_CONFIG.maxRetries,
          abortController.signal
        ),
        callGeminiWithRetry(
          genAI,
          incomePrompt.system,
          incomePrompt.user,
          APP_CONFIG.maxRetries,
          abortController.signal
        ),
        callGeminiWithRetry(
          genAI,
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

    // Google API 에러 처리
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      // Rate limit 에러
      if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
        return NextResponse.json(
          { error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
          { status: 429 }
        );
      }

      // 인증 에러
      if (errorMessage.includes('api key') || errorMessage.includes('authentication') || errorMessage.includes('unauthorized')) {
        console.error('Authentication error details:', {
          message: error.message,
          timestamp: new Date().toISOString(),
        });
        return NextResponse.json(
          {
            error: 'API 인증에 실패했습니다. Vercel 환경 변수 설정을 확인하세요.',
            code: 'AUTH_ERROR',
          },
          { status: 401 }
        );
      }

      // Safety filter 에러
      if (errorMessage.includes('safety') || errorMessage.includes('blocked')) {
        return NextResponse.json(
          { error: '요청이 안전 필터에 의해 차단되었습니다.' },
          { status: 400 }
        );
      }
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
