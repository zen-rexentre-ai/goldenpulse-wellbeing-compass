
// Utility functions for normalizing fitness metrics
import {
  normalizeHeartRateByAge,
  normalizeBMIByAge,
  normalizeBloodPressureByAge,
  normalizeHbA1cByAge,
  normalizeExerciseByAge
} from './ageNormalizationUtils';

// Updated helper function for direct BMI normalization with age parameter
export const normalizeDirectBMI = (bmi: number, age: number): number => {
  // Age-based BMI normalization
  // Older adults tend to have slightly higher healthy BMI ranges
  let ageAdjustment = 0;
  
  if (age >= 65) {
    ageAdjustment = 2; // Allow slightly higher BMI for seniors
  } else if (age >= 50) {
    ageAdjustment = 1; // Slight adjustment for middle-aged adults
  }
  
  const adjustedOptimalBMI = 22 + ageAdjustment;
  const adjustedRange = 6 + ageAdjustment; // Wider range for older adults
  
  // Calculate how far the BMI is from the age-adjusted optimal
  const deviation = Math.abs(bmi - adjustedOptimalBMI);
  
  // Normalize to 0-1 scale (not 0-100)
  if (deviation <= adjustedRange / 2) {
    // Within good range - linear scale from 1.0 to 0.7
    return Math.max(0.7, 1.0 - (deviation / (adjustedRange / 2)) * 0.3);
  } else {
    // Outside good range - exponential decay
    const excessDeviation = deviation - (adjustedRange / 2);
    return Math.max(0, 0.7 * Math.exp(-excessDeviation / 5));
  }
};

// Normalize BMI score using age-based normalization
export const normalizeBMI = (height: number, weight: number, isMetric: boolean, age: number): number => {
  // Validate biometric inputs
  if (height <= 0 || weight <= 0) {
    return 0.5; // Return neutral score instead of throwing error
  }

  // Convert to metric if needed
  const kg = isMetric ? weight : weight * 0.453592;
  const meters = isMetric ? height/100 : height * 0.0254;

  // Calculate BMI
  const bmi = kg / (meters ** 2);
  
  // Use direct normalization with age ranges
  return normalizeDirectBMI(bmi, age);
};

// Normalize resting heart rate using age-based normalization
export const normalizeHeartRate = (heartRate: number, age: number): number => {
  return normalizeHeartRateByAge(heartRate, age);
};

// Normalize sleep (more is better, with optimal at 7-8 hours)
export const normalizeSleep = (goodSleepQuality: boolean): number => {
  return goodSleepQuality ? 1.0 : 0.4;
};

// Normalize exercise minutes per week using age-based normalization
export const normalizeExercise = (minutes: number, age: number): number => {
  return normalizeExerciseByAge(minutes, age);
};

// Normalize smoking status
export const normalizeSmoking = (status: string): number => {
  if (status === 'never') return 1.0;
  if (status === 'former') return 0.7;
  return 0.3; // current
};

// Normalize alcohol consumption (lower is better)
export const normalizeAlcohol = (unitsPerWeek: number): number => {
  if (unitsPerWeek === 0) return 1.0;
  if (unitsPerWeek > 0 && unitsPerWeek <= 7) return 0.9;
  if (unitsPerWeek > 7 && unitsPerWeek <= 14) return 0.75;
  if (unitsPerWeek > 14 && unitsPerWeek <= 21) return 0.5;
  return 0.3;
};

// Normalize chronic conditions based on slider values
export const normalizeChronicConditions = (conditions: {
  diabetes: number;
  hypertension: number;
  heartRelated: number;
  cancer: number;
  others: number;
}): number => {
  // Calculate the average severity of all conditions
  const values = Object.values(conditions);
  const totalValue = values.reduce((sum, val) => sum + val, 0);
  const averageSeverity = totalValue / values.length;
  
  // Normalize based on average severity (0 - no issues, 1 - severe issues)
  return 1 - (averageSeverity / 100);
};

// Normalize stress level
export const normalizeStress = (stressLevel: string): number => {
  if (stressLevel === 'none') return 1.0;
  if (stressLevel === 'mild') return 0.5;
  return 0.0; // 'high' stress
};

// Normalize HbA1c
export const normalizeHbA1c = (hba1c: number | undefined, age: number): number => {
  return normalizeHbA1cByAge(hba1c, age);
};

// Normalize blood pressure
export const normalizeBloodPressure = (
  systolic: number | undefined,
  diastolic: number | undefined,
  age: number
): number => {
  return normalizeBloodPressureByAge(systolic, diastolic, age);
};
