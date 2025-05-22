
import React from 'react';
import Logo from '@/components/Logo';

const Hero = () => {
  return (
    <div className="text-center space-y-2 mt-1">
      <Logo size="lg" />
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="text-lg font-medium">
        We Empower Seniors Live Vibrant, Purposeful and Fulfilling lives.
      </p>
      
      <div className="w-full rounded-lg overflow-hidden shadow-lg mt-2">
        <img 
          src="/lovable-uploads/1afecd79-96fc-404a-9fd6-6d7cee1b4bf1.png" 
          alt="Senior couple enjoying their golden years"
          className="w-full h-auto object-cover brightness-105 contrast-105"
        />
      </div>
    </div>
  );
};

export default Hero;
