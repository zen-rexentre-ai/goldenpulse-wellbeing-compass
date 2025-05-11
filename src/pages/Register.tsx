import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
        <div className="flex justify-center mb-6">
          <Link to="/">
            <Logo size="md" />
          </Link>
        </div>
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">GoldenPulse Registration</CardTitle>
            <p className="text-center text-muted-foreground">
              Step {step} of 3
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-full border-2 border-primary mb-4 overflow-hidden flex items-center justify-center bg-muted">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl text-muted-foreground">+</span>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="profile-photo" className="cursor-pointer text-primary underline">
                      Choose Photo
                    </Label>
                    <Input 
                      id="profile-photo" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />
                    <p className="text-sm text-muted-foreground">Optional: Add a personal touch!</p>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" type="text" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input id="phone" type="tel" />
                  </div>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="prefer-not">
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="languages">Languages Spoken</Label>
                    <Input id="languages" placeholder="e.g., English, Hindi, Tamil" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select defaultValue="retired">
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Create Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="pin">4 digit PIN for quick login</Label>
                    <Input id="pin" type="password" maxLength={4} 
                           pattern="[0-9]*" inputMode="numeric" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPin">Confirm 4 digit PIN</Label>
                    <Input id="confirmPin" type="password" maxLength={4} 
                           pattern="[0-9]*" inputMode="numeric" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Your Interests:</h4>
                  <p className="text-sm text-muted-foreground mb-3">(Select all that apply)</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-fitness" />
                      <Label htmlFor="interest-fitness">Fitness & Wellness</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-volunteering" />
                      <Label htmlFor="interest-volunteering">Volunteering</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-games" />
                      <Label htmlFor="interest-games">Games & Puzzles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-webinars" />
                      <Label htmlFor="interest-webinars">Webinars & Learning</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="interest-events" />
                      <Label htmlFor="interest-events">Community Events</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            {step > 1 && (
              <Button variant="outline" className="w-full sm:w-auto" onClick={prevStep}>
                Back
              </Button>
            )}
            <Button className="w-full sm:flex-1" onClick={nextStep}>
              {step < 3 ? 'Continue' : 'Complete Registration'}
            </Button>
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
