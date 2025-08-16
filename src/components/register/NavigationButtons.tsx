
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  step, 
  prevStep, 
  nextStep, 
  isSubmitting = false, 
  disabled = false 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {step > 1 && (
        <Button 
          variant="outline" 
          className="w-full sm:w-auto" 
          onClick={prevStep}
          disabled={isSubmitting || disabled}
        >
          Back
        </Button>
      )}
      <Button 
        className="w-full sm:flex-1" 
        onClick={nextStep}
        disabled={isSubmitting || disabled}
      >
        {isSubmitting ? 'Processing...' : (step < 3 ? 'Continue' : 'Complete Registration')}
      </Button>
    </div>
  );
};

export default NavigationButtons;
