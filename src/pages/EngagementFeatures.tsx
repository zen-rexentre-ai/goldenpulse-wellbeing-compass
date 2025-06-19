
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CommunityModuleSection from '@/components/subscription/CommunityModuleSection';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const EngagementFeatures = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Engagement Features</h1>
              <p className="text-muted-foreground">Connect, learn, and grow with our community features</p>
            </div>
          </div>
          <ScreenReader text="Engagement Features - Connect, learn, and grow with community features including volunteering, community groups, webinars, and games." />
        </div>

        {/* Main Content */}
        <div className="bg-card rounded-lg border p-6">
          <CommunityModuleSection showAsCard={false} compact={false} />
        </div>
      </div>
    </div>
  );
};

export default EngagementFeatures;
