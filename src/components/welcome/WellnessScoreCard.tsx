
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FitnessScoreMeterWelcome from './FitnessScoreMeterWelcome';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

const WellnessScoreCard: React.FC = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const { t } = useLanguage();
  
  return (
    <EmbossedCard className="overflow-hidden col-span-1 md:col-span-2">
      <div className="bg-gradient-to-r from-golden-pink/90 to-golden-peach/90 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold mb-2 text-center text-golden-dark">{t("check_wellness_score")}</h3>
          <ScreenReader text={t("check_wellness_score")} />
        </div>
        
        <p className="text-center mb-2 text-golden-dark">{t("wellness_score_description")}</p>
    
        <FitnessScoreMeterWelcome score={75} />
        
        <div className="mt-2 text-center">
          <Button 
            variant="golden"
            size="lg"
            className="w-full max-w-md text-lg py-4 sm:py-6 px-2 sm:px-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none bg-gradient-to-r from-[#E05C16] to-[#D9A112] text-white font-semibold"
            onClick={() => setCalculatorOpen(true)}
          >
            <span className="sm:whitespace-nowrap whitespace-normal">{t("calculate_wellness_score")}</span>
          </Button>
        </div>
      </div>
      
      <FitnessCalculator 
        open={calculatorOpen}
        onOpenChange={setCalculatorOpen}
      />
    </EmbossedCard>
  );
};

export default WellnessScoreCard;
