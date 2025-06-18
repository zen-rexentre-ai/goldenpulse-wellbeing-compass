
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ShieldAlert, Handshake, Gamepad2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  const { hasFeatureAccess } = useSubscription();

  // Helper function to determine if a link is active
  const isActive = (path: string) => currentPath === path;

  // Updated navigation items with bright red emergency icon
  const navItems = [
    { path: '/dashboard', label: t("home"), icon: Home, feature: 'dashboard' },
    { path: '/emergency-contacts', label: t("emergency"), icon: ShieldAlert, feature: 'emergency', isEmergency: true },
    { path: '/engagement', label: t("engagement"), icon: Gamepad2, feature: 'games' },
    { path: '/volunteering', label: t("volunteer"), icon: Handshake, feature: 'volunteering' },
  ];

  // Render a navigation item based on subscription access
  const renderNavItem = (item) => {
    const hasAccess = hasFeatureAccess(item.feature);
    
    // Common button content with responsive design and emergency styling
    const buttonContent = (
      <>
        <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.isEmergency ? 'text-red-500' : ''}`} />
        <span className="hidden sm:block text-xs">{item.label}</span>
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
                className="flex flex-col items-center gap-1 p-2 sm:p-3 opacity-50 cursor-not-allowed min-h-[60px] sm:min-h-[70px]" 
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

    // If user has access, render the active link with responsive design
    return (
      <Button 
        key={item.path}
        variant={isActive(item.path) ? "default" : "ghost"} 
        className={`flex flex-col items-center gap-1 p-2 sm:p-3 min-h-[60px] sm:min-h-[70px] ${item.isEmergency && isActive(item.path) ? 'bg-red-500 hover:bg-red-600' : ''}`}
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
        <div className="grid grid-cols-4 gap-1">
          {navItems.map(renderNavItem)}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
