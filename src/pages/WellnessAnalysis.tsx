
import React from 'react';
import FitnessCalculatorResults from '@/components/fitness/FitnessCalculatorResults';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import Header from '@/components/Header';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const WellnessAnalysis = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Mock data for the fitness calculator results
  const mockScore = 79.8;
  const mockRecommendations = [
    { 
      text: "Consider adding more fiber to your diet to help with cholesterol levels", 
      impact: "High Impact", 
      priority: "high" 
    },
    { 
      text: "Try to increase daily steps to 10,000", 
      impact: "Medium Impact", 
      priority: "medium" 
    },
    { 
      text: "Schedule your annual physical examination", 
      impact: "Low Impact", 
      priority: "low" 
    }
  ];
  const mockNormalizedValues = {
    bmi: 0.85,
    activity: 0.7,
    sleep: 0.9,
    nutrition: 0.75,
    stress: 0.8,
    bloodPressure: 0.65
  };
  
  const handleSave = () => {
    toast({
      title: "Report Saved",
      description: "Your wellness analysis report has been saved to your profile"
    });
  };
  
  const handleReset = () => {
    toast({
      title: "Calculator Reset",
      description: "You can now calculate a new wellness score"
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header title={t("wellness_analysis")} />
      
      <main className="container max-w-6xl p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{t("wellness_analysis")}</h1>
              <p className="text-muted-foreground">{t("wellness_analysis_subtitle")}</p>
            </div>
            <ScreenReader text={t("wellness_analysis") + " " + t("wellness_analysis_subtitle")} />
          </div>
        </div>
        
        <FitnessCalculatorResults 
          score={mockScore}
          recommendations={mockRecommendations}
          normalizedValues={mockNormalizedValues}
          onSave={handleSave}
          onReset={handleReset}
        />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default WellnessAnalysis;
