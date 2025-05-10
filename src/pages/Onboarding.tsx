
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import WellnessGoals from '@/components/onboarding/WellnessGoals';
import MedicineList from '@/components/onboarding/MedicineList';
import AppointmentsInput from '@/components/onboarding/AppointmentsInput';
import VitalInput from '@/components/onboarding/VitalInput';
import DocumentUpload from '@/components/onboarding/DocumentUpload';
import AIProfileBasic from '@/components/onboarding/AIProfileBasic';
import AIProfileExtended from '@/components/onboarding/AIProfileExtended';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';
import EmergencyContacts from '@/components/onboarding/EmergencyContacts';
import VolunteeringPreferences from '@/components/onboarding/VolunteeringPreferences';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 9; // Updated total steps
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Complete onboarding
      toast.success("Onboarding completed!", {
        description: "Welcome to your personalized dashboard."
      });
      navigate('/dashboard');
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WellnessGoals />;
      case 2:
        return <MedicineList />;
      case 3:
        return <AppointmentsInput />;
      case 4:
        return <VitalInput />;
      case 5:
        return <DocumentUpload />;
      case 6:
        return <EmergencyContacts />; // New step
      case 7:
        return <VolunteeringPreferences />; // New step
      case 8:
        return <AIProfileBasic />;
      case 9:
        return <AIProfileExtended />;
      default:
        return <WellnessGoals />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary p-6">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-6">
          <Logo size="md" />
        </div>

        <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
        
        <Card className="w-full shadow-lg mt-4">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Profile</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStep()}
          </CardContent>
          
          <div className="p-6 flex flex-col sm:flex-row gap-3 bg-muted/30 rounded-b-lg border-t">
            {step > 1 && (
              <Button variant="outline" className="w-full sm:w-auto" onClick={prevStep}>
                Back
              </Button>
            )}
            <Button 
              className="w-full sm:flex-1" 
              onClick={nextStep}
            >
              {step < totalSteps ? 'Continue' : 'Complete & Go to Dashboard'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
