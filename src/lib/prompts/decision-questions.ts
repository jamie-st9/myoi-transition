/**
 * Decision Questions 프롬프트 생성기
 * Claude API를 위한 결정 질문 프롬프트 구성
 */

import type { CompleteInput } from '../types/input';

/**
 * Decision Questions 프롬프트 생성
 *
 * @param input - 전체 입력 데이터
 * @returns system과 user 메시지 객체
 */
export function buildDecisionQuestionsPrompt(
  input: CompleteInput
): { system: string; user: string } {
  // 시스템 프롬프트: 코칭 전문가 페르소나
  const system = `당신은 행동 변화를 이끄는 전문 커리어 코치입니다.
회피 패턴을 깨고 실행을 유도하는 질문을 던집니다.
불편하지만 정확한 질문으로 사고를 자극합니다.

응답은 반드시 다음 JSON 스키마를 따라야 합니다:
{
  "questions": [
    "질문1",
    "질문2",
    "질문3",
    "질문4",
    "질문5"
  ],
  "dangerousAssumption": "가장 위험한 가정",
  "sevenDayExperiment": {
    "title": "실험 제목",
    "description": "실험 설명"
  }
}

주의사항:
- questions는 정확히 5개의 질문을 포함해야 합니다
- 질문은 회피를 깨는 날카로운 질문이어야 합니다
- dangerousAssumption은 1개의 문장입니다
- sevenDayExperiment는 7일 안에 실행 가능한 구체적 실험입니다
- 모든 응답은 한국어로 작성합니다
- JSON 형식만 응답하고, 추가 설명은 하지 마세요`;

  // 사용자 프롬프트: 결정 촉진 요청
  const user = `다음 정보를 바탕으로 결정을 촉진하는 질문과 실험을 설계해주세요.

## 현실 점검 정보
- 주당 투입 가능 시간: ${input.realityCheck.weeklyHours}
- 예산 한도: ${input.realityCheck.budgetLimit}
- 실패 허용 정도: ${input.realityCheck.failureTolerance}
- 절대적 제약 조건: ${input.realityCheck.absoluteConstraints || '없음'}

## 커리어 이력
${input.careerSnapshot.resumeText}

${input.careerSnapshot.parsedCareer ? `
## 파싱된 경력 요약
- 수행 역할: ${input.careerSnapshot.parsedCareer.roles.join(', ')}
- 보유 기술: ${input.careerSnapshot.parsedCareer.skills.join(', ')}
- 반복 업무: ${input.careerSnapshot.parsedCareer.repeatTasks.join(', ')}
` : ''}

## 아이디어 여부
- 아이디어 보유: ${input.idea.hasIdea ? '예' : '아니오'}
${input.idea.ideaSummary ? `- 아이디어 내용: ${input.idea.ideaSummary}` : ''}

위 정보를 바탕으로:
1. 5가지 회피 깨기 질문 (questions)
   - 불편하지만 핵심을 찌르는 질문
2. 가장 위험한 가정 1가지 (dangerousAssumption)
   - 이 사람이 가진 가장 위험한 착각
3. 7일 실험 (sevenDayExperiment)
   - 7일 안에 실행 가능한 구체적 실험
   - title과 description으로 구분

을 JSON 형식으로 제공해주세요.`;

  return { system, user };
}
