import axios from 'axios';
import { Alert } from 'react-native';
import { isError, attempt } from 'lodash';
import { Config } from 'App/Config';

import AppStore, { AppStateActions } from 'App/Stores';

function isJSON(str) {
  return !isError(attempt(JSON.parse, str));
}

const DefaultErrorHandler = (response) => {
  __DEV__ && Alert.alert(`${response.data.statusCode}`, response.data.message);
  __DEV__ &&
    console.warn(
      `${response.data.statusCode}: ${response.data.message}\n`,
      JSON.stringify(response, null, 2),
    );
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
