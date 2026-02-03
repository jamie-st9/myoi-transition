/**
 * Income Map 프롬프트 생성기
 * Claude API를 위한 수익화 지도 프롬프트 구성
 */

import type { CareerSnapshotInput } from '../types/input';

/**
 * Income Map 프롬프트 생성
 *
 * @param careerSnapshot - 커리어 스냅샷 입력 데이터
 * @returns system과 user 메시지 객체
 */
export function buildIncomeMapPrompt(
  careerSnapshot: CareerSnapshotInput
): { system: string; user: string } {
  // 시스템 프롬프트: 수익화 전문가 페르소나
  const system = `당신은 커리어를 수익화로 전환하는 전문 컨설턴트입니다.
기존 경력을 분석하여 즉시 수익화 가능한 역할을 찾아냅니다.
이론이 아닌 실전 경험 기반으로 답변합니다.

응답은 반드시 다음 JSON 스키마를 따라야 합니다:
{
  "roles": [
    {
      "role": "역할명",
      "description": "역할 설명",
      "monetizationPath": "수익화 경로"
    }
  ],
  "learningGaps": [
    {
      "area": "학습 영역",
      "urgency": "높음" | "중간" | "낮음"
    }
  ]
}

주의사항:
- roles는 정확히 3개의 항목을 포함해야 합니다
- learningGaps는 최소 2개 이상의 항목을 포함해야 합니다
- urgency는 "높음", "중간", "낮음" 중 하나여야 합니다
- 모든 응답은 한국어로 작성합니다
- JSON 형식만 응답하고, 추가 설명은 하지 마세요`;

  // 사용자 프롬프트: 수익화 분석 요청
  const user = `다음 커리어 이력을 바탕으로 수익화 지도를 작성해주세요.

## 커리어 이력
${careerSnapshot.resumeText}

${careerSnapshot.parsedCareer ? `
## 파싱된 경력 요약
- 수행 역할: ${careerSnapshot.parsedCareer.roles.join(', ')}
- 보유 기술: ${careerSnapshot.parsedCareer.skills.join(', ')}
- 반복 업무: ${careerSnapshot.parsedCareer.repeatTasks.join(', ')}
` : ''}

위 경력을 분석하여:
1. 즉시 수익화 가능한 3가지 역할 (roles)
   - 각 역할에 대해 구체적인 수익화 경로 제시
2. 수익화를 위해 필요한 학습 격차 (learningGaps)
   - 각 항목의 긴급도 표시

을 JSON 형식으로 제공해주세요.`;

  return { system, user };
}
