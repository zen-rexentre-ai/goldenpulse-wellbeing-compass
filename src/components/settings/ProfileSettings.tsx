
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const ProfileSettings: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('(555) 123-4567');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('John Doe');
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          toast.success('Profile photo updated');
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSave = () => {
    toast.success('Profile information saved');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="w-24 h-24">
            {profileImage ? (
              <AvatarImage src={profileImage} alt="Profile" />
            ) : (
              <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          
          <div className="mt-2">
            <Label 
              htmlFor="profile-photo" 
              className="cursor-pointer text-primary text-sm underline"
            >
              Change photo
            </Label>
            <Input 
              id="profile-photo" 
              type="file" 
              className="hidden" 
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>
        
        <div className="flex-1 space-y-4 w-full">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={handleNameChange} 
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={phoneNumber} 
              onChange={handlePhoneChange} 
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <Button onClick={handleSave} className="w-full sm:w-auto">Save Changes</Button>
    </div>
  );
};
