
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Pill, Users, Handshake, Phone } from 'lucide-react';
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
          variant={isActive('/health') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/health">
            <Pill size={24} />
            <span className="text-xs">Health</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/emergency-contacts') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/emergency-contacts">
            <Phone size={24} />
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
          variant={isActive('/community') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/community">
            <Users size={24} />
            <span className="text-xs">Community</span>
          </Link>
        </Button>
        
        <Button 
          variant={isActive('/settings') ? "default" : "ghost"} 
          className="flex flex-col items-center gap-1"
          asChild
        >
          <Link to="/settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-xs">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
