
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
      description: [
        'Seek purpose and happiness by sharing your expertise',
        'Options from Online/In-Person/Hybrid',
        'Variety of volunteering opportunities ranging from Teaching, Coaching, Health Services, Sharing your field expertise etc.',
        'Services offered through leading NGO\'s'
      ],
      gradient: 'bg-gradient-to-br from-golden-pink to-golden-peach',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Community',
      icon: <Users className="h-8 w-8 text-golden-purple" />,
      description: [
        'Find Your Tribe - Join groups for your favorite hobbies whether its Cooking, Painting, Gardening, Photography, etc.',
        'Share & Learn - Post your latest creations, ask for advice, or share tips. Get Inspired and make new friends.',
        'Join Events & Challenges'
      ],
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Webinars',
      icon: <Users className="h-8 w-8 text-golden-purple" />,
      description: [
        'Live Webinars: Join real-time sessions with experts and fellow learners.',
        'Recorded Webinars: Watch at your own pace, anytime you want.',
        'Topics for Everyone:',
        'Digital Tech & Safety: Stay smart online and protect your data.',
        'Financial Literacy: Learn money basics, saving, and investing.',
        'Interesting Health Topics: Get tips on wellness, nutrition, and mental health.'
      ],
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
    {
      title: 'Games',
      icon: <Users className="h-8 w-8 text-golden-purple" />,
      description: [
        'Games to Keep Your Mind Fresh and Active',
        'Fun & Engaging Puzzles: Solve riddles, crosswords, and brain teasers—perfect for a quick mental workout.',
        'Memory Boosters: Play matching games and recall challenges to sharpen your memory.',
        'Strategic Thinking: Enjoy strategy games that test your planning and problem-solving skills.',
        'Speed and Reaction Games: Try quick-reaction games to keep your reflexes sharp.',
        'Educational Trivia: Test your knowledge with quizzes on a variety of topics—learn while you play!',
        'Daily Challenges: Compete with others or beat your own high scores in daily game challenges.',
        'Mindfulness Games: Relax with games designed to calm your mind and reduce stress.'
      ],
      gradient: 'bg-gradient-to-br from-golden-peach to-golden-yellow',
      textColor: 'text-golden-dark'
    },
  ];

  const content = (
    <div className="space-y-6">
     
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
