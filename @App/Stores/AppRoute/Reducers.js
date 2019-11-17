/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { ActionConst, Actions } from 'react-native-router-flux';
import { createReducer, Types as ReduxSauceTypes } from 'reduxsauce';

import { INITIAL_STATE } from './InitialState';
import { getRoutePrefix } from './Helpers';

export const reducer = createReducer(INITIAL_STATE, {
  [ReduxSauceTypes.DEFAULT]: (state, action) => ({
    ...state,
    prevRoute: getRoutePrefix(Actions.prevScene),
    routeName: getRoutePrefix(action.routeName),
  }),
  [ActionConst.FOCUS]: (state, action) => ({
    ...state,
    ...action,
    routeName: getRoutePrefix(action.routeName),
    scene: {
      sceneKey: getRoutePrefix(action.routeName),
      drawer: 'DrawerClose',
    },
  }),
});
