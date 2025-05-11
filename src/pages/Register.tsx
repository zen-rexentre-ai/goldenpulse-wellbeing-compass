
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Import our new components
import RegisterHeader from '@/components/register/RegisterHeader';
import StepOneForm from '@/components/register/StepOneForm';
import StepTwoForm from '@/components/register/StepTwoForm';
import StepThreeForm from '@/components/register/StepThreeForm';
import NavigationButtons from '@/components/register/NavigationButtons';

const Register = () => {
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      toast.success("Registration successful!", {
        description: "Choose your subscription plan to continue."
      });
      navigate('/subscription-plans');
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary p-6">
      <div className="w-full max-w-lg animate-fade-in">
        <RegisterHeader />
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">GoldenPulse Registration</CardTitle>
            <p className="text-center text-muted-foreground">
              Step {step} of 3
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <StepOneForm
                profileImage={profileImage}
                handleImageUpload={handleImageUpload}
              />
            )}
            
            {step === 2 && <StepTwoForm />}
            
            {step === 3 && <StepThreeForm />}
          </CardContent>
          
          <CardFooter>
            <NavigationButtons
              step={step}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          </CardFooter>
        </Card>
        
        <div className="text-center mt-6">
          <p>
            Already have an account? <Link to="/login" className="text-primary font-medium">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
