
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface FitnessScore {
  current: number;
  week: {
    score: number;
    change: number;
    direction: string;
  };
  month: {
    score: number;
    change: number;
    direction: string;
  };
  sinceLogin: {
    score: number;
    change: number;
    direction: string;
  };
}

interface FitnessScoreCardProps {
  fitnessScores: FitnessScore;
  onViewDetailedAnalysis: () => void;
}

export const FitnessScoreCard: React.FC<FitnessScoreCardProps> = ({ fitnessScores, onViewDetailedAnalysis }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scoreItems = [
    { 
      title: 'Current Score', 
      score: fitnessScores.current, 
      subtitle: 'Your score today',
      change: null 
    },
    { 
      title: 'Weekly Score', 
      score: fitnessScores.week.score, 
      subtitle: 'Last week',
      change: { 
        value: fitnessScores.week.change, 
        direction: fitnessScores.week.direction 
      } 
    },
    { 
      title: 'Monthly Score', 
      score: fitnessScores.month.score, 
      subtitle: 'Last month',
      change: { 
        value: fitnessScores.month.change, 
        direction: fitnessScores.month.direction 
      } 
    },
    { 
      title: 'Since Login', 
      score: fitnessScores.sinceLogin.score, 
      subtitle: 'Your progress', 
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

  // Function to render the trend arrow based on direction
  const renderTrendArrow = (direction: string) => {
    if (direction === 'up') {
      return <ArrowUp className="text-green-500" size={20} />;
    } else {
      return <ArrowDown className="text-red-500" size={20} />;
    }
  };

  const activeItem = scoreItems[activeIndex];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md bg-primary/5 rounded-lg border shadow-sm relative">
        <div className="bg-primary text-primary-foreground p-3 text-center rounded-t-lg">
          <h2 className="text-lg font-semibold">Your Fitness Score</h2>
        </div>
        
        <div className="flex items-center justify-center py-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 h-8 w-8" 
            onClick={prevScore}
            aria-label="Previous score"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex flex-col items-center justify-center text-center px-12">
            <h3 className="text-lg font-medium text-muted-foreground">{activeItem.title}</h3>
            <div className="text-5xl font-bold my-3">{activeItem.score}</div>
            <p className="text-sm text-muted-foreground">{activeItem.subtitle}</p>
            
            {activeItem.change && (
              <div className="flex items-center gap-1 mt-2">
                {renderTrendArrow(activeItem.change.direction)}
                <span className={activeItem.change.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {activeItem.change.value}%
                </span>
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 h-8 w-8" 
            onClick={nextScore}
            aria-label="Next score"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-end p-3 pt-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewDetailedAnalysis}
            className="text-primary hover:text-primary/80"
          >
            View Detailed Analysis
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center mt-2">
        {scoreItems.map((_, idx) => (
          <Button 
            key={idx}
            variant="ghost" 
            size="icon" 
            className={`h-2 w-2 rounded-full mx-1 p-0 ${idx === activeIndex ? 'bg-primary' : 'bg-muted'}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to score ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
