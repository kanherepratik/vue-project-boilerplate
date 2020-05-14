import Vue from 'vue';
import axios from 'axios';
import VueI18n, { DateTimeFormat } from 'vue-i18n';
import messages from '@/lang/en';
import { LOCALE, FALLBACK_LOCALE } from '@/settings';

Vue.use(VueI18n);

const setDateTimeFormats: DateTimeFormat = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
  },
};
const dateTimeFormats = {
  en: setDateTimeFormats,
  es: setDateTimeFormats,
};
/**
 * To set locale
 *
 */
export const i18n = new VueI18n({
  locale: LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages,
  dateTimeFormats,
});
const loadedLanguages = ['en']; // our default language that is preloaded

const setI18nLanguage = (lang: string): string => {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
};

export const loadLanguageAsync = (lang: string): Promise<string> => {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then((msg) => {
    i18n.setLocaleMessage(lang, msg.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
};
