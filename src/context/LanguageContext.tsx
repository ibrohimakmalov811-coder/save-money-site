'use client';

import React, { createContext, useContext, useState } from 'react';
import type { SupportedLanguage, LanguageContextType } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: SupportedLanguage;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    document.cookie = `moneyquest_lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax${
      window.location.protocol === 'https:' ? '; Secure' : ''
    }`;
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
