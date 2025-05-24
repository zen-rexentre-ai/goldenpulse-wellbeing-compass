/**
 * @ai_context
 * - Core fitness calculation engine for Indian senior citizens
 * - Implements ICMR guidelines with age-specific normalization
 * - Integrates with modular architecture through fitness service
 * - Critical component for dashboard fitness score display
 */

import { FitnessParameters, FitnessScoreResult, ChronicConditions } from './fitness/types';
import { 
  normalizeBMI, 
  normalizeDirectBMI,
  normalizeHeartRate, 
  normalizeSleep, 
  normalizeExercise,
  normalizeSmoking,
  normalizeAlcohol,
  normalizeChronicConditions,
  normalizeStress,
  normalizeHbA1c,
  normalizeBloodPressure
} from './fitness/normalizationUtils';
import { generateRecommendations } from './fitness/recommendationUtils';
import { WEIGHTS, FEMALE_WEIGHTS } from './fitness/constants';

/**
 * Calculate comprehensive fitness score for Indian seniors
 * @ai_context
 * - Primary entry point for fitness calculations
 * - Handles both male/female gender-specific calculations
 * - Integrates multiple health parameters with clinical weights
 * - Returns normalized score (0-100) with actionable recommendations
 * - Used by dashboard widget and detailed analysis components
 */
export function calculateFitnessScore(data: FitnessParameters & { 
  email?: string; 
  gender?: string; 
  height?: number; 
  weight?: number; 
  isMetric?: boolean;
  chronicConditions?: ChronicConditions;
}): FitnessScoreResult {
  // #ai-reason: Extract age for age-based normalization throughout calculation
  const age = data.age || 65; // Default to 65 for seniors if not provided
  
  // #ai-reason: Use gender-specific weights for cultural appropriateness
  const weights = data.gender === 'female' ? FEMALE_WEIGHTS : WEIGHTS;
  
  // #ai-reason: Set default values for optional parameters
  const height = data.height || 0;
  const weight = data.weight || 0;
  const isMetric = data.isMetric !== undefined ? data.isMetric : true;
  
  // Calculate normalized values for each health parameter
  const normalizedValues = {
    // #ai-reason: Robust BMI handling with fallbacks and age-specific ranges - FIXED: now passing both bmi and age
    bmi: height && weight 
      ? normalizeBMI(height, weight, isMetric, age)
      : data.bmi ? normalizeDirectBMI(data.bmi, age) : 0,
    
    // #ai-reason: Heart rate normalization with age-specific optimal ranges
    heartRate: data.heartRate ? normalizeHeartRate(data.heartRate, age) : 0.7,
    
    // #ai-reason: Sleep quality impacts cognitive and physical health significantly
    sleep: normalizeSleep(data.goodSleepQuality),
    
    // #ai-reason: Exercise minutes normalized for senior fitness capabilities
    exercise: normalizeExercise(data.exerciseMinutes, age),
    
    // #ai-reason: Smoking status with graduated impact (never > former > current)
    smoking: normalizeSmoking(data.smokingStatus || 'never'),
    
    // #ai-reason: Alcohol consumption with cultural and health considerations
    alcohol: normalizeAlcohol(data.alcoholUnits || 0),
    
    // #ai-reason: Chronic conditions weighted heavily due to senior health impact
    chronicConditions: data.chronicConditions 
      ? normalizeChronicConditions(data.chronicConditions)
      : 1.0,
    
    // #ai-reason: Stress level impacts overall wellness significantly
    stress: data.stressLevel ? normalizeStress(data.stressLevel) : 0.7,
    
    // #ai-reason: HbA1c for diabetes management (critical for Indian population)
    hba1c: normalizeHbA1c(data.hba1c, age),
    
    // #ai-reason: Blood pressure with age-adjusted normal ranges
    bloodPressure: normalizeBloodPressure(data.systolicBP, data.diastolicBP, age)
  };

  // #ai-reason: Calculate weighted score using clinical importance weights
  const weightedScore = (
    normalizedValues.bmi * weights.bmi +
    normalizedValues.heartRate * weights.restingHeartRate +
    normalizedValues.sleep * weights.sleep +
    normalizedValues.exercise * weights.activity +
    normalizedValues.smoking * weights.smoking +
    normalizedValues.alcohol * weights.alcohol +
    normalizedValues.chronicConditions * weights.chronicConditions +
    normalizedValues.stress * weights.stress
  );

  // #ai-reason: Convert to 0-100 scale for user comprehension
  const finalScore = Math.round(weightedScore * 100);

  // #ai-reason: Generate actionable recommendations based on weak areas
  const recommendations = generateRecommendations(normalizedValues, data);

  return {
    score: finalScore,
    recommendations,
    normalizedValues
  };
}

/**
 * Get fitness score interpretation for UI display
 * @ai_context
 * - Provides user-friendly interpretation of numeric scores
 * - Maps clinical ranges to accessible language
 * - Used by dashboard widgets for color coding and messaging
 */
export function getFitnessScoreInterpretation(score: number): {
  level: 'excellent' | 'good' | 'fair' | 'poor';
  message: string;
  color: string;
} {
  // #ai-reason: Clinical ranges adapted for Indian senior population
  if (score >= 80) {
    return {
      level: 'excellent',
      message: 'Excellent health status for your age group',
      color: 'text-green-600'
    };
  } else if (score >= 65) {
    return {
      level: 'good',
      message: 'Good health with room for improvement',
      color: 'text-blue-600'
    };
  } else if (score >= 50) {
    return {
      level: 'fair',
      message: 'Fair health, focus on key areas',
      color: 'text-yellow-600'
    };
  } else {
    return {
      level: 'poor',
      message: 'Health concerns need attention',
      color: 'text-red-600'
    };
  }
}

/**
 * Calculate trend analysis for score changes
 * @ai_context
 * - Analyzes score changes over time periods
 * - Provides directional indicators for dashboard widgets
 * - Helps users understand their health journey progression
 */
export function calculateScoreTrend(
  currentScore: number,
  previousScore: number
): {
  change: number;
  direction: 'up' | 'down' | 'stable';
  percentage: number;
} {
  const change = currentScore - previousScore;
  const percentage = previousScore > 0 ? Math.abs((change / previousScore) * 100) : 0;
  
  // #ai-reason: 2-point threshold to avoid noise in trend analysis
  let direction: 'up' | 'down' | 'stable' = 'stable';
  if (Math.abs(change) > 2) {
    direction = change > 0 ? 'up' : 'down';
  }
  
  return {
    change: Math.abs(change),
    direction,
    percentage: Math.round(percentage)
  };
}
