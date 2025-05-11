
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileImageUploadProps {
  profileImage: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ profileImage, handleImageUpload }) => {
  return (
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
  );
};

export default ProfileImageUpload;
