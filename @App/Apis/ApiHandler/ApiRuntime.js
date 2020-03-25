import axios from 'axios';
import { isEmpty } from 'lodash';
import { Alert } from 'react-native';

import { Config } from 'App/Config';
import { AppStore, AppApiActions, UserActions } from 'App/Stores';
import { DefaultErrorHandler, DefaultSuccessHandler } from './DefaultHandler';

const Runtime = async ({ url, method, options = {} }) => {
  let {
    params = {}, // query params
    data = undefined, // body data
    Authorization = '',
    successHandler = undefined,
    errorHandler = undefined,
    finallyHandler = undefined,
    isDefaultHandlerEnable = true,
    acceptLanguage = undefined,
    header = {},
    ...config
  } = options;
  try {
    // Get current app locale status
    if (!acceptLanguage) {
      const appLocales = AppStore.getState().appState.currentLocales;
      if (appLocales instanceof Array) {
        acceptLanguage = appLocales.map((e) => e.languageTag).toString();
      }
    }

    // dispatch api action to saga
    __DEV__ && AppStore.dispatch(AppApiActions.onApiFetching(url, method, options));

    // Create an axios instance
    const instance = axios.create({
      ...config,

      baseURL: config.baseURL || Config.API_BASE_URL,

      timeout: config.timeout || Config.API_TIMEOUT || 15 * 1000,

      headers: {
        // Default accept header set to json
        'Content-Type': 'application/json',
        'Accept-Language': acceptLanguage,

        // Reset JWT authorization token if gave
        ...(Authorization && {
          Authorization: 'Bearer ' + Authorization,
        }),
        ...header,
      },
    });

    console.log('method=>', method);
    console.log('header=>', header);
    console.log('data=>', data);

    // Ensure there's no undefined
    if (url && (url.includes('undefined') || url.includes('null'))) {
      const message = `API Url contains "null" or "undefined". Check input API Url: "${url}".`;
      __DEV__ && console.log(message);
      return __DEV__ && Alert.alert('@ApiHandler', message);
    }

    const res = ['patch', 'post', 'put'].includes(method)
      ? await instance[method](url, data, { params })
      : await instance[method](url, { params, data });

    // Auto refresh token
    if (res.headers && !isEmpty(res.headers.authorization)) {
      AppStore.dispatch(UserActions.onUserRefreshToken(res.headers.authorization));
    }

    if (typeof successHandler === 'function') {
      await successHandler(res);
    }
    await DefaultSuccessHandler(res);

    // dispatch api action to saga
    __DEV__ && AppStore.dispatch(AppApiActions.onApiFetchSuccess(res));
    return res;
  } catch (err) {
    // if error has normal response, use default handling
    // if custom handler is gave, use it
    let errorObject = err;
    if (err.response) {
      errorObject = err.response;
    }
    if (typeof errorHandler === 'function') {
      await errorHandler(errorObject);
    }
    if (isDefaultHandlerEnable) {
      await DefaultErrorHandler(errorObject);
    }

    // dispatch api action to saga
    __DEV__ && AppStore.dispatch(AppApiActions.onApiFetchFailure(errorObject));

    // throw error in the end
    throw errorObject;
  } finally {
    if (__DEV__) {
    }
    if (typeof finallyHandler === 'function') {
      return await finallyHandler();
    }
  }
};

export default Runtime;
