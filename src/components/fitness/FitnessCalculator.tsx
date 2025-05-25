import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FitnessCalculatorForm from './FitnessCalculatorForm';
import { FitnessFormValues } from './form/types';
import FitnessCalculatorResults from './FitnessCalculatorResults';
import { calculateFitnessScore } from '@/utils/fitnessScoreUtils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

interface FitnessCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FitnessCalculator: React.FC<FitnessCalculatorProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [formData, setFormData] = useState<FitnessFormValues | null>(null);
  const [calculationResult, setCalculationResult] = useState<{
    score: number;
    recommendations: Array<{text: string; impact: string; priority: string}>;
    normalizedValues: {[key: string]: number};
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFormSubmit = (values: FitnessFormValues) => {
    setFormData(values);
    setIsCalculating(true);
    
    // Convert form values to fitness calculation format
    const fitnessData = {
      // Basic required fields from FitnessParameters
      bmi: 0, // Will be calculated in the utility function
      exerciseMinutes: values.exerciseMinutes || 0, // Ensure this is always provided
      goodSleepQuality: values.goodSleepQuality === 'yes',
      smokingStatus: values.smokingStatus || 'never',
      alcoholUnits: values.alcoholUnits || 0,
      
      // Additional fields for extended calculation
      age: values.age,
      email: values.email,
      gender: values.gender,
      height: values.height,
      weight: values.weight,
      isMetric: values.heightUnit === 'cm' && values.weightUnit === 'kg',
      heartRate: values.heartRate,
      stressLevel: values.stressLevel,
      hba1c: values.hba1c,
      systolicBP: values.systolicBP,
      diastolicBP: values.diastolicBP,
      
      // Convert slider values to chronic conditions format
      chronicConditions: {
        diabetes: values.diabetesLevel,
        hypertension: values.hypertensionLevel,
        heartRelated: values.heartRelatedLevel,
        cancer: values.cancerLevel,
        others: values.othersLevel
      }
    };
    
    // Simulate calculation delay
    setTimeout(() => {
      const result = calculateFitnessScore(fitnessData);
      setCalculationResult(result);
      setIsCalculating(false);
    }, 1000);
  };

  const handleSaveReport = () => {
    // This would connect to Supabase in a real implementation
    toast({
      title: "Report Saved",
      description: "Your health assessment has been saved and emailed to you.",
    });
  };

  const handleReset = () => {
    setFormData(null);
    setCalculationResult(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset the form state when closing
    setTimeout(() => {
      if (!open) {
        handleReset();
      }
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {t("health_score_calculator")}
              <Badge variant="outline" className="ml-2 bg-primary/10">Beta</Badge>
            </DialogTitle>
            <ScreenReader text={t("health_score_calculator.  Enter your Basic details, BMI, Lifestyle information, Some Health data to generate your own health score.")} />
          </div>
        </DialogHeader>
        
        {isCalculating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Calculating your health score...</p>
          </div>
        ) : calculationResult ? (
          <FitnessCalculatorResults 
            score={calculationResult.score}
            recommendations={calculationResult.recommendations}
            normalizedValues={calculationResult.normalizedValues}
            onSave={handleSaveReport}
            onReset={handleReset}
          />
        ) : (
          <FitnessCalculatorForm onSubmit={handleFormSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FitnessCalculator;
