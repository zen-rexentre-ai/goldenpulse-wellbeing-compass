
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AnonymousFitnessCalculation {
  height: number;
  weight: number;
  height_unit: 'cm' | 'in';
  weight_unit: 'kg' | 'lb';
  age: number;
  gender: 'male' | 'female' | 'other';
  exercise_minutes: number;
  good_sleep_quality: boolean;
  smoking_status?: 'never' | 'former' | 'current';
  alcohol_units?: number;
  stress_level: 'none' | 'mild' | 'high';
  heart_rate?: number;
  systolic_bp?: number;
  diastolic_bp?: number;
  hba1c?: number;
  chronicConditions: Array<{ condition_type: string; severity_level: number }>;
  score: number;
  recommendations: Array<{ text: string; impact: string; priority: string }>;
}

const getStressLevelInt = (level: 'none' | 'mild' | 'high') => {
  if (level === 'mild') return 1;
  if (level === 'high') return 2;
  return 0;
};

export async function saveAnonymousFitnessCalculation(
  calculation: AnonymousFitnessCalculation
) {
  try {
    const { data: calcData, error: calcError } = await supabase
      .from('anonymous_health_calculations')
      .insert({
        height: calculation.height,
        weight: calculation.weight,
        height_unit: calculation.height_unit === 'in' ? 'ft' : calculation.height_unit,
        weight_unit: calculation.weight_unit === 'lb' ? 'lbs' : calculation.weight_unit,
        age: calculation.age,
        gender: calculation.gender,
        exercise_minutes: calculation.exercise_minutes,
        good_sleep_quality: calculation.good_sleep_quality,
        smoking_status: calculation.smoking_status,
        alcohol_units: calculation.alcohol_units,
        stress_level: getStressLevelInt(calculation.stress_level),
        heart_rate: calculation.heart_rate,
        systolic_bp: calculation.systolic_bp,
        diastolic_bp: calculation.diastolic_bp,
        hba1c: calculation.hba1c,
        score: calculation.score,
      })
      .select('id')
      .single();

    if (calcError || !calcData) {
      console.error('Error saving anonymous health calculation:', calcError);
      toast.error('Could not save your health score. Please try again.');
      return { success: false, error: calcError };
    }
    
    const calculationId = calcData.id;

    if (calculation.chronicConditions.length > 0) {
      const conditionsToInsert = calculation.chronicConditions.map(c => ({
        calculation_id: calculationId,
        condition_type: c.condition_type,
        severity_level: c.severity_level,
      }));
      const { error: conditionsError } = await supabase
        .from('anonymous_medical_conditions')
        .insert(conditionsToInsert);
      
      if (conditionsError) console.error('Error saving medical conditions:', conditionsError);
    }
    
    if (calculation.recommendations.length > 0) {
      const recommendationsToInsert = calculation.recommendations.map(r => ({
        calculation_id: calculationId,
        recommendation_text: r.text,
        impact: r.impact,
        priority: r.priority,
      }));
      const { error: recsError } = await supabase
        .from('anonymous_recommendations')
        .insert(recommendationsToInsert);
        
      if (recsError) console.error('Error saving recommendations:', recsError);
    }

    toast.success('Your health score has been saved anonymously.');
    return { success: true, data: calcData };

  } catch (err) {
    console.error('Unexpected error in saveAnonymousFitnessCalculation:', err);
    toast.error('An unexpected error occurred while saving.');
    return { success: false, error: err };
  }
}
