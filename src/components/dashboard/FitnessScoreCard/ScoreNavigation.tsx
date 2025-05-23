
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface ScoreNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const ScoreNavigation: React.FC<ScoreNavigationProps> = ({ onPrevious, onNext }) => {
  const { t } = useLanguage();
  
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-white/80 shadow-sm" 
        onClick={onPrevious}
        aria-label={t("Previous score")}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 rounded-full bg-white/80 shadow-sm" 
        onClick={onNext}
        aria-label={t("Next score")}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ScoreNavigation;
