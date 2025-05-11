
import React from 'react';
import { AlertTriangle, Calendar, Users, Brain, Heart, HelpingHand, UserRound, UsersRound } from 'lucide-react';
import SubscriptionPlanSelector from '@/components/subscription/SubscriptionPlanSelector';
import FeatureCard from '@/components/subscription/FeatureCard';
import { FeatureCardProps } from '@/types/subscription';

const SubscriptionPlans = () => {
  const featureCards: FeatureCardProps[] = [
    {
      title: 'Volunteering',
      icon: <HelpingHand className="h-8 w-8 text-golden-purple" />,
      description: 'For users seeking purpose through volunteering opportunities in their community.',
      gradient: 'bg-gradient-to-br from-golden-pink to-golden-peach',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Community Module',
      icon: <Users className="h-8 w-8 text-golden-purple" />,
      description: 'Connect, share, and grow with a vibrant member community of like-minded individuals.',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Personalized Fitness Journey',
      icon: <Heart className="h-8 w-8 text-golden-purple" />,
      description: 'Tailored fitness plans and ongoing care from our specialist physician team.',
      gradient: 'bg-gradient-to-br from-golden-yellow to-golden-orange',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Six Month Review',
      icon: <Calendar className="h-8 w-8 text-golden-purple" />,
      description: 'Comprehensive health review by our medical team every six months.',
      gradient: 'bg-gradient-to-br from-golden-orange to-golden-pink',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Limited Medical Team Access',
      icon: <UserRound className="h-8 w-8 text-golden-purple" />,
      description: 'Up to 3 consults/month with Physio, GeriCare, Happiness Consultant, Sleep Therapist, or Yoga Master.',
      gradient: 'bg-gradient-to-br from-golden-pink to-golden-peach',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Dependents Access',
      icon: <UsersRound className="h-8 w-8 text-golden-purple" />,
      description: 'Your dependents can access GoldenPulse for free.',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Emergency & SoS Tracking',
      icon: <AlertTriangle className="h-8 w-8 text-golden-purple" />,
      description: 'Real-time emergency and SoS tracking for peace of mind.',
      gradient: 'bg-gradient-to-br from-golden-yellow to-golden-orange',
      textColor: 'text-golden-dark'
    },
    {
      title: 'AI Powered Diagnostics',
      icon: <Brain className="h-8 w-8 text-golden-purple" />,
      description: 'Advanced AI-driven health diagnostics for proactive care.',
      gradient: 'bg-gradient-to-br from-golden-orange to-golden-pink',
      textColor: 'text-golden-dark'
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-4xl font-bold text-center mb-6">Subscription Plans</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Choose the perfect plan for your wellness journey. Unlock premium features to enhance your health and well-being.
      </p>

      {/* Use the reusable SubscriptionPlanSelector component */}
      <SubscriptionPlanSelector />

      {/* Feature Cards */}
      <h2 className="text-3xl font-bold text-center mt-16 mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-16">
        {featureCards.map((card, index) => (
          <FeatureCard
            key={index}
            title={card.title}
            icon={card.icon}
            description={card.description}
            gradient={card.gradient}
            textColor={card.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
