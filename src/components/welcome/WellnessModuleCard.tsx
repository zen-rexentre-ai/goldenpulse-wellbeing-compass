
import React from 'react';
import ModuleCard from './ModuleCard';

const WellnessModuleCard = () => {
  const wellnessModuleItems = [
    'Personalized Wellness Journey',
    'Pain Management',
    'Access to Kin',
    'AI Powered Diagnostics'
  ];

  return (
    <ModuleCard 
      title="Wellness Module" 
      items={wellnessModuleItems} 
      gradientClasses="bg-gradient-to-br from-golden-pink to-golden-peach"
    />
  );
};

export default WellnessModuleCard;
