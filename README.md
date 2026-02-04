# MyOi TRANSITION

40-50대 직장인을 위한 AI 커리어 전환 진단 플랫폼

## 주요 기능

- **3분 진단**: 간단한 질문으로 커리어 전환 방향성 제시
- **Reality Check**: 현실적 제약 조건(재정, 가족, 건강) 점검
- **Career Snapshot**: 이력서 업로드 및 AI 분석
- **AI 리포트**: 현실점검, 스킬분석, 결정질문 3개 리포트 생성

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | Next.js 16 App Router, TypeScript, Tailwind CSS 4 |
| UI | Custom Components, Lucide Icons, Inter Font |
| AI | Google Gemini API (gemini-2.0-flash) |
| Deployment | Vercel |

## 시작하기

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

> Google AI Studio에서 API 키를 발급받을 수 있습니다: https://aistudio.google.com/

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 배포

Vercel을 통해 배포됩니다.

```bash
# Vercel CLI로 배포
vercel
```

또는 GitHub 저장소를 Vercel에 연결하여 자동 배포를 설정할 수 있습니다.

## 디자인

UI 디자인은 `designs/` 디렉터리에서 Pencil MCP를 통해 관리됩니다.

- `designs/myoi-transition.pen` - 디자인 소스 파일 (Landing, Step 1-3, Loading, Report 6개 화면)
- `designs/screenshots/` - 디자인 스크린샷 백업

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 랜딩 페이지
│   ├── input/page.tsx        # 3단계 입력 프로세스
│   ├── report/page.tsx       # AI 진단 리포트
│   └── api/generate/route.ts # Gemini API 라우트
├── components/
│   ├── landing/Hero.tsx      # 랜딩 히어로 섹션
│   ├── input/                # 입력 단계 컴포넌트
│   │   ├── RealityCheck.tsx
│   │   ├── CareerSnapshot.tsx
│   │   ├── IdeaInput.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── LoadingScreen.tsx
│   └── report/               # 리포트 컴포넌트
│       ├── RealityReport.tsx
│       ├── IncomeMap.tsx
│       ├── DecisionQuestions.tsx
│       └── EmailCTA.tsx
└── lib/
    ├── constants/config.ts   # 앱 설정 및 상수
    ├── types/                # TypeScript 타입 정의
    ├── prompts/              # Gemini 프롬프트 빌더
    └── utils/api.ts          # API 유틸리티
```

## 라이선스

MIT License
