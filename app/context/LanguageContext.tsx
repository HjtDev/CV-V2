'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { en, type Translations } from '../translations/en';
import { fa } from '../translations/fa';

export type Lang = 'en' | 'fa';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: en,
  dir: 'ltr',
});

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function writeLangCookie(l: Lang) {
  document.cookie = `lang=${l}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function applyLangToDOM(l: Lang) {
  document.documentElement.dir = l === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.lang = l;
}

// Farsi-speaking timezones for client-side geo fallback
const FA_TIMEZONES = new Set(['Asia/Tehran', 'Asia/Kabul', 'Asia/Dushanbe']);

export function LanguageProvider({
  children,
  initialLang = 'en',
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    writeLangCookie(l);
    applyLangToDOM(l);
  };

  useEffect(() => {
    // Client-side timezone detection — only runs when there is no saved cookie
    // AND the server couldn't detect Farsi from Accept-Language.
    // This catches cases like an Iranian with an English-language browser.
    const hasCookie = document.cookie.split(';').some((c) => c.trim().startsWith('lang='));
    if (hasCookie) return;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (FA_TIMEZONES.has(tz)) {
      setLang('fa');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: lang === 'fa' ? fa : en,
        dir: lang === 'fa' ? 'rtl' : 'ltr',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
