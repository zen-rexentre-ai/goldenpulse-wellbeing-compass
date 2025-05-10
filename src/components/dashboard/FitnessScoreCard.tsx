
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, LineChart } from 'lucide-react';

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
      return <ArrowUp className="text-green-500" size={18} />;
    } else {
      return <ArrowDown className="text-red-500" size={18} />;
    }
  };

  const activeItem = scoreItems[activeIndex];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center relative mb-1">
        <Card className="w-full max-w-sm shadow-md border-primary/20">
          <div className="bg-primary/5 rounded-t-lg p-4 relative">
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-white/80 shadow-sm" 
                onClick={prevScore}
                aria-label="Previous score"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-white/80 shadow-sm" 
                onClick={nextScore}
                aria-label="Next score"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="pt-8 flex flex-col items-center">
              <h3 className="text-sm font-medium text-muted-foreground">{activeItem.title}</h3>
              <div className="text-5xl font-bold my-2">{activeItem.score}</div>
              <p className="text-xs text-muted-foreground">{activeItem.subtitle}</p>
              
              {activeItem.change && (
                <div className="flex items-center gap-1 mt-1 mb-2">
                  {renderTrendArrow(activeItem.change.direction)}
                  <span className={activeItem.change.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {activeItem.change.value}%
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <CardContent className="p-3 flex justify-between items-center">
            <div className="flex gap-1.5">
              {scoreItems.map((_, idx) => (
                <Button 
                  key={idx}
                  variant="ghost" 
                  size="icon" 
                  className={`h-2 w-2 rounded-full p-0 ${idx === activeIndex ? 'bg-primary' : 'bg-muted'}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to score ${idx + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onViewDetailedAnalysis}
              className="text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <LineChart size={14} />
              <span className="text-xs">Analysis</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
