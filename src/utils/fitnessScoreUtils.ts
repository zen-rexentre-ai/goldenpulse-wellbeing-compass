
// This file contains core utilities for calculating the fitness score
import { WEIGHTS } from './fitness/constants';
import {
  normalizeBMI,
  normalizeHeartRate,
  normalizeSleep,
  normalizeExercise,
  normalizeSmoking,
  normalizeAlcohol,
  normalizeChronicConditions,
  normalizeStress
} from './fitness/normalizationUtils';
import { generateRecommendations } from './fitness/recommendationUtils';
import { FitnessScoreResult, ChronicConditions, FitnessParameters } from './fitness/types';

// Calculate the overall fitness score
export const calculateFitnessScore = (data: any): FitnessScoreResult => {
  // Extract and normalize parameters
  const isMetric = data.heightUnit === 'cm';
  
  const bmiNormalized = normalizeBMI(data.height, data.weight, isMetric);
  const heartRateNormalized = normalizeHeartRate(data.heartRate || 70); // Default if not provided
  const sleepNormalized = normalizeSleep(data.goodSleepQuality === 'yes');
  const exerciseNormalized = normalizeExercise(data.exerciseMinutes);
  const smokingNormalized = normalizeSmoking(data.smokingStatus);
  const alcoholNormalized = normalizeAlcohol(data.alcoholUnits);
  
  // Process chronic conditions from sliders
  const chronicConditions: ChronicConditions = {
    diabetes: data.diabetesLevel || 0,
    hypertension: data.hypertensionLevel || 0,
    heartRelated: data.heartRelatedLevel || 0,
    cancer: data.cancerLevel || 0,
    others: data.othersLevel || 0
  };
  const conditionsNormalized = normalizeChronicConditions(chronicConditions);
  
  // Normalize stress level
  const stressNormalized = normalizeStress(data.stressLevel || 'none');
  
  // Calculate the weighted sum
  const weightedSum = (
    (heartRateNormalized * WEIGHTS.restingHeartRate) +
    (bmiNormalized * WEIGHTS.bmi) +
    (exerciseNormalized * WEIGHTS.activity) +
    (sleepNormalized * WEIGHTS.sleep) +
    (smokingNormalized * WEIGHTS.smoking) +
    (alcoholNormalized * WEIGHTS.alcohol) +
    (conditionsNormalized * WEIGHTS.chronicConditions) +
    (stressNormalized * WEIGHTS.stress)
  );
  
  // Calculate the final score (0-100)
  const finalScore = Math.round(weightedSum * 100);
  
  // Generate recommendations
  const params: FitnessParameters = {
    bmi: bmiNormalized,
    heartRate: data.heartRate,
    goodSleepQuality: data.goodSleepQuality === 'yes',
    exerciseMinutes: data.exerciseMinutes,
    smokingStatus: data.smokingStatus,
    alcoholUnits: data.alcoholUnits,
    stressLevel: data.stressLevel
  };
  
  const recommendations = generateRecommendations(params);
  
  // Return the score, recommendations and normalized values
  return {
    score: finalScore,
    recommendations,
    normalizedValues: {
      heartRate: heartRateNormalized,
      bmi: bmiNormalized,
      exercise: exerciseNormalized,
      sleep: sleepNormalized,
      smoking: smokingNormalized,
      alcohol: alcoholNormalized,
      chronicConditions: conditionsNormalized,
      stress: stressNormalized
    }
  };
};

// Re-export utilities for backward compatibility
export { 
  normalizeBMI, 
  normalizeHeartRate, 
  normalizeSleep, 
  normalizeExercise,
  normalizeSmoking,
  normalizeAlcohol,
  normalizeChronicConditions,
  normalizeStress,
  generateRecommendations,
  WEIGHTS
};
