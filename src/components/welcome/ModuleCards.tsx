
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Calculator, Gauge } from 'lucide-react';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const FitnessScoreMeter = ({ score = 75 }) => {
  // Define the color zones for the gauge
  const zones = [
    { name: 'Needs Improvement', value: 20, color: '#ea384c' },
    { name: 'Good', value: 20, color: '#FEC6A1' },
    { name: 'Very Good', value: 20, color: '#F2FCE2' },
    { name: 'Excellent', value: 20, color: '#4C9A2A' },
  ];
  
  // Create gauge data
  const data = zones.map((zone) => ({ ...zone }));
  
  // Calculate active segment based on score
  const getActiveZone = (score) => {
    if (score < 60) return 0;
    if (score < 70) return 1;
    if (score < 80) return 2;
    return 3;
  };
  
  const activeZone = getActiveZone(score);
  const scoreLabel = zones[activeZone]?.name || 'N/A';
  
  return (
    <div className="relative h-48 w-full flex flex-col items-center">
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold text-golden-dark">Your Fitness Score</h3>
        <div className="flex items-center justify-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          <span className="text-lg font-medium">{score}/100 - {scoreLabel}</span>
        </div>
      </div>
      
      <div className="w-full h-40 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="80%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  className={index === activeZone ? "stroke-primary stroke-2" : "opacity-80"}
                />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background rounded-md border border-border p-2 shadow-md">
                      <p className="font-medium">{payload[0].payload.name}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Score Needle */}
        <div 
          className="absolute left-1/2 bottom-0 -translate-x-1/2 origin-bottom rotate-[0deg] transition-transform duration-1000"
          style={{ 
            transform: `translateX(-50%) rotate(${180 - (score * 180) / 100}deg)`,
            transformOrigin: 'bottom center'
          }}
        >
          <div className="h-[60px] w-[3px] bg-primary rounded-t-full" />
          <div className="h-4 w-4 rounded-full bg-primary -mt-1 mx-auto shadow-lg" />
        </div>
        
        {/* Score Zones Labels */}
        <div className="absolute bottom-0 w-full flex justify-between px-2 pt-2 text-xs">
          <div className="text-left">
            <span className="text-red-500">{'<'}60</span>
            <p>Needs<br/>Improvement</p>
          </div>
          <div className="text-center ml-4">
            <span>60-70</span>
            <p>Good</p>
          </div>
          <div className="text-center">
            <span>70-80</span>
            <p>Very Good</p>
          </div>
          <div className="text-right">
            <span className="text-green-700">{'>'}80</span>
            <p>Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleCards = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  
  return (
    <div className="w-full space-y-4 my-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">What Awaits You:</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Card - Wellness Module */}
        <EmbossedCard className="overflow-hidden">
          <div className="bg-gradient-to-br from-golden-pink to-golden-peach p-6 h-full">
            <h3 className="text-xl font-bold mb-3 text-golden-dark">Wellness Module</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Personalized Wellness Journey</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Emergency Services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>AI Powered Diagnostics</span>
              </li>
                 <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Pain Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Track Your Kin</span>
              </li>
            </ul>
          </div>
        </EmbossedCard>
        
        {/* Second Card - Community Module */}
        <EmbossedCard className="overflow-hidden">
          <div className="bg-gradient-to-br from-golden-yellow to-golden-orange p-6 h-full">
            <h3 className="text-xl font-bold mb-3 text-golden-dark">Community Module</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Volunteering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Webinars</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Hobbies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Fun and Cognitive Games</span>
              </li>
            </ul>
          </div>
        </EmbossedCard>
        
        {/* Fitness Score Meter Card */}
        <EmbossedCard className="overflow-hidden col-span-1 md:col-span-2">
          <div className="bg-gradient-to-r from-golden-pink to-golden-peach p-6">
            <FitnessScoreMeter score={75} />
          </div>
        </EmbossedCard>
        
        {/* Fitness Calculator Card */}
        <EmbossedCard className="overflow-hidden col-span-1 md:col-span-2">
          <div className="bg-gradient-to-r from-golden-pink to-golden-peach p-6">
            <h3 className="text-xl font-bold mb-3 text-golden-dark">Check Your Health</h3>
            <p className="mb-4 text-golden-dark">Compare how daily physical activity helps in actual results, helps track progress and optimize your health journey.</p>
            
            <Button 
              variant="golden"
              size="lg"
              className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
              onClick={() => setCalculatorOpen(true)}
            >
              <Calculator className="h-6 w-6 mr-2" />
              Calculate Your Fitness Score
            </Button>
          </div>
        </EmbossedCard>
      </div>
      
      <FitnessCalculator 
        open={calculatorOpen}
        onOpenChange={setCalculatorOpen}
      />
    </div>
  );
};

export default ModuleCards;
