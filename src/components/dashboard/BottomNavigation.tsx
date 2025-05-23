
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, Gauge, Siren, Handshake, Settings, Gamepad2, Video } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  const { hasFeatureAccess, currentPlan } = useSubscription();

  // Helper function to determine if a link is active
  const isActive = (path: string) => currentPath === path;

  // Navigation items with their access requirements
  const navItems = [
    { path: '/dashboard', label: t("home"), icon: Home, feature: 'dashboard' },
    { path: '/wellness-analysis', label: t("analysis"), icon: Gauge, feature: 'wellness-analysis' },
    { path: '/emergency-contacts', label: t("emergency"), icon: Siren, feature: 'emergency' },
    { path: '/games', label: t("games"), icon: Gamepad2, feature: 'games' },
    { path: '/webinars', label: t("webinars"), icon: Video, feature: 'webinars' },
    { path: '/volunteering', label: t("volunteer"), icon: Handshake, feature: 'volunteering' },
    { path: '/settings', label: t("settings_link"), icon: Settings, feature: 'settings' },
  ];

  // Render a navigation item based on subscription access
  const renderNavItem = (item) => {
    const hasAccess = hasFeatureAccess(item.feature);
    
    // Common button content
    const buttonContent = (
      <>
        <item.icon size={20} />
        <span>{item.label}</span>
      </>
    );

    // If user doesn't have access, render a disabled button with tooltip
    if (!hasAccess) {
      return (
        <TooltipProvider key={item.path}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex flex-col items-center gap-1 text-xs opacity-50 cursor-not-allowed" 
              >
                {buttonContent}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("upgrade_to_access_feature")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    // If user has access, render the active link
    return (
      <Button 
        key={item.path}
        variant={isActive(item.path) ? "default" : "ghost"} 
        className="flex flex-col items-center gap-1 text-xs" 
        asChild
      >
        <Link to={item.path}>
          {buttonContent}
        </Link>
      </Button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t py-2">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-7 gap-1">
          {navItems.map(renderNavItem)}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
