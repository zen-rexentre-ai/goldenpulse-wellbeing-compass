
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProfileImageUpload from './ProfileImageUpload';

interface StepOneFormProps {
  profileImage: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StepOneForm: React.FC<StepOneFormProps> = ({ profileImage, handleImageUpload }) => {
  return (
    <div className="space-y-4">
      <ProfileImageUpload 
        profileImage={profileImage}
        handleImageUpload={handleImageUpload}
      />
      
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
  );
};

export default StepOneForm;
