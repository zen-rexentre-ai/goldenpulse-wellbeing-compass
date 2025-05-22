
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

// Import form components
import Step1BasicInfo from './form/Step1BasicInfo';
import Step2BodyMetrics from './form/Step2BodyMetrics';
import Step3Lifestyle from './form/Step3Lifestyle';
import Step4HealthStatus from './form/Step4HealthStatus';
import FormProgressBar from './form/FormProgressBar';
import FormNavigation from './form/FormNavigation';
import { formSchema, FitnessFormValues } from './form/types';

interface FitnessCalculatorFormProps {
  onSubmit: (values: FitnessFormValues) => void;
}

export const FitnessCalculatorForm: React.FC<FitnessCalculatorFormProps> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const form = useForm<FitnessFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      height: undefined,
      heightUnit: "cm",
      weight: undefined,
      weightUnit: "kg",
      goodSleepQuality: "yes",
      exerciseMinutes: 150,
      smokingStatus: "never",
      alcoholUnits: 0,
      diabetesLevel: 0,
      hypertensionLevel: 0,
      heartRelatedLevel: 0,
      cancerLevel: 0,
      othersLevel: 0,
      stressLevel: "none",
      heartRate: undefined,
      hba1c: undefined,
      systolicBP: undefined,
      diastolicBP: undefined,
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["name", "email", "phone"],
      2: ["height", "weight"],
      3: ["goodSleepQuality", "smokingStatus", "alcoholUnits"],
    }[step] as Array<keyof FitnessFormValues>;
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = (values: FitnessFormValues) => {
    onSubmit(values);
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1BasicInfo form={form} />;
      case 2:
        return <Step2BodyMetrics form={form} />;
      case 3:
        return <Step3Lifestyle form={form} />;
      case 4:
        return <Step4HealthStatus form={form} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Progress bar */}
        <FormProgressBar currentStep={step} totalSteps={totalSteps} />
        
        {/* Form step content */}
        {renderStep()}
        
        {/* Navigation Buttons */}
        <FormNavigation 
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          isSubmit={step === totalSteps}
        />
      </form>
    </Form>
  );
};

export default FitnessCalculatorForm;
