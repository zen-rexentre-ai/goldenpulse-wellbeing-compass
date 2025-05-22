
import React from 'react';
import ModuleCard from './ModuleCard';

const CommunityModuleCard = () => {
  const communityModuleItems = [
    'Volunteering Opportunities',
    'Webinars',
    'Hobbies',
    'Fun and Cognitive Games'
  ];

  return (
    <ModuleCard 
      title="Community Module" 
      items={communityModuleItems} 
      gradientClasses="bg-gradient-to-br from-golden-yellow to-golden-orange"
    />
  );
};

export default CommunityModuleCard;
