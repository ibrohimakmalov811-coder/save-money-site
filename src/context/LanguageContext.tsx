'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LanguageContextType } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('moneyquest_lang') as SupportedLanguage;
      if (saved && (saved === 'en' || saved === 'uz' || saved === 'ru')) {
        setLanguageState(saved);
      }
    } catch {
      // localStorage fallback
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('moneyquest_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
