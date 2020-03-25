import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { Platform } from 'react-native';

import createSensitiveStorage from 'redux-persist-sensitive-storage';
import asyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import createMigrations from './CreateMigrations';

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * NOTICE: sensitive-storage will not wipe data when removing app in iOS.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

// Using sensitive persist storage.
const sensitiveStorage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

const persistConfig = {
  key: 'root',
  // Remove "asyncStorage" to use sensitive persist storage.
  storage: asyncStorage || sensitiveStorage,
  version: 0,
  migrate: createMigrations,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [
    'appApi',
    'appAlert',
    'appState',
    'appRoute',
    // 'appApi',
    // 'auth',
  ],
};

export default (rootReducer, rootSaga) => {
  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();

  // Add middleware here
  const middleware = [];
  middleware.push(sagaMiddleware);
  middleware.push(thunk);

  // Debug tool integration;
  let composeEnhancers = compose;
  if (__DEV__) {
    // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers = (
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
      require('remote-redux-devtools').composeWithDevTools
    )({
      name: Platform.OS,
    });
  }

  // Enable hot module replacement for reducers
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('App/Stores').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // Create the store
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
};
