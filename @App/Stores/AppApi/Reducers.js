/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { AppApiTypes } from './Actions';

export const onApiFetching = (state, { method, url, options }) => ({
  ...state,
  method,
  url,
  options,
  result: null,
  error: null,
  isFetching: true,
});

export const onApiFetchSuccess = (state, { data }) => ({
  ...state,
  ...data,
  error: null,
  isFetching: false,
});

export const onApiFetchFailure = (state, { error }) => ({
  ...state,
  error,
  result: null,
  isFetching: false,
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AppApiTypes.ON_API_FETCHING]: onApiFetching,
  [AppApiTypes.ON_API_FETCH_SUCCESS]: onApiFetchSuccess,
  [AppApiTypes.ON_API_FETCH_FAILURE]: onApiFetchFailure,
});
