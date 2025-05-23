
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
import Header from '@/components/Header';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const Settings: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="pb-20">
      <Header title={t("settings")} />
      
      <div className="container max-w-6xl pt-4">
        <div className="flex flex-col gap-4">
          {/* Accessibility Settings */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{t("accessibility")}</CardTitle>
                <ScreenReader text={t("accessibility")} />
              </div>
            </CardHeader>
            <CardContent>
              <AccessibilityControls />
            </CardContent>
          </Card>
          
          {/* Profile Settings */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{t("profile")}</CardTitle>
                <ScreenReader text={t("profile")} />
              </div>
            </CardHeader>
            <CardContent>
              <ProfileSettings />
            </CardContent>
          </Card>
          
          {/* Security Settings */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{t("security")}</CardTitle>
                <ScreenReader text={t("security")} />
              </div>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
          
          {/* Notification Settings */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{t("notifications_settings")}</CardTitle>
                <ScreenReader text={t("notifications_settings")} />
              </div>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
          
          {/* Help & Support */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{t("help_support")}</CardTitle>
                <ScreenReader text={t("help_support")} />
              </div>
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
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Settings;
