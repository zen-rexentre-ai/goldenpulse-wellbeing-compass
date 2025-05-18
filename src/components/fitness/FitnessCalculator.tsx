
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FitnessCalculatorForm, { FitnessFormValues } from './FitnessCalculatorForm';
import FitnessCalculatorResults from './FitnessCalculatorResults';
import { calculateFitnessScore } from '@/utils/fitnessScoreUtils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface FitnessCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FitnessCalculator: React.FC<FitnessCalculatorProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [formData, setFormData] = useState<FitnessFormValues | null>(null);
  const [calculationResult, setCalculationResult] = useState<{
    score: number;
    recommendations: Array<{text: string; impact: string; priority: string}>;
    normalizedValues: {[key: string]: number};
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = (values: FitnessFormValues) => {
    setFormData(values);
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const result = calculateFitnessScore(values);
      setCalculationResult(result);
      setIsCalculating(false);
    }, 1000);
  };

  const handleSaveReport = () => {
    // This would connect to Supabase in a real implementation
    toast({
      title: "Report Saved",
      description: "Your health assessment has been saved and emailed to you.",
    });
  };

  const handleReset = () => {
    setFormData(null);
    setCalculationResult(null);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset the form state when closing
    setTimeout(() => {
      if (!open) {
        handleReset();
      }
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Health Score Calculator
            <Badge variant="outline" className="ml-2 bg-primary/10">Beta</Badge>
          </DialogTitle>
        </DialogHeader>
        
        {isCalculating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Calculating your health score...</p>
          </div>
        ) : calculationResult ? (
          <FitnessCalculatorResults 
            score={calculationResult.score}
            recommendations={calculationResult.recommendations}
            normalizedValues={calculationResult.normalizedValues}
            onSave={handleSaveReport}
            onReset={handleReset}
          />
        ) : (
          <FitnessCalculatorForm onSubmit={handleFormSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FitnessCalculator;
