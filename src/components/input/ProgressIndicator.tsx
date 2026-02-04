/**
 * Progress step bar component
 * Displays 3 horizontal bars indicating current step progress
 */

interface ProgressIndicatorProps {
  /** Current step (1-3) */
  currentStep: number;
}

/**
 * ProgressIndicator component
 *
 * Simple 3-bar step indicator.
 * Active/completed bars use $primary color, inactive bars use $border color.
 */
export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex gap-1 px-6">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-1 flex-1 rounded-sm ${
            step <= currentStep ? 'bg-[#2563EB]' : 'bg-[#E5E7EB]'
          }`}
        />
      ))}
    </div>
  );
}
