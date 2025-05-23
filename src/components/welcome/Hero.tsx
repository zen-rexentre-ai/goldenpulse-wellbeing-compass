
import React from 'react';
import Logo from '@/components/Logo';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center space-y-2 mt-1">
      <Logo size="lg" />
      <div className="flex justify-center items-center gap-2">
        <h1 className="text-3xl font-bold">{t("welcome")}</h1>
        <ScreenReader text={t("welcome")} />
      </div>
      <p className="text-lg font-medium">
        {t("welcome_subtitle")}
      </p>
      
      <div className="w-full rounded-lg overflow-hidden shadow-lg mt-2">
        <img 
          src="/lovable-uploads/1afecd79-96fc-404a-9fd6-6d7cee1b4bf1.png" 
          alt="Senior couple enjoying their golden years"
          className="w-full h-auto object-cover brightness-105 contrast-105"
        />
      </div>
    </div>
  );
};

export default Hero;
