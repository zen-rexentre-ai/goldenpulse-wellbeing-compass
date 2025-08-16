
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Import our new components
import RegisterHeader from '@/components/register/RegisterHeader';
import StepOneForm from '@/components/register/StepOneForm';
import StepTwoForm from '@/components/register/StepTwoForm';
import StepThreeForm from '@/components/register/StepThreeForm';
import NavigationButtons from '@/components/register/NavigationButtons';

const Register = () => {
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
  });

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

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;
      case 2:
        if (!formData.password || !formData.confirmPassword) {
          toast.error("Please enter and confirm your password");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return false;
        }
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return false;
        }
        return true;
      case 3:
        return true; // Optional fields
      default:
        return true;
    }
  };
  
  const nextStep = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Final registration step
      setIsSubmitting(true);
      const result = await signUp(formData.email, formData.password, formData.fullName);
      
      if (result.success) {
        toast.success("Registration successful!", {
          description: "Please check your email to verify your account."
        });
        navigate('/onboarding');
      }
      setIsSubmitting(false);
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
            <CardTitle className="text-2xl text-center">Registration</CardTitle>
            <p className="text-center text-muted-foreground">
              Step {step} of 3
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <StepOneForm
                profileImage={profileImage}
                handleImageUpload={handleImageUpload}
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            
            {step === 2 && (
              <StepTwoForm 
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            
            {step === 3 && (
              <StepThreeForm 
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
          </CardContent>
          
          <CardFooter>
            <NavigationButtons
              step={step}
              prevStep={prevStep}
              nextStep={nextStep}
              isSubmitting={isSubmitting}
              disabled={loading}
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
