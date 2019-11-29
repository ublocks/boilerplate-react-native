import axios from 'axios';
import { Alert } from 'react-native';
import { isError, attempt } from 'lodash';
import { Config } from 'App/Config';
import { AppStateActions } from 'App/Stores';
import { store } from 'App/App';

import ApiConst from './ApiConst';
import DefaultErrorHandler from './DefaultErrorHandler';

function isJSON(str) {
  return !isError(attempt(JSON.parse, str));
}

function getInstance({ Authorization, url, options, data }) {
  if (url.includes('undefined') || url.includes('null')) {
    Alert.alert(
      'ApiHandler',
      `API Url contains "null" or "undefined". Check input API Url: "${url}".`,
    );
    return (
      __DEV__ &&
      console.warn(
        `@ApiHandler - API Url contains "null" or "undefined". Check input API Url: "${url}".`,
      )
    );
  }
  return axios.create({
    baseURL: options.baseURL || Config.API_BASE_URL,

    timeout: options.timeout || Config.API_TIMEOUT || 15 * 1000,

    headers: {
      // Default accept header set to json
      Accept: 'application/json',

      // Reset JWT authorization token if gave
      ...(Authorization && {
        Authorization: 'Bearer ' + Authorization,
      }),
    },

    data,

    ...options,
  });
}

const ApiHandler = (
  method = ApiConst.GET,
  {
    Authorization = '',
    data = undefined,
    successHandler = undefined,
    errorHandler = undefined,
    finallyHandler = undefined,
    ...options
  } = {},
) => async (url) => {
  const AppStoreDispatcher = store.dispatch;
  console.group('＋ API REQUEST');
  console.log('- Method=>', method);
  console.log('- Url=>', url);
  console.log('- Options=>', options);
  try {
    // Create an axios instance
    const instance = getInstance({
      Authorization,
      options,
      data,
      url,
    });

    console.time('__API__');
    const res = await instance[method](url, data);
    console.timeEnd('__API__');

    // console.log('- Response=>', res);

    if (typeof successHandler === 'function') {
      await successHandler(res);
    }
    return res;
  } catch (err) {
    // if error has normal response, use default handling
    if (err.response) {
      __DEV__ && console.log('err=>', err.response);
      await DefaultErrorHandler(err.response);
    }

    // if custom handler is gave, use it
    if (typeof errorHandler === 'function') {
      await errorHandler(err);
    }

    // throw error in the end
    throw err;
  } finally {
    if (typeof finallyHandler === 'function') {
      await finallyHandler();
    }
    console.groupEnd();
  }
};

export default ApiHandler;
