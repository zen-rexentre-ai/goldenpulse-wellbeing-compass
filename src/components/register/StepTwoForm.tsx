
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StepTwoForm: React.FC = () => {
  return (
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
  );
};

export default StepTwoForm;
