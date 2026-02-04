# Changelog

이 프로젝트의 주요 변경 사항을 기록합니다.

## [0.2.0] - 2026-02-05

### UI 전면 리디자인
- 전체 6개 화면 Pencil 디자인 기반 리디자인 (Landing, Step 1-3, Loading, Report)
- Geist → Inter 폰트 전환
- 디자인 토큰 14개 적용 ($bg, $primary, $surface 등)
- Landing: MyOi 브랜딩, 스파클 뱃지, 신뢰 아이콘 3개
- Step 1: 세로 라디오, 가로 카드, 위험 허용도 버튼, Q4 제약조건 추가
- Step 2: 이력서 텍스트에어리어 + 파일 업로드 존
- Step 3: 커스텀 토글 스위치 + 아이디어 카드
- Loading: 64px 스피너 + 3단계 진행 상태
- Report: 블루 배너, 아코디언 카드, 스킬 칩, 이메일 CTA 인라인 입력

### 버그 수정
- API 엔드포인트 경로 수정 (`/api/generate/complete-report` → `/api/generate`)
- 에러 응답 필드 수정 (`errorData.message` → `errorData.error`)
- API 타임아웃 25초로 조정, 재시도 1회로 제한

### 보안
- `server-only` 패키지 추가 (API 라우트 서버 전용 보장)
- API 키 형식 검증 추가 (AIza prefix)

### 디자인
- `pencil-new.pen` → `designs/myoi-transition.pen` 동기화

## [0.1.0] - 2026-02-04

### 추가
- Pencil UI 디자인 6개 화면을 project001에 재구성 (`designs/myoi-transition.pen`)
- `moai-platform-pencil` 스킬 생성 (디자인 파일 관리 규칙)
- 프로젝트 초기화 시 designs/ 디렉터리 자동 생성 (Phase 3.3)
- designs/screenshots/ 스크린샷 백업 디렉터리

### 수정
- API 타임아웃 처리 개선 (AbortSignal Promise.race)
- 타입 안전성 강화 (CompleteInputFormState 인터페이스)
- 에러 처리 UI 추가 (리포트 페이지)
- RealityCheck 컴포넌트 useMemo 최적화

### 설정
- MoAI 프로젝트 설정 업데이트
- system.yaml에 designs 디렉터리 관리 설정 추가
