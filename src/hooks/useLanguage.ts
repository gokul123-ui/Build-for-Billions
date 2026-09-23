import { useState, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation, TranslationKeys } from '../i18n';

const LANG_STORAGE_KEY = 'janconnect_lang';

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (saved === 'en' || saved === 'ta' || saved === 'hi') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
      window.dispatchEvent(new Event('janconnect_lang_changed'));
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    const handleLangChange = () => {
      try {
        const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
        if (saved && saved !== lang) {
          setLangState(saved);
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('janconnect_lang_changed', handleLangChange);
    return () => window.removeEventListener('janconnect_lang_changed', handleLangChange);
  }, [lang]);

  const t = (key: TranslationKeys) => getTranslation(lang, key);

  return { lang, setLang, t };
}
