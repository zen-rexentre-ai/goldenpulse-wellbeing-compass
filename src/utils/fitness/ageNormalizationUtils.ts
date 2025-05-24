
/**
 * @ai_context
 * - Age-specific normalization functions for Indian senior health metrics
 * - Implements ICMR and WHO guidelines adapted for Indian population
 * - Accounts for physiological changes in aging process
 * - Critical for accurate fitness scoring across age groups
 */

import { AGE_FACTORS, HBA1C_AGE_FACTORS } from './constants';

/**
 * Get age group category for normalization
 * @ai_context
 * - Maps continuous age to discrete clinical age groups
 * - Aligns with geriatric medicine age classifications
 * - Used consistently across all age-based normalizations
 */
function getAgeGroup(age: number): keyof typeof AGE_FACTORS {
  // #ai-reason: Clinical age group boundaries based on geriatric medicine
  if (age < 50) return "40-49";
  if (age < 60) return "50-59";
  if (age < 70) return "60-69";
  if (age < 80) return "70-79";
  return "80+";
}

/**
 * Normalize BMI with age-specific optimal ranges
 * @ai_context
 * - BMI calculation with Indian population considerations
 * - Age-adjusted optimal ranges (increases with age for seniors)
 * - Handles both metric and imperial units
 * - Weight: 15% of total fitness score
 */
export function normalizeBMIByAge(
  height: number, 
  weight: number, 
  isMetric: boolean, 
  age: number,
  directBMI?: number
): number {
  let bmi: number;
  
  if (directBMI) {
    // #ai-reason: Direct BMI input bypasses height/weight calculation
    bmi = directBMI;
  } else {
    // #ai-reason: Calculate BMI from height/weight with unit conversion
    if (isMetric) {
      bmi = weight / Math.pow(height / 100, 2);
    } else {
      // Convert imperial to metric for calculation
      const heightMeters = height * 0.0254;
      const weightKg = weight * 0.453592;
      bmi = weightKg / Math.pow(heightMeters, 2);
    }
  }

  const ageGroup = getAgeGroup(age);
  const { optimal, range } = AGE_FACTORS[ageGroup].bmi;
  
  // #ai-reason: Gaussian normalization around age-specific optimal BMI
  const deviation = Math.abs(bmi - optimal);
  const normalizedDeviation = Math.min(deviation / range, 3); // Cap at 3 standard deviations
  
  return Math.max(0, 1 - (normalizedDeviation / 3));
}

/**
 * Normalize resting heart rate by age
 * @ai_context
 * - Heart rate normalization with age-specific optimal ranges
 * - Accounts for natural increase in resting HR with aging
 * - Critical cardiovascular health indicator
 * - Weight: 10% of total fitness score
 */
export function normalizeHeartRateByAge(heartRate: number, age: number): number {
  const ageGroup = getAgeGroup(age);
  const { optimal, range } = AGE_FACTORS[ageGroup].heartRate;
  
  // #ai-reason: Heart rate outside 40-120 BPM range indicates medical attention needed
  if (heartRate < 40 || heartRate > 120) {
    return 0.1; // Very low score for dangerous ranges
  }
  
  const deviation = Math.abs(heartRate - optimal);
  const normalizedDeviation = Math.min(deviation / range, 3);
  
  return Math.max(0.1, 1 - (normalizedDeviation / 3));
}

/**
 * Normalize exercise minutes with age considerations
 * @ai_context
 * - Exercise normalization adapted for senior capabilities
 * - Follows WHO recommendations for older adults (150 min/week moderate)
 * - Accounts for mobility limitations and joint health
 * - Weight: 20% of total fitness score (highest weight)
 */
export function normalizeExerciseByAge(minutes: number, age: number): number {
  // #ai-reason: WHO recommends 150 minutes moderate exercise per week for seniors
  const baseTarget = 150;
  
  // #ai-reason: Reduce target by 10% per decade after 70 for realistic expectations
  let ageAdjustedTarget = baseTarget;
  if (age >= 70) {
    const decadesOver70 = Math.floor((age - 70) / 10);
    ageAdjustedTarget = baseTarget * Math.pow(0.9, decadesOver70);
  }
  
  // #ai-reason: Progressive scoring with diminishing returns after target
  if (minutes >= ageAdjustedTarget) {
    return 1.0;
  } else if (minutes >= ageAdjustedTarget * 0.75) {
    return 0.8 + (0.2 * (minutes / ageAdjustedTarget));
  } else if (minutes >= ageAdjustedTarget * 0.5) {
    return 0.6 + (0.2 * (minutes / (ageAdjustedTarget * 0.75)));
  } else if (minutes >= ageAdjustedTarget * 0.25) {
    return 0.4 + (0.2 * (minutes / (ageAdjustedTarget * 0.5)));
  } else {
    return Math.max(0.1, 0.4 * (minutes / (ageAdjustedTarget * 0.25)));
  }
}

/**
 * Normalize HbA1c with age-specific targets
 * @ai_context
 * - HbA1c normalization for diabetes management
 * - Age-relaxed targets per ADA guidelines for seniors
 * - Critical for Indian population with high diabetes prevalence
 * - Integrated into chronic conditions assessment
 */
export function normalizeHbA1cByAge(hba1c: number | undefined, age: number): number {
  // #ai-reason: Default to good score if HbA1c not provided
  if (!hba1c) return 0.8;
  
  const ageGroup = getAgeGroup(age);
  const { optimal, range } = HBA1C_AGE_FACTORS[ageGroup];
  
  // #ai-reason: HbA1c > 10% indicates very poor diabetes control
  if (hba1c > 10) return 0.1;
  
  const deviation = Math.max(0, hba1c - optimal);
  const normalizedDeviation = Math.min(deviation / range, 4);
  
  return Math.max(0.1, 1 - (normalizedDeviation / 4));
}

/**
 * Normalize blood pressure with age considerations
 * @ai_context
 * - Blood pressure normalization with age-adjusted targets
 * - Accounts for age-related vascular changes
 * - Follows AHA guidelines with senior considerations
 * - Critical cardiovascular risk indicator
 */
export function normalizeBloodPressureByAge(
  systolic: number | undefined,
  diastolic: number | undefined,
  age: number
): number {
  // #ai-reason: Default to moderate score if BP not provided
  if (!systolic || !diastolic) return 0.7;
  
  const ageGroup = getAgeGroup(age);
  const { systolic: sysTarget, diastolic: diaTarget } = AGE_FACTORS[ageGroup].bloodPressure;
  
  // #ai-reason: Dangerous BP ranges require immediate medical attention
  if (systolic > 180 || diastolic > 110 || systolic < 90 || diastolic < 60) {
    return 0.1;
  }
  
  // #ai-reason: Calculate combined deviation from optimal ranges
  const sysDeviation = Math.abs(systolic - sysTarget.optimal) / sysTarget.range;
  const diaDeviation = Math.abs(diastolic - diaTarget.optimal) / diaTarget.range;
  
  const avgDeviation = (sysDeviation + diaDeviation) / 2;
  const normalizedDeviation = Math.min(avgDeviation, 3);
  
  return Math.max(0.1, 1 - (normalizedDeviation / 3));
}

/**
 * Get age-appropriate exercise recommendations
 * @ai_context
 * - Provides age-specific exercise guidance
 * - Considers mobility and safety factors
 * - Aligns with geriatric exercise physiology
 */
export function getAgeApropriateExerciseTarget(age: number): {
  weeklyMinutes: number;
  intensity: string;
  types: string[];
} {
  const baseTarget = 150;
  
  if (age >= 80) {
    return {
      weeklyMinutes: Math.round(baseTarget * 0.8),
      intensity: 'Light to moderate',
      types: ['Chair exercises', 'Gentle yoga', 'Short walks', 'Balance training']
    };
  } else if (age >= 70) {
    return {
      weeklyMinutes: Math.round(baseTarget * 0.9),
      intensity: 'Moderate',
      types: ['Walking', 'Swimming', 'Tai chi', 'Light resistance training']
    };
  } else {
    return {
      weeklyMinutes: baseTarget,
      intensity: 'Moderate to vigorous',
      types: ['Brisk walking', 'Cycling', 'Swimming', 'Resistance training']
    };
  }
}
