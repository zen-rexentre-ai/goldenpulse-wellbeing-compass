
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface FitnessScoreMeterProps {
  score: number;
}

const FitnessScoreMeter: React.FC<FitnessScoreMeterProps> = ({ score = 75 }) => {
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
    <div className="relative h-20 w-full flex flex-col items-center">
      <div className="w-full h-20 relative">
        <TooltipProvider>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={30}
                outerRadius={40}
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
            <div className="h-[30px] w-1 bg-gradient-to-t from-primary to-primary/70 rounded-full shadow-md" />
            <div className="h-2 w-2 rounded-full bg-primary -mt-1 shadow-lg border border-background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessScoreMeter;
