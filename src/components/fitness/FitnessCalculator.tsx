
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FitnessCalculatorForm from './FitnessCalculatorForm';
import { FitnessFormValues } from './form/types';
import FitnessCalculatorResults from './FitnessCalculatorResults';
import { calculateFitnessScore } from '@/utils/fitnessScoreUtils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';
import { useAnonymousSession } from '@/hooks/useAnonymousSession';
import { saveAnonymousFitnessCalculation, AnonymousFitnessCalculation } from '@/services/anonymousFitnessService';

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
  const { t } = useLanguage();
  const { sessionToken, isInitialized: isSessionInitialized } = useAnonymousSession();

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

  const handleSaveCalculation = async () => {
    if (!calculationResult || !formData) return;

    if (!isSessionInitialized || !sessionToken) {
      toast.error("Anonymous session is not ready. Please try again in a moment.");
      return;
    }
    
    const chronicConditions = [
      { condition_type: 'diabetes', severity_level: formData.diabetesLevel },
      { condition_type: 'hypertension', severity_level: formData.hypertensionLevel },
      { condition_type: 'heart_related', severity_level: formData.heartRelatedLevel },
      { condition_type: 'cancer', severity_level: formData.cancerLevel },
      { condition_type: 'others', severity_level: formData.othersLevel },
    ].filter(c => c.severity_level > 0);

    const payload: AnonymousFitnessCalculation = {
      height: formData.height,
      weight: formData.weight,
      height_unit: formData.heightUnit,
      weight_unit: formData.weightUnit,
      age: formData.age,
      gender: formData.gender,
      exercise_minutes: formData.exerciseMinutes,
      good_sleep_quality: formData.goodSleepQuality === 'yes',
      smoking_status: formData.smokingStatus,
      alcohol_units: formData.alcoholUnits,
      stress_level: formData.stressLevel,
      heart_rate: formData.heartRate,
      systolic_bp: formData.systolicBP,
      diastolic_bp: formData.diastolicBP,
      hba1c: formData.hba1c,
      chronicConditions,
      score: calculationResult.score,
      recommendations: calculationResult.recommendations,
    };

    await saveAnonymousFitnessCalculation(payload);
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
            <ScreenReader text={"Welcome to our Health Score Calculator.  Enter your Basic details, BMI, Lifestyle information, Some Health data to generate your own health score."} />
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
            onSave={handleSaveCalculation}
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
