
// Type definitions for fitness calculations

export interface ChronicConditions {
  diabetes: number;
  hypertension: number;
  heartRelated: number;
  cancer: number;
  others: number;
}

export interface FitnessParameters {
  bmi: number;
  heartRate?: number;
  goodSleepQuality: boolean;
  exerciseMinutes: number;
  smokingStatus: string;
  alcoholUnits: number;
  stressLevel: string;
}

export interface FitnessScoreResult {
  score: number;
  recommendations: Array<{
    text: string;
    impact: string;
    priority: string;
  }>;
  normalizedValues: {
    [key: string]: number;
  };
}

export interface NormalizedValues {
  heartRate: number;
  bmi: number;
  exercise: number;
  sleep: number;
  smoking: number;
  alcohol: number;
  chronicConditions: number;
  stress: number;
}
