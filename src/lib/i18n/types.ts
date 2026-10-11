export type SupportedLanguage = 'en' | 'uz' | 'ru';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
}
