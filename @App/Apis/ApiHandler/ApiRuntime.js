import axios from 'axios';
import { Alert } from 'react-native';
import { isEmpty } from 'lodash';

import { store } from 'App/App';
import { Config } from 'App/Config';
import { UserActions } from 'App/Stores';
import DefaultErrorHandler from './DefaultErrorHandler';

const Runtime = async ({
  url,
  method,
  options: {
    params = {}, // query params
    data = undefined, // body data
    Authorization = '',
    successHandler = undefined,
    errorHandler = undefined,
    finallyHandler = undefined,
    isDefaultHandlerEnable = true,
    acceptLanguage = undefined,
    header = {},
    ...options
  } = {},
}) => {
  try {
    // Get current app locale status
    if (!acceptLanguage) {
      const appLocales = store.getState().appState.currentLocales;
      if (appLocales instanceof Array) {
        acceptLanguage = appLocales.map((e) => e.languageTag).toString();
      }
    }
    // Create an axios instance
    const instance = axios.create({
      ...options,

      baseURL: options.baseURL || Config.API_BASE_URL,

      timeout: options.timeout || Config.API_TIMEOUT || 15 * 1000,

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

    if (url && (url.includes('undefined') || url.includes('null'))) {
      const message = `API Url contains "null" or "undefined". Check input API Url: "${url}".`;
      __DEV__ && console.log(message);
      return __DEV__ && Alert.alert('@ApiHandler', message);
    }

    const res = ['patch', 'post', 'put'].includes(method)
      ? await instance[method](url, data, { params })
      : await instance[method](url, { params, data });

    // console.log('@ApiHandler res=>', res);

    // Auto refresh token
    if (res.headers && !isEmpty(res.headers.authorization)) {
      store.dispatch(UserActions.onUserRefreshToken(res.headers.authorization));
    }

    if (typeof successHandler === 'function') {
      await successHandler(res);
    }
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
