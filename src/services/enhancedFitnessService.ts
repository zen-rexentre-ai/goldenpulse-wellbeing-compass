import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FitnessFormValues } from '@/components/fitness/form/types';
import { FitnessScoreResult } from '@/utils/fitness/types';

export interface ComprehensiveFitnessCalculation {
  id?: string;
  profileId?: string;
  sessionId?: string;
  
  // Basic info
  height: number;
  weight: number;
  age: number;
  gender?: string;
  heightUnit: string;
  weightUnit: string;
  
  // Lifestyle data
  exerciseMinutes?: number;
  goodSleepQuality?: boolean;
  smokingStatus?: string;
  alcoholUnits?: number;
  stressLevel?: number;
  
  // Health metrics
  heartRate?: number;
  systolicBp?: number;
  diastolicBp?: number;
  hba1c?: number;
  
  // Results
  score: number;
  createdAt?: string;
}

export interface MedicalCondition {
  conditionType: string;
  severityLevel: number;
}

export interface Recommendation {
  text: string;
  impact: string;
  priority: string;
}

export class EnhancedFitnessService {
  /**
   * Save fitness calculation for authenticated users
   */
  async saveAuthenticatedCalculation(
    formData: FitnessFormValues,
    result: FitnessScoreResult,
    profileId: string
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      // Insert main calculation record with all new fields
      const { data: calculationData, error: calculationError } = await supabase
        .from('fitness_calculations')
        .insert({
          profile_id: profileId,
          height: formData.height || 0,
          weight: formData.weight || 0,
          age: formData.age || 0,
          activity_level: `${formData.exerciseMinutes || 0} minutes per week`,
          score: result.score,
          recommendations: result.recommendations.map(r => r.text),
          // New extended fields - these will be ignored if columns don't exist yet
          exercise_minutes: formData.exerciseMinutes,
          good_sleep_quality: formData.goodSleepQuality === 'yes',
          smoking_status: formData.smokingStatus,
          alcohol_units: formData.alcoholUnits,
          stress_level: formData.stressLevel === 'high' ? 2 : formData.stressLevel === 'mild' ? 1 : 0,
          heart_rate: formData.heartRate,
          systolic_bp: formData.systolicBP,
          diastolic_bp: formData.diastolicBP,
          hba1c: formData.hba1c,
          height_unit: formData.heightUnit,
          weight_unit: formData.weightUnit,
          gender: formData.gender
        })
        .select()
        .single();

      if (calculationError) {
        console.error('Error saving calculation:', calculationError);
        toast.error('Failed to save health calculation');
        return { success: false, error: calculationError };
      }

      // For now, we'll skip saving medical conditions and recommendations to separate tables
      // since the new tables may not exist yet. The main calculation is saved successfully.
      console.log('Health calculation saved successfully, extended data storage coming soon');

      toast.success('Health calculation saved successfully!');
      return { success: true, data: calculationData };

    } catch (error) {
      console.error('Unexpected error saving calculation:', error);
      toast.error('An unexpected error occurred while saving');
      return { success: false, error };
    }
  }

  /**
   * Save fitness calculation for anonymous users using the new comprehensive table
   */
  async saveAnonymousCalculation(
    formData: FitnessFormValues,
    result: FitnessScoreResult,
    sessionToken?: string
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      // Insert comprehensive calculation record into the new table
      const { data: calculationData, error: calculationError } = await supabase
        .from('anonymous_wellness_calculations')
        .insert({
          // Basic Information
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age || 0,
          gender: formData.gender,
          
          // Body Metrics
          height: formData.height || 0,
          weight: formData.weight || 0,
          height_unit: formData.heightUnit || 'cm',
          weight_unit: formData.weightUnit || 'kg',
          
          // Lifestyle Data
          exercise_minutes: formData.exerciseMinutes,
          good_sleep_quality: formData.goodSleepQuality === 'yes',
          smoking_status: formData.smokingStatus,
          alcohol_units: formData.alcoholUnits,
          stress_level: formData.stressLevel,
          
          // Optional Health Metrics
          heart_rate: formData.heartRate,
          systolic_bp: formData.systolicBP,
          diastolic_bp: formData.diastolicBP,
          hba1c: formData.hba1c,
          
          // Medical Conditions (text-based severity levels)
          heart_related_level: formData.heartRelatedLevel || 'none',
          cancer_level: formData.cancerLevel || 'none',
          others_level: formData.othersLevel || 'none',
          
          // Results
          calculated_score: result.score,
          recommendations: result.recommendations, // Store as JSONB
          normalized_values: result.normalizedValues, // Store as JSONB
          
          // Metadata
          session_token: sessionToken,
          calculation_date: new Date().toISOString()
        })
        .select()
        .single();

      if (calculationError) {
        console.error('Error saving anonymous calculation:', calculationError);
        toast.error('Failed to save health calculation');
        return { success: false, error: calculationError };
      }

      console.log('Anonymous wellness calculation saved successfully:', calculationData.id);
      toast.success('Health calculation saved successfully!');
      return { success: true, data: calculationData };

    } catch (error) {
      console.error('Unexpected error saving anonymous calculation:', error);
      toast.error('An unexpected error occurred while saving');
      return { success: false, error };
    }
  }

  /**
   * Get calculation history for authenticated users
   */
  async getAuthenticatedCalculations(profileId: string): Promise<{ success: boolean; data: any[]; error?: any }> {
    try {
      const { data, error } = await supabase
        .from('fitness_calculations')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching calculations:', error);
        return { success: false, data: [], error };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Unexpected error fetching calculations:', error);
      return { success: false, data: [], error };
    }
  }

  /**
   * Get latest calculation for authenticated user
   */
  async getLatestAuthenticatedCalculation(profileId: string): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      const { data, error } = await supabase
        .from('fitness_calculations')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching latest calculation:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error fetching latest calculation:', error);
      return { success: false, error };
    }
  }

  /**
   * Get anonymous wellness calculations (for admin purposes or analytics)
   */
  async getAnonymousCalculations(limit: number = 100): Promise<{ success: boolean; data: any[]; error?: any }> {
    try {
      const { data, error } = await supabase
        .from('anonymous_wellness_calculations')
        .select('*')
        .order('calculation_date', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching anonymous calculations:', error);
        return { success: false, data: [], error };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Unexpected error fetching anonymous calculations:', error);
      return { success: false, data: [], error };
    }
  }
}

// Export singleton instance
export const enhancedFitnessService = new EnhancedFitnessService();
