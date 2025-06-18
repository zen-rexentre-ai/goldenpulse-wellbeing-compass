
// Define shared types for subscription components
export interface Feature {
  name: string;
  free: boolean | string;
  basic: boolean | string;
  premium: boolean | string;
}

export type PlanType = 'free' | 'basic' | 'premium';

export interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  description: string | string[];
  gradient: string;
  textColor: string;
}
