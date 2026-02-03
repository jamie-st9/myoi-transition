# SPEC-UI-001 인수 기준 (Acceptance Criteria)

## 개요

이 문서는 SPEC-UI-001 구현 완료를 판단하기 위한 인수 기준을 정의합니다. 모든 시나리오는 Given-When-Then 형식으로 작성되었습니다.

---

## 시나리오 1: Landing Page 렌더링 및 네비게이션

### AC-1.1: Hero Section 표시

**Given**: 사용자가 브라우저에서 루트 URL (`/`)에 접속
**When**: 페이지가 로드됨
**Then**:
- Hero section이 화면에 표시됨
- Headline "40-50대, 이제 '망하지 않는' 전환을 시작하세요" 표시
- Subheadline (가치 제안) 표시
- "3분 진단 시작" CTA 버튼 표시

**검증 방법**:
- E2E 테스트로 Hero section 요소 존재 확인
- 수동 테스트: 브라우저에서 `/` 접속하여 시각적 확인

---

### AC-1.2: CTA 버튼 클릭 시 Input Page 이동

**Given**: Landing page가 로드되어 있음
**When**: 사용자가 "3분 진단 시작" 버튼을 클릭
**Then**:
- 브라우저 URL이 `/input`으로 변경됨
- Input page가 렌더링됨
- Progress indicator "1/3" 표시

**검증 방법**:
- E2E 테스트: 버튼 클릭 → URL 변경 → Progress indicator 확인
- 수동 테스트: 버튼 클릭하여 이동 확인

---

## 시나리오 2: Reality Check 폼 검증

### AC-2.1: 필수 필드 검증

**Given**: 사용자가 `/input` 페이지의 Step 1 (Reality Check)에 있음
**When**: 사용자가 필수 필드 (주당 시간, 예산, 실패 감내)를 선택하지 않고 "다음" 버튼을 클릭
**Then**:
- "다음" 버튼이 비활성화(disabled) 상태로 유지됨
- 또는 오류 메시지 "필수 항목을 선택하세요" 표시

**검증 방법**:
- Unit 테스트: 검증 로직 테스트
- E2E 테스트: 필드 미선택 → 버튼 비활성화 확인

---

### AC-2.2: 모든 필수 필드 입력 후 다음 단계 이동

**Given**: 사용자가 Step 1 (Reality Check)에 있음
**When**: 사용자가 주당 시간, 예산, 실패 감내를 모두 선택하고 "다음" 버튼을 클릭
**Then**:
- Step 2 (Career Snapshot)로 전환됨
- Progress indicator "2/3" 표시

**검증 방법**:
- E2E 테스트: 모든 필드 선택 → "다음" 클릭 → Step 2 렌더링 확인

---

## 시나리오 3: Career Snapshot 붙여넣기 및 파싱

### AC-3.1: 이력서 붙여넣기 및 파싱 요청

**Given**: 사용자가 Step 2 (Career Snapshot)에 있음
**When**: 사용자가 Textarea에 이력서를 붙여넣고 "붙여넣기 후 분석" 버튼을 클릭
**Then**:
- 로딩 상태 표시 (Spinner + "분석 중..." 메시지)
- Claude API 호출 시작

**검증 방법**:
- E2E 테스트: Textarea 입력 → 버튼 클릭 → 로딩 상태 확인
- API Mock: Claude API 호출 여부 확인

---

### AC-3.2: 파싱 결과 표시

**Given**: 사용자가 이력서를 붙여넣고 "붙여넣기 후 분석" 버튼을 클릭함
**When**: Claude API가 성공적으로 역할(role)과 스킬(skill)을 반환
**Then**:
- 로딩 상태 종료
- 파싱 결과가 화면에 표시됨 (예: "역할: 백엔드 개발자", "주요 스킬: Python, Django, PostgreSQL")

**검증 방법**:
- E2E 테스트: Mock API 응답 → 파싱 결과 렌더링 확인
- 수동 테스트: 실제 이력서 붙여넣기 → 결과 확인

---

### AC-3.3: 파싱 실패 시 오류 메시지 표시

**Given**: 사용자가 이력서를 붙여넣고 "붙여넣기 후 분석" 버튼을 클릭함
**When**: Claude API 호출이 실패 (timeout, network error 등)
**Then**:
- 로딩 상태 종료
- 오류 메시지 표시 "분석에 실패했습니다. 다시 시도해주세요."
- 사용자는 다시 버튼을 클릭할 수 있음

**검증 방법**:
- E2E 테스트: Mock API 실패 응답 → 오류 메시지 확인

---

## 시나리오 4: Idea Input 및 진단 시작

### AC-4.1: "아이디어 없음" 선택 가능

**Given**: 사용자가 Step 3 (Idea Input)에 있음
**When**: 사용자가 "아이디어 없음" Toggle을 활성화
**Then**:
- Text input 비활성화됨
- "진단 시작" 버튼 활성화됨

**검증 방법**:
- E2E 테스트: Toggle 클릭 → Text input disabled → 버튼 활성화 확인

---

### AC-4.2: 아이디어 입력 후 진단 시작

**Given**: 사용자가 Step 3 (Idea Input)에 있음
**When**: 사용자가 아이디어를 입력하고 "진단 시작" 버튼을 클릭
**Then**:
- API 호출 시작 (`/api/generate` POST)
- 로딩 상태 표시 (Spinner + "진단 생성 중... (최대 10초 소요)")

**검증 방법**:
- E2E 테스트: 아이디어 입력 → 버튼 클릭 → API 호출 확인

---

## 시나리오 5: API 리포트 생성 및 JSON 응답

### AC-5.1: 유효한 입력으로 3개 리포트 생성

**Given**: 사용자가 모든 입력을 완료하고 "진단 시작" 버튼을 클릭함
**When**: `/api/generate` API Route가 호출됨
**Then**:
- Claude API가 3개 프롬프트 실행 (reality-report, income-map, decision-questions)
- 응답이 JSON 형식으로 반환됨
- 응답 구조:
  ```json
  {
    "realityReport": { "warnings": [...], "suggestions": [...] },
    "incomeMap": { "roles": [...], "learningGaps": [...] },
    "decisionQuestions": { "questions": [...], "assumption": "...", "experiment": "..." }
  }
  ```

**검증 방법**:
- Integration 테스트: Mock Claude API → JSON 응답 구조 검증
- Unit 테스트: zod 스키마 검증 통과 확인

---

### AC-5.2: API 호출 15초 이내 완료

**Given**: 사용자가 "진단 시작" 버튼을 클릭함
**When**: `/api/generate` API Route가 Claude API를 호출
**Then**:
- API 응답이 15초 이내에 완료됨 (목표: 10초, 최대: 15초)
- 15초 초과 시 timeout 처리 및 오류 메시지 표시

**검증 방법**:
- Performance 테스트: API 응답 시간 측정
- E2E 테스트: 15초 timeout 시나리오 확인

---

### AC-5.3: API 실패 시 오류 상태 표시

**Given**: 사용자가 "진단 시작" 버튼을 클릭함
**When**: Claude API 호출이 실패 (rate limit, network error, timeout 등)
**Then**:
- 로딩 상태 종료
- 오류 메시지 표시 "진단 생성에 실패했습니다. 잠시 후 다시 시도해주세요."
- 사용자는 다시 시도 가능

**검증 방법**:
- E2E 테스트: Mock API 실패 응답 → 오류 메시지 확인

---

## 시나리오 6: Report Page 3개 카드 표시

### AC-6.1: 3개 카드 렌더링

**Given**: API가 성공적으로 3개 리포트를 반환함
**When**: `/report` 페이지가 로드됨
**Then**:
- RealityReport 카드 표시
- IncomeMap 카드 표시
- DecisionQuestions 카드 표시

**검증 방법**:
- E2E 테스트: Mock API 응답 → 3개 카드 렌더링 확인
- 수동 테스트: `/report` 접속하여 시각적 확인

---

### AC-6.2: RealityReport 카드 데이터 표시

**Given**: RealityReport 카드가 렌더링됨
**When**: 사용자가 카드를 확인
**Then**:
- TOP 3 경고(warnings)가 빨간색 배경 또는 테두리로 표시됨
- 2가지 가능한 방향(suggestions)이 초록색 배경 또는 테두리로 표시됨
- 리스트 형태로 표시됨

**검증 방법**:
- Visual 테스트: 색상 구분 확인
- E2E 테스트: 데이터 매핑 확인

---

### AC-6.3: IncomeMap 카드 데이터 표시

**Given**: IncomeMap 카드가 렌더링됨
**When**: 사용자가 카드를 확인
**Then**:
- 3가지 수익화 가능 역할(roles) 표시
- 각 역할별 학습 격차(learningGaps) 표시
- 학습 격차는 노란색 배지 또는 경고 아이콘으로 강조

**검증 방법**:
- E2E 테스트: 3개 역할 및 학습 격차 렌더링 확인

---

### AC-6.4: DecisionQuestions 카드 데이터 표시

**Given**: DecisionQuestions 카드가 렌더링됨
**When**: 사용자가 카드를 확인
**Then**:
- 5가지 질문이 번호 매긴 리스트 (1-5)로 표시됨
- 1가지 위험한 가정(dangerous assumption)이 강조 박스로 표시됨
- 1가지 7일 실험(seven-day experiment)이 별도 섹션으로 표시됨

**검증 방법**:
- E2E 테스트: 5개 질문, 1개 가정, 1개 실험 렌더링 확인

---

## 시나리오 7: CTA 이메일 입력 및 검증

### AC-7.1: 유효한 이메일 형식 검증

**Given**: 사용자가 리포트를 확인하고 EmailCTA 섹션에 있음
**When**: 사용자가 이메일 입력 필드에 "test@example.com"을 입력
**Then**:
- Submit 버튼 활성화됨
- 오류 메시지 표시되지 않음

**검증 방법**:
- Unit 테스트: 이메일 검증 함수 테스트
- E2E 테스트: 유효한 이메일 입력 → 버튼 활성화 확인

---

### AC-7.2: 잘못된 이메일 형식 차단

**Given**: 사용자가 EmailCTA 섹션에 있음
**When**: 사용자가 이메일 입력 필드에 "invalid-email"을 입력
**Then**:
- Submit 버튼 비활성화됨
- 오류 메시지 "유효한 이메일 주소를 입력하세요." 표시

**검증 방법**:
- Unit 테스트: 이메일 검증 함수 테스트
- E2E 테스트: 잘못된 이메일 입력 → 오류 메시지 확인

---

### AC-7.3: 이메일 제출 및 성공 메시지 표시

**Given**: 사용자가 유효한 이메일을 입력함
**When**: 사용자가 Submit 버튼을 클릭
**Then**:
- 성공 메시지 "감사합니다! 곧 연락드리겠습니다." 표시
- Console.log에 이메일 출력 (MVP: 실제 저장 없음)

**검증 방법**:
- E2E 테스트: Submit 클릭 → 성공 메시지 확인
- 수동 테스트: Console.log 확인

---

## 시나리오 8: 모바일 반응형 디자인

### AC-8.1: 375px 화면에서 레이아웃 정상 표시

**Given**: 사용자가 모바일 디바이스 (375px width)에서 접속
**When**: 모든 페이지 (Landing, Input, Report)를 탐색
**Then**:
- 모든 요소가 화면에 맞게 표시됨
- 가로 스크롤 없음
- 텍스트가 잘리지 않음
- 버튼 터치 영역 최소 48px 확보

**검증 방법**:
- Responsive 테스트: Chrome DevTools (375px)
- 실제 모바일 디바이스 테스트 (iPhone SE, Galaxy S10 등)

---

### AC-8.2: 768px 이상 화면에서 레이아웃 개선

**Given**: 사용자가 태블릿 또는 데스크탑 (768px 이상)에서 접속
**When**: Report page를 확인
**Then**:
- 3개 카드가 2열 또는 3열 그리드로 표시됨 (선택)
- 또는 세로 스택 유지 (간단한 MVP 허용)

**검증 방법**:
- Responsive 테스트: Chrome DevTools (768px, 1024px)

---

## 시나리오 9: 전체 플로우 통합 테스트

### AC-9.1: End-to-End 사용자 여정

**Given**: 사용자가 브라우저를 열고 루트 URL (`/`)에 접속
**When**: 사용자가 다음 단계를 순서대로 진행:
1. Landing page에서 "3분 진단 시작" 클릭
2. Step 1 (Reality Check) 입력 → "다음" 클릭
3. Step 2 (Career Snapshot) 이력서 붙여넣기 → "붙여넣기 후 분석" 클릭 → 파싱 결과 확인 → "다음" 클릭
4. Step 3 (Idea Input) 아이디어 입력 또는 "없음" 선택 → "진단 시작" 클릭
5. 로딩 상태 확인 (최대 15초)
6. Report page에서 3개 카드 확인
7. EmailCTA에서 이메일 입력 → Submit 클릭

**Then**:
- 모든 단계가 오류 없이 완료됨
- 성공 메시지 "감사합니다! 곧 연락드리겠습니다." 표시

**검증 방법**:
- E2E 테스트: Playwright 또는 Cypress로 전체 플로우 자동화
- 수동 테스트: 실제 사용자 시나리오 재현

---

## 시나리오 10: 에러 핸들링

### AC-10.1: Claude API 장애 시 사용자 경험

**Given**: Claude API가 일시적으로 장애 상태
**When**: 사용자가 "진단 시작" 버튼을 클릭
**Then**:
- 재시도 로직 실행 (최대 2회)
- 최종 실패 시 오류 메시지 표시 "진단 생성에 실패했습니다. 잠시 후 다시 시도해주세요."
- 사용자는 입력 데이터를 잃지 않고 다시 시도 가능

**검증 방법**:
- Integration 테스트: Mock API 실패 시나리오
- 수동 테스트: Network throttling으로 재현

---

### AC-10.2: Timeout 시 명확한 피드백

**Given**: Claude API 호출이 10초를 초과
**When**: Timeout 발생
**Then**:
- 로딩 상태 종료
- 오류 메시지 "진단 생성 시간이 초과되었습니다. 다시 시도해주세요." 표시

**검증 방법**:
- E2E 테스트: API 응답 지연 Mock → Timeout 확인

---

## 시나리오 11: 접근성 (Accessibility)

### AC-11.1: 키보드 네비게이션 가능

**Given**: 사용자가 키보드만 사용하여 접속
**When**: Tab 키로 페이지를 탐색
**Then**:
- 모든 인터랙티브 요소 (버튼, 입력 필드)에 포커스 가능
- 포커스 순서가 논리적임
- Enter 키로 버튼 클릭 가능

**검증 방법**:
- 수동 테스트: 키보드만 사용하여 전체 플로우 완료

---

### AC-11.2: ARIA 속성 적용

**Given**: 스크린 리더 사용자가 접속
**When**: 스크린 리더로 페이지를 탐색
**Then**:
- 모든 폼 필드에 `<label>` 연결됨
- 오류 메시지가 `aria-describedby`로 연결됨
- 버튼에 적절한 `aria-label` (필요 시)

**검증 방법**:
- 자동 테스트: axe-core 또는 Lighthouse 접근성 검사
- 수동 테스트: NVDA 또는 VoiceOver로 탐색

---

### AC-11.3: 색상 대비 WCAG AA 준수

**Given**: 시각 장애가 있는 사용자가 접속
**When**: 모든 텍스트 및 UI 요소를 확인
**Then**:
- 모든 텍스트가 WCAG AA 색상 대비 기준 (4.5:1) 충족
- 경고 (빨간색), 성공 (초록색) 메시지가 색상 외에도 아이콘 또는 텍스트로 구분됨

**검증 방법**:
- 자동 테스트: Lighthouse 접근성 점수 > 95
- 수동 테스트: WebAIM Contrast Checker

---

## 완료 정의 (Definition of Done)

### 기능 완료 (Functional Completeness)
- ✅ 모든 인수 기준 (AC-1.1 ~ AC-11.3) 통과
- ✅ E2E 테스트 자동화 완료 (주요 시나리오)
- ✅ 수동 테스트로 전체 플로우 검증 완료

### 품질 기준 (Quality Gates)
- ✅ TypeScript 컴파일 오류 없음
- ✅ ESLint 경고 없음
- ✅ Prettier 포맷 적용
- ✅ Lighthouse Performance > 90
- ✅ Lighthouse Accessibility > 95
- ✅ 모든 주요 브라우저에서 정상 작동 (Chrome, Safari, Firefox)

### 배포 준비 (Deployment Readiness)
- ✅ `.env.local` 환경 변수 설정 완료 (`ANTHROPIC_API_KEY`)
- ✅ Vercel에 배포 성공
- ✅ Production 환경에서 전체 플로우 테스트 완료

---

**참고**: 이 인수 기준은 MVP 범위에 맞춰 작성되었으며, 추후 기능 추가 시 업데이트가 필요합니다.
