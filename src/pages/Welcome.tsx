
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-8 animate-fade-in">
        <Logo size="lg" className="mt-12" />
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome to GoldenPulse!</h1>
          <p className="text-lg">
            We're delighted to have you here. Our vision is simple yet powerful: 
            Empowering seniors like you to live vibrant, meaningful, and fulfilling lives.
          </p>
        </div>
        
        <div className="w-full space-y-6 my-6">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">What Awaits You:</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span><strong>Personalized Wellness Journey:</strong> Track your fitness with your own wellness score.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span><strong>Purposeful Volunteering:</strong> Discover opportunities that match your passions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span><strong>Engaging Webinars:</strong> Access sessions on topics that matter to you.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span><strong>Fun & Games:</strong> Enjoy activities designed to keep your mind sharp.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="w-full space-y-4">
          <h2 className="text-2xl font-bold text-center">Ready to Embrace Your Best Years?</h2>
          
          <div className="grid gap-4">
            <Link to="/register">
              <Button className="w-full text-lg py-6" size="lg">
                Create Account
              </Button>
            </Link>
            
            <Link to="/login">
              <Button className="w-full text-lg py-6" variant="outline" size="lg">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
