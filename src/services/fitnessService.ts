
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { enhancedFitnessService } from './enhancedFitnessService';

// Legacy interface for backward compatibility
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

// Updated to use enhanced service for new functionality
export async function saveFitnessCalculation(calculation: FitnessCalculation) {
  try {
    // Convert legacy format to new format for backward compatibility
    const formData = {
      height: calculation.height,
      weight: calculation.weight,
      age: calculation.age,
      exerciseMinutes: parseInt(calculation.activityLevel) || 0,
      heightUnit: 'cm' as const,
      weightUnit: 'kg' as const,
      goodSleepQuality: 'yes' as const,
      smokingStatus: 'never' as const, // Fix: specify exact type
      alcoholUnits: 0,
      diabetesLevel: 0,
      hypertensionLevel: 0,
      heartRelatedLevel: 0,
      cancerLevel: 0,
      othersLevel: 0,
      stressLevel: 'none' as const,
      gender: 'male' as const,
      name: '',
      email: '',
      phone: ''
    };

    const result = {
      score: calculation.score,
      recommendations: calculation.recommendations.map(text => ({
        text,
        impact: 'Medium Impact',
        priority: 'medium'
      })),
      normalizedValues: {}
    };

    return await enhancedFitnessService.saveAuthenticatedCalculation(
      formData,
      result,
      calculation.profileId
    );
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err };
  }
}

export async function getFitnessCalculations(profileId: string) {
  try {
    return await enhancedFitnessService.getAuthenticatedCalculations(profileId);
  } catch (err) {
    toast.error('An unexpected error occurred');
    return { success: false, error: err, data: [] };
  }
}
