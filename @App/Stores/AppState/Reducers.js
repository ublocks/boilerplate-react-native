/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { AppStateTypes } from './Actions';

export const onAppVersionChange = (
  state,
  { appVersion, buildVersion, bundleIdentifier },
) => ({
  ...state,
  currentVersion: {
    appVersion,
    buildVersion,
    bundleIdentifier,
  },
});

export const onLoadingChange = (state, { isLoading, message, options }) => {
  return {
    ...state,
    isLoading,
    loadingMessage: message,
    loadingOptions: options,
  };
};

export const onAppStateChange = (state, { currentState }) => ({
  ...state,
  currentState,
});

export const onLocaleChange = (state, { currentLocales, currentTimeZone }) => ({
  ...state,
  currentLocales,
  currentTimeZone,
});

export const onOrientationChange = (state, { currentOrientation }) => ({
  ...state,
  currentOrientation,
});

export const onNetworkInfoChange = (state, action) => ({
  ...state,
  currentNetworkInfo: action.state,
});

export const onSystemAlertShow = (state, action) => ({
  ...state,
  isSystemAlertShow: action.status,
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AppStateTypes.ON_LOADING]: onLoadingChange,
  [AppStateTypes.ON_LOCALE_CHANGE]: onLocaleChange,
  [AppStateTypes.ON_STATE_CHANGE]: onAppStateChange,
  [AppStateTypes.ON_VERSION_CHANGE]: onAppVersionChange,
  [AppStateTypes.ON_NET_INFO_CHANGE]: onNetworkInfoChange,
  [AppStateTypes.ON_SYSTEM_ALERT_SHOW]: onSystemAlertShow,
  [AppStateTypes.ON_ORIENTATION_CHANGE]: onOrientationChange,
});
