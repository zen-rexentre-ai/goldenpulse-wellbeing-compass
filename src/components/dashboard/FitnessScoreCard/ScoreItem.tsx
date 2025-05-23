
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
    <div className="pt-5 flex flex-col items-center text-slate-900">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs mb-2">{subtitle}</p>
      
      {/* Enhanced Gauge Meter - Now more prominent */}
      <FitnessScoreMeter score={score} />
      
      {/* Change indicator moved below the meter */}
      {change && (
        <div className="flex items-center gap-1 mt-1">
          {renderTrendArrow(change.direction)}
          <span className={change.direction === 'up' ? 'text-green-700' : 'text-red-700'}>
            {change.value}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ScoreItem;
