
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
      // Insert main calculation record
      const { data: calculationData, error: calculationError } = await supabase
        .from('fitness_calculations')
        .insert({
          profile_id: profileId,
          height: formData.height || 0,
          weight: formData.weight || 0,
          age: formData.age || 0,
          activity_level: `${formData.exerciseMinutes || 0} minutes per week`,
          score: result.score,
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
          gender: formData.gender,
          recommendations: result.recommendations.map(r => r.text)
        })
        .select()
        .single();

      if (calculationError) {
        console.error('Error saving calculation:', calculationError);
        toast.error('Failed to save health calculation');
        return { success: false, error: calculationError };
      }

      // Save medical conditions if present
      if (calculationData) {
        const conditions: MedicalCondition[] = [
          { conditionType: 'diabetes', severityLevel: formData.diabetesLevel || 0 },
          { conditionType: 'hypertension', severityLevel: formData.hypertensionLevel || 0 },
          { conditionType: 'heart_related', severityLevel: formData.heartRelatedLevel || 0 },
          { conditionType: 'cancer', severityLevel: formData.cancerLevel || 0 },
          { conditionType: 'others', severityLevel: formData.othersLevel || 0 }
        ].filter(condition => condition.severityLevel > 0);

        if (conditions.length > 0) {
          const conditionsToInsert = conditions.map(condition => ({
            calculation_id: calculationData.id,
            condition_type: condition.conditionType,
            severity_level: condition.severityLevel
          }));

          const { error: conditionsError } = await supabase
            .from('fitness_medical_conditions')
            .insert(conditionsToInsert);

          if (conditionsError) {
            console.error('Error saving medical conditions:', conditionsError);
          }
        }

        // Save recommendations
        if (result.recommendations.length > 0) {
          const recommendationsToInsert = result.recommendations.map(rec => ({
            calculation_id: calculationData.id,
            recommendation_text: rec.text,
            impact: rec.impact,
            priority: rec.priority
          }));

          const { error: recommendationsError } = await supabase
            .from('fitness_recommendations')
            .insert(recommendationsToInsert);

          if (recommendationsError) {
            console.error('Error saving recommendations:', recommendationsError);
          }
        }
      }

      toast.success('Health calculation saved successfully!');
      return { success: true, data: calculationData };

    } catch (error) {
      console.error('Unexpected error saving calculation:', error);
      toast.error('An unexpected error occurred while saving');
      return { success: false, error };
    }
  }

  /**
   * Save fitness calculation for anonymous users
   */
  async saveAnonymousCalculation(
    formData: FitnessFormValues,
    result: FitnessScoreResult,
    sessionToken: string
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    try {
      // Get session ID from token
      const { data: sessionData } = await supabase.rpc('get_anonymous_session_id', {
        p_session_token: sessionToken
      });

      if (!sessionData) {
        toast.error('Session expired. Please refresh and try again.');
        return { success: false, error: 'Invalid session' };
      }

      // Insert main calculation record
      const { data: calculationData, error: calculationError } = await supabase
        .from('anonymous_health_calculations')
        .insert({
          session_id: sessionData,
          height: formData.height || 0,
          weight: formData.weight || 0,
          age: formData.age || 0,
          exercise_minutes: formData.exerciseMinutes,
          good_sleep_quality: formData.goodSleepQuality === 'yes',
          smoking_status: formData.smokingStatus,
          alcohol_units: formData.alcoholUnits,
          stress_level: formData.stressLevel === 'high' ? 2 : formData.stressLevel === 'mild' ? 1 : 0,
          heart_rate: formData.heartRate,
          systolic_bp: formData.systolicBP,
          diastolic_bp: formData.diastolicBP,
          hba1c: formData.hba1c,
          height_unit: formData.heightUnit || 'cm',
          weight_unit: formData.weightUnit || 'kg',
          gender: formData.gender,
          score: result.score
        })
        .select()
        .single();

      if (calculationError) {
        console.error('Error saving anonymous calculation:', calculationError);
        toast.error('Failed to save health calculation');
        return { success: false, error: calculationError };
      }

      // Save medical conditions and recommendations for anonymous users
      if (calculationData) {
        // Save medical conditions
        const conditions = [
          { conditionType: 'diabetes', severityLevel: formData.diabetesLevel || 0 },
          { conditionType: 'hypertension', severityLevel: formData.hypertensionLevel || 0 },
          { conditionType: 'heart_related', severityLevel: formData.heartRelatedLevel || 0 },
          { conditionType: 'cancer', severityLevel: formData.cancerLevel || 0 },
          { conditionType: 'others', severityLevel: formData.othersLevel || 0 }
        ].filter(condition => condition.severityLevel > 0);

        if (conditions.length > 0) {
          const conditionsToInsert = conditions.map(condition => ({
            calculation_id: calculationData.id,
            condition_type: condition.conditionType,
            severity_level: condition.severityLevel
          }));

          await supabase
            .from('anonymous_medical_conditions')
            .insert(conditionsToInsert);
        }

        // Save recommendations
        if (result.recommendations.length > 0) {
          const recommendationsToInsert = result.recommendations.map(rec => ({
            calculation_id: calculationData.id,
            recommendation_text: rec.text,
            impact: rec.impact,
            priority: rec.priority
          }));

          await supabase
            .from('anonymous_recommendations')
            .insert(recommendationsToInsert);
        }
      }

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
        .select(`
          *,
          fitness_medical_conditions (*),
          fitness_recommendations (*)
        `)
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
        .select(`
          *,
          fitness_medical_conditions (*),
          fitness_recommendations (*)
        `)
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
}

// Export singleton instance
export const enhancedFitnessService = new EnhancedFitnessService();
