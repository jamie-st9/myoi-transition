# SPEC-UPLOAD-001: 이력서 파일 업로드 기능

## 메타데이터

| 항목 | 값 |
|------|-----|
| SPEC ID | SPEC-UPLOAD-001 |
| 제목 | Resume File Upload for Career Snapshot |
| 상태 | Planned |
| 우선순위 | High |
| 생성일 | 2026-02-03 |
| 관련 SPEC | SPEC-UI-001 (MVP UI) |
| 라이프사이클 | spec-first |

---

## Environment (환경)

- **플랫폼**: Next.js 16.1.6 (App Router, Turbopack)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4, shadcn/ui
- **기존 컴포넌트**: `src/components/input/CareerSnapshot.tsx` (텍스트 입력만 지원)
- **기존 API**: `src/app/api/generate/route.ts` (Anthropic SDK)
- **기존 타입**: `src/lib/types/input.ts` (`CareerSnapshotInput.resume: string`)
- **대상 사용자**: 40~50대 경력 전환 희망 직장인
- **최소 뷰포트**: 402px (모바일 우선)
- **UI 언어**: 한국어

## Assumptions (가정)

- 사용자는 PDF 또는 DOCX 형식의 이력서를 보유하고 있다
- 파일에서 추출한 텍스트는 기존 `resume: string` 필드로 전달되며, 기존 흐름을 변경하지 않는다
- 파일 저장은 불필요하다 (텍스트 추출 후 파일 폐기)
- 서버 사이드 텍스트 추출은 Next.js API Route에서 처리한다
- 5MB 이하의 파일만 허용한다

---

## Requirements (요구사항)

### R1. 파일 업로드 영역 (Event-Driven)

- **WHEN** 사용자가 Career Snapshot 단계에 진입하면 **THEN** 파일 업로드 영역(드래그 앤 드롭 + 클릭 브라우즈)과 기존 텍스트 입력 영역이 모두 표시되어야 한다
- **WHEN** 사용자가 파일을 드래그하여 업로드 영역에 놓으면 **THEN** 시스템은 해당 파일을 업로드 처리해야 한다
- **WHEN** 사용자가 업로드 영역을 클릭하면 **THEN** 파일 선택 다이얼로그가 열려야 한다

### R2. 파일 형식 및 크기 검증 (State-Driven)

- **IF** 업로드된 파일이 PDF 또는 DOCX가 아니면 **THEN** 시스템은 "PDF 또는 DOCX 파일만 업로드할 수 있습니다" 오류를 표시해야 한다
- **IF** 업로드된 파일이 5MB를 초과하면 **THEN** 시스템은 "파일 크기는 5MB 이하여야 합니다" 오류를 표시해야 한다

### R3. 서버 사이드 텍스트 추출 (Event-Driven)

- **WHEN** 유효한 파일이 업로드되면 **THEN** 시스템은 `/api/upload-resume` 엔드포인트로 파일을 전송하고 텍스트를 추출해야 한다
- **WHEN** PDF 파일이 전송되면 **THEN** 서버는 PDF에서 텍스트를 추출하여 반환해야 한다
- **WHEN** DOCX 파일이 전송되면 **THEN** 서버는 DOCX에서 텍스트를 추출하여 반환해야 한다

### R4. 입력 방식 통합 (State-Driven)

- **IF** 사용자가 파일 업로드로 텍스트를 추출하면 **THEN** 추출된 텍스트가 기존 resume 필드에 설정되어 다음 단계로 진행할 수 있어야 한다
- **IF** 사용자가 텍스트를 직접 붙여넣으면 **THEN** 기존과 동일하게 동작해야 한다
- **IF** 두 입력 방식 모두 비어 있으면 **THEN** 다음 단계로 진행할 수 없어야 한다

### R5. 업로드 상태 표시 (Event-Driven)

- **WHEN** 파일 업로드 및 텍스트 추출이 진행 중이면 **THEN** 로딩 인디케이터를 표시해야 한다
- **WHEN** 텍스트 추출이 완료되면 **THEN** 성공 메시지("파일에서 이력서 내용을 읽어왔습니다")를 표시해야 한다
- **WHEN** 텍스트 추출이 실패하면 **THEN** 오류 메시지를 표시하고 수동 입력을 안내해야 한다

### R6. 모바일 반응형 (Ubiquitous)

- 시스템은 **항상** 402px 이상의 뷰포트에서 파일 업로드 영역과 텍스트 입력 영역을 올바르게 표시해야 한다

### R7. 금지 동작 (Unwanted)

- 시스템은 업로드된 파일을 서버에 **저장하지 않아야 한다** (텍스트 추출 후 즉시 폐기)
- 시스템은 파일 내용의 미리보기를 **제공하지 않아야 한다** (MVP 범위 외)

---

## Specifications (기술 사양)

### 프론트엔드

| 항목 | 상세 |
|------|------|
| 컴포넌트 | `src/components/input/FileUpload.tsx` (신규) |
| 수정 파일 | `src/components/input/CareerSnapshot.tsx` |
| UI 라이브러리 | shadcn/ui (Card, Button, Alert) |
| 드래그 앤 드롭 | 네이티브 HTML5 Drag and Drop API |
| 파일 전송 | `FormData` + `fetch` |
| Accept | `.pdf,.docx` |

### 백엔드

| 항목 | 상세 |
|------|------|
| 엔드포인트 | `POST /api/upload-resume` |
| 입력 | `multipart/form-data` (file 필드) |
| 출력 | `{ text: string }` |
| PDF 파싱 | `pdf-parse` 라이브러리 |
| DOCX 파싱 | `mammoth` 라이브러리 |
| 파일 크기 제한 | 5MB (서버에서도 검증) |

### 타입 변경

```typescript
// src/lib/types/input.ts - 기존 타입 유지
// resume: string 필드는 변경 없음
// 파일 업로드 결과가 이 필드에 설정됨
```

### 추적성 태그

- SPEC-UPLOAD-001-R1: 파일 업로드 영역
- SPEC-UPLOAD-001-R2: 파일 검증
- SPEC-UPLOAD-001-R3: 텍스트 추출 API
- SPEC-UPLOAD-001-R4: 입력 방식 통합
- SPEC-UPLOAD-001-R5: 업로드 상태 표시
- SPEC-UPLOAD-001-R6: 모바일 반응형
- SPEC-UPLOAD-001-R7: 금지 동작
