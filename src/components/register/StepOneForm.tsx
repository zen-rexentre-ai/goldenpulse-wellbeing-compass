
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProfileImageUpload from './ProfileImageUpload';

interface StepOneFormProps {
  profileImage: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    fullName: string;
    email: string;
    phone: string;
  };
  updateFormData: (field: string, value: string) => void;
}

const StepOneForm: React.FC<StepOneFormProps> = ({ 
  profileImage, 
  handleImageUpload, 
  formData, 
  updateFormData 
}) => {
  return (
    <div className="space-y-4">
      <ProfileImageUpload 
        profileImage={profileImage}
        handleImageUpload={handleImageUpload}
      />
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input 
            id="fullName" 
            type="text" 
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">Mobile Number *</Label>
          <Input 
            id="phone" 
            type="tel" 
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default StepOneForm;
