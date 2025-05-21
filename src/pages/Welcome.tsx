
import React from 'react';
import Hero from '@/components/welcome/Hero';
import ModuleCards from '@/components/welcome/ModuleCards';
import FoundersSection from '@/components/welcome/FoundersSection';
import ActionButtons from '@/components/welcome/ActionButtons';

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary p-4">
      <div className="w-full max-w-md flex flex-col items-center gap-2 animate-fade-in py-2">
        <Hero />
        <ModuleCards />
                  <FoundersSection />
        <div className="w-full space-y-3">
          <h2 className="text-2xl font-bold text-center">Ready to Embrace Your Best Years?</h2>
          

          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
