
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ModuleCard from './ModuleCard';
import ModulePopup from '@/components/subscription/ModulePopup';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const CommunityModuleCard = () => {
  const { t } = useLanguage();
  const [popupOpen, setPopupOpen] = useState(false);
  
  const communityModuleItems = [
    'Volunteering Opportunities',
    'Webinars',
    'User Groups',
    'Fun and Cognitive Games'
  ];

  const handleCardClick = () => {
    setPopupOpen(true);
  };

  return (
    <div className="relative">
      <div 
        className="cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={handleCardClick}
      >
        <ModuleCard 
          title={t("community_module")} 
          items={communityModuleItems} 
          gradientClasses="bg-gradient-to-br from-golden-yellow to-golden-orange"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <Info className="h-5 w-5 text-golden-dark opacity-70 hover:opacity-100" />
          <ScreenReader text={t("community_module")} />
        </div>
      </div>
      
      <ModulePopup 
        open={popupOpen}
        onOpenChange={setPopupOpen}
        moduleType="community"
      />
    </div>
  );
};

export default CommunityModuleCard;
