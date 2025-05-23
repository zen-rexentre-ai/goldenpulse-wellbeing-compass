
import React, { useState, useEffect } from 'react';
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
  // Animation state for the needle
  const [animatedScore, setAnimatedScore] = useState(0);
  
  // Animate the score when component mounts
  useEffect(() => {
    // Reset to 0 first for any score change
    setAnimatedScore(0);
    
    // Small delay to ensure the reset is visible
    const timeout = setTimeout(() => {
      // Animate from 0 to the actual score
      const duration = 1500; // animation duration in ms
      const start = 0;
      const end = score;
      const startTime = performance.now();
      
      const animateScore = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smoother animation
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);
        
        const currentScore = start + (end - start) * easedProgress;
        setAnimatedScore(currentScore);
        
        if (progress < 1) {
          requestAnimationFrame(animateScore);
        }
      };
      
      requestAnimationFrame(animateScore);
    }, 200);
    
    return () => clearTimeout(timeout);
  }, [score]);
  
  // Define the color zones for the gauge with updated ranges
  const zones = [
    { name: 'Poor', value: 10, color: '#e63946', range: '<30' },            // Red
    { name: 'Unsatisfactory', value: 20, color: '#ff9e00', range: '30-50' }, // Orange
    { name: 'Satisfactory', value: 10, color: '#ffdd00', range: '50-60' },   // Yellow
    { name: 'Good', value: 10, color: '#70e000', range: '60-70' },          // Light Green
    { name: 'Very Good', value: 15, color: '#38b000', range: '70-85' },      // Green
    { name: 'Excellent', value: 10, color: '#006400', range: '>85' },        // Dark Green
  ];
  
  // Create gauge data
  const data = zones.map((zone) => ({ ...zone }));
  
  // Calculate active segment based on score with updated ranges
  const getActiveZone = (score) => {
    if (score < 30) return 0;
    if (score < 50) return 1;
    if (score < 60) return 2;
    if (score < 70) return 3;
    if (score < 85) return 4;
    return 5;
  };
  
  const activeZone = getActiveZone(score);
  
  return (
    <div className="relative h-32 w-full flex flex-col items-center">
      {/* Increased height for more prominence */}
      <div className="w-full h-32 relative mb-2">
        <TooltipProvider>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={40}
                outerRadius={55}
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
            </PieChart>
          </ResponsiveContainer>
        </TooltipProvider>
        
        {/* Score Needle - With animation */}
        <div 
          className="absolute left-1/2 bottom-[20%] -translate-x-1/2 origin-bottom transition-transform duration-1000"
          style={{ 
            transform: `translateX(-50%) rotate(${180 - (animatedScore * 180) / 100}deg)`,
            transformOrigin: 'center bottom',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <div className="flex flex-col items-center">
            {/* Longer, more prominent needle with gradient and shadow */}
            <div className="h-[42px] w-2 bg-gradient-to-t from-primary/90 to-primary/50 rounded-t-sm rounded-b-none shadow-md relative overflow-visible" 
                 style={{ 
                   clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                   filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3))'
                 }}
            >
              {/* Light reflection for embossed effect */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-white/30"></div>
            </div>
            {/* Larger pivot point */}
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-primary to-primary/80 -mt-0.5 shadow-lg border border-background" />
          </div>
        </div>
      </div>
      
      {/* Score display below the meter in smaller font */}
      <div className="text-2xl font-semibold text-white">
        {Math.round(animatedScore)}
      </div>
      
      {/* Legend/scale markers - optional enhancement */}
      <div className="w-full px-1 flex justify-between mt-1">
        <span className="text-[10px] text-white/70">0</span>
        <span className="text-[10px] text-white/70">50</span>
        <span className="text-[10px] text-white/70">100</span>
      </div>
    </div>
  );
};

export default FitnessScoreMeter;
