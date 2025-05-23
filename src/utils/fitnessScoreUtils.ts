
// This file contains core utilities for calculating the fitness score
import { WEIGHTS, FEMALE_WEIGHTS } from './fitness/constants';
import {
  normalizeBMI,
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
import { FitnessScoreResult, ChronicConditions, FitnessParameters } from './fitness/types';

// Calculate the overall fitness score
export const calculateFitnessScore = (data: any): FitnessScoreResult => {
  // Extract and normalize parameters
  const isMetric = data.heightUnit === 'cm';
  const age = data.age || 65; // Default age if not provided
  const gender = data.gender || 'male';
  
  // Choose weights based on gender
  const weights = gender === 'female' ? FEMALE_WEIGHTS : WEIGHTS;
  
  const bmiNormalized = normalizeBMI(data.height, data.weight, isMetric, age);
  const heartRateNormalized = normalizeHeartRate(data.heartRate || 70, age); // Default if not provided
  const sleepNormalized = normalizeSleep(data.goodSleepQuality === 'yes');
  const exerciseNormalized = normalizeExercise(data.exerciseMinutes, age);
  
  // For females, smoking and alcohol are not considered
  const smokingNormalized = gender === 'female' ? 1.0 : normalizeSmoking(data.smokingStatus || 'never');
  const alcoholNormalized = gender === 'female' ? 1.0 : normalizeAlcohol(data.alcoholUnits || 0);
  
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
  
  // Additional age-based normalization
  const hba1cNormalized = normalizeHbA1c(data.hba1c, age);
  const bloodPressureNormalized = normalizeBloodPressure(data.systolicBP, data.diastolicBP, age);
  
  // Calculate the weighted sum
  const weightedSum = (
    (heartRateNormalized * weights.restingHeartRate) +
    (bmiNormalized * weights.bmi) +
    (exerciseNormalized * weights.activity) +
    (sleepNormalized * weights.sleep) +
    (smokingNormalized * weights.smoking) +
    (alcoholNormalized * weights.alcohol) +
    (conditionsNormalized * weights.chronicConditions) +
    (stressNormalized * weights.stress)
  );
  
  // Calculate the final score (0-100)
  const finalScore = Math.round(weightedSum * 100);
  
  // Generate recommendations
  const params: FitnessParameters = {
    age: age,
    bmi: bmiNormalized,
    heartRate: data.heartRate,
    goodSleepQuality: data.goodSleepQuality === 'yes',
    exerciseMinutes: data.exerciseMinutes,
    smokingStatus: data.smokingStatus,
    alcoholUnits: data.alcoholUnits,
    stressLevel: data.stressLevel,
    hba1c: data.hba1c,
    systolicBP: data.systolicBP,
    diastolicBP: data.diastolicBP
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
      stress: stressNormalized,
      bloodPressure: bloodPressureNormalized,
      hba1c: hba1cNormalized
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
  normalizeBloodPressure,
  normalizeHbA1c,
  generateRecommendations,
  WEIGHTS,
  FEMALE_WEIGHTS
};
