import React, { useState } from 'react';
import { EmbossedCard } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import FitnessCalculator from '@/components/fitness/FitnessCalculator';


const ModuleCards = () => {
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
        <div className="bg-gradient-to-br from-golden-pink to-golden-peach p-6 h-full">
         <Button 
        className="w-full text-lg py-5 flex items-center justify-center gap-2"         onClick={() => setCalculatorOpen(true)}
      >
        <Activity className="h-5 w-5" />
        Calculate Fitness Score
      </Button>
          </div>
      </div>
    </div>
  );
};

export default ModuleCards;
