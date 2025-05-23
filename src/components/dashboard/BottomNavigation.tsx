
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Gauge, Siren, Handshake, Settings, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  // Helper function to determine if a link is active
  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-6 gap-1">
          <Button 
            variant={isActive('/dashboard') ? "default" : "ghost"} 
            className="flex flex-col items-center gap-1 text-xs" 
            asChild
          >
            <Link to="/dashboard">
              <Home size={20} />
              <span>{t("home")}</span>
            </Link>
          </Button>
          
          <Button 
            variant={isActive('/wellness-analysis') ? "default" : "ghost"} 
            className="flex flex-col items-center gap-1 text-xs"
            asChild
          >
            <Link to="/wellness-analysis">
              <Gauge size={20} />
              <span>{t("analysis")}</span>
            </Link>
          </Button>
                 
          <Button 
            variant={isActive('/emergency-contacts') ? "default" : "ghost"} 
            className="flex flex-col items-center gap-1 text-xs"
            asChild
          >
            <Link to="/emergency-contacts">
              <Siren size={20} />
              <span>{t("emergency")}</span>
            </Link>
          </Button>
          
          <Button 
            variant={isActive('/games') ? "default" : "ghost"} 
            className="flex flex-col items-center gap-1 text-xs"
            asChild
          >
            <Link to="/games">
              <Gamepad2 size={20} />
              <span>{t("games")}</span>
            </Link>
          </Button>
          
          <Button 
            variant={isActive('/volunteering') ? "default" : "ghost"} 
            className="flex flex-col items-center gap-1 text-xs"
            asChild
          >
            <Link to="/volunteering">
              <Handshake size={20} />
              <span>{t("volunteer")}</span>
            </Link>
          </Button>
          
          <Button 
            variant={isActive('/settings') ? "default" : "ghost"} 
            className="flex flex-col items-center gap-1 text-xs"
            asChild
          >
            <Link to="/settings">
              <Settings size={20} />
              <span>{t("settings_link")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
