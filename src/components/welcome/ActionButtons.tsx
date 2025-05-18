
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';

const ActionButtons = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  
  return (
    <div className="grid gap-3">
     
      
      <Link to="/register">
        <Button className="w-full text-lg py-5" size="lg">
          Create Account
        </Button>
      </Link>
      
      <Link to="/login">
        <Button className="w-full text-lg py-5" variant="outline" size="lg">
          I Already Have an Account
        </Button>
      </Link>
      
      <FitnessCalculator 
        open={calculatorOpen}
        onOpenChange={setCalculatorOpen}
      />
    </div>
  );
};

export default ActionButtons;
