
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FitnessCalculatorForm from '@/components/fitness/FitnessCalculatorForm';
import { FitnessFormValues } from '@/components/fitness/form/types';
import FitnessCalculatorResults from '@/components/fitness/FitnessCalculatorResults';
import { calculateFitnessScore } from '@/utils/fitnessScoreUtils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';
import { enhancedFitnessService } from '@/services/enhancedFitnessService';

const WellnessCalculator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FitnessFormValues | null>(null);
  const [calculationResult, setCalculationResult] = useState<{
    score: number;
    recommendations: Array<{text: string; impact: string; priority: string}>;
    normalizedValues: {[key: string]: number};
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaved, setIsAutoSaved] = useState(false);
  const { t } = useLanguage();

  const handleFormSubmit = async (values: FitnessFormValues) => {
    setFormData(values);
    setIsCalculating(true);
    setIsAutoSaved(false);
    
    // Convert form values to fitness calculation format
    const fitnessData = {
      // Basic required fields from FitnessParameters
      bmi: 0, // Will be calculated in the utility function
      exerciseMinutes: values.exerciseMinutes || 0,
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
      
      // Convert text-based severity levels to chronic conditions format
      chronicConditions: {
        diabetes: 0, // Removed from form
        hypertension: 0, // Removed from form
        heartRelated: values.heartRelatedLevel === 'severe' ? 75 : values.heartRelatedLevel === 'moderate' ? 50 : values.heartRelatedLevel === 'mild' ? 25 : 0,
        cancer: values.cancerLevel === 'severe' ? 75 : values.cancerLevel === 'moderate' ? 50 : values.cancerLevel === 'mild' ? 25 : 0,
        others: values.othersLevel === 'severe' ? 75 : values.othersLevel === 'moderate' ? 50 : values.othersLevel === 'mild' ? 25 : 0
      }
    };
    
    // Simulate calculation delay, then auto-save
    setTimeout(async () => {
      const result = calculateFitnessScore(fitnessData);
      setCalculationResult(result);
      setIsCalculating(false);
      
      // Automatically save the calculation
      setIsSaving(true);
      try {
        const sessionToken = `anonymous-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const saveResult = await enhancedFitnessService.saveAnonymousCalculation(
          values,
          result,
          sessionToken
        );

        if (saveResult.success) {
          setIsAutoSaved(true);
          toast.success("Health calculation completed and saved automatically!");
        } else {
          toast.error("Calculation completed but failed to save. You can try saving manually.");
        }
      } catch (error) {
        console.error('Error auto-saving calculation:', error);
        toast.error("Calculation completed but auto-save failed. You can try saving manually.");
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };

  const handleManualSave = async () => {
    if (!formData || !calculationResult) {
      toast.error("No calculation to save");
      return;
    }

    setIsSaving(true);
    
    try {
      const sessionToken = `anonymous-manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const result = await enhancedFitnessService.saveAnonymousCalculation(
        formData,
        calculationResult,
        sessionToken
      );

      if (result.success) {
        setIsAutoSaved(true);
        toast.success("Health calculation saved successfully!");
      } else {
        toast.error("Failed to save calculation. Please try again.");
      }
    } catch (error) {
      console.error('Error saving calculation:', error);
      toast.error("An error occurred while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(null);
    setCalculationResult(null);
    setIsAutoSaved(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {t("health_score_calculator")}
                <Badge variant="outline" className="bg-primary/10">Beta</Badge>
              </h1>
              <p className="text-muted-foreground">Calculate your personalized wellness score</p>
            </div>
          </div>
          <ScreenReader text={"Welcome to our Health Score Calculator. Enter your Basic details, BMI, Lifestyle information, Some Health data to generate your own health score."} />
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-lg border p-6">
          {isCalculating || isSaving ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">
                {isCalculating ? "Calculating your health score..." : "Saving your results..."}
              </p>
            </div>
          ) : calculationResult ? (
            <FitnessCalculatorResults 
              score={calculationResult.score}
              recommendations={calculationResult.recommendations}
              normalizedValues={calculationResult.normalizedValues}
              onSave={handleManualSave}
              onReset={handleReset}
              isSaving={isSaving}
              isAutoSaved={isAutoSaved}
            />
          ) : (
            <FitnessCalculatorForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WellnessCalculator;
