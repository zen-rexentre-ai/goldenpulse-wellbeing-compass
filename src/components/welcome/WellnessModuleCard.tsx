
import React from 'react';
import { Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModuleCard from './ModuleCard';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const WellnessModuleCard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const wellnessModuleItems = [
    'Personalized Wellness Journey',
    'Guided Wellness Training',
    'Pain Management',
    'Access to Kin',
    'AI Powered Diagnostics'
  ];

  const handleCardClick = () => {
    navigate('/personal-wellness-features');
  };

  return (
    <div className="relative">
      <div 
        className="cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={handleCardClick}
      >
        <ModuleCard 
          title={t("wellness_module")} 
          items={wellnessModuleItems}
          gradientClasses="bg-gradient-to-br from-golden-pink to-golden-peach"
        />
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <Info className="h-5 w-5 text-golden-dark opacity-70 hover:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default WellnessModuleCard;
