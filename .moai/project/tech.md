# MyOi TRANSITION – Insight Platform 기술 문서

**기술 스택 및 개발 환경 정의**

---

## 기술 스택 개요

### Frontend

| 기술 | 버전 | 선택 이유 |
|------|------|-----------|
| **Next.js** | 15.1.3 (stable) | React Server Components, App Router, 자동 코드 분할 |
| **React** | 19.0.0 | 컴포넌트 기반 UI, 풍부한 생태계 |
| **TypeScript** | 5.7.3 | 타입 안정성, IDE 지원, 리팩토링 용이성 |
| **Tailwind CSS** | 4.0.0 | 유틸리티 우선, 빠른 프로토타이핑, 모바일 우선 |
| **shadcn/ui** | Latest | 접근성 높은 컴포넌트, Radix UI 기반 |

### Backend

| 기술 | 버전 | 선택 이유 |
|------|------|-----------|
| **Vercel Serverless Functions** | - | Next.js API Routes 자동 배포, 무료 티어 제공 |
| **Claude API (Anthropic)** | claude-3-5-sonnet-20241022 | 한국어 성능 우수, GPT-4 대비 비용 효율적 |

### Development & Build Tools

| 기술 | 버전 | 선택 이유 |
|------|------|-----------|
| **Node.js** | 20.18.3 LTS | 안정성, Vercel 기본 지원 |
| **pnpm** | 9.15.4 | npm/yarn 대비 빠른 설치, 디스크 절약 |
| **ESLint** | 9.18.0 | 코드 품질 유지 |
| **Prettier** | 3.4.2 | 일관된 코드 포맷팅 |

### Testing (향후)

| 기술 | 버전 | 목적 |
|------|------|------|
| **Jest** | 29.7.0 | 단위 테스트 |
| **React Testing Library** | 16.1.0 | 컴포넌트 테스트 |
| **Playwright** | 1.49.1 | E2E 테스트 |

### Deployment & Hosting

| 기술 | 목적 |
|------|------|
| **Vercel** | 자동 배포, Edge Network, Analytics |
| **Vercel Analytics** | 페이지 성능 모니터링 |
| **Vercel Speed Insights** | Core Web Vitals 추적 |

---

## 기술 선택 상세 이유

### 1. Next.js 15 App Router

**선택 이유**:
- **React Server Components (RSC)**: 초기 로딩 속도 개선, SEO 최적화
- **App Router**: 파일 기반 라우팅, 중첩 레이아웃 지원
- **API Routes**: 백엔드 로직을 같은 프로젝트에서 관리
- **자동 최적화**: 이미지, 폰트, 코드 분할 자동 처리

**MVP 적합성**:
- 빠른 프로토타이핑
- Vercel 자동 배포 지원
- 모바일 성능 최적화 내장

**제약 사항**:
- App Router는 Next.js 13+에서만 사용 가능
- Client Component 사용 시 `'use client'` 명시 필요

### 2. TypeScript

**선택 이유**:
- **타입 안정성**: 런타임 오류 사전 방지
- **IDE 지원**: 자동 완성, 리팩토링 도구
- **팀 협업**: 명확한 인터페이스 정의

**설정**:
- 엄격 모드 (`strict: true`)
- 암시적 `any` 금지 (`noImplicitAny: true`)
- Null 안정성 (`strictNullChecks: true`)

### 3. Tailwind CSS 4.0

**선택 이유**:
- **모바일 우선**: 반응형 디자인 기본 제공
- **유틸리티 클래스**: 빠른 스타일링, CSS 파일 불필요
- **디자인 시스템**: 일관된 색상, 간격, 타이포그래피

**shadcn/ui 통합**:
- Radix UI 기반 접근성 컴포넌트
- Tailwind CSS로 커스터마이징 가능
- CLI로 필요한 컴포넌트만 설치

**설정 파일 (`tailwind.config.ts`)**:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#f59e0b',
        danger: '#ef4444',
        success: '#10b981',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4. Claude API (Anthropic)

**선택 이유**:
- **한국어 성능**: GPT-4 대비 우수한 한국어 이해 및 생성
- **비용 효율**: GPT-4보다 약 40% 저렴
- **긴 컨텍스트**: 200K 토큰 지원 (이력서 전체 분석 가능)

**사용 모델**: `claude-3-5-sonnet-20241022`
- **속도**: Haiku보다 느리지만, 품질 우수
- **품질**: Opus 수준의 답변 생성
- **비용**: 입력 $3/1M 토큰, 출력 $15/1M 토큰

**프롬프트 전략**:
- Few-Shot Prompting으로 일관성 확보
- JSON 스키마 강제로 파싱 오류 방지
- System Prompt로 톤앤매너 설정 ("현실적이고 직설적")

### 5. Vercel Serverless Functions

**선택 이유**:
- **제로 인프라**: 서버 관리 불필요
- **자동 확장**: 트래픽 증가 시 자동 스케일링
- **무료 티어**: 월 100GB 대역폭, 100GB-시간 실행 시간

**제약 사항**:
- **실행 시간**: 10초 제한 (Hobby Plan) → Pro Plan 시 60초
- **메모리**: 1024MB 제한
- **Cold Start**: 첫 요청 시 500ms~1초 지연

**최적화 방안**:
- Claude API 응답 스트리밍 (단계별 카드 표시)
- Edge Functions 고려 (향후)

---

## Next.js 15 App Router 설정

### 프로젝트 초기화

```bash
pnpm create next-app@latest project001 \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
```

**옵션 설명**:
- `--typescript`: TypeScript 사용
- `--tailwind`: Tailwind CSS 포함
- `--app`: App Router 사용 (Pages Router 대신)
- `--src-dir`: `src/` 디렉토리에 소스 코드 배치
- `--import-alias "@/*"`: `@/components` 형태로 import

### `next.config.ts` 설정

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // 보안: X-Powered-By 헤더 제거

  // 환경 변수 검증
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  },

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // 번들 분석 (개발 시)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

export default nextConfig;
```

### `tsconfig.json` 설정

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Tailwind CSS + shadcn/ui 구성

### Tailwind CSS 초기 설정

1. **`globals.css`** (기본 스타일):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --secondary: 210 40% 96.1%;
    --muted: 210 40% 96.1%;
    --accent: 210 40% 96.1%;
    --destructive: 0 84.2% 60.2%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### shadcn/ui 설치

```bash
pnpm dlx shadcn@latest init
```

**컴포넌트 추가**:
```bash
pnpm dlx shadcn@latest add button card input textarea progress
```

**사용 예시**:
```typescript
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reality Report</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>확인</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Claude API 통합 방식

### 서버사이드 API 호출 (API Routes)

**파일**: `src/app/api/generate/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { realityCheck, careerSnapshot, idea } = await request.json();

    // 1. Reality Report 생성
    const realityPrompt = `
사용자 정보:
- 주당 투입시간: ${realityCheck.weeklyHours}
- 손실 허용 금액: ${realityCheck.budgetLimit}
- 실패 감당 범위: ${realityCheck.failureTolerance}
- 절대 불가 조건: ${realityCheck.absoluteConstraints}

위 정보를 바탕으로 다음을 JSON 형식으로 출력하세요:
{
  "warnings": ["하면 안 되는 선택 3가지"],
  "suggestions": ["가능한 전환 방향 2가지"]
}
    `;

    const realityResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: realityPrompt,
        },
      ],
    });

    const realityReport = JSON.parse(
      realityResponse.content[0].type === 'text'
        ? realityResponse.content[0].text
        : '{}'
    );

    // 2. Income Map 생성 (유사한 로직)
    // 3. Decision Questions 생성 (유사한 로직)

    return NextResponse.json({
      realityReport,
      // incomeMap, decisionQuestions
    });
  } catch (error) {
    console.error('Claude API Error:', error);
    return NextResponse.json(
      { error: '리포트 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs'; // Serverless Functions
export const maxDuration = 10; // 10초 타임아웃
```

### 클라이언트사이드 호출

**파일**: `src/app/input/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InputPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('리포트 생성 실패');
      }

      const result = await response.json();

      // URL Query로 데이터 전달
      router.push(
        `/report?data=${encodeURIComponent(JSON.stringify(result))}`
      );
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return <div>{/* 입력 폼 UI */}</div>;
}
```

---

## Vercel 배포 설정

### 환경 변수 설정

**로컬 개발** (`.env.local`):
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**프로덕션** (Vercel Dashboard):
1. Vercel 프로젝트 → Settings → Environment Variables
2. `ANTHROPIC_API_KEY` 추가 (Production 환경)
3. `NEXT_PUBLIC_APP_URL` → `https://myoi-transition.vercel.app`

### 자동 배포 설정

**Git 연동**:
1. GitHub 저장소 생성
2. Vercel에서 Import Project
3. 자동 배포 활성화:
   - `main` 브랜치 푸시 → Production 배포
   - PR 생성 → Preview 배포

**배포 스크립트** (`package.json`):
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "deploy": "vercel --prod"
  }
}
```

### 성능 모니터링

**Vercel Analytics 활성화**:
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 개발 환경 요구사항

### 필수 소프트웨어

1. **Node.js**: 20.18.3 LTS 이상
   - 설치: [nodejs.org](https://nodejs.org/)
   - 확인: `node --version`

2. **pnpm**: 9.15.4 이상
   - 설치: `npm install -g pnpm`
   - 확인: `pnpm --version`

3. **Git**: 최신 버전
   - 설치: [git-scm.com](https://git-scm.com/)
   - 확인: `git --version`

### IDE 설정

**VSCode 추천 확장**:
- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Path Intellisense

**VSCode 설정** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### 로컬 개발 시작

```bash
# 1. 저장소 클론
git clone https://github.com/username/project001.git
cd project001

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local에 ANTHROPIC_API_KEY 입력

# 4. 개발 서버 실행
pnpm dev

# 5. 브라우저에서 확인
# http://localhost:3000
```

---

## 환경 변수 관리

### 필수 환경 변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `ANTHROPIC_API_KEY` | Claude API 키 | `sk-ant-api03-xxxxx` |
| `NEXT_PUBLIC_APP_URL` | 앱 URL (프론트엔드) | `https://myoi-transition.vercel.app` |

### 선택 환경 변수 (향후)

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `VERCEL_KV_URL` | Vercel KV (세션 저장) | - |
| `RESEND_API_KEY` | 이메일 발송 (Resend) | - |

### 보안 주의사항

- `.env.local`은 **절대 Git에 커밋하지 않음** (`.gitignore`에 포함)
- API 키는 Vercel Dashboard에서만 관리
- `NEXT_PUBLIC_` 접두사는 클라이언트에 노출되므로 민감 정보 금지

---

## 성능 목표 및 최적화

### 성능 목표

| 지표 | 목표 | 측정 도구 |
|------|------|-----------|
| **리포트 생성 시간** | 10초 이내 | Custom Timer |
| **Lighthouse Performance** | 90+ (모바일) | Lighthouse |
| **First Contentful Paint (FCP)** | 1.5초 이하 | Vercel Speed Insights |
| **Time to Interactive (TTI)** | 3초 이하 | Vercel Speed Insights |
| **Cumulative Layout Shift (CLS)** | 0.1 이하 | Vercel Speed Insights |

### 최적화 전략

1. **React Server Components**:
   - Landing Page를 서버 컴포넌트로 구현
   - 초기 JavaScript 번들 크기 최소화

2. **이미지 최적화**:
   - Next.js `<Image>` 컴포넌트 사용
   - AVIF/WebP 자동 변환

3. **코드 분할**:
   - 동적 import로 Report 페이지 lazy loading
   ```typescript
   const ReportPage = dynamic(() => import('./report/page'), {
     loading: () => <p>로딩 중...</p>,
   });
   ```

4. **Claude API 최적화**:
   - 프롬프트 토큰 최소화 (압축적 표현)
   - 응답 캐싱 (동일 입력 시 재사용)
   - Streaming 응답 (카드별 순차 표시)

---

## 테스트 전략 (향후)

### 단위 테스트 (Jest)

**설정 파일** (`jest.config.js`):
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

**테스트 예시** (`src/lib/utils/validation.test.ts`):
```typescript
import { validateRealityCheck } from './validation';

describe('validateRealityCheck', () => {
  it('필수 입력 누락 시 false 반환', () => {
    const input = { weeklyHours: '', budgetLimit: '500만원' };
    expect(validateRealityCheck(input)).toBe(false);
  });

  it('모든 필수 입력 완료 시 true 반환', () => {
    const input = {
      weeklyHours: '10-20시간',
      budgetLimit: '500만원',
      failureTolerance: '1년',
      absoluteConstraints: '가족 부양',
    };
    expect(validateRealityCheck(input)).toBe(true);
  });
});
```

### 컴포넌트 테스트 (React Testing Library)

**테스트 예시** (`src/components/input/RealityCheck.test.tsx`):
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import RealityCheck from './RealityCheck';

describe('RealityCheck Component', () => {
  it('초기 렌더링 시 입력 필드 표시', () => {
    render(<RealityCheck />);
    expect(screen.getByLabelText(/주당 투입시간/i)).toBeInTheDocument();
  });

  it('제출 버튼 클릭 시 검증 실행', () => {
    const onSubmit = jest.fn();
    render(<RealityCheck onSubmit={onSubmit} />);

    fireEvent.click(screen.getByText(/다음 단계/i));
    expect(onSubmit).not.toHaveBeenCalled(); // 빈 입력이므로 호출 안 됨
  });
});
```

### E2E 테스트 (Playwright)

**설정 파일** (`playwright.config.ts`):
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
```

**테스트 예시** (`e2e/user-flow.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

test('전체 사용자 플로우 완료', async ({ page }) => {
  // 1. Landing 페이지
  await page.goto('/');
  await page.click('text=3분 진단 시작');

  // 2. Reality Check
  await page.selectOption('select[name=weeklyHours]', '10-20시간');
  await page.fill('input[name=budgetLimit]', '500만원');
  await page.click('text=다음 단계');

  // 3. Career Snapshot
  await page.fill('textarea[name=resumeText]', '10년 경력 생산관리...');
  await page.click('text=다음 단계');

  // 4. Report 확인
  await expect(page.locator('h2:has-text("Reality Report")')).toBeVisible();
});
```

---

## CI/CD 파이프라인 (향후)

### GitHub Actions 설정

**파일**: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9.15.4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm tsc --noEmit

      - name: Build
        run: pnpm build

      - name: Test
        run: pnpm test
```

---

## 운영 및 모니터링 (향후)

### 로그 수집

**Vercel Logs**: 자동 수집
- 실시간 로그 확인: Vercel Dashboard → Deployments → Logs
- 로그 레벨: `console.log`, `console.error`

### 에러 추적 (Sentry)

**설치**:
```bash
pnpm add @sentry/nextjs
```

**설정** (`sentry.client.config.ts`):
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 알림 설정 (향후)

- **Vercel**: 배포 실패 시 이메일 알림
- **Sentry**: 에러 발생 시 Slack 알림
- **Uptime Robot**: 다운타임 모니터링

---

## 보안 및 컴플라이언스

### 보안 체크리스트

- [x] HTTPS 전용 (Vercel 자동 제공)
- [x] API 키 환경 변수 관리
- [x] XSS 방지 (React 기본 제공)
- [x] CSRF 방지 (Vercel Serverless 기본 제공)
- [ ] Rate Limiting (향후 Vercel Edge Middleware)
- [ ] 입력 검증 (Zod 스키마)

### 개인정보 처리 (GDPR/PIPA)

MVP 단계:
- 이메일만 수집 (CTA 신청 시)
- 개인정보 처리방침 명시
- 이력서 데이터는 세션 종료 시 삭제

향후:
- DB 저장 시 암호화
- 사용자 데이터 삭제 기능 (Right to be Forgotten)

---

## 의존성 버전 관리

### 주요 의존성 (`package.json`)

```json
{
  "dependencies": {
    "next": "15.1.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "@anthropic-ai/sdk": "0.32.1",
    "tailwindcss": "4.0.0",
    "@radix-ui/react-progress": "1.1.1"
  },
  "devDependencies": {
    "typescript": "5.7.3",
    "eslint": "9.18.0",
    "prettier": "3.4.2",
    "@types/node": "22.10.5",
    "@types/react": "19.0.6"
  }
}
```

### 업데이트 전략

- **Major 업데이트**: 분기별 검토 (Breaking Changes 확인)
- **Minor 업데이트**: 월별 자동 업데이트 (Dependabot)
- **Patch 업데이트**: 주별 자동 업데이트
- **보안 패치**: 즉시 적용

---

## 문제 해결 가이드

### 자주 발생하는 오류

#### 1. Claude API 타임아웃

**증상**: `Error: Request timed out after 10s`

**해결**:
```typescript
// maxDuration 증가 (Pro Plan 필요)
export const maxDuration = 30; // 30초

// 또는 재시도 로직 추가
const response = await retry(() => anthropic.messages.create(...), {
  retries: 2,
  delay: 1000,
});
```

#### 2. Vercel 배포 실패

**증상**: `Build failed: Module not found`

**해결**:
```bash
# 로컬에서 빌드 테스트
pnpm build

# node_modules 재설치
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 3. TypeScript 타입 오류

**증상**: `Property 'X' does not exist on type 'Y'`

**해결**:
```typescript
// 타입 명시적 정의
interface UserInput {
  weeklyHours: string;
  budgetLimit: string;
}

const input: UserInput = { ... };
```

---

## 향후 기술 로드맵

### Phase 2: 인증 및 결제
- Supabase Auth (소셜 로그인)
- Stripe (결제)
- Supabase DB (사용자 데이터)

### Phase 3: AI 고도화
- 리포트 품질 개선 (Fine-tuning)
- 멀티모달 입력 (이미지 업로드)
- 실시간 피드백 (Streaming)

### Phase 4: 확장성
- Redis (세션 캐싱)
- PostgreSQL (분석 데이터)
- Microservices 분리 (리포트 생성 서비스)

---

**문서 버전**: 1.0.0
**작성일**: 2026-02-03
**작성자**: Jamie
**최종 수정일**: 2026-02-03
