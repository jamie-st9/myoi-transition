# Changelog

이 프로젝트의 주요 변경 사항을 기록합니다.

## [Unreleased]

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
