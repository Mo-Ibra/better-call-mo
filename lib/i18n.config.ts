// lib/i18n.config.ts
export const languages = {
  en: {
    code: "en",
    name: "English",
    dir: "ltr",
    default: true,
  },
  es: {
    code: "es",
    name: "Español",
    dir: "ltr",
  },
  it: {
    code: "it",
    name: "Italiano",
    dir: "ltr",
  },
  de: {
    code: "de",
    name: "Deutsch",
    dir: "ltr",
  },
  pt: {
    code: "pt",
    name: "Português",
    dir: "ltr",
  },
} as const;

export type LanguageCode = keyof typeof languages;

export const defaultLanguage: LanguageCode = "en";

export const availableLanguages = Object.keys(languages) as LanguageCode[];

export function getLanguageConfig(code: string) {
  return languages[code as LanguageCode] || languages[defaultLanguage];
}
