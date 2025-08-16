import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface StepThreeFormProps {
  formData: {
    address: string;
    emergencyContact: string;
    emergencyPhone: string;
  };
  updateFormData: (field: string, value: string) => void;
}

const StepThreeForm: React.FC<StepThreeFormProps> = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Additional Information</h3>
        <p className="text-sm text-muted-foreground">These fields are optional but help us serve you better</p>
      </div>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Textarea 
            id="address" 
            placeholder="Your address..."
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
          <Input 
            id="emergencyContact" 
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => updateFormData('emergencyContact', e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
          <Input 
            id="emergencyPhone" 
            type="tel"
            value={formData.emergencyPhone}
            onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepThreeForm;