
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ExtendedDatabase } from '@/integrations/supabase/schema';

export interface FitnessCalculationInput {
  height: number;
  weight: number;
  age: number;
  activityLevel: string;
  medicalConditions?: string[];
}

export interface FitnessScore {
  score: number;
  recommendations: string[];
}

export async function saveFitnessCalculation(
  profileId: string,
  input: FitnessCalculationInput,
  result: FitnessScore
) {
  try {
    const { error } = await supabase.from('fitness_calculations').insert({
      profile_id: profileId,
      height: input.height,
      weight: input.weight,
      age: input.age,
      activity_level: input.activityLevel,
      medical_conditions: input.medicalConditions || [],
      score: result.score,
      recommendations: result.recommendations,
    });

    if (error) {
      toast.error('Could not save fitness calculation');
      return { success: false, error };
    }

    toast.success('Fitness calculation saved successfully');
    return { success: true };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function getFitnessHistory(profileId: string) {
  try {
    const { data, error } = await supabase
      .from('fitness_calculations')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Could not fetch fitness history');
      return { success: false, error, data: [] };
    }

    return { success: true, data };
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err, data: [] };
  }
}
