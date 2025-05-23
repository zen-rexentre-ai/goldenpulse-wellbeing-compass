
import React from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Star } from 'lucide-react';

const GoldenJourneyCard: React.FC = () => {
  return (
    <EmbossedCard className="overflow-hidden border-2 border-golden-orange bg-gradient-to-r from-golden-pink to-golden-peach p-4 max-w-2xl mx-auto relative">
      {/* Top-left star */}
      <div className="absolute top-2 left-2">
        <Star className="h-5 w-5 text-golden-dark animate-[golden-blink_1s_ease-in-out_infinite]" />
      </div>
      
      {/* Top-right star */}
      <div className="absolute top-2 right-2">
        <Star className="h-5 w-5 text-golden-dark animate-[golden-blink_0.8s_ease-in-out_infinite]" />
      </div>
      
      {/* Bottom-left star */}
      <div className="absolute bottom-2 left-2">
        <Star className="h-5 w-5 text-golden-dark animate-[golden-blink_0.9s_ease-in-out_infinite]" />
      </div>
      
      {/* Bottom-right star */}
      <div className="absolute bottom-2 right-2">
        <Star className="h-5 w-5 text-golden-dark animate-[golden-blink_1.1s_ease-in-out_infinite]" />
      </div>
      
      <div className="flex items-center gap-3 mb-2 mt-2">
      <AlertTitle className="text-xl font-bold text-golden-dark">Your Golden Journey</AlertTitle>
      </div>
      <AlertDescription className="font-serif italic">
        <p className="text-lg font-medium text-golden-dark mb-2">Medical team will recommend a wellness plan & review the progress at regular intervals.</p>
        <p className="text-lg font-medium text-golden-dark">Volunteer your services for societal good and bring purpose & positivity for your life.</p>
      </AlertDescription>
    </EmbossedCard>
  );
};

export default GoldenJourneyCard;
