
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from './LanguageProvider';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const getCurrentLanguageNativeName = () => {
    const currentLang = languages.find(lang => lang.code === language);
    return currentLang ? currentLang.nativeName : 'English';
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">{getCurrentLanguageNativeName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={`${language === lang.code ? 'bg-accent font-medium' : ''}`}
          >
            <span className="mr-2">{lang.nativeName}</span>
            <span className="text-muted-foreground">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
