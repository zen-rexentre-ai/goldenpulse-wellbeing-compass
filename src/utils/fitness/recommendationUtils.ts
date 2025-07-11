
import { FitnessParameters, ChronicConditions } from './types';

export const generateRecommendations = (data: FitnessParameters & { 
  email?: string; 
  gender?: string; 
  height?: number; 
  weight?: number; 
  isMetric?: boolean;
  chronicConditions?: ChronicConditions;
}): Array<{text: string; impact: string; priority: string}> => {
  const recommendations: Array<{text: string; impact: string; priority: string}> = [];
  const age = data.age || 65;

  // Calculate BMI if height and weight provided
  let bmi = data.bmi;
  if (data.height && data.weight) {
    const height = data.isMetric ? data.height / 100 : data.height * 0.0254;
    const weight = data.isMetric ? data.weight : data.weight * 0.453592;
    bmi = weight / (height * height);
  }

  // BMI recommendations
  if (bmi) {
    const idealBMI = age >= 65 ? 24 : 22;
    if (bmi < 18.5 || bmi > 30) {
      recommendations.push({
        text: "Consider consulting with a nutritionist to help establish a balanced diet appropriate for your age and health condition.",
        impact: "High Impact",
        priority: "high"
      });
    } else if (bmi < 20 || bmi > 27) {
      recommendations.push({
        text: "Consider gentle weight management strategies appropriate for seniors, focused on nutrition rather than calorie restriction.",
        impact: "Medium Impact",
        priority: "medium"
      });
    }
  }

  // Exercise recommendations
  if (!data.exerciseMinutes || data.exerciseMinutes < 100) {
    if (age < 65) {
      recommendations.push({
        text: "Try to increase your physical activity to at least 150 minutes per week of moderate exercise.",
        impact: "High Impact",
        priority: "high"
      });
    } else {
      recommendations.push({
        text: `Aim for ${age > 75 ? '100-120' : '120-150'} minutes of gentle exercise weekly, like walking or swimming, appropriate for your mobility level.`,
        impact: "High Impact",
        priority: "high"
      });
    }
  }

  // Sleep recommendations
  if (!data.goodSleepQuality) {
    recommendations.push({
      text: "Consider establishing a regular sleep routine and improving your sleep environment for better rest.",
      impact: "Medium Impact",
      priority: "medium"
    });
  }

  // Smoking recommendations
  if (data.smokingStatus === 'current') {
    recommendations.push({
      text: "Consider joining a smoking cessation program with medical supervision.",
      impact: "High Impact",
      priority: "high"
    });
  }

  // Alcohol recommendations
  if (data.alcoholUnits && data.alcoholUnits > 14) {
    recommendations.push({
      text: "Consider reducing alcohol consumption, as it can impact various health aspects including sleep quality and medication effectiveness.",
      impact: "Medium Impact",
      priority: "medium"
    });
  }

  // Stress recommendations
  if (data.stressLevel === 'high') {
    recommendations.push({
      text: "Explore stress management techniques such as mindfulness, gentle yoga, or speaking with a mental health professional.",
      impact: "Medium Impact",
      priority: "medium"
    });
  } else if (data.stressLevel === 'mild') {
    recommendations.push({
      text: "Consider incorporating regular relaxation activities into your routine to manage stress levels.",
      impact: "Low Impact",
      priority: "low"
    });
  }

  // Heart rate recommendations
  if (data.heartRate && (data.heartRate > 80 || data.heartRate < 60)) {
    recommendations.push({
      text: "Consider discussing your resting heart rate with your healthcare provider at your next appointment.",
      impact: "Medium Impact",
      priority: "medium"
    });
  }

  // Blood pressure recommendations if provided
  if (data.systolicBP && data.diastolicBP) {
    if ((data.systolicBP > 140 || data.diastolicBP > 90) && age < 70) {
      recommendations.push({
        text: "Consider monitoring your blood pressure regularly and consulting with your doctor about management strategies.",
        impact: "High Impact",
        priority: "high"
      });
    } else if ((data.systolicBP > 150 || data.diastolicBP > 90) && age >= 70) {
      recommendations.push({
        text: "Consider gentle approaches to blood pressure management appropriate for seniors, including regular monitoring.",
        impact: "Medium Impact",
        priority: "medium"
      });
    }
  }

  // HbA1c recommendations if provided
  if (data.hba1c) {
    const thresholdByAge = age < 65 ? 5.7 : age < 75 ? 6.0 : 6.2;
    if (data.hba1c > thresholdByAge) {
      recommendations.push({
        text: `Consider discussing your HbA1c level of ${data.hba1c} with your healthcare provider to explore age-appropriate management strategies.`,
        impact: "Medium Impact",
        priority: "medium"
      });
    }
  }

  // General recommendation for seniors
  if (age >= 65) {
    recommendations.push({
      text: "Schedule regular check-ups with your healthcare provider to monitor your health proactively.",
      impact: "Medium Impact",
      priority: "medium"
    });
  }

  // If there are too many recommendations, prioritize them
  let prioritizedRecommendations = [...recommendations];
  if (recommendations.length > 5) {
    prioritizedRecommendations = [...recommendations].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }).slice(0, 5);
  }

  return prioritizedRecommendations;
};
