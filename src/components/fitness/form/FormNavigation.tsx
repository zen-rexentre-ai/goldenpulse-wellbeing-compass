
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmit?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isSubmit = false
}) => {
  return (
    <div className="flex justify-between pt-2">
      {currentStep > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button 
          type="button" 
          onClick={onNext}
          className="ml-auto flex items-center"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type={isSubmit ? "submit" : "button"}
          className="ml-auto"
          onClick={isSubmit ? undefined : onNext}
        >
          Calculate Score
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
