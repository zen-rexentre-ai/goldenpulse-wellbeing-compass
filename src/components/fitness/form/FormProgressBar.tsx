
import React from 'react';

interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgressBar: React.FC<FormProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
      <div 
        className="bg-primary h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default FormProgressBar;
