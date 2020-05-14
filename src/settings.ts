export const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT || '/api/';
export const SENTRY_ENV = process.env.VUE_APP_SENTRY_ENV || 'testing';
export const ALLOW_CONSOLE_LOGGING = process.env.NODE_ENV !== 'production';
export const ENV_MODE = process.env.NODE_ENV;
export const STATIC_URL = process.env.VUE_APP_STATIC_URL || '/static/';
export const LOCALE = process.env.VUE_APP_I18N_LOCALE || 'en';
export const FALLBACK_LOCALE = process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en';
