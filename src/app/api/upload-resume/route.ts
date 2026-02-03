import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

// 허용되는 파일 크기 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// 허용되는 MIME 타입
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// 허용되는 파일 확장자
const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

/**
 * 파일 확장자를 추출하는 헬퍼 함수
 */
function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return "";
  return filename.slice(lastDot).toLowerCase();
}

/**
 * 파일 타입이 유효한지 검증하는 함수
 * MIME 타입과 확장자를 모두 확인
 */
function isValidFileType(file: File): boolean {
  const mimeValid = ALLOWED_MIME_TYPES.includes(file.type);
  const extValid = ALLOWED_EXTENSIONS.includes(getFileExtension(file.name));
  return mimeValid || extValid;
}

/**
 * PDF 파일인지 확인하는 함수
 */
function isPdf(file: File): boolean {
  return (
    file.type === "application/pdf" ||
    getFileExtension(file.name) === ".pdf"
  );
}

/**
 * PDF에서 텍스트를 추출하는 함수
 */
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // pdf-parse@1.1.1 default export
  const pdfParse = (await import("pdf-parse")).default;
  const result = await pdfParse(buffer);
  return result.text;
}

/**
 * DOCX에서 텍스트를 추출하는 함수
 */
async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

/**
 * 이력서 파일 업로드 및 텍스트 추출 API
 * POST /api/upload-resume
 *
 * - multipart/form-data의 "file" 필드로 파일을 받음
 * - PDF, DOCX만 허용
 * - 최대 5MB
 * - 파일을 디스크에 저장하지 않고 메모리에서 처리
 */
export async function POST(request: NextRequest) {
  try {
    // FormData 파싱
    const formData = await request.formData();
    const file = formData.get("file");

    // 파일 존재 여부 확인
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "파일이 첨부되지 않았습니다" },
        { status: 400 }
      );
    }

    // 파일 타입 검증
    if (!isValidFileType(file)) {
      return NextResponse.json(
        { error: "PDF 또는 DOCX 파일만 업로드할 수 있습니다" },
        { status: 400 }
      );
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "파일 크기는 5MB 이하여야 합니다" },
        { status: 400 }
      );
    }

    // 파일을 버퍼로 변환 (메모리에서 처리)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 파일 형식에 따라 텍스트 추출
    let text: string;

    try {
      if (isPdf(file)) {
        text = await extractTextFromPdf(buffer);
      } else {
        text = await extractTextFromDocx(buffer);
      }
    } catch {
      return NextResponse.json(
        { error: "파일에서 텍스트를 추출할 수 없습니다. 직접 입력해주세요." },
        { status: 422 }
      );
    }

    // 추출된 텍스트 반환
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "파일에서 텍스트를 추출할 수 없습니다. 직접 입력해주세요." },
      { status: 500 }
    );
  }
}
