
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import ScreenReader from './ScreenReader';
import { useLanguage } from './LanguageProvider';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-10 bg-background border-b p-4">
      <div className="container max-w-6xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          {showBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              aria-label={t("back")}
            >
              ← {t("back")}
            </Button>
          )}
          
          <Link to="/dashboard">
            <Logo size="sm" className="max-w-[150px]" />
          </Link>
          
          {title && <h1 className="text-xl font-bold ml-2">{title}</h1>}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Screen Reader for current page content */}
          <ScreenReader 
            text={title ? `${title} ${t("page")}` : t("current_page")} 
            className="mr-1"
          />
          
          {/* Language Selector */}
          <LanguageSelector />
          
          {/* Settings Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label={t("settings")}
            asChild
          >
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" aria-label={t("notifications")}>
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
