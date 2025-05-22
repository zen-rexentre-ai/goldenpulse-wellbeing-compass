
// This file contains utilities for calculating the fitness score

// Parameter weights
const WEIGHTS = {
  restingHeartRate: 0.10,
  bmi: 0.20,
  activity: 0.15,
  sleep: 0.15,
  selfRatedHealth: 0.00,
  smoking: 0.05,
  alcohol: 0.05,
  chronicConditions: 0.15,
  stress: 0.15,
};

// Normalize BMI score (lower is better, with optimal around 22-25)
export const normalizeBMI = (height: number, weight: number, isMetric: boolean): number => {
  // Convert to metric if needed
  const heightInM = isMetric ? height / 100 : height * 0.0254;
  const weightInKg = isMetric ? weight : weight * 0.453592;
  
  // Calculate BMI
  const bmi = weightInKg / (heightInM * heightInM);
  
  // Normalize BMI (optimal BMI is 22-25)
  if (bmi < 18.5) return 0.7; // Underweight
  if (bmi >= 18.5 && bmi < 22) return 0.9;
  if (bmi >= 22 && bmi < 25) return 1.0; // Optimal
  if (bmi >= 25 && bmi < 30) return 0.75; // Overweight
  if (bmi >= 30 && bmi < 35) return 0.5; // Obese Class I
  if (bmi >= 35 && bmi < 40) return 0.3; // Obese Class II
  return 0.1; // Obese Class III
};

// Normalize resting heart rate (lower is better, with optimal around 60-70)
export const normalizeHeartRate = (heartRate: number): number => {
  if (!heartRate) return 0.7; // Default if not provided
  if (heartRate < 50) return 1.0;
  if (heartRate >= 50 && heartRate < 60) return 0.9;
  if (heartRate >= 60 && heartRate < 70) return 0.8;
  if (heartRate >= 70 && heartRate < 80) return 0.7;
  if (heartRate >= 80 && heartRate < 90) return 0.5;
  if (heartRate >= 90 && heartRate < 100) return 0.3;
  return 0.1;
};

// Normalize sleep (more is better, with optimal at 7-8 hours)
export const normalizeSleep = (goodSleepQuality: boolean): number => {
  return goodSleepQuality ? 1.0 : 0.4;
};

// Normalize exercise minutes per week (more is better up to a point)
export const normalizeExercise = (minutes: number): number => {
  if (minutes < 30) return 0.1;
  if (minutes >= 30 && minutes < 60) return 0.3;
  if (minutes >= 60 && minutes < 90) return 0.5;
  if (minutes >= 90 && minutes < 150) return 0.7;
  if (minutes >= 150 && minutes < 200) return 0.9;
  return 1.0;
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

// Normalize chronic conditions (fewer is better)
export const normalizeChronicConditions = (count: number): number => {
  if (count === 0) return 1.0;
  if (count === 1) return 0.8;
  if (count === 2) return 0.6;
  if (count === 3) return 0.4;
  return 0.2;
};

// Generate health recommendations based on the parameters
export const generateRecommendations = (parameters: any) => {
  const recommendations = [];
  
  // Exercise recommendations
  if (parameters.exerciseMinutes < 150) {
    recommendations.push({
      text: "Increase exercise to 150 mins/week",
      impact: "+12pts",
      priority: "high"
    });
  }
  
  // Sleep recommendations
  if (!parameters.goodSleepQuality) {
    recommendations.push({
      text: "Improve sleep quality to get 6+ hours of deep sleep",
      impact: "+15pts",
      priority: "high"
    });
  }
  
  // Smoking recommendations
  if (parameters.smokingStatus === 'current') {
    recommendations.push({
      text: "Quit smoking",
      impact: "+18pts",
      priority: "high"
    });
  }
  
  // Alcohol recommendations
  if (parameters.alcoholUnits > 7) {
    recommendations.push({
      text: "Reduce alcohol to <7 units/week",
      impact: "+8pts",
      priority: "medium"
    });
  }
  
  // BMI recommendations
  if (parameters.bmi > 25 || parameters.bmi < 18.5) {
    recommendations.push({
      text: "Work towards a BMI between 18.5-25",
      impact: "+10pts",
      priority: "medium"
    });
  }
  
  // Heart rate recommendations
  if (parameters.heartRate > 70) {
    recommendations.push({
      text: "Lower resting heart rate through cardiovascular exercise",
      impact: "+5pts",
      priority: "low"
    });
  }
  
  return recommendations;
};

// Calculate the overall fitness score
export const calculateFitnessScore = (data: any): {
  score: number;
  recommendations: Array<{text: string; impact: string; priority: string}>;
  normalizedValues: {[key: string]: number};
} => {
  // Extract and normalize parameters
  const isMetric = data.heightUnit === 'cm';
  
  const bmiNormalized = normalizeBMI(data.height, data.weight, isMetric);
  const heartRateNormalized = normalizeHeartRate(data.heartRate);
  const sleepNormalized = normalizeSleep(data.goodSleepQuality === 'yes');
  const exerciseNormalized = normalizeExercise(data.exerciseMinutes);
  const smokingNormalized = normalizeSmoking(data.smokingStatus);
  const alcoholNormalized = normalizeAlcohol(data.alcoholUnits);
  const conditionsCount = Array.isArray(data.chronicConditions) ? data.chronicConditions.length : 0;
  const conditionsNormalized = normalizeChronicConditions(conditionsCount);
  
  // Default value for self-rated health if not provided
  const selfRatedHealthNormalized = 0.75;
  
  // Calculate the weighted sum
  const weightedSum = (
    (heartRateNormalized * WEIGHTS.restingHeartRate) +
    (bmiNormalized * WEIGHTS.bmi) +
    (exerciseNormalized * WEIGHTS.activity) +
    (sleepNormalized * WEIGHTS.sleep) +
    (selfRatedHealthNormalized * WEIGHTS.selfRatedHealth) +
    (smokingNormalized * WEIGHTS.smoking) +
    (alcoholNormalized * WEIGHTS.alcohol) +
    (conditionsNormalized * WEIGHTS.chronicConditions)
  );
  
  // Calculate the final score (0-100)
  const finalScore = Math.round(weightedSum * 100);
  
  // Generate recommendations
  const params = {
    bmi: bmiNormalized,
    heartRate: data.heartRate,
    goodSleepQuality: data.goodSleepQuality === 'yes',
    exerciseMinutes: data.exerciseMinutes,
    smokingStatus: data.smokingStatus,
    alcoholUnits: data.alcoholUnits
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
      selfRatedHealth: selfRatedHealthNormalized,
      smoking: smokingNormalized,
      alcohol: alcoholNormalized,
      chronicConditions: conditionsNormalized
    }
  };
};
