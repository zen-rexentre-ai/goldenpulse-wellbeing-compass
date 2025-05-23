
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlanType } from '@/types/subscription';

interface SubscriptionContextType {
  currentPlan: PlanType;
  setCurrentPlan: (plan: PlanType) => void;
  hasFeatureAccess: (featureName: string) => boolean;
}

// Create context with default values
const SubscriptionContext = createContext<SubscriptionContextType>({
  currentPlan: 'free',
  setCurrentPlan: () => {},
  hasFeatureAccess: () => false,
});

// Features allowed for each plan level - updated to use new routes
const planFeatures: Record<PlanType, string[]> = {
  free: ['emergency', 'games', 'volunteering'],
  basic: ['emergency', 'games', 'volunteering', 'dashboard'],
  premium: ['emergency', 'games', 'volunteering', 'dashboard'],
};

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('free');

  // Function to check if a feature is accessible on the current plan
  const hasFeatureAccess = (featureName: string): boolean => {
    return planFeatures[currentPlan].includes(featureName);
  };

  return (
    <SubscriptionContext.Provider value={{ currentPlan, setCurrentPlan, hasFeatureAccess }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to use subscription context
export const useSubscription = () => useContext(SubscriptionContext);
