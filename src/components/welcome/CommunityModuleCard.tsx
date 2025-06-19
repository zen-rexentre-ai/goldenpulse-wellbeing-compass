
import React from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModuleCard from './ModuleCard';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const CommunityModuleCard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const communityModuleItems = [
    'Volunteering Opportunities',
    'Community Groups & Forums',
    'Live & Recorded Webinars',
    'Brain Training Games',
    'Social Engagement Activities'
  ];

  const handleCardClick = () => {
    navigate('/engagement-features');
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
        </div>
      </div>
    </div>
  );
};

export default CommunityModuleCard;
