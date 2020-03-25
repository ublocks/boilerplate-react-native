/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { AppApiTypes } from './Actions';

export const onAppVersionChange = (
  state,
  { appVersion, buildVersion, bundleIdentifier },
) => ({
  ...state,
  currentVersion: {
    ...state.currentVersion,
    appVersion,
    buildVersion,
    bundleIdentifier,
  },
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  // [AppApiTypes.ON_LOADING]: onAppVersionChange,
});
