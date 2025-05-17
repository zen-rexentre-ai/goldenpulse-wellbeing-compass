
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import { EmbossedCard } from '@/components/ui/card';
import { Mail, Phone, User } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-3 animate-fade-in">
        <Logo size="lg" />
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-lg">
            We're delighted to have you here.
          </p>
          <p className="text-lg font-medium">
            We Empower Seniors Live Vibrant, Purposeful and Fulfilling lives.
          </p>
        </div>
        
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <img 
            src="/lovable-uploads/1afecd79-96fc-404a-9fd6-6d7cee1b4bf1.png" 
            alt="Senior couple enjoying their golden years"
            className="w-full h-auto object-cover brightness-105 contrast-105"
          />
        </div>
        
        <div className="w-full space-y-6 my-6">
           <div className="text-center space-y-4">
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
          </div>
        </div>
        
        <div className="w-full space-y-4">
          <h2 className="text-2xl font-bold text-center">Ready to Embrace Your Best Years?</h2>
          
          {/* Nicely formatted founder details using an embossed card */}
          <EmbossedCard className="p-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span>Harinath Chakrapani (Founder)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>     IIMB Alumni, AMP-18</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91-9840178288</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>harinath04@gmail.com</span>
              </div>
            </div>
          </EmbossedCard>
          
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
