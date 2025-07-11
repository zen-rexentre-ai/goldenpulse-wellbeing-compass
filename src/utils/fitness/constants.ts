
// Constants used in fitness score calculations

// Parameter weights for calculating the final fitness score
export const WEIGHTS = {
  restingHeartRate: 0.10,
  bmi: 0.15,
  activity: 0.20,
  sleep: 0.15,
  smoking: 0.05,
  alcohol: 0.05,
  chronicConditions: 0.20,
  stress: 0.10,
};

// Gender-specific weights (for females, smoking and alcohol are excluded)
export const FEMALE_WEIGHTS = {
  restingHeartRate: 0.10,
  bmi: 0.15,
  activity: 0.20,
  sleep: 0.15,
  smoking: 0.0,
  alcohol: 0.0,
  chronicConditions: 0.20,
  stress: 0.20, // Increased from 0.10 to account for removed smoking/alcohol
};

// Age normalization factors
export const AGE_FACTORS = {
  // Age ranges and their normalization factors
  "40-49": {
    heartRate: { optimal: 73, range: 2 },
    bmi: { optimal: 23, range: 2 },
    bloodPressure: { systolic: { optimal: 120, range: 5 }, diastolic: { optimal: 80, range: 5 } }
  },
  "50-59": {
    heartRate: { optimal: 75, range: 2 },
    bmi: { optimal: 24, range: 2 },
    bloodPressure: { systolic: { optimal: 125, range: 5 }, diastolic: { optimal: 82, range: 5 } }
  },
  "60-69": {
    heartRate: { optimal: 77, range: 2 },
    bmi: { optimal: 25, range: 2 },
    bloodPressure: { systolic: { optimal: 130, range: 5 }, diastolic: { optimal: 85, range: 5 } }
  },
  "70-79": {
    heartRate: { optimal: 80, range: 2 },
    bmi: { optimal: 26, range: 2 },
    bloodPressure: { systolic: { optimal: 135, range: 5 }, diastolic: { optimal: 85, range: 5 } }
  },
  "80+": {
    heartRate: { optimal: 83, range: 2 },
    bmi: { optimal: 27, range: 2 },
    bloodPressure: { systolic: { optimal: 140, range: 5 }, diastolic: { optimal: 85, range: 5 } }
  }
};

// HbA1c normalization by age
export const HBA1C_AGE_FACTORS = {
  "40-49": { optimal: 5.6, range: 0.1 },
  "50-59": { optimal: 5.7, range: 0.1 },
  "60-69": { optimal: 5.9, range: 0.1 },
  "70-79": { optimal: 6.1, range: 0.1 },
  "80+": { optimal: 6.3, range: 0.1 }
};
