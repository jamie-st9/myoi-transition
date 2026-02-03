/**
 * 진단 리포트 타입 정의
 * MyOi TRANSITION MVP - Claude API 응답 구조
 */

/**
 * 현실 리포트
 * 하지 말아야 할 것들과 가능한 방향성 제시
 */
export interface RealityReport {
  /** 경고 사항 (TOP 3 하지 말아야 할 것들) */
  warnings: Array<{
    /** 경고 제목 */
    title: string;
    /** 경고 이유 */
    reason: string;
  }>;
  /** 제안 사항 (2가지 가능한 전환 방향) */
  suggestions: Array<{
    /** 전환 방향 */
    direction: string;
    /** 제안 이유 */
    reason: string;
  }>;
}

/**
 * 수익화 지도
 * 경력 기반 수익화 가능 역할과 학습 격차 분석
 */
export interface IncomeMap {
  /** 수익화 가능 역할 목록 (3개) */
  roles: Array<{
    /** 역할명 */
    role: string;
    /** 역할 설명 */
    description: string;
    /** 수익화 경로 */
    monetizationPath: string;
  }>;
  /** 학습 격차 목록 */
  learningGaps: Array<{
    /** 학습 영역 */
    area: string;
    /** 긴급도 */
    urgency: '높음' | '중간' | '낮음';
  }>;
}

/**
 * 결정 질문
 * 회피 깨기 질문과 7일 실험
 */
export interface DecisionQuestions {
  /** 5가지 회피 깨기 질문 */
  questions: string[];
  /** 가장 위험한 가정 1가지 */
  dangerousAssumption: string;
  /** 7일 실험 */
  sevenDayExperiment: {
    /** 실험 제목 */
    title: string;
    /** 실험 설명 */
    description: string;
  };
}

/**
 * 완전한 진단 리포트
 * 3가지 분석 결과 통합
 */
export interface CompleteReport {
  /** 현실 리포트 */
  realityReport: RealityReport;
  /** 수익화 지도 */
  incomeMap: IncomeMap;
  /** 결정 질문 */
  decisionQuestions: DecisionQuestions;
}
