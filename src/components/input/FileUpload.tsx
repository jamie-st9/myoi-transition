/**
 * 파일 업로드 컴포넌트
 * 이력서 파일(PDF/DOCX)을 드래그 앤 드롭 또는 클릭으로 업로드하고
 * 텍스트를 추출하여 상위 컴포넌트에 전달합니다.
 */

'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

/** 컴포넌트 상태 타입 */
type UploadState = 'idle' | 'uploading' | 'success' | 'error';

/** 허용되는 MIME 타입 */
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

/** 허용되는 파일 확장자 */
const ALLOWED_EXTENSIONS = ['.pdf', '.docx'];

/** 최대 파일 크기 (5MB) */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface FileUploadProps {
  /** 파일 업로드 성공 시 추출된 텍스트 전달 */
  onTextExtracted: (text: string) => void;
  /** 현재 비활성화 여부 */
  disabled?: boolean;
}

/**
 * 파일 유효성 검사
 * MIME 타입과 확장자를 모두 확인합니다.
 */
function validateFile(file: File): string | null {
  // 확장자 확인
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
    fileName.endsWith(ext)
  );
  if (!hasValidExtension) {
    return 'PDF 또는 DOCX 파일만 업로드할 수 있습니다';
  }

  // MIME 타입 확인
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return 'PDF 또는 DOCX 파일만 업로드할 수 있습니다';
  }

  // 파일 크기 확인
  if (file.size > MAX_FILE_SIZE) {
    return '파일 크기는 5MB 이하여야 합니다';
  }

  return null;
}

export function FileUpload({ onTextExtracted, disabled = false }: FileUploadProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  /** 마지막으로 업로드한 파일 (재시도용) */
  const lastFileRef = useRef<File | null>(null);

  /** 파일 업로드 처리 */
  const uploadFile = useCallback(async (file: File) => {
    // 클라이언트 측 유효성 검사
    const validationError = validateFile(file);
    if (validationError) {
      setState('error');
      setErrorMessage(validationError);
      return;
    }

    lastFileRef.current = file;
    setState('uploading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('서버 오류');
      }

      const data = await response.json();

      if (!data.text || data.text.trim().length === 0) {
        throw new Error('텍스트 추출 실패');
      }

      setState('success');
      onTextExtracted(data.text);
    } catch {
      setState('error');
      setErrorMessage('파일에서 텍스트를 추출할 수 없습니다. 직접 입력해주세요.');
    }
  }, [onTextExtracted]);

  /** 드래그 이벤트 핸들러 */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragActive(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  }, [disabled, uploadFile]);

  /** 파일 선택 핸들러 */
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    // input 초기화 (같은 파일 재선택 가능하도록)
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [uploadFile]);

  /** 클릭으로 파일 선택 열기 */
  const handleClick = useCallback(() => {
    if (!disabled && state !== 'uploading') {
      inputRef.current?.click();
    }
  }, [disabled, state]);

  /** 재시도 핸들러 */
  const handleRetry = useCallback(() => {
    if (lastFileRef.current) {
      uploadFile(lastFileRef.current);
    } else {
      setState('idle');
    }
  }, [uploadFile]);

  /** 다른 파일 업로드 핸들러 */
  const handleUploadAnother = useCallback(() => {
    setState('idle');
    inputRef.current?.click();
  }, []);

  // 숨겨진 파일 input
  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept=".pdf,.docx"
      onChange={handleFileChange}
      className="hidden"
      aria-hidden="true"
    />
  );

  // idle 상태: 드래그 앤 드롭 영역
  if (state === 'idle') {
    return (
      <div>
        {fileInput}
        <button
          type="button"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={disabled}
          className={`w-full rounded-lg border-2 border-dashed p-6 text-center transition-colors cursor-pointer
            ${isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="이력서 파일 업로드"
        >
          {/* 업로드 아이콘 */}
          <div className="flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground">
            PDF 또는 DOCX 파일을 드래그하거나 클릭하여 업로드
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            최대 5MB
          </p>
        </button>
      </div>
    );
  }

  // uploading 상태: 로딩 스피너
  if (state === 'uploading') {
    return (
      <div>
        {fileInput}
        <div className="w-full rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center">
          {/* 스피너 */}
          <div className="flex justify-center mb-3">
            <svg
              className="animate-spin text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground">
            파일을 분석하고 있습니다...
          </p>
        </div>
      </div>
    );
  }

  // success 상태: 성공 메시지
  if (state === 'success') {
    return (
      <div>
        {fileInput}
        <div className="w-full rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 p-6 text-center">
          {/* 체크마크 아이콘 */}
          <div className="flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600 dark:text-green-400"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            파일에서 이력서 내용을 읽어왔습니다
          </p>
          <button
            type="button"
            onClick={handleUploadAnother}
            className="text-xs text-green-600 dark:text-green-400 underline mt-2 hover:text-green-700 dark:hover:text-green-300"
          >
            다른 파일 업로드
          </button>
        </div>
      </div>
    );
  }

  // error 상태: 에러 메시지와 재시도 버튼
  return (
    <div>
      {fileInput}
      <div className="w-full rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-6 text-center">
        {/* 에러 아이콘 */}
        <div className="flex justify-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-600 dark:text-red-400"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
        </div>
        <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-3">
          {errorMessage}
        </p>
        <Button
          onClick={handleRetry}
          variant="outline"
          size="sm"
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
}
