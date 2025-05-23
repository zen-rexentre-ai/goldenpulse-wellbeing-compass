
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define available languages
export type Language = 'en' | 'ta' | 'kn' | 'te' | 'hi';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const translationModule = await import(`../translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English if translation file not found
        const englishModule = await import('../translations/en.json');
        setTranslations(englishModule.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  // Load saved language preference from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
    
    // Try to update user profile with language preference if logged in
    const syncLanguageWithProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('profiles').update({
          preferred_language: savedLanguage || 'en'
        }).eq('id', session.user.id);
      }
    };
    
    syncLanguageWithProfile();
  }, []);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    // Update user profile if logged in
    const updateProfileLanguage = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('profiles').update({
          preferred_language: lang
        }).eq('id', session.user.id);
      }
    };
    
    updateProfileLanguage();
  };

  // Translation function
  const t = (key: string): string => {
    if (isLoading) return key;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
