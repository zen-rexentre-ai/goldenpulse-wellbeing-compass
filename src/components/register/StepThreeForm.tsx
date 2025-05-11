
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const StepThreeForm: React.FC = () => {
  return (
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
  );
};

export default StepThreeForm;
