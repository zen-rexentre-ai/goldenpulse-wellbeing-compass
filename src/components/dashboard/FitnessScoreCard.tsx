
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  // Function to render the trend arrow based on direction
  const renderTrendArrow = (direction: string) => {
    if (direction === 'up') {
      return <ArrowUp className="text-green-500" size={20} />;
    } else {
      return <ArrowDown className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="w-full overflow-hidden bg-primary/5 rounded-lg border shadow-sm">
      <div className="bg-primary text-primary-foreground p-4 text-center">
        <h2 className="text-xl font-semibold">Your Fitness Score</h2>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className="pl-0">
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-6xl font-bold mb-2">{fitnessScores.current}</div>
                  <p className="text-sm text-muted-foreground">Current Score</p>
                  <div className="flex items-center gap-2 mt-3 text-lg">
                    <span>Weekly Change:</span>
                    <div className="flex items-center gap-1">
                      {renderTrendArrow(fitnessScores.week.direction)}
                      <span className={fitnessScores.week.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {fitnessScores.week.change}%
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">Use the arrows to view your score history</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          
          <CarouselItem>
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-6xl font-bold mb-2">{fitnessScores.week.score}</div>
                  <p className="text-sm text-muted-foreground">Last Week</p>
                  <div className="flex items-center gap-2 mt-3 text-lg">
                    <span>Weekly Change:</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUp size={20} />
                      <span>2.8%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">This was your score one week ago</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          
          <CarouselItem>
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-6xl font-bold mb-2">{fitnessScores.month.score}</div>
                  <p className="text-sm text-muted-foreground">Last Month</p>
                  <div className="flex items-center gap-2 mt-3 text-lg">
                    <span>Monthly Change:</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUp size={20} />
                      <span>{fitnessScores.month.change}%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">This was your score one month ago</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
          
          <CarouselItem>
            <Card className="border-0 shadow-none">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-6xl font-bold mb-2">{fitnessScores.sinceLogin.score}</div>
                  <p className="text-sm text-muted-foreground">Since Login</p>
                  <div className="flex items-center gap-2 mt-3 text-lg">
                    <span>Overall Progress:</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUp size={20} />
                      <span>{fitnessScores.sinceLogin.change}%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">Your progress since you started using the app</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        
        <div className="flex items-center justify-center mt-4 mb-2">
          <CarouselPrevious className="relative inset-auto mx-2" />
          <CarouselNext className="relative inset-auto mx-2" />
        </div>
      </Carousel>
      
      <div className="flex justify-center p-4">
        <Button 
          className="mt-2" 
          variant="outline" 
          onClick={onViewDetailedAnalysis}
        >
          View Detailed Analysis
        </Button>
      </div>
    </div>
  );
};
