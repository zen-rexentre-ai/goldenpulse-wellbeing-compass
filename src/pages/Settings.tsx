
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { SupportSettings } from '@/components/settings/SupportSettings';
import { LogoutButton } from '@/components/settings/LogoutButton';
import { Separator } from '@/components/ui/separator';

const Settings: React.FC = () => {
  return (
    <div className="container max-w-6xl pb-20 pt-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      
      <div className="flex flex-col gap-4">
        {/* Accessibility Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Accessibility</CardTitle>
          </CardHeader>
          <CardContent>
            <AccessibilityControls />
          </CardContent>
        </Card>
        
        {/* Profile Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileSettings />
          </CardContent>
        </Card>
        
        {/* Security Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <SecuritySettings />
          </CardContent>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <NotificationSettings />
          </CardContent>
        </Card>
        
        {/* Help & Support */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Help & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <SupportSettings />
          </CardContent>
        </Card>
        
        {/* Logout Section */}
        <div className="mt-6 mb-8">
          <Separator className="mb-6" />
          <LogoutButton />
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Settings;
