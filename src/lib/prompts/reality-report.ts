/**
 * Reality Report 프롬프트 생성기
 * Claude API를 위한 현실 리포트 프롬프트 구성
 */

import type { RealityCheckInput, CareerSnapshotInput } from '../types/input';

/**
 * Reality Report 프롬프트 생성
 *
 * @param realityCheck - 현실 점검 입력 데이터
 * @param careerSnapshot - 커리어 스냅샷 입력 데이터
 * @returns system과 user 메시지 객체
 */
export function buildRealityReportPrompt(
  realityCheck: RealityCheckInput,
  careerSnapshot: CareerSnapshotInput
): { system: string; user: string } {
  // 시스템 프롬프트: 상담사 페르소나 정의
  const system = `당신은 10년 이상 경력의 커리어 전환 전문 상담사입니다.
현실적이고 직설적으로 답변합니다.
절대 희망적 메시지를 주지 마세요.

응답은 반드시 다음 JSON 스키마를 따라야 합니다:
{
  "warnings": [
    {
      "title": "경고 제목",
      "reason": "경고 이유"
    }
  ],
  "suggestions": [
    {
      "direction": "전환 방향",
      "reason": "제안 이유"
    }
  ]
}

주의사항:
- warnings는 정확히 3개의 항목을 포함해야 합니다
- suggestions는 정확히 2개의 항목을 포함해야 합니다
- 모든 응답은 한국어로 작성합니다
- JSON 형식만 응답하고, 추가 설명은 하지 마세요`;

  // 사용자 프롬프트: 진단 요청 데이터
  const user = `다음 정보를 바탕으로 커리어 전환 현실 리포트를 작성해주세요.

## 현실 점검 정보
- 주당 투입 가능 시간: ${realityCheck.weeklyHours}
- 예산 한도: ${realityCheck.budgetLimit}
- 실패 허용 정도: ${realityCheck.failureTolerance}
- 절대적 제약 조건: ${realityCheck.absoluteConstraints || '없음'}

## 커리어 이력
${careerSnapshot.resumeText}

${careerSnapshot.parsedCareer ? `
## 파싱된 경력 요약
- 수행 역할: ${careerSnapshot.parsedCareer.roles.join(', ')}
- 보유 기술: ${careerSnapshot.parsedCareer.skills.join(', ')}
- 반복 업무: ${careerSnapshot.parsedCareer.repeatTasks.join(', ')}
` : ''}

위 정보를 바탕으로:
1. TOP 3 하지 말아야 할 것들 (warnings)
2. 2가지 가능한 전환 방향 (suggestions)

을 JSON 형식으로 제공해주세요.`;

  return { system, user };
}
