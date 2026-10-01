import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations } from './translations';
export const languages = [{ code: 'en', name: 'English' }, { code: 'zh', name: '中文（普通话）' }, { code: 'es', name: 'Español' }, { code: 'fr', name: 'Français' }, { code: 'pt', name: 'Português' }] as const;
export type Language = typeof languages[number]['code'];
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string }>({ language: 'en', setLanguage: () => {}, t: (text) => text });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => { try { const stored = localStorage.getItem('travelmate-language'); return languages.some((l) => l.code === stored) ? stored as Language : 'en'; } catch { return 'en'; } });
  useEffect(() => { document.documentElement.lang = language === 'zh' ? 'zh-Hans' : language; try { localStorage.setItem('travelmate-language', language); } catch { /* Works without storage. */ } }, [language]);
  const t = (text: string) => language === 'en' ? text : translations[text]?.[language] ?? text;
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
