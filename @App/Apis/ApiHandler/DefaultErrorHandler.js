import axios from 'axios';
import { Alert } from 'react-native';
import { isError, attempt } from 'lodash';
import { Config } from 'App/Config';

import AppStore, { AppStateActions } from 'App/Stores';

function isJSON(str) {
  return !isError(attempt(JSON.parse, str));
}

const DefaultErrorHandler = (response) => {
  const { status } = response;
  __DEV__ &&
    Alert.alert(
      `API ERROR: ${status}:`,
      `[Url]: ${response.config.url}\n\n[Response]: ${JSON.stringify(response, null, 2)}`,
    );
  __DEV__ &&
    console.warn(
      `${status}:
      \n \n[Url]: ${response.config.url}`,
      JSON.stringify(response, null, 2),
    );

  console.log('response=>', response);

  switch (response.status) {
    case 400: {
      break;
    }
    case 401: {
      break;
    }
    case 500: {
      break;
    }
  }
};

export default DefaultErrorHandler;
