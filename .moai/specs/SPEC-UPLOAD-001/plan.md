# SPEC-UPLOAD-001: 구현 계획

## 관련 SPEC

- SPEC-UPLOAD-001 (이력서 파일 업로드 기능)

---

## 마일스톤

### Primary Goal: API 엔드포인트 구현

**우선순위: High**

1. `pdf-parse`, `mammoth` 패키지 설치
2. `src/app/api/upload-resume/route.ts` 생성
   - `multipart/form-data` 파싱
   - 파일 타입 검증 (PDF/DOCX만 허용)
   - 파일 크기 검증 (5MB 제한)
   - PDF 텍스트 추출 (`pdf-parse`)
   - DOCX 텍스트 추출 (`mammoth`)
   - 추출된 텍스트 JSON 반환 `{ text: string }`
   - 에러 핸들링 (잘못된 파일, 추출 실패 등)

### Secondary Goal: 파일 업로드 컴포넌트

**우선순위: High**

1. `src/components/input/FileUpload.tsx` 신규 생성
   - 드래그 앤 드롭 영역 (HTML5 native)
   - 클릭하여 파일 선택 지원
   - 클라이언트 사이드 파일 검증 (타입, 크기)
   - 업로드 상태 관리 (idle, uploading, success, error)
   - 한국어 UI 텍스트
   - shadcn/ui 스타일 일관성
2. `src/components/input/CareerSnapshot.tsx` 수정
   - FileUpload 컴포넌트 통합
   - 파일 업로드 결과를 resume 필드에 설정
   - 두 입력 방식(파일/텍스트) 공존 레이아웃

### Final Goal: 통합 및 검증

**우선순위: Medium**

1. 모바일 반응형 레이아웃 확인 (402px~)
2. 기존 텍스트 입력 흐름 회귀 테스트
3. 대용량 파일(5MB 초과) 거부 확인
4. 잘못된 파일 형식 거부 확인

---

## 기술 접근 방식

### API Route 설계

```
POST /api/upload-resume
Content-Type: multipart/form-data

Request: FormData { file: File }
Response 200: { text: string }
Response 400: { error: string }  // 검증 실패
Response 500: { error: string }  // 추출 실패
```

### 라이브러리 선택

| 라이브러리 | 용도 | 선택 근거 |
|-----------|------|----------|
| `pdf-parse` | PDF 텍스트 추출 | 가볍고 의존성 적음, Node.js 환경 호환 |
| `mammoth` | DOCX 텍스트 추출 | 구조화된 텍스트 추출, 활발한 유지보수 |

### 아키텍처

```
[FileUpload 컴포넌트]
    |
    | FormData (file)
    v
[POST /api/upload-resume]
    |
    | pdf-parse / mammoth
    v
[{ text: string }]
    |
    v
[CareerSnapshot] -> resume 필드 설정 -> 기존 흐름 유지
```

### 파일 변경 목록

| 파일 | 변경 유형 |
|------|----------|
| `package.json` | 의존성 추가 (pdf-parse, mammoth) |
| `src/app/api/upload-resume/route.ts` | 신규 생성 |
| `src/components/input/FileUpload.tsx` | 신규 생성 |
| `src/components/input/CareerSnapshot.tsx` | 수정 (FileUpload 통합) |

---

## 리스크 및 대응

| 리스크 | 영향 | 대응 |
|--------|------|------|
| PDF 파싱 실패 (이미지 기반 PDF) | 텍스트 추출 불가 | 에러 메시지 표시 + 수동 입력 안내 |
| 대용량 파일 업로드 시 서버 부하 | API 응답 지연 | 클라이언트/서버 양쪽 5MB 제한 |
| DOCX 복잡한 서식 | 텍스트 품질 저하 | mammoth의 텍스트 전용 추출 사용 |
| Turbopack과 pdf-parse 호환성 | 빌드 에러 가능 | 서버 사이드 전용 사용 확인 |

---

## 추적성 태그

- SPEC-UPLOAD-001-R1 ~ R7 참조
