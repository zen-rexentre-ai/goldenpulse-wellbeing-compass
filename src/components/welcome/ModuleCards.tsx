
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Calculator, Gauge, Sparkles } from 'lucide-react';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const FitnessScoreMeter = ({ score = 75 }) => {
  // Define the color zones for the gauge with updated 5-fold range
  const zones = [
    { name: 'Poor', value: 10, color: '#e63946', range: '<50' },            // Brighter red
    { name: 'Unsatisfactory', value: 15, color: '#ff9e00', range: '50-65' }, // Bright orange
    { name: 'Satisfactory', value: 5, color: '#ffdd00', range: '65-70' },    // Bright yellow
    { name: 'Very Good', value: 15, color: '#70e000', range: '70-85' },      // Bright green
    { name: 'Excellent', value: 15, color: '#38b000', range: '>85' },        // Darker green
  ];
  
  // Create gauge data
  const data = zones.map((zone) => ({ ...zone }));
  
  // Calculate active segment based on score with updated ranges
  const getActiveZone = (score) => {
    if (score < 50) return 0;
    if (score < 65) return 1;
    if (score < 70) return 2;
    if (score < 85) return 3;
    return 4;
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
                    className={index === activeZone ? "stroke-primary stroke-2 opacity-100" : "opacity-90"}
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
        
        {/* Score Needle - Improved design: embossed, sharper and thicker near pivot */}
        <div 
          className="absolute left-1/2 bottom-[20%] -translate-x-1/2 origin-bottom"
          style={{ 
            transform: `translateX(-50%) rotate(${180 - (score * 180) / 100}deg)`,
            transformOrigin: 'center bottom'
          }}
        >
          <div className="flex flex-col items-center">
            {/* Needle with gradient and shadow for embossed look */}
            <div className="h-[60px] w-2.5 bg-gradient-to-t from-primary/90 to-primary/50 rounded-t-sm rounded-b-none shadow-md relative overflow-visible" 
                 style={{ 
                   clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                   filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3))'
                 }}
            >
              {/* Light reflection for embossed effect */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-white/30"></div>
            </div>
            {/* Thicker pivot point */}
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-primary to-primary/80 -mt-0.5 shadow-lg border-2 border-background" />
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
        
        <EmbossedCard className="overflow-hidden border-2 border-golden-orange animate-pulse bg-gradient-to-r from-golden-pink to-golden-peach p-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <AlertTitle className="text-xl font-bold text-golden-dark">Your Golden Journey</AlertTitle>
          </div>
          <AlertDescription>
            <p className="text-lg font-medium text-golden-dark mb-2">Medical team will recommend a wellness plan & review the progress at regular intervals.</p>
            <p className="text-lg font-medium text-golden-dark">Volunteer your services for societal good and bring purpose & positivity for your life.</p>
          </AlertDescription>
        </EmbossedCard>
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
