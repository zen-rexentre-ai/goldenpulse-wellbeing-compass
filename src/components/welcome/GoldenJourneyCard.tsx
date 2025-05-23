
import React from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Sparkles, PartyPopper } from 'lucide-react';

const GoldenJourneyCard: React.FC = () => {
  return (
    <EmbossedCard className="overflow-hidden border-2 border-golden-orange bg-gradient-to-r from-golden-pink to-golden-peach p-4 max-w-2xl mx-auto relative">
      {/* Celebration sparkles floating around */}
      <div className="absolute top-1/4 left-1/4">
        <Sparkles className="h-6 w-6 text-amber-500 animate-[golden-sparkle_1.2s_ease-in-out_infinite]" />
      </div>
      
      <div className="absolute top-1/2 left-1/6">
        <Sparkles className="h-5 w-5 text-orange-500 animate-[golden-sparkle_1.5s_ease-in-out_infinite]" />
      </div>
      
      <div className="absolute bottom-1/3 right-1/4">
        <Sparkles className="h-5 w-5 text-red-500 animate-[golden-sparkle_0.9s_ease-in-out_infinite]" />
      </div>
      
      <div className="absolute top-1/3 right-1/3">
        <Sparkles className="h-4 w-4 text-yellow-500 animate-[golden-sparkle_1.3s_ease-in-out_infinite]" />
      </div>

      {/* Additional sparkles for more burst effect */}
      <div className="absolute top-2/3 left-1/3">
        <Sparkles className="h-4 w-4 text-amber-400 animate-[golden-sparkle_0.8s_ease-in-out_infinite]" />
      </div>
      
      <div className="absolute bottom-1/4 right-1/5">
        <Sparkles className="h-5 w-5 text-orange-400 animate-[golden-sparkle_1.1s_ease-in-out_infinite]" />
      </div>
      
      {/* Party poppers at corners with sparkle bursts */}
      <div className="absolute top-2 left-2">
        <PartyPopper className="h-6 w-6 text-red-500 animate-[party-burst_2s_ease-in-out_infinite]" />
        <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-amber-400 animate-[sparkle-burst_1.2s_ease-in-out_infinite]" />
      </div>
      
      <div className="absolute top-2 right-2">
        <PartyPopper className="h-6 w-6 text-amber-500 animate-[party-burst_1.8s_ease-in-out_infinite]" />
        <Sparkles className="h-4 w-4 absolute -top-1 -left-1 text-red-400 animate-[sparkle-burst_1.5s_ease-in-out_infinite]" />
      </div>
      
      <div className="absolute bottom-2 left-2">
        <PartyPopper className="h-6 w-6 text-orange-500 animate-[party-burst_2.2s_ease-in-out_infinite]" />
        <Sparkles className="h-4 w-4 absolute -bottom-1 -right-1 text-yellow-400 animate-[sparkle-burst_0.9s_ease-in-out_infinite]" />
      </div>
      
      <div className="absolute bottom-2 right-2">
        <PartyPopper className="h-6 w-6 text-yellow-500 animate-[party-burst_1.9s_ease-in-out_infinite]" />
        <Sparkles className="h-4 w-4 absolute -bottom-1 -left-1 text-orange-400 animate-[sparkle-burst_1.3s_ease-in-out_infinite]" />
      </div>
      
      <div className="flex items-center gap-3 mb-2 mt-2">
        <AlertTitle className="text-xl font-bold text-golden-dark">Your Golden Journey</AlertTitle>
      </div>
      <AlertDescription className="font-serif italic">
        <p className="text-lg font-medium text-golden-dark mb-2">A medical team will recommend a wellness plan & review the progress at regular intervals.</p>
        <p className="text-lg font-medium text-golden-dark">Volunteer your services for societal good and bring purpose & positivity for your life.</p>
           <p className="text-lg font-medium text-golden-dark"> And Much More..... </p>
      </AlertDescription>
    </EmbossedCard>
  );
};

export default GoldenJourneyCard;
