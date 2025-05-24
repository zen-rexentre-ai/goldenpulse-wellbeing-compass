
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
  
  // Define the color zones for the gauge with updated ranges
  const zones = [
    { name: 'Poor', value: 10, color: '#e63946', range: '<30' },            // Red
    { name: 'Unsatisfactory', value: 20, color: '#ff9e00', range: '30-50' }, // Orange
    { name: 'Satisfactory', value: 10, color: '#ffdd00', range: '50-60' },   // Yellow
    { name: 'Good', value: 10, color: '#70e000', range: '60-70' },          // Light Green
    { name: 'Very Good', value: 15, color: '#38b000', range: '70-85' },      // Green
    { name: 'Excellent', value: 10, color: '#006400', range: '>85' },        // Dark Green
  ];
  
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
  const startingScore = 120; // Starting position for the needle animation
  
  // Animate the score when component mounts
  useEffect(() => {
    // Start from the poor zone (red area) instead of 0
    setAnimatedScore(startingScore);
    
    // Small delay to ensure the reset is visible
    const timeout = setTimeout(() => {
      // Animate from red zone to the actual score
      const duration = 2500; // animation duration in ms
      const start = 200;
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
  
  // Create gauge data
  const data = zones.map((zone) => ({ ...zone }));
  
  return (
    <div className="relative h-48 w-full flex flex-col items-center">
      {/* Increased height by 1.5x for more prominence (was h-32) */}
      <div className="w-full h-48 relative mb-2">
        <TooltipProvider>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60} // Increased from 40 (1.5x)
                outerRadius={82} // Increased from 55 (1.5x)
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
            <div className="h-[63px] w-3 bg-gradient-to-t from-primary/90 to-primary/50 rounded-t-sm rounded-b-none shadow-md relative overflow-visible" 
                 style={{ 
                   clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                   filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3))'
                 }}
            >
              {/* Light reflection for embossed effect */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-white/30"></div>
            </div>
            {/* Larger pivot point */}
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/80 -mt-0.5 shadow-lg border border-background" />
          </div>
        </div>
      </div>
      
      {/* Score display below the meter in smaller font */}
      <div className="text-2xl font-semibold text-slate-900">
        {Math.round(animatedScore)}
      </div>
      
      <div className="w-full px-1 flex justify-between mt-1">
        <span className="text-[10px] text-slate-700">0</span>
        <span className="text-[10px] text-slate-700">50</span>
        <span className="text-[10px] text-slate-700">100</span>
      </div>
    </div>
  );
};

export default FitnessScoreMeter;
