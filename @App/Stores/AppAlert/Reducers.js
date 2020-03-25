/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { AlertTypes } from './Actions';

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AlertTypes.UPDATE_ALERT_STORE]: (state, action) => ({
    ...state,
    ...action.data,
  }),
  [AlertTypes.ON_ALERT]: (state, action) => ({
    ...state,
    ...action.data,
    alertShowAt: action.alertShowAt || new Date().getTime(),
    history: [...state.history, action.data],
  }),
  [AlertTypes.SHOW_ALERT]: (state, action) => ({
    ...state,
    ...action.data,
    alertShowAt: action.alertShowAt || new Date().getTime(),
    history: [...state.history, action.data],
  }),
  [AlertTypes.CLEAN_ALERT_HISTORY]: (state, action) => ({
    ...state,
    history: [],
  }),
});
