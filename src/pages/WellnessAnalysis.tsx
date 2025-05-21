
import React from 'react';
import { FitnessCalculatorResults } from '@/components/fitness/FitnessCalculatorResults';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import Logo from '@/components/Logo';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WellnessAnalysis = () => {
  const { toast } = useToast();
  
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
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="container max-w-6xl flex justify-between items-center">
          <Logo size="sm" className="max-w-[150px]" />
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container max-w-6xl p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Wellness Analysis</h1>
          <p className="text-muted-foreground">Detailed breakdown of your wellness factors</p>
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
