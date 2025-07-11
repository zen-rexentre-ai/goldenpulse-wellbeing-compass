
import React from 'react';
import { Heart, Siren, Brain, UsersRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import FeatureCard from '@/components/subscription/FeatureCard';
import { FeatureCardProps } from '@/types/subscription';

interface WellnessModuleSectionProps {
  showAsCard?: boolean;
  compact?: boolean;
}

const WellnessModuleSection: React.FC<WellnessModuleSectionProps> = ({ 
  showAsCard = true, 
  compact = false 
}) => {
  const wellnessFeatures: FeatureCardProps[] = [
    {
      title: 'Personalized Wellness Journey',
      icon: <Heart className="h-8 w-8 text-golden-purple" />,
      description: [
        'Expert medical assessment turns your health reports into a personalized wellness plan',
        'Expert Tailored Videos to assist your fitness Routine',
        'Track your journey and see real progress with your dynamic Personal Wellness Score',
        'Medical Review at periodic intervals'
      ],
      gradient: 'bg-gradient-to-br from-golden-yellow to-golden-orange',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Emergency & SoS Tracking',
      icon: <Siren className="h-8 w-8 text-red-500" />,
      description: 'Real-time emergency SoS message to your kin/personal physician/Hospital.',
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
    {
      title: 'Access to kin',
      icon: <UsersRound className="h-8 w-8 text-golden-purple" />,
      description: 'Your kin can track your progress in realtime.',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
  ];

  const content = (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
        {wellnessFeatures.map((card, index) => (
          <FeatureCard
            key={`wellness-${index}`}
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

  if (showAsCard) {
    return (
      <Card className="border border-golden-yellow/30 bg-golden-yellow/5 p-6">
        {content}
      </Card>
    );
  }

  return content;
};

export default WellnessModuleSection;
