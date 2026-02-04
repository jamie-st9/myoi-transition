/**
 * 입력 데이터 유효성 검증 유틸리티
 * MyOi TRANSITION MVP - 사용자 입력 검증
 */

import type { RealityCheckInput, RealityCheckFormState, CareerSnapshotInput } from '../types/input';

/**
 * 현실 점검 데이터 유효성 검증
 *
 * @param input - 검증할 현실 점검 데이터
 * @returns 에러 메시지 배열 (빈 배열이면 유효함)
 */
export function validateRealityCheck(
  input: Partial<RealityCheckInput> | RealityCheckFormState
): string[] {
  const errors: string[] = [];

  // 주당 시간 검증
  const validWeeklyHours = [
    '5시간 미만',
    '5-10시간',
    '10-20시간',
    '20시간 이상',
  ];
  if (!input.weeklyHours) {
    errors.push('주당 투입 가능 시간을 선택해주세요.');
  } else if (!validWeeklyHours.includes(input.weeklyHours)) {
    errors.push('올바른 주당 시간 옵션을 선택해주세요.');
  }

  // 예산 한도 검증
  const validBudgetLimits = [
    '100만원 미만',
    '100-500만원',
    '500-1000만원',
    '1000만원 이상',
  ];
  if (!input.budgetLimit) {
    errors.push('예산 한도를 선택해주세요.');
  } else if (!validBudgetLimits.includes(input.budgetLimit)) {
    errors.push('올바른 예산 옵션을 선택해주세요.');
  }

  // 실패 허용도 검증
  const validFailureTolerances = ['낮음', '중간', '높음'];
  if (!input.failureTolerance) {
    errors.push('실패 허용 정도를 선택해주세요.');
  } else if (!validFailureTolerances.includes(input.failureTolerance)) {
    errors.push('올바른 실패 허용 옵션을 선택해주세요.');
  }

  // 절대적 제약 조건 검증 (선택사항이지만 입력 시 최소 길이 체크)
  if (input.absoluteConstraints !== undefined) {
    const trimmed = input.absoluteConstraints.trim();
    if (trimmed.length > 0 && trimmed.length < 10) {
      errors.push('절대적 제약 조건은 최소 10자 이상 입력해주세요.');
    }
    if (trimmed.length > 500) {
      errors.push('절대적 제약 조건은 최대 500자까지 입력 가능합니다.');
    }
  }

  return errors;
}

/**
 * 커리어 스냅샷 데이터 유효성 검증
 *
 * @param input - 검증할 커리어 스냅샷 데이터
 * @returns 에러 메시지 배열 (빈 배열이면 유효함)
 */
export function validateCareerSnapshot(
  input: Partial<CareerSnapshotInput>
): string[] {
  const errors: string[] = [];

  // 이력서 텍스트 검증
  if (!input.resumeText) {
    errors.push('이력서를 입력해주세요.');
  } else {
    const trimmed = input.resumeText.trim();
    if (trimmed.length < 50) {
      errors.push('이력서는 최소 50자 이상 입력해주세요.');
    }
    if (trimmed.length > 5000) {
      errors.push('이력서는 최대 5000자까지 입력 가능합니다.');
    }
  }

  // parsedCareer 검증 (선택사항)
  if (input.parsedCareer) {
    const { roles, skills, repeatTasks } = input.parsedCareer;

    if (!Array.isArray(roles) || roles.length === 0) {
      errors.push('파싱된 역할 정보가 유효하지 않습니다.');
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      errors.push('파싱된 기술 정보가 유효하지 않습니다.');
    }

    if (!Array.isArray(repeatTasks) || repeatTasks.length === 0) {
      errors.push('파싱된 반복 업무 정보가 유효하지 않습니다.');
    }
  }

  return errors;
}

/**
 * 이메일 형식 유효성 검증
 *
 * @param email - 검증할 이메일 주소
 * @returns 유효하면 true, 그렇지 않으면 false
 */
export function validateEmail(email: string): boolean {
  // RFC 5322 기반 이메일 정규식 (간소화 버전)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || typeof email !== 'string') {
    return false;
  }

  const trimmed = email.trim();

  // 기본 형식 검증
  if (!emailRegex.test(trimmed)) {
    return false;
  }

  // 길이 검증
  if (trimmed.length > 254) {
    return false;
  }

  // 로컬 파트 검증 (@ 앞부분)
  const [localPart] = trimmed.split('@');
  if (localPart.length > 64) {
    return false;
  }

  return true;
}
