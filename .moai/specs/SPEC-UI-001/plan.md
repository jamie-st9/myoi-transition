# SPEC-UI-001 구현 계획

## 작업 분해 (Task Decomposition)

### 우선순위 높음 (Primary Goals)

#### Phase 1: 프로젝트 설정 및 기본 구조
**목표**: Next.js 프로젝트 초기화 및 개발 환경 설정

**작업 순서**:
1. Next.js 15 프로젝트 생성 (`npx create-next-app@latest`)
   - TypeScript, Tailwind CSS, App Router 활성화
   - pnpm 설정

2. shadcn/ui 설정
   - `npx shadcn-ui@latest init`
   - 필요 컴포넌트: Button, Input, Textarea, Card, Progress

3. 의존성 설치
   - `@anthropic-ai/sdk` (Claude API)
   - `zod` (스키마 검증)
   - 개발 도구: `prettier`, `eslint`, `typescript`

4. 디렉토리 구조 생성
   - `src/app/`, `src/components/`, `src/lib/` 구조
   - `src/lib/prompts/`, `src/lib/types/`, `src/lib/utils/` 하위 디렉토리

**파일 목록**:
- `package.json` (의존성 정의)
- `tsconfig.json` (TypeScript 설정)
- `tailwind.config.js` (Tailwind 설정)
- `components.json` (shadcn/ui 설정)
- `.env.local` (환경 변수 템플릿)

**완료 기준**:
- `pnpm dev` 실행 시 Next.js 개발 서버 정상 작동
- shadcn/ui 컴포넌트 import 가능
- TypeScript 컴파일 오류 없음

---

#### Phase 2: 타입 정의 및 프롬프트 작성
**목표**: TypeScript 인터페이스 및 Claude API 프롬프트 준비

**작업 순서**:
1. 입력 타입 정의 (`src/lib/types/input.ts`)
   - `RealityCheckInput` 인터페이스
   - `CareerSnapshotInput` 인터페이스
   - `IdeaInput` 인터페이스
   - `CompleteInput` (전체 입력 통합)

2. 리포트 타입 정의 (`src/lib/types/report.ts`)
   - `RealityReport` 인터페이스 (warnings, suggestions)
   - `IncomeMap` 인터페이스 (roles, learningGaps)
   - `DecisionQuestions` 인터페이스 (questions, assumption, experiment)
   - `CompleteReport` (3개 리포트 통합)

3. Claude API 프롬프트 작성
   - `src/lib/prompts/reality-report.ts`: TOP 3 경고, 2 방향 생성 프롬프트
   - `src/lib/prompts/income-map.ts`: 수익화 역할, 학습 격차 생성 프롬프트
   - `src/lib/prompts/decision-questions.ts`: 5 질문, 1 가정, 1 실험 생성 프롬프트

4. 검증 유틸리티 (`src/lib/utils/validation.ts`)
   - 이메일 검증 함수
   - 입력 필드 검증 함수

**파일 목록**:
- `src/lib/types/input.ts`
- `src/lib/types/report.ts`
- `src/lib/prompts/reality-report.ts`
- `src/lib/prompts/income-map.ts`
- `src/lib/prompts/decision-questions.ts`
- `src/lib/utils/validation.ts`

**완료 기준**:
- 모든 타입 정의가 명확하고 TypeScript 오류 없음
- 프롬프트가 한국어로 작성되고 JSON schema 강제 포함
- 검증 함수가 유닛 테스트 가능한 형태

---

#### Phase 3: Landing Page 구현
**목표**: 루트 경로에 Hero Section 및 CTA 표시

**작업 순서**:
1. Layout 설정 (`src/app/layout.tsx`)
   - 메타데이터 (title, description)
   - 폰트 최적화 (`next/font`)
   - Tailwind CSS import

2. Landing Page (`src/app/page.tsx`)
   - Server Component로 구현
   - Hero 컴포넌트 import 및 렌더링

3. Hero 컴포넌트 (`src/components/landing/Hero.tsx`)
   - Headline: "40-50대, 이제 '망하지 않는' 전환을 시작하세요"
   - Subheadline: 가치 제안
   - CTA Button: "3분 진단 시작" → `/input` 링크

**파일 목록**:
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/landing/Hero.tsx`

**완료 기준**:
- `/` 접속 시 Hero Section 렌더링
- CTA 버튼 클릭 시 `/input`으로 이동
- 모바일 (375px)에서 레이아웃 깨지지 않음

---

#### Phase 4: Multi-Step Input Form 구현
**목표**: 3단계 입력 폼 및 상태 관리

**작업 순서**:
1. Input Page (`src/app/input/page.tsx`)
   - Client Component (`"use client"`)
   - 현재 step, 입력 값, 검증 오류 상태 관리 (`useState`)
   - ProgressIndicator, RealityCheck, CareerSnapshot, IdeaInput 조건부 렌더링

2. ProgressIndicator (`src/components/input/ProgressIndicator.tsx`)
   - 현재 step 표시 ("1/3", "2/3", "3/3")
   - 진행률 바 (선택)

3. RealityCheck 컴포넌트 (`src/components/input/RealityCheck.tsx`)
   - 주당 시간, 예산, 실패 감내: Radio buttons (shadcn/ui RadioGroup)
   - 절대 제약: Textarea (shadcn/ui Textarea)
   - "다음" 버튼: 필수 필드 검증 후 활성화

4. CareerSnapshot 컴포넌트 (`src/components/input/CareerSnapshot.tsx`)
   - Textarea (이력서 붙여넣기)
   - "붙여넣기 후 분석" 버튼
   - Claude API 호출 (간단한 파싱 프롬프트)
   - 로딩 상태 및 파싱 결과 표시

5. IdeaInput 컴포넌트 (`src/components/input/IdeaInput.tsx`)
   - Text input (아이디어 설명)
   - "아이디어 없음" Toggle (shadcn/ui Switch)
   - "진단 시작" 버튼

**파일 목록**:
- `src/app/input/page.tsx`
- `src/components/input/ProgressIndicator.tsx`
- `src/components/input/RealityCheck.tsx`
- `src/components/input/CareerSnapshot.tsx`
- `src/components/input/IdeaInput.tsx`

**완료 기준**:
- 3단계 폼 전환 정상 작동
- 각 단계별 검증 로직 작동
- CareerSnapshot에서 Claude API 파싱 성공
- "진단 시작" 버튼 클릭 시 API 호출 준비

---

#### Phase 5: Claude API Integration (API Route)
**목표**: `/api/generate` 엔드포인트 구현 및 3개 리포트 생성

**작업 순서**:
1. API Route 생성 (`src/app/api/generate/route.ts`)
   - POST 메서드 처리
   - Request body에서 입력 데이터 추출
   - Anthropic SDK 초기화 (`ANTHROPIC_API_KEY`)

2. 3개 프롬프트 실행
   - `generateRealityReport()`: reality-report 프롬프트 실행
   - `generateIncomeMap()`: income-map 프롬프트 실행
   - `generateDecisionQuestions()`: decision-questions 프롬프트 실행
   - `Promise.all()`로 병렬 실행 (선택)

3. JSON Schema 강제
   - 각 프롬프트에 `response_format: { type: "json_object" }` 추가
   - JSON 파싱 및 타입 검증 (zod)

4. 에러 핸들링
   - Timeout (10초)
   - Retry (최대 2회)
   - 에러 응답 (`{ error: string }`)

5. 응답 반환
   - `{ realityReport, incomeMap, decisionQuestions }` JSON

**파일 목록**:
- `src/app/api/generate/route.ts`
- `src/lib/utils/api.ts` (API 헬퍼 함수)

**완료 기준**:
- `/api/generate` POST 요청 시 3개 리포트 반환
- JSON schema 검증 통과
- Timeout 및 Retry 로직 작동
- 에러 케이스 처리 (API 키 누락, rate limit 등)

---

#### Phase 6: Report Page 구현
**목표**: 3개 카드 컴포넌트로 리포트 표시

**작업 순서**:
1. Report Page (`src/app/report/page.tsx`)
   - Client Component
   - API 응답 데이터를 props로 전달 (또는 전역 상태)
   - 3개 카드 컴포넌트 렌더링

2. RealityReport 카드 (`src/components/report/RealityReport.tsx`)
   - Warnings: 빨간색 배경, 리스트 형태
   - Suggestions: 초록색 배경, 리스트 형태

3. IncomeMap 카드 (`src/components/report/IncomeMap.tsx`)
   - 3개 역할 표시
   - 학습 격차: 노란색 배지 또는 경고 아이콘

4. DecisionQuestions 카드 (`src/components/report/DecisionQuestions.tsx`)
   - 5개 질문: 번호 매긴 리스트
   - Dangerous Assumption: 강조 박스
   - Seven-Day Experiment: 별도 섹션

5. 모바일 레이아웃
   - 375px 이상: 세로 스택
   - 768px 이상: 2열 또는 3열 그리드 (선택)

**파일 목록**:
- `src/app/report/page.tsx`
- `src/components/report/RealityReport.tsx`
- `src/components/report/IncomeMap.tsx`
- `src/components/report/DecisionQuestions.tsx`

**완료 기준**:
- `/report` 접속 시 3개 카드 렌더링
- 각 카드 데이터가 올바르게 표시
- 모바일에서 레이아웃 정상

---

#### Phase 7: CTA & Email Collection
**목표**: 14일 전환 프로그램 CTA 및 이메일 입력

**작업 순서**:
1. EmailCTA 컴포넌트 (`src/components/report/EmailCTA.tsx`)
   - CTA Headline
   - Email input (shadcn/ui Input)
   - Submit button (shadcn/ui Button)
   - 이메일 검증 로직
   - Submit 시 성공 메시지 표시

2. Report Page에 EmailCTA 추가
   - 3개 카드 하단에 렌더링

3. 폼 제출 처리
   - MVP: console.log만 출력 (실제 저장 없음)
   - 추후: Vercel KV 또는 외부 서비스 연동

**파일 목록**:
- `src/components/report/EmailCTA.tsx`
- `src/app/report/page.tsx` (EmailCTA import 추가)

**완료 기준**:
- 이메일 입력 및 검증 작동
- Submit 시 성공 메시지 표시
- Console.log에 이메일 출력 확인

---

### 우선순위 중간 (Secondary Goals)

#### Phase 8: 폴리싱 (반응형, 로딩 상태, 에러 처리)
**목표**: UX 개선 및 엣지 케이스 처리

**작업 순서**:
1. 반응형 디자인 검증
   - 375px (모바일), 768px (태블릿), 1024px (데스크탑) 테스트
   - 모든 페이지에서 레이아웃 검증

2. 로딩 상태 개선
   - Skeleton UI (선택)
   - Spinner 컴포넌트 통일

3. 에러 상태 개선
   - Error Boundary (`src/app/error.tsx`)
   - 사용자 친화적 오류 메시지

4. 접근성 (a11y) 검증
   - 키보드 네비게이션 가능 여부
   - ARIA 속성 검증
   - 색상 대비 검증 (WCAG AA)

5. 성능 최적화
   - Lighthouse 점수 (Performance, Accessibility, Best Practices, SEO)
   - 이미지 최적화 (Next.js Image)
   - 폰트 최적화 (next/font)

**파일 목록**:
- `src/app/error.tsx`
- `src/app/loading.tsx` (선택)
- `src/components/ui/Skeleton.tsx` (선택)

**완료 기준**:
- Lighthouse Performance > 90
- Lighthouse Accessibility > 95
- 모든 주요 브라우저에서 정상 작동 (Chrome, Safari, Firefox)

---

## 위험 분석 (Risk Analysis)

### 기술적 위험

**R1: Claude API Timeout**
- **설명**: Claude API 호출이 10초를 초과하여 timeout 발생
- **영향**: 사용자 경험 저하, 진단 실패
- **완화 전략**:
  - Timeout 설정 (10초)
  - Retry 로직 (최대 2회)
  - 사용자에게 명확한 오류 메시지 제공
  - 추후: 캐싱 또는 백그라운드 처리 고려

**R2: JSON Parsing 실패**
- **설명**: Claude API 응답이 예상한 JSON 형식과 다름
- **영향**: 리포트 생성 실패
- **완화 전략**:
  - `response_format: { type: "json_object" }` 강제
  - zod로 응답 검증
  - Fallback 응답 제공 (최소한의 기본 리포트)

**R3: 이력서 파싱 정확도**
- **설명**: Claude API가 이력서에서 역할/스킬을 잘못 추출
- **영향**: 부정확한 진단 결과
- **완화 전략**:
  - 프롬프트 개선 (few-shot examples 추가)
  - 사용자 피드백 수집 ("파싱 결과가 정확합니까?")
  - 추후: 수동 수정 기능 추가

**R4: Vercel Serverless Function 제약**
- **설명**: Vercel Free Tier에서 실행 시간 제한 (10초)
- **영향**: API Route timeout
- **완화 전략**:
  - Pro Tier로 업그레이드 (필요 시)
  - 병렬 처리로 실행 시간 단축
  - Edge Function 고려 (추후)

### 비기술적 위험

**R5: 사용자 입력 품질**
- **설명**: 사용자가 불충분한 이력서를 붙여넣기 (예: "개발자")
- **영향**: 부정확한 진단
- **완화 전략**:
  - 최소 글자 수 제한 (100자)
  - 입력 가이드 제공 ("최소 3개 문장 이상 작성하세요")
  - 예시 제공 ("예: 백엔드 개발자로 5년 근무, Python/Django 사용...")

**R6: 한국어 출력 품질**
- **설명**: Claude API가 한국어 문법 오류 또는 부자연스러운 표현 생성
- **영향**: 사용자 신뢰도 저하
- **완화 전략**:
  - 프롬프트에 "자연스러운 한국어" 명시
  - 응답 예시 포함 (few-shot)
  - 추후: 사람 검토 단계 추가

---

## 의존성 목록 (Dependencies with Versions)

### Core Dependencies
- `next@15.1.3` - Next.js 프레임워크
- `react@19.0.0` - React 라이브러리
- `react-dom@19.0.0` - React DOM
- `typescript@5.7.2` - TypeScript

### UI & Styling
- `tailwindcss@4.0.0` - Tailwind CSS
- `@radix-ui/react-*` - shadcn/ui 기반 컴포넌트 (자동 설치)
- `class-variance-authority@0.7.1` - CVA (shadcn/ui 의존성)
- `clsx@2.1.1` - 클래스 병합 유틸리티
- `tailwind-merge@2.7.0` - Tailwind 클래스 병합

### AI Integration
- `@anthropic-ai/sdk@0.38.0` - Claude API SDK

### Validation
- `zod@3.24.1` - 스키마 검증

### Development
- `@types/node@22.10.5` - Node.js 타입 정의
- `@types/react@19.0.6` - React 타입 정의
- `@types/react-dom@19.0.3` - React DOM 타입 정의
- `eslint@9.18.0` - Linter
- `eslint-config-next@15.1.3` - Next.js ESLint 설정
- `prettier@3.4.2` - 코드 포매터
- `prettier-plugin-tailwindcss@0.6.10` - Tailwind Prettier 플러그인

---

## 마일스톤 (Milestones)

### Milestone 1: 개발 환경 설정 완료
- **완료 조건**: Phase 1-2 완료
- **산출물**: 프로젝트 초기화, 타입 정의, 프롬프트 작성
- **종속성**: 없음

### Milestone 2: 기본 UI 플로우 완성
- **완료 조건**: Phase 3-4 완료
- **산출물**: Landing → Input Form 플로우 작동
- **종속성**: Milestone 1

### Milestone 3: Claude API 통합 완료
- **완료 조건**: Phase 5 완료
- **산출물**: `/api/generate` 엔드포인트 작동
- **종속성**: Milestone 1

### Milestone 4: 전체 플로우 완성
- **완료 조건**: Phase 6-7 완료
- **산출물**: Landing → Input → Report → CTA 전체 플로우
- **종속성**: Milestone 2, 3

### Milestone 5: MVP 배포 준비
- **완료 조건**: Phase 8 완료
- **산출물**: 반응형, 에러 처리, 접근성 검증 완료
- **종속성**: Milestone 4

---

## 기술적 접근 방식 (Technical Approach)

### 상태 관리
- **클라이언트 상태**: React `useState` (간단한 MVP로 충분)
- **서버 상태**: 없음 (DB 없음)
- **추후 고려**: Zustand 또는 Jotai (복잡도 증가 시)

### API 호출 패턴
- **클라이언트 → API Route → Claude API** 구조
- **병렬 처리**: `Promise.all()`로 3개 프롬프트 동시 실행 (선택)
- **Retry**: exponential backoff 없이 단순 재시도 (MVP)

### 스타일링 전략
- **Mobile-first**: 375px 기준 → 768px → 1024px breakpoints
- **Utility-first**: Tailwind CSS
- **컴포넌트 재사용**: shadcn/ui 기반

### 배포 전략
- **Vercel**: Next.js 네이티브 배포
- **환경 변수**: `ANTHROPIC_API_KEY` (Vercel Dashboard에서 설정)
- **도메인**: Vercel 기본 도메인 사용 (추후 커스텀 도메인)

---

## 다음 단계 (Next Steps)

1. **Phase 1 실행**: 프로젝트 초기화 및 의존성 설치
2. **타입 정의**: `src/lib/types/` 작성
3. **프롬프트 작성**: `src/lib/prompts/` 작성
4. **Landing Page 구현**: Phase 3 완료
5. **Input Form 구현**: Phase 4 완료
6. **API Route 구현**: Phase 5 완료
7. **Report Page 구현**: Phase 6-7 완료
8. **폴리싱**: Phase 8 완료
9. **배포**: Vercel에 배포 및 테스트

---

**참고**: 이 계획은 우선순위 기반으로 구성되었으며, 시간 예측은 포함하지 않았습니다. 각 Phase는 독립적으로 완료 가능하며, 필요 시 순서 조정이 가능합니다.
