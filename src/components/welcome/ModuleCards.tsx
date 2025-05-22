
import React from 'react';
import GoldenJourneyCard from './GoldenJourneyCard';
import WellnessModuleCard from './WellnessModuleCard';
import CommunityModuleCard from './CommunityModuleCard';
import WellnessScoreCard from './WellnessScoreCard';

const ModuleCards = () => {
  return (
    <div className="w-full space-y-4 my-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">What Awaits You:</h1>
        <GoldenJourneyCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wellness Module Card */}
        <WellnessModuleCard />
        
        {/* Community Module Card */}
        <CommunityModuleCard />
        
        {/* Wellness Score Card with Calculator */}
        <WellnessScoreCard />
      </div>
    </div>
  );
};

export default ModuleCards;
