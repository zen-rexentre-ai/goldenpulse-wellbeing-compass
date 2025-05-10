
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const SecuritySettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    // Success case
    toast.success('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!pin || !confirmPin) {
      toast.error('Please fill in both PIN fields');
      return;
    }
    
    if (pin !== confirmPin) {
      toast.error('PINs do not match');
      return;
    }
    
    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      toast.error('PIN must be 4 digits');
      return;
    }
    
    // Success case
    toast.success('PIN updated successfully');
    setPin('');
    setConfirmPin('');
  };
  
  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <Button type="submit">Update Password</Button>
        </form>
      </div>
      
      {/* Change PIN */}
      <div>
        <h3 className="text-lg font-medium mb-4">Change PIN</h3>
        <form onSubmit={handleChangePin} className="space-y-4">
          <div>
            <Label htmlFor="pin">New 4-Digit PIN</Label>
            <Input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="confirm-pin">Confirm PIN</Label>
            <Input
              id="confirm-pin"
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              maxLength={4}
              className="mt-1"
            />
          </div>
          
          <Button type="submit">Update PIN</Button>
        </form>
      </div>
    </div>
  );
};
