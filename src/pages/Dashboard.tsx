import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { useToast } from '@/hooks/use-toast';
import { DetailedAnalysisDialog } from '@/components/DetailedAnalysisDialog';
import { FitnessScoreCard } from '@/components/dashboard/FitnessScoreCard';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { EmbossedCard } from '@/components/ui/card';
import FitnessCalculatorResults from '@/components/fitness/FitnessCalculatorResults';
import Header from '@/components/Header';
import { Bell } from 'lucide-react';
import Logo from '@/components/Logo';

const Dashboard = () => {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [activeScoreTab, setActiveScoreTab] = useState('week');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [showWellnessAnalysis, setShowWellnessAnalysis] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();
  const { currentPlan, setCurrentPlan } = useSubscription();
  
  // Mock fitness score data - in a real app this would come from an API
  const fitnessScores = {
    current: 79.8,
    week: {
      score: 76.6,
      change: 3.2,
      direction: 'up'
    },
    month: {
      score: 72.5,
      change: 7.3,
      direction: 'up'
    },
    sinceLogin: {
      score: 65.2,
      change: 14.6,
      direction: 'up'
    }
  };
  
  // Plan switcher for demo purposes
  const cyclePlan = () => {
    if (currentPlan === 'free') setCurrentPlan('basic');
    else if (currentPlan === 'basic') setCurrentPlan('premium');
    else setCurrentPlan('free');
    
    toast({
      title: `Plan changed to ${currentPlan === 'free' ? 'Basic' : currentPlan === 'basic' ? 'Premium' : 'Free'}`,
      description: "This is just for demonstration purposes."
    });
  };

  // Mock data for wellness analysis
  const mockRecommendations = [
    { 
      text: t("Consider adding more fiber to your diet to help with cholesterol levels"), 
      impact: t("High Impact"), 
      priority: "high" 
    },
    { 
      text: t("Try to increase daily steps to 10,000"), 
      impact: t("Medium Impact"), 
      priority: "medium" 
    },
    { 
      text: t("Schedule your annual physical examination"), 
      impact: t("Low Impact"), 
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
      title: t("Report Saved"),
      description: t("Your wellness analysis report has been saved to your profile")
    });
  };
  
  const handleReset = () => {
    toast({
      title: t("Calculator Reset"),
      description: t("You can now calculate a new wellness score")
    });
  };

  const medicines = [
    { id: 1, name: "Vitamin D", time: "8:00 AM", dosage: "1000 IU", taken: false },
    { id: 2, name: "Omega-3", time: "12:00 PM", dosage: "1000 mg", taken: true },
    { id: 3, name: "Calcium", time: "8:00 PM", dosage: "500 mg", taken: false },
  ];
  
  const appointments = [
    { id: 1, title: "Dr. Smith", type: "doctor", date: "2025-05-15", time: "10:30 AM" },
    { id: 2, title: "Yoga Class", type: "event", date: "2025-05-12", time: "9:00 AM" },
    { id: 3, title: "Volunteer - Food Bank", type: "volunteer", date: "2025-05-18", time: "1:00 PM" },
  ];
  
  const vitals = {
    steps: 8000,
    weight: "68 kg",
    sleep: "7.5 hrs",
    heartRate: "70 bpm"
  };
  
  const healthFocus = [
    { name: "Cholesterol", value: "210 mg/dL", status: "warning", recommendation: "Consider dietary changes" },
    { name: "Blood Pressure", value: "125/82", status: "normal", recommendation: "Continue monitoring" },
    { name: "Blood Sugar", value: "105 mg/dL", status: "normal", recommendation: "Maintain current habits" }
  ];

  const activities = [
    { id: 1, name: "Memory Game Challenge", type: "game", time: "Today at 3:00 PM", color: "bg-golden-yellow/20" },
    { id: 2, name: "Gentle Yoga Webinar", type: "webinar", time: "Tomorrow at 10:00 AM", color: "bg-golden-pink/20" },
    { id: 3, name: "Community Garden Volunteering", type: "volunteer", time: "May 15 at 9:00 AM", color: "bg-golden-peach/20" }
  ];

  // Function to handle widget visibility toggle
  const toggleWidget = (widgetName: string) => {
    toast({
      title: "Widget settings updated",
      description: `${widgetName} widget visibility toggled.`
    });
  };

  // If showing wellness analysis, render it instead of dashboard
  if (showWellnessAnalysis) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <Header title={t("wellness_analysis")} showBack />
        
        <main className="container max-w-6xl p-4">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowWellnessAnalysis(false)}
                  className="mb-2"
                >
                  ← Back to Dashboard
                </Button>
                <h1 className="text-2xl font-bold">{t("wellness_analysis")}</h1>
                <p className="text-muted-foreground">{t("wellness_analysis_subtitle")}</p>
              </div>
              <ScreenReader text={t("wellness_analysis") + " " + t("wellness_analysis_subtitle")} />
            </div>
          </div>
          
          <FitnessCalculatorResults 
            score={fitnessScores.current}
            recommendations={mockRecommendations}
            normalizedValues={mockNormalizedValues}
            onSave={handleSave}
            onReset={handleReset}
          />
        </main>
        
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-16">
      {/* Use shared Header component with emergency icon */}
      <Header />
      
      {/* Accessibility Controls */}
      {showAccessibility && (
        <div className="container max-w-6xl px-4 mt-4">
          <AccessibilityControls />
        </div>
      )}
      
      <main className="container max-w-6xl p-4 space-y-6">
        {/* Accessibility toggle button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAccessibility(!showAccessibility)}
            aria-label="Accessibility Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l2 2" />
            </svg>
          </Button>
        </div>
        
        {/* Current Plan Indicator - Made clickable */}
        <div className="flex justify-between items-center">
          <EmbossedCard 
            className="px-4 py-2 bg-gradient-to-r from-golden-peach/30 to-golden-yellow/30 cursor-pointer hover:shadow-md transition-all"
            onClick={cyclePlan}
          >
            <p className="text-sm font-medium">
              <span className="font-bold capitalize">{currentPlan}</span>
             
            </p>
          </EmbossedCard>
        </div>
        
        {/* Fitness Score Card */}
        <div className="relative">
          <FitnessScoreCard 
            fitnessScores={fitnessScores}
            onViewDetailedAnalysis={() => setShowDetailedAnalysis(true)}
          />
          
          {/* Detailed Analysis Dialog */}
          <DetailedAnalysisDialog 
            open={showDetailedAnalysis} 
            onOpenChange={setShowDetailedAnalysis} 
          />
        </div>
        
        {/* Wellness Analysis Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowWellnessAnalysis(true)}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {t("Detailed Analysis")}
          </Button>
        </div>
        
        {/* Widget Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{t("your_health_dashboard")}</h2>
            <ScreenReader text={t("your_health_dashboard")} />
          </div>
          <Button variant="outline" size="sm">{t("customize_widgets")}</Button>
        </div>
        
        {/* Dashboard Tabs */}
        <DashboardTabs 
          medicines={medicines}
          appointments={appointments}
          vitals={vitals}
          healthFocus={healthFocus}
          activities={activities}
          toggleWidget={toggleWidget}
        />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
