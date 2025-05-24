

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface FitnessCalculation {
  id?: string;
  profileId: string;
  height: number;
  weight: number;
  age: number;
  activityLevel: string;
  medicalConditions: string[];
  score: number;
  recommendations: string[];
}

export async function saveFitnessCalculation(calculation: FitnessCalculation) {
  try {
    const { data, error } = await supabase
      .from('fitness_calculations')
      .insert({
        profile_id: calculation.profileId,
        height: calculation.height,
        weight: calculation.weight,
        age: calculation.age,
        activity_level: calculation.activityLevel,
        medical_conditions: calculation.medicalConditions,
        score: calculation.score,
        recommendations: calculation.recommendations,
      })
      .select();

    if (error) {
      toast.error('Could not save fitness calculation');
      return { success: false, error };
    }

    toast.success('Fitness calculation saved successfully');
    return { success: true, data: data[0] };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function getFitnessCalculations(profileId: string) {
  try {
    const { data, error } = await supabase
      .from('fitness_calculations')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Could not fetch fitness calculations');
      return { success: false, error, data: [] };
    }

    return { success: true, data };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err, data: [] };
  }
}

