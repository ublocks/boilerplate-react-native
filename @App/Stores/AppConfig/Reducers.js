/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { AppConfigTypes } from './Actions';

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [AppConfigTypes.ON_USER_LOCALE_CHANGE]: (state, action) => ({
    ...state,
    customLocale: action.locale,
  }),
});
