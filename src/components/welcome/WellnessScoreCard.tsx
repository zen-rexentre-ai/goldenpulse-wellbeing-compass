
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FitnessScoreMeterWelcome from './FitnessScoreMeterWelcome';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';

const WellnessScoreCard: React.FC = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  
  return (
    <EmbossedCard className="overflow-hidden col-span-1 md:col-span-2">
      <div className="bg-gradient-to-r from-golden-pink/90 to-golden-peach/90 p-6">
        <h3 className="text-2xl font-bold mb-2 text-center text-golden-dark">Check Your Wellness Score</h3>
        
        <p className="text-center mb-2 text-golden-dark">Compare how daily activity helps in actual results, helps track progress and optimize your health journey.</p>
    
        <FitnessScoreMeterWelcome score={75} />
        
        <div className="mt-2 text-center">
          <Button 
            variant="golden"
            size="lg"
            className="w-full max-w-md text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none bg-gradient-to-r from-[#E05C16] to-[#D9A112] text-white font-semibold"
            onClick={() => setCalculatorOpen(true)}
          >
            Calculate Your Wellness Score
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
