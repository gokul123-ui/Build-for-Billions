import { en } from './en';
import { ta } from './ta';
import { hi } from './hi';
import { Language } from '../types';

export const translations = { en, ta, hi };

export type TranslationKeys = keyof typeof en;

export function getTranslation(lang: Language, key: TranslationKeys): string {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || key;
}
