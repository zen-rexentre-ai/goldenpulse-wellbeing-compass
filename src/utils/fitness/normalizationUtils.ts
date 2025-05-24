// Utility functions for normalizing fitness metrics
import {
  normalizeHeartRateByAge,
  normalizeBMIByAge,
  normalizeBloodPressureByAge,
  normalizeHbA1cByAge,
  normalizeExerciseByAge
} from './ageNormalizationUtils';

// New helper function for direct BMI normalization
export const normalizeDirectBMI = (bmi: number, age: number): number => {
  // Validate input
  if (bmi <= 0 || isNaN(bmi)) {
    throw new Error(`Invalid BMI value: ${bmi}`);
  }

  // Age-specific ranges per ICMR guidelines
  const [min, max] = age >= 65 
    ? [22, 27]  // Senior range
    : [18.5, 24.9]; // Adult range

  // Clamp and normalize between 0-1
  return Math.min(1, Math.max(0, (bmi - min) / (max - min)));
};

// Normalize BMI score using age-based normalization
export const normalizeBMI = (height: number, weight: number, isMetric: boolean, age: number): number => {
  // Validate biometric inputs
  if (height <= 0 || weight <= 0) {
    throw new Error(`Invalid biometric values: height=${height}, weight=${weight}`);
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
