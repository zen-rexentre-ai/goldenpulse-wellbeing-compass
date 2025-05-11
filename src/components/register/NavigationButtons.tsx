
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  step: number;
  prevStep: () => void;
  nextStep: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ step, prevStep, nextStep }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {step > 1 && (
        <Button variant="outline" className="w-full sm:w-auto" onClick={prevStep}>
          Back
        </Button>
      )}
      <Button className="w-full sm:flex-1" onClick={nextStep}>
        {step < 3 ? 'Continue' : 'Complete Registration'}
      </Button>
    </div>
  );
};

export default NavigationButtons;
