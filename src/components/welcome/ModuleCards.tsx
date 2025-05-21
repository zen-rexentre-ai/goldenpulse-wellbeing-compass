
import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity, Calculator } from 'lucide-react';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';


const ModuleCards = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  
  return (
    <div className="w-full space-y-4 my-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">What Awaits You:</h1>
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
                <span>Emergency Services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>AI Powered Diagnostics</span>
              </li>
                 <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Pain Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span>Track Your Kin</span>
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
                <span>Volunteering</span>
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
        
        {/* Fitness Calculator Card */}
        <EmbossedCard className="overflow-hidden col-span-1 md:col-span-2">
          <div className="bg-gradient-to-r from-golden-pink to-golden-peach p-6">
            <h3 className="text-xl font-bold mb-3 text-golden-dark">Check Your Health</h3>
            <p className="mb-4 text-golden-dark">Compare how daily physical activity helps in actual results, helps track progress and optimize your health journey.</p>
            
            <Button 
              variant="golden"
              size="lg"
              className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
              onClick={() => setCalculatorOpen(true)}
            >
              <Calculator className="h-6 w-6 mr-2" />
              Calculate Your Fitness Score
            </Button>
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
