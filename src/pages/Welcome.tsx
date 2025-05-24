
import React from 'react';
import Hero from '@/components/welcome/Hero';
import ModuleCards from '@/components/welcome/ModuleCards';
import FoundersSection from '@/components/welcome/FoundersSection';
import ActionButtons from '@/components/welcome/ActionButtons';
import { useLanguage } from '@/components/LanguageProvider';
import LanguageSelector from '@/components/LanguageSelector';
import ScreenReader from '@/components/ScreenReader';

const Welcome = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full flex justify-end p-2">
        <div className="flex items-center gap-2">
          <ScreenReader text={t("welcome to GoldenPulse.AI ! Aging gracefully is not just about living longer - it's about living stronger. Discover how Indian seniors can embrace their golden years with confidence, vitality, and joy. Your Golden Journey. A medical team will recommend a wellness plan & review the progress at regular intervals. Volunteer your services for societal good and bring purpose & positivity in your life.   And Much More.....")} />
          <LanguageSelector />
        </div>
      </div>
      
      <div className="w-full max-w-md flex flex-col items-center gap-2 animate-fade-in py-2">
        <Hero />
        <ModuleCards />
        <FoundersSection />
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("ready_to_embrace")}</h2>
            <ScreenReader text={t("ready_to_embrace")} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
