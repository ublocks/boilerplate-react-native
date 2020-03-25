import { Alert } from 'react-native';

export function error(tag, errorObject) {
  // print error message
  console.log(`@ERROR - ${tag}`, errorObject);

  // show message at ui
  // if (__DEV__) {
  //   Alert.alert('Logger ERROR', errorObject.message);
  //   console.warn(`@ERROR - ${tag}`, JSON.stringify(errorObject, null, 2));
  // }

  return false;
}

export default {
  error,
};
