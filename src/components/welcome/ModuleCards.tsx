
import React from 'react';
import GoldenJourneyCard from './GoldenJourneyCard';
import WellnessModuleCard from './WellnessModuleCard';
import CommunityModuleCard from './CommunityModuleCard';
import WellnessScoreCard from './WellnessScoreCard';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const ModuleCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full space-y-4 my-4">
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-3xl font-bold">{t("what_awaits_you")}</h1>
          <ScreenReader text={t("what_awaits_you")} />
        </div>
        <GoldenJourneyCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wellness Module Card */}
        <WellnessModuleCard />
        
        {/* Community Module Card */}
        <CommunityModuleCard />
        
        {/* Wellness Score Card with Calculator */}
        <WellnessScoreCard />
      </div>
    </div>
  );
};

export default ModuleCards;
