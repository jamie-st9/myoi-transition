# SPEC-UPLOAD-001: 인수 조건

## 관련 SPEC

- SPEC-UPLOAD-001 (이력서 파일 업로드 기능)

---

## 시나리오 1: PDF 파일 업로드 성공 (SPEC-UPLOAD-001-R1, R3, R4)

```gherkin
Given Career Snapshot 단계에서 파일 업로드 영역이 표시되어 있다
When 사용자가 유효한 PDF 파일(3MB)을 드래그 앤 드롭한다
Then 시스템은 로딩 인디케이터를 표시한다
And 서버에서 텍스트를 추출하여 resume 필드에 설정한다
And "파일에서 이력서 내용을 읽어왔습니다" 성공 메시지를 표시한다
```

## 시나리오 2: DOCX 파일 업로드 성공 (SPEC-UPLOAD-001-R1, R3, R4)

```gherkin
Given Career Snapshot 단계에서 파일 업로드 영역이 표시되어 있다
When 사용자가 클릭하여 DOCX 파일을 선택한다
Then 시스템은 로딩 인디케이터를 표시한다
And 서버에서 텍스트를 추출하여 resume 필드에 설정한다
And 성공 메시지를 표시한다
```

## 시나리오 3: 지원하지 않는 파일 형식 (SPEC-UPLOAD-001-R2)

```gherkin
Given Career Snapshot 단계에서 파일 업로드 영역이 표시되어 있다
When 사용자가 JPG 파일을 업로드한다
Then 시스템은 "PDF 또는 DOCX 파일만 업로드할 수 있습니다" 오류를 표시한다
And 파일은 서버로 전송되지 않는다
```

## 시나리오 4: 파일 크기 초과 (SPEC-UPLOAD-001-R2)

```gherkin
Given Career Snapshot 단계에서 파일 업로드 영역이 표시되어 있다
When 사용자가 6MB PDF 파일을 업로드한다
Then 시스템은 "파일 크기는 5MB 이하여야 합니다" 오류를 표시한다
And 파일은 서버로 전송되지 않는다
```

## 시나리오 5: 텍스트 추출 실패 (SPEC-UPLOAD-001-R5)

```gherkin
Given 사용자가 이미지 기반 PDF를 업로드한다
When 서버에서 텍스트 추출에 실패한다
Then 시스템은 오류 메시지를 표시한다
And "직접 이력서 내용을 붙여넣어 주세요" 안내를 표시한다
```

## 시나리오 6: 텍스트 직접 입력 (SPEC-UPLOAD-001-R4)

```gherkin
Given Career Snapshot 단계에서 텍스트 입력 영역이 표시되어 있다
When 사용자가 텍스트를 직접 붙여넣는다
Then 기존과 동일하게 resume 필드에 설정된다
And 다음 단계로 진행할 수 있다
```

## 시나리오 7: 입력 없이 다음 단계 (SPEC-UPLOAD-001-R4)

```gherkin
Given 파일 업로드와 텍스트 입력 모두 비어 있다
When 사용자가 다음 단계 버튼을 클릭한다
Then 다음 단계로 진행할 수 없다
```

## 시나리오 8: 모바일 레이아웃 (SPEC-UPLOAD-001-R6)

```gherkin
Given 뷰포트 너비가 402px이다
When Career Snapshot 단계를 표시한다
Then 파일 업로드 영역과 텍스트 입력 영역이 세로로 배치된다
And 모든 UI 요소가 잘리지 않고 표시된다
```

## 시나리오 9: 파일 저장 금지 (SPEC-UPLOAD-001-R7)

```gherkin
Given 사용자가 PDF 파일을 업로드한다
When 서버에서 텍스트 추출이 완료된다
Then 업로드된 파일은 서버 파일 시스템에 저장되지 않는다
And 메모리에서만 처리된 후 폐기된다
```

---

## 품질 게이트

| 기준 | 목표 |
|------|------|
| 파일 업로드 성공률 | PDF/DOCX 정상 파일 100% 추출 |
| 클라이언트 검증 | 잘못된 파일 100% 차단 |
| 서버 검증 | 클라이언트 우회 시에도 서버에서 차단 |
| 모바일 호환성 | 402px 이상에서 정상 동작 |
| 기존 흐름 호환 | 텍스트 직접 입력 기능 회귀 없음 |

## 검증 방법

- 수동 테스트: PDF/DOCX 파일 업로드, 잘못된 파일, 대용량 파일
- 모바일 테스트: 크롬 DevTools 반응형 모드 (402px)
- API 테스트: curl/Postman으로 엔드포인트 직접 호출

## Definition of Done

- [ ] `/api/upload-resume` 엔드포인트가 PDF/DOCX 텍스트를 추출하여 반환한다
- [ ] FileUpload 컴포넌트가 드래그 앤 드롭과 클릭 브라우즈를 지원한다
- [ ] 클라이언트에서 파일 타입과 크기를 검증한다
- [ ] 서버에서도 파일 타입과 크기를 검증한다
- [ ] 추출된 텍스트가 기존 resume 필드에 설정된다
- [ ] 기존 텍스트 입력 기능이 정상 동작한다
- [ ] 402px 뷰포트에서 레이아웃이 올바르다
- [ ] 모든 UI 텍스트가 한국어이다
- [ ] 업로드된 파일이 서버에 저장되지 않는다

---

## 추적성 태그

- SPEC-UPLOAD-001-R1 ~ R7 참조
