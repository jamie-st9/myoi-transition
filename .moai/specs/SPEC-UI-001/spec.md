---
id: SPEC-UI-001
version: 1.1.0
status: completed
created: 2026-02-03
updated: 2026-02-03
author: Jamie
priority: high
---

## HISTORY
| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2026-02-03 | 1.0.0 | 초기 SPEC 작성 |
| 2026-02-03 | 1.1.0 | Pencil UI 반영, Gemini API 전환, 구현 완료 |

---

# SPEC-UI-001: MyOi TRANSITION MVP - Insight Platform

## 개요

40-50대 직장인을 위한 커리어 전환 진단 플랫폼 MVP 구현. 잘못된 커리어 전환 방지에 초점을 맞추며, 창업 지원은 범위 밖입니다.

**목표**: 3분 진단을 통해 현실적인 커리어 전환 방향성 제시 및 위험 요소 경고

**범위**: Landing → Reality Check → Career Snapshot → Idea (선택) → 3 Report Cards → CTA

---

## 환경 (Environment)

### 기술 스택
- **Frontend Framework**: Next.js 16 App Router with TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **AI Integration**: Google Gemini API via @google/generative-ai
- **Deployment**: Vercel Serverless Functions
- **Package Manager**: npm
- **Design**: Mobile-first responsive design

### 제약 사항
- MVP에서는 DB, 인증, 결제 기능 제외
- 서버리스 환경으로 stateless 아키텍처 필수
- Claude API 호출 시 10초 timeout 제한
- 모바일 우선 반응형 디자인 (최소 375px width 지원)

---

## 가정 (Assumptions)

1. **사용자 행동**:
   - 사용자는 3분 이내 입력을 완료할 의향이 있음
   - 이력서 붙여넣기 형식으로 경력 정보를 제공 가능
   - 모바일 환경에서 긴 텍스트 입력에 거부감이 적음

2. **기술적 가정**:
   - Claude API는 안정적으로 한국어 프롬프트 처리 가능
   - Vercel Serverless Function은 10초 내 Claude API 응답 처리 가능
   - shadcn/ui 컴포넌트는 Next.js 15 App Router와 호환

3. **비즈니스 가정**:
   - 사용자는 진단 결과 확인을 위해 이메일 주소 제공 의향 있음
   - 무료 진단만으로 충분한 가치 제공 가능 (유료 전환 없이)

---

## 요구사항 (Requirements)

### Module 1: Landing Page

**R1.1 - Hero Section 표시 (Ubiquitous)**
- **EARS**: 시스템은 **항상** 루트 URL 방문 시 가치 제안(value proposition)과 CTA 버튼을 포함한 hero section을 표시해야 한다.
- **세부사항**:
  - Headline: "40-50대, 이제 '망하지 않는' 전환을 시작하세요"
  - Subheadline: 잘못된 커리어 전환 방지 메시지
  - CTA Button: "3분 진단 시작" (prominent color, large touch target)
- **검증**: Landing page 렌더링 시 hero section 요소 존재 확인

**R1.2 - 빠른 초기 로딩 (Ubiquitous)**
- **EARS**: 시스템은 **항상** Server Component (RSC)를 사용하여 빠른 초기 로딩을 제공해야 한다.
- **세부사항**:
  - Landing page는 React Server Component로 구현
  - Static 또는 ISR 방식으로 pre-render
  - First Contentful Paint (FCP) < 1.5초 목표
- **검증**: Lighthouse 또는 WebPageTest로 FCP 측정

**R1.3 - CTA 버튼 네비게이션 (Event-Driven)**
- **EARS**: **WHEN** 사용자가 CTA 버튼을 클릭 **THEN** 시스템은 `/input` 페이지로 이동해야 한다.
- **세부사항**:
  - Next.js Link 컴포넌트 사용 (클라이언트 사이드 라우팅)
  - 버튼은 모바일에서 최소 48px 높이 확보 (접근성)
- **검증**: CTA 클릭 시 `/input` URL로 이동 확인

---

### Module 2: Multi-Step Input Form

**R2.1 - 3단계 입력 폼 표시 (Event-Driven)**
- **EARS**: **WHEN** 사용자가 `/input` 페이지에 진입 **THEN** 시스템은 progress indicator와 함께 3단계 폼을 표시해야 한다.
- **세부사항**:
  - Step 1: Reality Check
  - Step 2: Career Snapshot
  - Step 3: Idea Input
  - Progress indicator: "1/3", "2/3", "3/3" 표시
- **검증**: `/input` 페이지 렌더링 시 progress indicator 및 첫 번째 step 표시

**R2.2 - Reality Check 입력 (Step 1)**
- **EARS**: 시스템은 **항상** Reality Check 단계에서 주당 투입 가능 시간, 예산 한도, 실패 감내 수준, 절대 제약 조건 입력을 받아야 한다.
- **세부사항**:
  - 주당 시간: Radio buttons (5시간 미만, 5-10시간, 10-20시간, 20시간 이상)
  - 예산 한도: Radio buttons (100만원 미만, 100-500만원, 500-1000만원, 1000만원 이상)
  - 실패 감내: Radio buttons (낮음, 중간, 높음)
  - 절대 제약: Textarea (자유 입력, 예: "밤늦게 일 불가", "대면 미팅 제한")
- **검증**: 모든 필드 입력 후 "다음" 버튼 활성화

**R2.3 - Career Snapshot 입력 및 파싱 (Step 2)**
- **EARS**: **WHEN** 사용자가 이력서를 붙여넣기 **THEN** 시스템은 Claude API를 호출하여 역할(role)과 스킬(skill)을 추출해야 한다.
- **세부사항**:
  - Textarea: 최소 100자, 최대 2000자
  - "붙여넣기 후 분석" 버튼 클릭 시 Claude API 호출
  - 로딩 상태 표시 (spinner + "분석 중..." 메시지)
  - 파싱 결과: 역할(예: "백엔드 개발자"), 주요 스킬 3-5개 표시
- **검증**: 이력서 붙여넣기 → 파싱 결과 표시 확인

**R2.4 - Idea Input 입력 (Step 3)**
- **EARS**: 시스템은 **항상** Idea Input 단계에서 아이디어 1개 또는 "없음" 선택을 받아야 한다.
- **세부사항**:
  - Text input: 아이디어 설명 (선택)
  - Toggle button: "아이디어 없음" 선택 시 text input 비활성화
  - "아이디어 없음" 선택도 유효한 완료 상태로 인정
- **검증**: 아이디어 입력 또는 "없음" 선택 후 "진단 시작" 버튼 활성화

**R2.5 - 입력 검증 및 단계 전환 (State-Driven)**
- **EARS**: **IF** 현재 단계의 필수 입력이 완료되지 않음 **THEN** 시스템은 다음 단계 이동을 차단하고 오류 메시지를 표시해야 한다.
- **세부사항**:
  - 각 단계별 필수 필드 검증
  - 오류 메시지: 붉은색 텍스트로 필드 하단 표시
  - "다음" 버튼: 검증 실패 시 비활성화 (disabled state)
- **검증**: 필수 필드 누락 시 다음 단계 이동 차단 확인

**R2.6 - 클라이언트 상태 관리 (Ubiquitous)**
- **EARS**: 시스템은 **항상** React `useState`를 사용하여 폼 상태를 클라이언트에서 관리해야 한다.
- **세부사항**:
  - 현재 step (1-3)
  - 각 단계별 입력 값
  - 검증 오류 상태
  - 로딩 상태 (API 호출 중)
- **검증**: 브라우저 새로고침 전까지 입력 상태 유지 확인

---

### Module 3: Claude API Integration

**R3.1 - 3개 리포트 생성 API 호출 (Event-Driven)**
- **EARS**: **WHEN** 사용자가 모든 입력을 완료하고 "진단 시작" 버튼 클릭 **THEN** 시스템은 `/api/generate` 엔드포인트를 호출하여 3개 리포트를 생성해야 한다.
- **세부사항**:
  - API Route: `app/api/generate/route.ts` (Next.js API Route)
  - 입력: Reality Check, Career Snapshot, Idea Input 데이터
  - 출력: 3개 리포트 (Reality Report, Income Map, Decision Questions)
- **검증**: 입력 완료 후 API 호출 및 응답 수신 확인

**R3.2 - 3개 프롬프트 실행 (Ubiquitous)**
- **EARS**: 시스템은 **항상** 3개 별도 프롬프트를 사용하여 각 리포트를 생성해야 한다.
- **세부사항**:
  - Prompt 1: `src/lib/prompts/reality-report.ts` (TOP 3 don'ts, 2 possible directions)
  - Prompt 2: `src/lib/prompts/income-map.ts` (3 monetizable roles, learning gaps)
  - Prompt 3: `src/lib/prompts/decision-questions.ts` (5 questions, 1 dangerous assumption, 1 seven-day experiment)
  - 각 프롬프트는 JSON schema 강제 (structured output)
- **검증**: 3개 프롬프트 실행 및 JSON 응답 파싱 확인

**R3.3 - JSON Schema 강제 (Ubiquitous)**
- **EARS**: 시스템은 **항상** Claude API 호출 시 JSON schema를 강제하여 구조화된 출력을 받아야 한다.
- **세부사항**:
  - Anthropic SDK의 `response_format: { type: "json_object" }` 사용
  - 각 리포트별 TypeScript 인터페이스 정의
  - JSON 파싱 실패 시 재시도 로직 (최대 2회)
- **검증**: 응답이 정의된 TypeScript 인터페이스와 일치 확인

**R3.4 - 에러 핸들링 및 재시도 (Unwanted)**
- **EARS**: 시스템은 Claude API 호출 실패 시 **최대 2회까지만** 재시도해야 하며, 그 이후에도 실패 시 사용자에게 오류 메시지를 표시해야 한다.
- **세부사항**:
  - 재시도 조건: Network error, timeout, rate limit
  - 재시도 간격: 1초 (exponential backoff 없음, 간단한 MVP)
  - 최종 실패 시: "진단 생성에 실패했습니다. 잠시 후 다시 시도해주세요." 메시지
- **검증**: API 호출 실패 시 재시도 로직 및 오류 메시지 표시 확인

**R3.5 - Timeout 및 로딩 상태 (State-Driven)**
- **EARS**: **IF** Claude API 호출이 10초 이내 완료되지 않음 **THEN** 시스템은 timeout 처리하고 오류 메시지를 표시해야 한다.
- **세부사항**:
  - Timeout: 10초
  - 로딩 상태: Spinner + "진단 생성 중... (최대 10초 소요)" 메시지
  - Timeout 후: "진단 생성 시간이 초과되었습니다. 다시 시도해주세요." 메시지
- **검증**: 10초 이상 소요 시 timeout 처리 확인

**R3.6 - 한국어 출력 강제 (Ubiquitous)**
- **EARS**: 시스템은 **항상** Claude API 프롬프트에 한국어 출력을 명시하여 모든 리포트를 한국어로 생성해야 한다.
- **세부사항**:
  - 프롬프트 마지막에 "모든 응답은 한국어로 작성하세요." 명시
  - System message에도 언어 지정
- **검증**: 생성된 리포트가 한국어인지 확인

---

### Module 4: Report Display

**R4.1 - 3개 카드 표시 (Event-Driven)**
- **EARS**: **WHEN** API가 리포트 데이터를 반환 **THEN** 시스템은 `/report` 페이지에 3개 카드 컴포넌트를 표시해야 한다.
- **세부사항**:
  - Card 1: RealityReport 컴포넌트
  - Card 2: IncomeMap 컴포넌트
  - Card 3: DecisionQuestions 컴포넌트
  - 모바일에서 세로 스택 (vertical stack) 레이아웃
- **검증**: `/report` 페이지에 3개 카드 렌더링 확인

**R4.2 - RealityReport 카드 (Card 1)**
- **EARS**: 시스템은 **항상** RealityReport 카드에 TOP 3 경고(warnings)를 빨간색으로, 2가지 가능한 방향(suggestions)을 초록색으로 표시해야 한다.
- **세부사항**:
  - Warnings: 빨간색 배경 또는 테두리, 아이콘 (⚠️ 또는 유사)
  - Suggestions: 초록색 배경 또는 테두리, 아이콘 (✓ 또는 유사)
  - 리스트 형태로 표시 (순서 있는 목록)
- **검증**: Warnings와 Suggestions가 색상 구분되어 표시 확인

**R4.3 - IncomeMap 카드 (Card 2)**
- **EARS**: 시스템은 **항상** IncomeMap 카드에 3가지 수익화 가능 역할(roles)과 학습 격차(learning gaps) 경고를 표시해야 한다.
- **세부사항**:
  - Roles: 역할명 + 간단한 설명
  - Learning Gaps: 노란색 배지 또는 아이콘으로 경고 표시
  - 각 역할별 학습 격차 매핑
- **검증**: 3개 역할 및 학습 격차 경고 표시 확인

**R4.4 - DecisionQuestions 카드 (Card 3)**
- **EARS**: 시스템은 **항상** DecisionQuestions 카드에 5가지 질문, 1가지 위험한 가정(dangerous assumption), 1가지 7일 실험(seven-day experiment)을 표시해야 한다.
- **세부사항**:
  - Questions: 번호 매긴 리스트 (1-5)
  - Dangerous Assumption: 강조 표시 (진한 배경 또는 테두리)
  - Seven-Day Experiment: 박스 형태로 별도 섹션
- **검증**: 5개 질문, 1개 가정, 1개 실험 표시 확인

**R4.5 - 모바일 우선 레이아웃 (Ubiquitous)**
- **EARS**: 시스템은 **항상** 375px 이상의 모바일 화면에서 카드를 세로 스택으로 표시해야 한다.
- **세부사항**:
  - 카드 간격: 16px 또는 24px
  - 카드 너비: 100% (패딩 제외)
  - 데스크탑 (768px 이상): 2열 또는 3열 그리드 (선택)
- **검증**: 375px 화면에서 세로 스택 레이아웃 확인

**R4.6 - 스트리밍 지원 (Optional)**
- **EARS**: **가능하면** 시스템은 Claude API 스트리밍을 지원하여 리포트를 실시간으로 표시 제공해야 한다.
- **세부사항**:
  - Anthropic SDK의 streaming API 사용
  - 각 카드별 점진적 렌더링
  - MVP에서는 선택 기능 (우선순위 낮음)
- **검증**: 스트리밍 활성화 시 점진적 렌더링 확인

---

### Module 5: CTA & Email Collection

**R5.1 - CTA 표시 (Event-Driven)**
- **EARS**: **WHEN** 사용자가 리포트를 모두 확인 **THEN** 시스템은 "14일 전환 프로그램" CTA와 이메일 입력 폼을 표시해야 한다.
- **세부사항**:
  - CTA Headline: "지금 바로 14일 전환을 시작하세요"
  - Email input: placeholder "이메일 주소 입력"
  - Submit button: "무료로 시작하기"
- **검증**: 리포트 하단에 CTA 섹션 표시 확인

**R5.2 - 이메일 검증 (State-Driven)**
- **EARS**: **IF** 사용자가 입력한 이메일이 유효하지 않음 **THEN** 시스템은 submit을 차단하고 오류 메시지를 표시해야 한다.
- **세부사항**:
  - 검증: 이메일 형식 (정규식 또는 HTML5 validation)
  - 오류 메시지: "유효한 이메일 주소를 입력하세요."
  - Submit button: 검증 실패 시 비활성화
- **검증**: 잘못된 이메일 입력 시 submit 차단 확인

**R5.3 - 폼 제출 (Event-Driven)**
- **EARS**: **WHEN** 사용자가 유효한 이메일을 입력하고 submit 버튼 클릭 **THEN** 시스템은 폼 제출을 처리해야 한다 (MVP에서는 UI만 구현, 백엔드 저장 없음).
- **세부사항**:
  - Submit 시: 성공 메시지 표시 ("감사합니다! 곧 연락드리겠습니다.")
  - MVP에서는 실제 저장 없음 (추후 Vercel KV 또는 외부 서비스 연동)
  - Console.log로 이메일 출력 (개발 중 확인용)
- **검증**: Submit 클릭 시 성공 메시지 표시 및 console.log 확인

**R5.4 - 접근성 (Ubiquitous)**
- **EARS**: 시스템은 **항상** 이메일 입력 필드에 적절한 label 및 aria 속성을 제공해야 한다.
- **세부사항**:
  - `<label for="email">`: 이메일 주소
  - `aria-required="true"`
  - `aria-describedby`: 오류 메시지 ID 연결
- **검증**: 스크린 리더로 폼 탐색 가능 확인

---

## 명세 (Specifications)

### 아키텍처 설계

**디렉토리 구조**:
```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page (Server Component)
│   ├── input/
│   │   └── page.tsx        # Multi-step input form (Client Component)
│   ├── report/
│   │   └── page.tsx        # Report display (Client Component)
│   └── api/
│       └── generate/
│           └── route.ts    # Claude API integration (API Route)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── landing/
│   │   ├── Hero.tsx
│   │   └── CTA.tsx
│   ├── input/
│   │   ├── RealityCheck.tsx
│   │   ├── CareerSnapshot.tsx
│   │   ├── IdeaInput.tsx
│   │   └── ProgressIndicator.tsx
│   └── report/
│       ├── RealityReport.tsx
│       ├── IncomeMap.tsx
│       ├── DecisionQuestions.tsx
│       └── EmailCTA.tsx
├── lib/
│   ├── prompts/
│   │   ├── reality-report.ts
│   │   ├── income-map.ts
│   │   └── decision-questions.ts
│   ├── types/
│   │   ├── input.ts        # Input form types
│   │   └── report.ts       # Report types
│   ├── utils/
│   │   ├── validation.ts   # Form validation
│   │   └── api.ts          # API helpers
│   └── constants/
│       └── config.ts       # App config
```

**데이터 흐름**:
1. Landing Page (SSR/ISR) → CTA 클릭
2. Input Form (Client) → 3단계 입력 → "진단 시작" 클릭
3. API Route → Claude API 호출 (3 prompts) → JSON 응답
4. Report Page (Client) → 3개 카드 렌더링 → CTA

**보안 및 성능**:
- API Route에서 rate limiting (Vercel Edge Config 또는 middleware)
- Claude API 키는 환경 변수 (`ANTHROPIC_API_KEY`)로 관리
- 이미지 최적화: Next.js Image 컴포넌트 사용
- 폰트 최적화: `next/font` 사용

---

## 추적성 (Traceability)

**관련 문서**:
- `.moai/project/product.md` - 제품 요구사항 및 사용자 플로우
- `.moai/project/structure.md` - 디렉토리 구조 및 아키텍처
- `.moai/project/tech.md` - 기술 스택 및 라이브러리 버전

**태그**:
- `#mvp` - MVP 범위 기능
- `#landing` - Landing page 관련
- `#input-form` - 입력 폼 관련
- `#claude-api` - Claude API 통합
- `#report` - 리포트 표시
- `#cta` - CTA 및 이메일 수집
