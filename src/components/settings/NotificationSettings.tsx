
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [phoneNotifications, setPhoneNotifications] = useState(true);
  
  const handleEmailChange = (checked: boolean) => {
    setEmailNotifications(checked);
    toast.success(`Email notifications ${checked ? 'enabled' : 'disabled'}`);
  };
  
  const handlePhoneChange = (checked: boolean) => {
    setPhoneNotifications(checked);
    toast.success(`Phone notifications ${checked ? 'enabled' : 'disabled'}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
          <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
        </div>
        <Switch 
          id="email-notifications" 
          checked={emailNotifications} 
          onCheckedChange={handleEmailChange} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="phone-notifications" className="font-medium">Phone Notifications</Label>
          <p className="text-sm text-muted-foreground">Receive SMS alerts for important updates</p>
        </div>
        <Switch 
          id="phone-notifications" 
          checked={phoneNotifications}
          onCheckedChange={handlePhoneChange}
        />
      </div>
    </div>
  );
};
