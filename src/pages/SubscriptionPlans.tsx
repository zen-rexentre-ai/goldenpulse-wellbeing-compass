
import React from 'react';
import SubscriptionPlanSelector from '@/components/subscription/SubscriptionPlanSelector';
import WellnessModuleSection from '@/components/subscription/WellnessModuleSection';
import CommunityModuleSection from '@/components/subscription/CommunityModuleSection';

const SubscriptionPlans = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Subscription Plans</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl font-bold mx-auto">
        Choose the perfect plan for your wellness journey. Unlock premium features for holistic wellbeing.  All plans come with a tenure of 3/6/12 months subscription.
      </p>

      {/* Use the reusable SubscriptionPlanSelector component */}
      <SubscriptionPlanSelector />

      {/* Feature Cards - Grouped by Modules */}
      <h2 className="text-3xl font-bold text-center mt-16 mb-8">Key Features</h2>

      <div className="space-y-12">
        {/* Wellness Module */}
        <WellnessModuleSection />

        {/* Community Module */}
        <CommunityModuleSection />
      </div>
    </div>
  );
};

export default SubscriptionPlans;
