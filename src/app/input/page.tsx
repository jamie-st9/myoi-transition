/**
 * Diagnostic input main page
 * Manages the 3-step input process with header and step bar
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';
import { ProgressIndicator } from '@/components/input/ProgressIndicator';
import { RealityCheck } from '@/components/input/RealityCheck';
import { CareerSnapshot } from '@/components/input/CareerSnapshot';
import { IdeaInput } from '@/components/input/IdeaInput';
import { LoadingScreen } from '@/components/input/LoadingScreen';
import type {
  CompleteInputFormState,
  RealityCheckFormState,
  CareerSnapshotInput,
  IdeaInput as IdeaInputType,
} from '@/lib/types/input';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/lib/constants/config';

/** Loading progress status type */
type ProgressStatus = 'pending' | 'loading' | 'complete';

/**
 * InputPage component
 *
 * 3-step diagnostic input process:
 * 1. Reality Check (RealityCheck)
 * 2. Career Snapshot (CareerSnapshot)
 * 3. Idea Input (IdeaInput)
 *
 * On completion: API call and redirect to report page
 */
export default function InputPage() {
  const router = useRouter();

  // Current step state (1-3)
  const [currentStep, setCurrentStep] = useState(1);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Loading progress state (for LoadingScreen)
  const [loadingProgress, setLoadingProgress] = useState<{
    realityReport: ProgressStatus;
    incomeMap: ProgressStatus;
    decisionQuestions: ProgressStatus;
  }>({
    realityReport: 'pending',
    incomeMap: 'pending',
    decisionQuestions: 'pending',
  });

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Form data state
  const [formData, setFormData] = useState<CompleteInputFormState>({
    realityCheck: {
      weeklyHours: '',
      budgetLimit: '',
      failureTolerance: '',
      absoluteConstraints: '',
    },
    careerSnapshot: {
      resumeText: '',
    },
    idea: {
      hasIdea: false,
    },
  });

  // Step 1: Reality check data change handler
  const handleRealityCheckChange = (data: RealityCheckFormState) => {
    setFormData((prev) => ({
      ...prev,
      realityCheck: data,
    }));
  };

  // Step 2: Career snapshot data change handler
  const handleCareerSnapshotChange = (data: CareerSnapshotInput) => {
    setFormData((prev) => ({
      ...prev,
      careerSnapshot: data,
    }));
  };

  // Step 3: Idea data change handler
  const handleIdeaChange = (data: IdeaInputType) => {
    setFormData((prev) => ({
      ...prev,
      idea: data,
    }));
  };

  // Move to next step
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Move to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navigate back to landing
  const handleNavigateBack = () => {
    if (currentStep > 1) {
      handleBack();
    } else {
      router.push('/');
    }
  };

  // Close and return to landing
  const handleClose = () => {
    router.push('/');
  };

  // Final submit and generate report
  const handleSubmit = async () => {
    const { weeklyHours, budgetLimit, failureTolerance } = formData.realityCheck;
    if (!weeklyHours || !budgetLimit || !failureTolerance) {
      setError('현실 점검 항목을 모두 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    setLoadingProgress({
      realityReport: 'loading',
      incomeMap: 'pending',
      decisionQuestions: 'pending',
    });

    try {
      const response = await fetch(API_ENDPOINTS.COMPLETE_REPORT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setLoadingProgress({
        realityReport: 'complete',
        incomeMap: 'loading',
        decisionQuestions: 'pending',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || ERROR_MESSAGES.API_ERROR);
      }

      const reportData = await response.json();

      setLoadingProgress({
        realityReport: 'complete',
        incomeMap: 'complete',
        decisionQuestions: 'loading',
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoadingProgress({
        realityReport: 'complete',
        incomeMap: 'complete',
        decisionQuestions: 'complete',
      });

      await new Promise((resolve) => setTimeout(resolve, 300));

      sessionStorage.setItem('myoi-report-data', JSON.stringify(reportData));
      router.push('/report');
    } catch (err) {
      console.error('Report generation error:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(ERROR_MESSAGES.UNKNOWN_ERROR);
      }

      setLoadingProgress({
        realityReport: 'pending',
        incomeMap: 'pending',
        decisionQuestions: 'pending',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen when loading
  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FAF8F5]">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={handleNavigateBack}
            className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <h1 className="text-[16px] font-semibold text-[#1A1A1A]">
            커리어 전환 진단
          </h1>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-[#1A1A1A]" />
          </button>
        </div>

        {/* Step bar */}
        <ProgressIndicator currentStep={currentStep} />
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-6">
        {/* Step components */}
        {currentStep === 1 && (
          <RealityCheck
            data={formData.realityCheck}
            onChange={handleRealityCheckChange}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <CareerSnapshot
            data={formData.careerSnapshot}
            onChange={handleCareerSnapshotChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <IdeaInput
            data={formData.idea}
            onChange={handleIdeaChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isLoading={isLoading}
          />
        )}

        {/* Error message */}
        {error && (
          <div className="mt-6">
            <div className="rounded-[12px] bg-red-50 border border-red-200 p-4">
              <h3 className="font-semibold text-red-700 mb-2 text-[14px]">오류가 발생했습니다</h3>
              <p className="text-[13px] text-red-600">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-3 text-[13px] text-red-700 underline hover:no-underline"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
