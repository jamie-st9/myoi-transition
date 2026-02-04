# MyOi TRANSITION – Insight Platform 구조 문서

**프로젝트 아키텍처 및 디렉토리 구조 정의**

---

## 전체 아키텍처 개요

### 아키텍처 유형

**Modular Monolithic (모듈형 모노리스)**

MVP 단계에서는 단일 Next.js 애플리케이션으로 구성하되, 기능별 모듈을 명확히 분리하여 향후 확장 가능성을 확보합니다.

### 아키텍처 설계 원칙

1. **Mobile-First**: 모바일 환경 우선 설계, 데스크톱은 확장형
2. **Serverless-First**: Vercel Serverless Functions로 백엔드 로직 처리
3. **API-Driven**: Claude API를 핵심 AI 엔진으로 활용
4. **Stateless**: 세션 기반 임시 저장, DB 미사용 (MVP)
5. **Component-Driven**: shadcn/ui 기반 재사용 가능 컴포넌트

### 시스템 구성도

```
사용자 (Mobile/Desktop)
   ↓
Next.js 15 App Router (Frontend + API Routes)
   ↓
Vercel Serverless Functions (Backend Logic)
   ↓
Claude API (Anthropic) - 리포트 생성
   ↓
Vercel Edge Cache (응답 캐싱)
```

---

## 디렉토리 구조 및 모듈 관계

### 전체 디렉토리 구조

```
project001/
├── src/
│   ├── app/                    # Next.js App Router (페이지 및 API)
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # Landing Page
│   │   ├── globals.css         # Global CSS (Tailwind 포함)
│   │   ├── input/
│   │   │   └── page.tsx        # 다단계 입력 폼
│   │   ├── report/
│   │   │   └── page.tsx        # 3-Card Report 결과
│   │   └── api/
│   │       ├── generate/
│   │       │   └── route.ts    # Claude API 통합
│   │       └── session/
│   │           └── route.ts    # 세션 관리 (임시)
│   ├── components/
│   │   ├── ui/                 # shadcn/ui 컴포넌트
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── progress.tsx
│   │   ├── landing/            # Landing Page 전용 컴포넌트
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   └── CTAButton.tsx
│   │   ├── input/              # 입력 폼 컴포넌트
│   │   │   ├── RealityCheck.tsx
│   │   │   ├── CareerSnapshot.tsx
│   │   │   ├── IdeaInput.tsx
│   │   │   └── ProgressIndicator.tsx
│   │   └── report/             # Report 카드 컴포넌트
│   │       ├── RealityReport.tsx
│   │       ├── IncomeMap.tsx
│   │       ├── DecisionQuestions.tsx
│   │       └── CTASection.tsx
│   ├── lib/
│   │   ├── prompts/            # Claude API 프롬프트
│   │   │   ├── reality-report.ts
│   │   │   ├── income-map.ts
│   │   │   └── decision-questions.ts
│   │   ├── types/              # TypeScript 타입 정의
│   │   │   ├── user-input.ts
│   │   │   ├── report.ts
│   │   │   └── api-response.ts
│   │   ├── utils/              # 유틸리티 함수
│   │   │   ├── session.ts      # 세션 관리
│   │   │   ├── validation.ts   # 입력 검증
│   │   │   └── formatting.ts   # 데이터 포맷팅
│   │   └── constants/          # 상수 정의
│   │       └── config.ts       # 앱 설정
│   └── styles/
│       └── fonts/              # 커스텀 폰트 (필요 시)
├── public/                     # 정적 자산
│   ├── images/
│   │   └── hero-bg.svg
│   └── favicon.ico
├── designs/                    # Pencil 디자인 파일 및 스크린샷 백업
│   ├── myoi-transition.pen    # 6개 화면 UI 디자인 (Landing, Step 1-3, Loading, Report)
│   └── screenshots/           # 디자인 스크린샷 백업
├── .moai/                      # MoAI 설정
│   ├── config/
│   ├── project/
│   └── specs/
├── .env.local                  # 환경 변수 (로컬)
├── .env.production             # 환경 변수 (프로덕션)
├── .gitignore
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 핵심 모듈 설명

### 1. App Router (`src/app/`)

Next.js 15 App Router를 사용하여 파일 기반 라우팅 구현.

#### **페이지 구조**

1. **`layout.tsx`** (루트 레이아웃)
   - 목적: 전체 앱의 공통 레이아웃
   - 포함: 메타 태그, 폰트, 글로벌 CSS
   - 특징: 모바일 viewport 설정

2. **`page.tsx`** (Landing Page)
   - 목적: 제품 소개 및 CTA
   - 컴포넌트: HeroSection, SocialProof, CTAButton
   - 라우트: `/`

3. **`input/page.tsx`** (입력 폼)
   - 목적: 3단계 입력 수집
   - 컴포넌트: RealityCheck, CareerSnapshot, IdeaInput
   - 라우트: `/input`
   - 상태 관리: React useState (세션 저장 연동)

4. **`report/page.tsx`** (리포트)
   - 목적: 3장 카드 결과 표시
   - 컴포넌트: RealityReport, IncomeMap, DecisionQuestions
   - 라우트: `/report`
   - 데이터: URL Query 또는 세션에서 로드

#### **API Routes**

1. **`api/generate/route.ts`**
   - 목적: Claude API 호출 및 리포트 생성
   - 입력: 사용자 입력 데이터 (JSON)
   - 출력: 3장 카드 데이터 (JSON)
   - 처리: Claude API 2-3개 프롬프트 순차 호출

2. **`api/session/route.ts`** (선택)
   - 목적: 세션 기반 임시 저장
   - 구현: Vercel KV 또는 Cookie 기반
   - 용도: 입력 중 새로고침 시 복원

---

### 2. Components (`src/components/`)

재사용 가능한 UI 컴포넌트 모음.

#### **`ui/` (shadcn/ui)**

- 목적: 기본 UI 컴포넌트 라이브러리
- 출처: shadcn/ui CLI로 생성
- 커스터마이징: Tailwind CSS 테마 적용

**주요 컴포넌트**:
- `button.tsx`: Primary/Secondary CTA 버튼
- `card.tsx`: 리포트 카드 컨테이너
- `input.tsx`, `textarea.tsx`: 입력 필드
- `progress.tsx`: 단계별 진행률 표시

#### **`landing/`**

1. **`HeroSection.tsx`**
   - 목적: 메인 히어로 섹션
   - 내용: 헤드라인, 서브헤드라인, CTA 버튼
   - 스타일: 모바일 우선, 그라데이션 배경

2. **`SocialProof.tsx`**
   - 목적: 사회적 증거 (베타 피드백)
   - 내용: 익명 사용자 후기 3-5개
   - 데이터: 정적 JSON 파일

3. **`CTAButton.tsx`**
   - 목적: "3분 진단 시작" 버튼
   - 동작: `/input`으로 라우팅
   - 스타일: 강조 색상, 호버 효과

#### **`input/`**

1. **`RealityCheck.tsx`**
   - 목적: 현실 제약 입력
   - 입력: 투입시간, 손실금액, 실패범위, 불가조건
   - UI: 라디오 버튼 + 텍스트 입력
   - 검증: 필수 입력 체크

2. **`CareerSnapshot.tsx`**
   - 목적: 이력서 입력 및 파싱
   - 입력: Textarea로 이력서 붙여넣기
   - 처리: Claude API 호출 → 직무/역할 추출
   - UI: 로딩 스피너, 확인/수정 버튼

3. **`IdeaInput.tsx`**
   - 목적: 아이디어 입력 (선택)
   - 입력: 한 줄 요약 또는 "없음"
   - UI: 조건부 렌더링

4. **`ProgressIndicator.tsx`**
   - 목적: 3단계 진행 상태 표시
   - UI: 스텝 인디케이터 (1/3, 2/3, 3/3)
   - 스타일: Tailwind CSS 커스텀

#### **`report/`**

1. **`RealityReport.tsx`**
   - 목적: Reality Report 카드
   - 내용: 하면 안 되는 선택 TOP3, 가능한 방향 2개
   - 스타일: 경고 색상 (빨강), 제안 색상 (초록)

2. **`IncomeMap.tsx`**
   - 목적: Career → Income Map 카드
   - 내용: 수익 전환 역할 3가지, 새로 배울 영역
   - 스타일: 리스트 형식, 아이콘 강조

3. **`DecisionQuestions.tsx`**
   - 목적: Decision Questions 카드
   - 내용: 질문 5개, 위험한 가정 1개, 7일 실험 1개
   - 스타일: 번호 매기기, 하이라이트

4. **`CTASection.tsx`**
   - 목적: 14일 가이드 신청 CTA
   - 입력: 이메일 입력 폼
   - 동작: 이메일 수집 API 호출

---

### 3. Library (`src/lib/`)

비즈니스 로직 및 유틸리티.

#### **`prompts/`**

Claude API 프롬프트 템플릿.

1. **`reality-report.ts`**
   - 목적: Reality Report 생성 프롬프트
   - 입력: RealityCheck 데이터
   - 출력: JSON 형식 (warnings, suggestions)

2. **`income-map.ts`**
   - 목적: Career → Income Map 생성
   - 입력: CareerSnapshot 데이터
   - 출력: JSON 형식 (income_roles, learning_gaps)

3. **`decision-questions.ts`**
   - 목적: Decision Questions 생성
   - 입력: RealityCheck + Idea 데이터
   - 출력: JSON 형식 (questions, assumptions, experiment)

#### **`types/`**

TypeScript 타입 정의.

1. **`user-input.ts`**
   ```typescript
   export interface RealityCheckInput {
     weeklyHours: string;
     budgetLimit: string;
     failureTolerance: string;
     absoluteConstraints: string;
   }

   export interface CareerSnapshotInput {
     resumeText: string;
     parsedCareer?: {
       roles: string[];
       skills: string[];
       repeatTasks: string[];
     };
   }

   export interface IdeaInput {
     hasIdea: boolean;
     ideaSummary?: string;
   }
   ```

2. **`report.ts`**
   ```typescript
   export interface RealityReport {
     warnings: string[];
     suggestions: string[];
   }

   export interface IncomeMap {
     incomeRoles: string[];
     learningGaps: string[];
   }

   export interface DecisionQuestions {
     questions: string[];
     dangerousAssumption: string;
     sevenDayExperiment: string;
   }
   ```

3. **`api-response.ts`**
   ```typescript
   export interface GenerateReportResponse {
     realityReport: RealityReport;
     incomeMap: IncomeMap;
     decisionQuestions: DecisionQuestions;
   }
   ```

#### **`utils/`**

1. **`session.ts`**
   - 목적: 세션 관리 (Cookie 또는 Vercel KV)
   - 함수: `saveSession()`, `loadSession()`, `clearSession()`

2. **`validation.ts`**
   - 목적: 입력 검증
   - 함수: `validateRealityCheck()`, `validateCareerSnapshot()`

3. **`formatting.ts`**
   - 목적: 데이터 포맷팅
   - 함수: `formatResumeText()`, `formatReportCard()`

#### **`constants/`**

1. **`config.ts`**
   ```typescript
   export const APP_CONFIG = {
     name: 'MyOi TRANSITION',
     version: '1.0.0',
     claudeApiUrl: 'https://api.anthropic.com/v1/messages',
     reportTimeout: 15000, // 15초
     maxResumeLength: 5000, // 5000자
   };
   ```

---

## 외부 시스템 연동 방법

### 1. Claude API (Anthropic)

**연동 방식**: REST API (POST)

**엔드포인트**: `https://api.anthropic.com/v1/messages`

**인증**: Bearer Token (환경 변수 `ANTHROPIC_API_KEY`)

**요청 예시**:
```typescript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY!,
    'anthropic-version': '2023-06-01',
  },
  body: JSON.stringify({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  }),
});
```

**응답 처리**: JSON 파싱 후 TypeScript 타입 변환

**에러 처리**:
- 타임아웃: 15초 초과 시 재시도 (최대 2회)
- API 오류: 4xx/5xx 응답 시 사용자 친화적 메시지 표시
- Rate Limit: 429 응답 시 대기 후 재시도

### 2. Vercel Serverless Functions

**목적**: API Routes 실행 환경

**특징**:
- 자동 확장 (Auto-scaling)
- 10초 실행 시간 제한 (Hobby Plan)
- 환경 변수 자동 주입

**배포**: `vercel deploy` 또는 Git Push 자동 배포

### 3. Vercel Edge Cache (선택)

**목적**: 동일한 입력에 대한 응답 캐싱

**설정**: `next.config.ts`에서 캐시 헤더 설정

```typescript
export default {
  async headers() {
    return [
      {
        source: '/api/generate',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};
```

---

## 데이터 흐름 및 상태 관리

### 데이터 플로우

```
1. 사용자 입력 (RealityCheck)
   ↓
2. React State (useState)
   ↓
3. 세션 저장 (Cookie/KV) - 선택
   ↓
4. CareerSnapshot 입력 → Claude API 파싱
   ↓
5. IdeaInput (선택)
   ↓
6. 전체 데이터 → /api/generate POST
   ↓
7. Claude API 3회 호출 (순차 또는 병렬)
   - reality-report.ts
   - income-map.ts
   - decision-questions.ts
   ↓
8. 응답 통합 → JSON 반환
   ↓
9. /report 페이지에서 렌더링
```

### 상태 관리 전략

**MVP 단계**: React `useState` + URL Query Parameters

- 입력 단계: `useState`로 로컬 상태 관리
- 페이지 이동: URL Query로 데이터 전달
- 리포트: `useSearchParams()`로 데이터 로드

**향후 확장**: Zustand 또는 Redux Toolkit

---

## 아키텍처 결정 배경 및 제약

### 설계 결정 사항

#### 1. Next.js App Router 선택
- **이유**: React Server Components로 초기 로딩 성능 향상
- **제약**: Client Component 사용 시 `'use client'` 명시 필요

#### 2. Serverless Functions 채택
- **이유**: 인프라 관리 불필요, 자동 확장
- **제약**: 실행 시간 10초 제한 (Hobby Plan)

#### 3. DB 미사용 (MVP)
- **이유**: 개발 속도 우선, 세션 기반으로 충분
- **제약**: 사용자 데이터 영구 저장 불가

#### 4. Tailwind CSS + shadcn/ui
- **이유**: 빠른 프로토타이핑, 일관된 디자인
- **제약**: 커스텀 디자인 시 추가 작업 필요

#### 5. Claude API 단일 의존
- **이유**: GPT-4 대비 비용 효율적, 한국어 성능 우수
- **제약**: API 장애 시 서비스 중단 위험

### 비기능 요구사항 (NFR)

1. **성능**:
   - 리포트 생성: 10초 이내
   - Lighthouse 점수: 모바일 90+ 목표

2. **가용성**:
   - Vercel 99.9% SLA 의존
   - Claude API 장애 시 재시도 로직

3. **확장성**:
   - 동시 사용자 100명까지 무리 없이 처리
   - Vercel Auto-scaling으로 자동 대응

4. **보안**:
   - HTTPS 전용 (Vercel 자동 제공)
   - API Key 환경 변수 관리
   - 입력 검증 (XSS, SQL Injection 방지)

5. **유지보수성**:
   - TypeScript 엄격 모드
   - ESLint + Prettier 코드 스타일
   - 컴포넌트별 단위 테스트 (Jest)

---

## 향후 확장 고려 사항

### Phase 2: DB 도입 (Supabase)

- 사용자 인증 및 로그인
- 리포트 히스토리 저장
- 유료 결제 사용자 관리

### Phase 3: Microservices 분리

- 리포트 생성 서비스 분리 (독립 API)
- 이메일 발송 서비스 분리 (Resend)
- 결제 서비스 통합 (Stripe)

---

**문서 버전**: 1.0.0
**작성일**: 2026-02-03
**작성자**: Jamie
**최종 수정일**: 2026-02-03
