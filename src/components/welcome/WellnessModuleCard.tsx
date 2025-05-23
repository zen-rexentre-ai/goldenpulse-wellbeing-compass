
import React from 'react';
import ModuleCard from './ModuleCard';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const WellnessModuleCard = () => {
  const { t } = useLanguage();
  
  const wellnessModuleItems = [
    'Personalized Wellness Journey',
    'Pain Management',
    'Access to Kin',
    'AI Powered Diagnostics'
  ];

  return (
    <div className="relative">
      <ModuleCard 
        title={t("wellness_module")} 
        items={wellnessModuleItems} 
        gradientClasses="bg-gradient-to-br from-golden-pink to-golden-peach"
      />
      <div className="absolute top-2 right-2">
        <ScreenReader text={t("wellness_module")} />
      </div>
    </div>
  );
};

export default WellnessModuleCard;
