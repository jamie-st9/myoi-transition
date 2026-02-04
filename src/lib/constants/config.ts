/**
 * 애플리케이션 설정 상수
 * MyOi TRANSITION MVP - 전역 설정 및 옵션
 */

/**
 * 애플리케이션 기본 설정
 */
export const APP_CONFIG = {
  /** 애플리케이션 이름 */
  name: 'MyOi TRANSITION',
  /** 애플리케이션 설명 */
  description: '잘못된 전환을 막는 커리어 진단 플랫폼',
  /** Gemini API 모델 버전 */
  geminiModel: 'gemini-2.0-flash',
  /** 이력서 최대 길이 (문자) */
  maxResumeLength: 5000,
  /** 이력서 최소 길이 (문자) */
  minResumeLength: 50,
  /** API 요청 타임아웃 (밀리초) - Vercel Pro plan: 60초, Free plan: 10초 제한 */
  apiTimeout: 25000, // 25초 (Vercel Pro의 60초 제한 내에서 안전함)
  /** API 요청 최대 재시도 횟수 */
  maxRetries: 1, // 재시도는 1회로 제한 (타임아웃 시간 절약)
} as const;

/**
 * 현실 점검 입력 옵션
 */
export const REALITY_CHECK_OPTIONS = {
  /** 주당 투입 가능 시간 옵션 */
  weeklyHours: ['5시간 미만', '5-10시간', '10-20시간', '20시간 이상'] as const,
  /** 예산 한도 옵션 */
  budgetLimit: [
    '100만원 미만',
    '100-500만원',
    '500-1000만원',
    '1000만원 이상',
  ] as const,
  /** 실패 허용 정도 옵션 */
  failureTolerance: ['낮음', '중간', '높음'] as const,
} as const;

/**
 * 진단 단계 정의
 */
export const DIAGNOSTIC_STEPS = {
  /** 1단계: 현실 점검 */
  REALITY_CHECK: 'reality-check',
  /** 2단계: 커리어 스냅샷 */
  CAREER_SNAPSHOT: 'career-snapshot',
  /** 3단계: 아이디어 */
  IDEA: 'idea',
  /** 4단계: 리포트 생성 */
  REPORT_GENERATION: 'report-generation',
} as const;

/**
 * API 엔드포인트
 */
export const API_ENDPOINTS = {
  /** 완전한 리포트 생성 */
  COMPLETE_REPORT: '/api/generate',
} as const;

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  /** 현실 점검 데이터 */
  REALITY_CHECK: 'myoi-reality-check',
  /** 커리어 스냅샷 데이터 */
  CAREER_SNAPSHOT: 'myoi-career-snapshot',
  /** 아이디어 데이터 */
  IDEA: 'myoi-idea',
  /** 진행 중인 단계 */
  CURRENT_STEP: 'myoi-current-step',
} as const;

/**
 * 에러 메시지
 */
export const ERROR_MESSAGES = {
  /** API 요청 실패 */
  API_ERROR: 'API 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  /** 유효성 검증 실패 */
  VALIDATION_ERROR: '입력 데이터가 유효하지 않습니다.',
  /** 타임아웃 */
  TIMEOUT_ERROR: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  /** 네트워크 오류 */
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  /** 알 수 없는 오류 */
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
} as const;

/**
 * 성공 메시지
 */
export const SUCCESS_MESSAGES = {
  /** 데이터 저장 성공 */
  SAVE_SUCCESS: '데이터가 저장되었습니다.',
  /** 리포트 생성 성공 */
  REPORT_SUCCESS: '진단 리포트가 생성되었습니다.',
} as const;
