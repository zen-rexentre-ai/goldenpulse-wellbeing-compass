
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import FitnessScoreMeter from './FitnessScoreMeter';

interface ChangeData {
  value: number;
  direction: string;
}

interface ScoreItemProps {
  title: string;
  subtitle: string;
  score: number;
  change: ChangeData | null;
}

const ScoreItem: React.FC<ScoreItemProps> = ({ title, subtitle, score, change }) => {
  // Function to render the trend arrow based on direction
  const renderTrendArrow = (direction: string) => {
    if (direction === 'up') {
      return <ArrowUp className="text-green-500" size={18} />;
    } else {
      return <ArrowDown className="text-red-500" size={18} />;
    }
  };

  return (
    <div className="pt-8 flex flex-col items-center text-white">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="text-5xl font-bold my-2">{score}</div>
      <p className="text-xs">{subtitle}</p>
      
      {change && (
        <div className="flex items-center gap-1 mt-1 mb-2">
          {renderTrendArrow(change.direction)}
          <span className={change.direction === 'up' ? 'text-green-100' : 'text-red-100'}>
            {change.value}%
          </span>
        </div>
      )}
      
      {/* Enhanced Gauge Meter */}
      <FitnessScoreMeter score={score} />
    </div>
  );
};

export default ScoreItem;
