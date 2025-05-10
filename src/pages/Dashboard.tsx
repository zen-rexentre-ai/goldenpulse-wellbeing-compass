import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { Bell, Home } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';
import { DetailedAnalysisDialog } from '@/components/DetailedAnalysisDialog';
import { FitnessScoreCard } from '@/components/dashboard/FitnessScoreCard';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import BottomNavigation from '@/components/dashboard/BottomNavigation';

const Dashboard = () => {
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [activeScoreTab, setActiveScoreTab] = useState('week');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const { toast } = useToast();
  
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

  const upcomingActivities = [
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="container max-w-6xl flex justify-between items-center">
          <Logo size="sm" />
          
          <div className="flex gap-2">
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
            
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Accessibility Controls */}
      {showAccessibility && (
        <div className="container max-w-6xl px-4 mt-4">
          <AccessibilityControls />
        </div>
      )}
      
      <main className="container max-w-6xl p-4 space-y-6">
        {/* Fitness Score Card - Updated to be more centered/prominent */}
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
        
        {/* Widget Controls */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Health Dashboard</h2>
          <Button variant="outline" size="sm">Customize Widgets</Button>
        </div>
        
        {/* Dashboard Tabs - Will be styled in the component */}
        <DashboardTabs 
          medicines={medicines}
          appointments={appointments}
          vitals={vitals}
          healthFocus={healthFocus}
          activities={upcomingActivities}
          toggleWidget={toggleWidget}
        />
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
