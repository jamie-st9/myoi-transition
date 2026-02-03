/**
 * 사용자 입력 타입 정의
 * MyOi TRANSITION MVP - 커리어 전환 진단을 위한 입력 데이터 구조
 */

/**
 * 현실 점검 입력
 * 사용자의 시간/예산/실패 허용도 등 현실적 제약 조건
 */
export interface RealityCheckInput {
  /** 주당 투입 가능 시간 */
  weeklyHours: '5시간 미만' | '5-10시간' | '10-20시간' | '20시간 이상';
  /** 예산 한도 */
  budgetLimit: '100만원 미만' | '100-500만원' | '500-1000만원' | '1000만원 이상';
  /** 실패 허용 정도 */
  failureTolerance: '낮음' | '중간' | '높음';
  /** 절대적 제약 조건 (자유 텍스트) */
  absoluteConstraints: string;
}

/**
 * 커리어 스냅샷 입력
 * 사용자의 이력서 및 파싱된 경력 정보
 */
export interface CareerSnapshotInput {
  /** 이력서 원문 텍스트 */
  resumeText: string;
  /** 파싱된 경력 정보 (선택사항) */
  parsedCareer?: {
    /** 수행한 역할 목록 */
    roles: string[];
    /** 보유 기술 목록 */
    skills: string[];
    /** 반복적으로 수행한 업무 목록 */
    repeatTasks: string[];
  };
}

/**
 * 아이디어 입력
 * 사용자가 이미 가진 전환 아이디어 여부
 */
export interface IdeaInput {
  /** 아이디어 보유 여부 */
  hasIdea: boolean;
  /** 아이디어 요약 (보유 시) */
  ideaSummary?: string;
}

/**
 * 전체 입력 데이터
 * 3단계 입력을 통합한 완전한 진단 입력
 */
export interface CompleteInput {
  /** 현실 점검 데이터 */
  realityCheck: RealityCheckInput;
  /** 커리어 스냅샷 데이터 */
  careerSnapshot: CareerSnapshotInput;
  /** 아이디어 데이터 */
  idea: IdeaInput;
}
