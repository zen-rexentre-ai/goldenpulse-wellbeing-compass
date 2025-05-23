
import { AGE_FACTORS, HBA1C_AGE_FACTORS } from './constants';

// Determine the age bracket for a given age
export const getAgeBracket = (age: number): string => {
  if (age < 50) return "40-49";
  if (age < 60) return "50-59";
  if (age < 70) return "60-69";
  if (age < 80) return "70-79";
  return "80+";
};

// Normalize heart rate based on age
export const normalizeHeartRateByAge = (heartRate: number, age: number): number => {
  if (!heartRate) return 0.7; // Default if not provided
  
  const ageBracket = getAgeBracket(age);
  const { optimal, range } = AGE_FACTORS[ageBracket].heartRate;
  
  // Adjust normalization based on age-specific optimal heart rate
  const deviation = Math.abs(heartRate - optimal);
  
  if (deviation <= range * 0.2) return 1.0;  // Very close to optimal
  if (deviation <= range * 0.4) return 0.8;  // Close to optimal
  if (deviation <= range * 0.6) return 0.75;  // Slightly off from optimal
  if (deviation <= range * 0.8) return 0.6;  // Moderately off from optimal
  if (deviation <= range) return 0.5;        // Within acceptable range
  if (deviation <= range * 1.5) return 0.4;  // Outside acceptable range
  return 0.2;                                // Far from optimal
};

// Normalize BMI based on age
export const normalizeBMIByAge = (height: number, weight: number, isMetric: boolean, age: number): number => {
  // Convert to metric if needed
  const heightInM = isMetric ? height / 100 : height * 0.0254;
  const weightInKg = isMetric ? weight : weight * 0.453592;
  
  // Calculate BMI
  const bmi = weightInKg / (heightInM * heightInM);
  
  const ageBracket = getAgeBracket(age);
  const { optimal, range } = AGE_FACTORS[ageBracket].bmi;
  
  // Adjust normalization based on age-specific optimal BMI
  const deviation = Math.abs(bmi - optimal);
  
  if (deviation <= range * 0.2) return 1.0;  // Very close to optimal
  if (deviation <= range * 0.4) return 0.85;  // Close to optimal
  if (deviation <= range * 0.6) return 0.8;  // Slightly off from optimal
  if (deviation <= range * 0.8) return 0.7;  // Moderately off from optimal
  if (deviation <= range) return 0.6;        // Within acceptable range
  if (deviation <= range * 1.5) return 0.4;  // Outside acceptable range
  return 0.2;                                // Far from optimal
};

// Normalize blood pressure based on age
export const normalizeBloodPressureByAge = (
  systolic: number | undefined, 
  diastolic: number | undefined, 
  age: number
): number => {
  if (!systolic || !diastolic) return 0.7; // Default if not provided
  
  const ageBracket = getAgeBracket(age);
  const { systolic: systolicNorm, diastolic: diastolicNorm } = AGE_FACTORS[ageBracket].bloodPressure;
  
  // Calculate systolic deviation
  const systolicDeviation = Math.abs(systolic - systolicNorm.optimal);
  let systolicScore;
  
  if (systolicDeviation <= systolicNorm.range * 0.2) systolicScore = 1.0;
  else if (systolicDeviation <= systolicNorm.range * 0.4) systolicScore = 0.85;
  else if (systolicDeviation <= systolicNorm.range * 0.6) systolicScore = 0.8;
  else if (systolicDeviation <= systolicNorm.range * 0.8) systolicScore = 0.7;
  else if (systolicDeviation <= systolicNorm.range) systolicScore = 0.6;
  else if (systolicDeviation <= systolicNorm.range * 1.5) systolicScore = 0.4;
  else systolicScore = 0.2;
  
  // Calculate diastolic deviation
  const diastolicDeviation = Math.abs(diastolic - diastolicNorm.optimal);
  let diastolicScore;
  
  if (diastolicDeviation <= diastolicNorm.range * 0.2) diastolicScore = 1.0;
  else if (diastolicDeviation <= diastolicNorm.range * 0.4) diastolicScore = 0.8;
  else if (diastolicDeviation <= diastolicNorm.range * 0.6) diastolicScore = 0.7;
  else if (diastolicDeviation <= diastolicNorm.range * 0.8) diastolicScore = 0.6;
  else if (diastolicDeviation <= diastolicNorm.range) diastolicScore = 0.5;
  else if (diastolicDeviation <= diastolicNorm.range * 1.5) diastolicScore = 0.4;
  else diastolicScore = 0.2;
  
  // Return average of systolic and diastolic scores
  return (systolicScore + diastolicScore) / 2;
};

// Normalize HbA1c based on age
export const normalizeHbA1cByAge = (hba1c: number | undefined, age: number): number => {
  if (!hba1c) return 0.7; // Default if not provided
  
  const ageBracket = getAgeBracket(age);
  const { optimal, range } = HBA1C_AGE_FACTORS[ageBracket];
  
  // Calculate deviation
  const deviation = Math.abs(hba1c - optimal);
  
  if (deviation <= range * 0.2) return 1.0;  // Very close to optimal
  if (deviation <= range * 0.4) return 0.8;  // Close to optimal
  if (deviation <= range * 0.6) return 0.7;  // Slightly off from optimal
  if (deviation <= range * 0.8) return 0.6;  // Moderately off from optimal
  if (deviation <= range) return 0.5;        // Within acceptable range
  if (deviation <= range * 1.5) return 0.4;  // Outside acceptable range
  return 0.2;                                // Far from optimal
};

// Normalize exercise based on age
export const normalizeExerciseByAge = (minutes: number, age: number): number => {
  // Adjust expected exercise minutes based on age
  let targetMinutes;
  
  if (age < 50) targetMinutes = 150;
  else if (age < 60) targetMinutes = 140;
  else if (age < 70) targetMinutes = 130;
  else if (age < 80) targetMinutes = 120;
  else targetMinutes = 100;
  
  // Calculate score based on percentage of target minutes
  const percentOfTarget = (minutes / targetMinutes) * 100;
  
  if (percentOfTarget >= 100) return 1.0;      // Meeting or exceeding target
  else if (percentOfTarget >= 80) return 0.8;  // Close to target
  else if (percentOfTarget >= 60) return 0.6;  // Moderate exercise
  else if (percentOfTarget >= 40) return 0.4;  // Some exercise
  else if (percentOfTarget >= 20) return 0.3;  // Little exercise
  else return 0.1;                             // Very little exercise
};
