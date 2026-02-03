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
| Frontend | Next.js 15 App Router, TypeScript, Tailwind CSS 4.0 |
| UI | shadcn/ui, Radix UI |
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

## 라이선스

MIT License
