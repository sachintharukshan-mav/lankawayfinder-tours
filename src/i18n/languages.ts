export const languages = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    gygLocale: 'en-US',
    ogLocale: 'en_US',
    currency: 'USD',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    gygLocale: 'de-DE',
    ogLocale: 'de_DE',
    currency: 'EUR',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    gygLocale: 'fr-FR',
    ogLocale: 'fr_FR',
    currency: 'EUR',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    gygLocale: 'ru-RU',
    ogLocale: 'ru_RU',
    currency: 'USD',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    gygLocale: 'it-IT',
    ogLocale: 'it_IT',
    currency: 'EUR',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    gygLocale: 'es-ES',
    ogLocale: 'es_ES',
    currency: 'EUR',
  },
} as const;

export type SupportedLanguage = keyof typeof languages;
export const defaultLang: SupportedLanguage = 'en';
export const allLanguages = Object.keys(languages) as SupportedLanguage[];
export const nonDefaultLanguages = allLanguages.filter(l => l !== defaultLang);

/**
 * Returns clean canonical path without language prefix
 */
export function getPathWithoutLang(pathname: string): string {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
  if (allLanguages.includes(segments[0] as SupportedLanguage)) {
    segments.shift();
  }
  const clean = segments.join('/');
  return clean ? `/${clean}/` : '/';
}

/**
 * Returns localized URL for a given target language and current path
 */
export function getLocalizedUrl(targetLang: SupportedLanguage, currentPathname: string): string {
  const cleanPath = getPathWithoutLang(currentPathname);
  if (targetLang === defaultLang) {
    return cleanPath;
  }
  return cleanPath === '/' ? `/${targetLang}/` : `/${targetLang}${cleanPath}`;
}
