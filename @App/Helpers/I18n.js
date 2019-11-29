import i18n from 'i18n-js';
import Locales from 'App/Locales';
import { memoize } from 'lodash';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = (customLocale) => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(Locales)) || fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  const isCustomLocalValid = customLocale && Object.keys(Locales).includes(customLocale);
  const targetLocale = isCustomLocalValid ? customLocale : languageTag;

  i18n.translations = { [targetLocale]: Locales[targetLocale]() };
  i18n.locale = targetLocale;
};

export default {
  setI18nConfig,
  translate,
};
