/**
 * Import Reduces, prepare to export
 */
import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from 'App/Sagas';
import { reducer as AppConfigReducer } from './AppConfig/Reducers';
import { reducer as AppStateReducer } from './AppState/Reducers';
import { reducer as AppRouteReducer } from './AppRoute/Reducers';
import { reducer as ExampleReducer } from './Example/Reducers';

/**
 * Export reducers, easy to use
 */
export { default as AppConfigActions } from './AppConfig/Actions';
export { default as AppStateActions } from './AppState/Actions';
export { default as ExampleActions } from './Example/Actions';

/**
 * Export default reducers
 */
export default () => {
  const rootReducer = combineReducers({
    // do not modify appState/appRoute
    appConfig: AppConfigReducer,
    appState: AppStateReducer,
    appRoute: AppRouteReducer,
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    // feel free to remove or change this.
    example: ExampleReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
