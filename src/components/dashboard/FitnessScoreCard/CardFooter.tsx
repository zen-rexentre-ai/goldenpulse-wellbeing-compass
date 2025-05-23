
import React from 'react';
import { Button } from '@/components/ui/button';
import { LineChart } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface CardFooterProps {
  activeIndex: number;
  totalItems: number;
  onDotClick: (index: number) => void;
  onAnalysisClick: () => void;
}

const CardFooter: React.FC<CardFooterProps> = ({ 
  activeIndex, 
  totalItems, 
  onDotClick, 
  onAnalysisClick 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-3 flex justify-between items-center">
      <div className="flex gap-1.5">
        {Array.from({ length: totalItems }).map((_, idx) => (
          <Button 
            key={idx}
            variant="ghost" 
            size="icon" 
            className={`h-2 w-2 rounded-full p-0 ${idx === activeIndex ? 'bg-primary' : 'bg-muted'}`}
            onClick={() => onDotClick(idx)}
            aria-label={t("go_to_score") + " " + (idx + 1)}
          />
        ))}
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onAnalysisClick}
        className="text-primary hover:text-primary/80 flex items-center gap-1"
      >
        <LineChart size={14} />
        <span className="text-xs">{t("analysis")}</span>
      </Button>
    </div>
  );
};

export default CardFooter;
