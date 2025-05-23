
export interface ChronicConditions {
  diabetes: number;
  hypertension: number;
  heartRelated: number;
  cancer: number;
  others: number;
}

export interface FitnessParameters {
  age?: number;
  bmi: number;
  heartRate?: number;
  goodSleepQuality: boolean;
  exerciseMinutes: number;
  smokingStatus: string;
  alcoholUnits: number;
  stressLevel?: string;
  hba1c?: number;
  systolicBP?: number;
  diastolicBP?: number;
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
