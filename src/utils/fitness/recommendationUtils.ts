
// Utility functions for generating fitness recommendations

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
  
  // Stress recommendations
  if (parameters.stressLevel === 'high') {
    recommendations.push({
      text: "Implement stress management techniques like meditation",
      impact: "+15pts",
      priority: "high"
    });
  } else if (parameters.stressLevel === 'mild') {
    recommendations.push({
      text: "Continue improving stress management habits",
      impact: "+7pts",
      priority: "medium"
    });
  }
  
  return recommendations;
};
