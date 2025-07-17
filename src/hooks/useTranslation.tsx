import { useState, useEffect } from 'react';

type TranslationObject = {
  [key: string]: string | TranslationObject;
};

let translations: TranslationObject = {};

const loadTranslations = async () => {
  try {
    const enTranslations = await import('../locales/en/common.json');
    translations = enTranslations.default;
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
};

loadTranslations();

export const useTranslation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(translations).length > 0) {
      setIsLoaded(true);
    }
  }, []);

  const t = (key: string, replacements?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (replacements) {
      return Object.keys(replacements).reduce((str, replaceKey) => {
        return str.replace(new RegExp(`{${replaceKey}}`, 'g'), replacements[replaceKey]);
      }, value);
    }

    return value;
  };

  return { t, isLoaded };
};
