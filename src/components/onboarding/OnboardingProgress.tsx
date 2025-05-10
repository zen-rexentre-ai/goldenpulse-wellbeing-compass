
import React from 'react';
import { cn } from '@/lib/utils';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const steps = [
    'Wellness Goals', 
    'Medications', 
    'Appointments', 
    'Vitals', 
    'Documents', 
    'Volunteering Preferences', 
    'Extended Profile'
  ];

  return (
    <div className="w-full">
      <div className="hidden sm:flex justify-between mb-2">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className={cn(
              "text-xs font-medium transition-colors",
              currentStep > idx ? "text-primary" : 
              currentStep === idx + 1 ? "text-primary" : 
              "text-muted-foreground"
            )}
            style={{ width: `${100 / totalSteps}%`, textAlign: 'center' }}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="sm:hidden text-center mb-2">
        <span className="text-primary font-medium">{steps[currentStep - 1]}</span>
        <span className="text-muted-foreground"> ({currentStep}/{totalSteps})</span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default OnboardingProgress;
