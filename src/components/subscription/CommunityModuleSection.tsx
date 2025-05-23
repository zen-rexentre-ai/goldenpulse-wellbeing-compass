
import React from 'react';
import { HelpingHand, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import FeatureCard from '@/components/subscription/FeatureCard';
import { FeatureCardProps } from '@/types/subscription';

interface CommunityModuleSectionProps {
  showAsCard?: boolean;
  compact?: boolean;
}

const CommunityModuleSection: React.FC<CommunityModuleSectionProps> = ({ 
  showAsCard = true, 
  compact = false 
}) => {
  const communityFeatures: FeatureCardProps[] = [
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
      description: 'Expand on your hobbies and interests with a vibrant member community.',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Webinars',
      icon: <Users className="h-8 w-8 text-golden-purple" />,
      description: 'Live and Recorded Webinars in variety of topics from Digital tech and safety, Financial Literacy and interesting Health topics',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Games',
      icon: <Users className="h-8 w-8 text-golden-purple" />,
      description: 'Fun and Cognitive games to keep your mind fresh and active',
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
  ];

  const content = (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-golden-dark">Community Module</h3>
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6`}>
        {communityFeatures.map((card, index) => (
          <FeatureCard
            key={`community-${index}`}
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
      <Card className="border border-golden-pink/30 bg-golden-pink/5 p-6">
        {content}
      </Card>
    );
  }

  return content;
};

export default CommunityModuleSection;
