
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FitnessScoreCardProps } from './types';
import ScoreItem from './ScoreItem';
import ScoreNavigation from './ScoreNavigation';
import CardFooter from './CardFooter';
import { useLanguage } from '@/components/LanguageProvider';
import ScreenReader from '@/components/ScreenReader';

export const FitnessScoreCard: React.FC<FitnessScoreCardProps> = ({ fitnessScores, onViewDetailedAnalysis }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();
  
  const scoreItems = [
    { 
      title: t('Current Score'), 
      score: fitnessScores.current, 
      subtitle: t('Your score today'),
      change: null 
    },
    { 
      title: t('Weekly Score'), 
      score: fitnessScores.week.score, 
      subtitle: t('Last week'),
      change: { 
        value: fitnessScores.week.change, 
        direction: fitnessScores.week.direction 
      } 
    },
    { 
      title: t('Monthly Score'), 
      score: fitnessScores.month.score, 
      subtitle: t('Last month'),
      change: { 
        value: fitnessScores.month.change, 
        direction: fitnessScores.month.direction 
      } 
    },
    { 
      title: t('Since Login'), 
      score: fitnessScores.sinceLogin.score, 
      subtitle: t('Your progress'), 
      change: { 
        value: fitnessScores.sinceLogin.change, 
        direction: fitnessScores.sinceLogin.direction 
      } 
    }
  ];

  const nextScore = () => {
    setActiveIndex((prev) => (prev === scoreItems.length - 1 ? 0 : prev + 1));
  };

  const prevScore = () => {
    setActiveIndex((prev) => (prev === 0 ? scoreItems.length - 1 : prev - 1));
  };

  const activeItem = scoreItems[activeIndex];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center relative mb-1">
        <Card className="w-full max-w-sm shadow-md border-primary/20">
          <div className="bg-primary/5 rounded-t-lg p-4 relative">
            <div className="absolute top-2 right-2">
              <ScreenReader text={`${activeItem.title}: ${activeItem.score}`} />
            </div>
            <ScoreNavigation onNext={nextScore} onPrevious={prevScore} />
            <ScoreItem 
              title={activeItem.title}
              subtitle={activeItem.subtitle}
              score={activeItem.score}
              change={activeItem.change}
            />
          </div>
          
          <CardFooter 
            activeIndex={activeIndex}
            totalItems={scoreItems.length}
            onDotClick={setActiveIndex}
            onAnalysisClick={onViewDetailedAnalysis}
          />
        </Card>
      </div>
    </div>
  );
};

export default FitnessScoreCard;
