
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Gauge, Users, Handshake, Siren, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function to determine if a link is active
  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2">
      <div className="container max-w-6xl flex justify-around">
        <Button 
          variant={isActive('/dashboard') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1" 
          asChild
        >
          <Link to="/dashboard">
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/wellness-analysis') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/wellness-analysis">
            <Gauge size={24} />
            <span className="text-xs">Analysis</span>
          </Link>
        </Button>
               
        <Button 
          variant={isActive('/emergency-contacts') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/emergency-contacts">
            <Siren size={24} />
            <span className="text-xs">Emergency</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/volunteering') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/volunteering">
            <Handshake size={24} />
            <span className="text-xs">Volunteer</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/settings') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/settings">
            <Settings size={24} />
            <span className="text-xs">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
