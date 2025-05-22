
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Calculator, Gauge } from 'lucide-react';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const FitnessScoreMeter = ({ score = 75 }) => {
  // Define the color zones for the gauge
  const zones = [
    { name: 'Needs Improvement', value: 20, color: '#ea384c', range: '<60' },
    { name: 'Good', value: 20, color: '#FEC6A1', range: '60-70' },
    { name: 'Very Good', value: 20, color: '#F2FCE2', range: '70-80' },
    { name: 'Excellent', value: 20, color: '#4C9A2A', range: '>80' },
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
  
  return (
    <div className="relative h-32 w-full flex flex-col items-center">
      <div className="w-full h-32 relative">
        <TooltipProvider>
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
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background rounded-md border border-border p-2 shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm text-muted-foreground">Score range: {data.range}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </TooltipProvider>
        
        {/* Score Needle */}
        <div 
          className="absolute left-1/2 bottom-[20%] -translate-x-1/2 origin-bottom"
          style={{ 
            transform: `translateX(-50%) rotate(${180 - (score * 180) / 100}deg)`,
            transformOrigin: 'center bottom'
          }}
        >
          <div className="flex flex-col items-center">
            <div className="h-[60px] w-2 bg-gradient-to-t from-primary to-primary/70 rounded-full shadow-md" />
            <div className="h-4 w-4 rounded-full bg-primary -mt-1 shadow-lg border-2 border-background" />
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
        <p className="text-lg font-medium text-golden-dark mb-2">Medical team will recommend a wellness plan & review the progress at regular intervals.</p>
       <p className="text-lg font-medium text-golden-dark mb-2">Volunteer your services for societal good and bring purpose & positivity for your life. </p>
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
                <span>Pain Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Access to Kin</span>
              </li>
                            <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>AI Powered Diagnostics</span>
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
                <span>Volunteering Opportunities</span>
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
        
        {/* Wellness Score Card with Calculator - Reduced spacing */}
        <EmbossedCard className="overflow-hidden col-span-1 md:col-span-2">
          <div className="bg-gradient-to-r from-golden-pink/90 to-golden-peach/90 p-6">
            <h3 className="text-2xl font-bold mb-2 text-center text-golden-dark">Check Your Wellness Score</h3>
            
            <p className="text-center mb-2 text-golden-dark">Compare how daily activity helps in actual results, helps track progress and optimize your health journey.</p>
        
            <FitnessScoreMeter score={75} />
            
            <div className="mt-2 text-center">
              <Button 
                variant="golden"
                size="lg"
                className="w-full max-w-md text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none bg-gradient-to-r from-[#E05C16] to-[#D9A112] text-white font-semibold"
                onClick={() => setCalculatorOpen(true)}
              >
                Calculate Your Wellness Score
              </Button>
            </div>
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
