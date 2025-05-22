
import React from 'react';
import GoldenJourneyCard from './GoldenJourneyCard';
import ModuleCard from './ModuleCard';
import WellnessScoreCard from './WellnessScoreCard';

const ModuleCards = () => {
  const wellnessModuleItems = [
    'Personalized Wellness Journey',
    'Pain Management',
    'Access to Kin',
    'AI Powered Diagnostics'
  ];

  const communityModuleItems = [
    'Volunteering Opportunities',
    'Webinars',
    'Hobbies',
    'Fun and Cognitive Games'
  ];

  return (
    <div className="w-full space-y-4 my-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">What Awaits You:</h1>
        <GoldenJourneyCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wellness Module Card */}
        <ModuleCard 
          title="Wellness Module" 
          items={wellnessModuleItems} 
          gradientClasses="bg-gradient-to-br from-golden-pink to-golden-peach"
        />
        
        {/* Community Module Card */}
        <ModuleCard 
          title="Community Module" 
          items={communityModuleItems} 
          gradientClasses="bg-gradient-to-br from-golden-yellow to-golden-orange"
        />
        
        {/* Wellness Score Card with Calculator */}
        <WellnessScoreCard />
      </div>
    </div>
  );
};

export default ModuleCards;
