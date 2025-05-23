
import React from 'react';
import ModuleCard from './ModuleCard';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const CommunityModuleCard = () => {
  const { t } = useLanguage();
  
  const communityModuleItems = [
    'Volunteering Opportunities',
    'Webinars',
    'Hobbies',
    'Fun and Cognitive Games'
  ];

  return (
    <div className="relative">
      <ModuleCard 
        title={t("community_module")} 
        items={communityModuleItems} 
        gradientClasses="bg-gradient-to-br from-golden-yellow to-golden-orange"
      />
      <div className="absolute top-2 right-2">
        <ScreenReader text={t("community_module")} />
      </div>
    </div>
  );
};

export default CommunityModuleCard;
