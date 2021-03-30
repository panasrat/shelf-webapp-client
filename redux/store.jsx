import * as storage from 'redux-storage';
import { persistStore } from 'redux-persist';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

let store;
const initialState = {};
const middleware = [thunk];
const isClient = typeof window !== 'undefined';

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

if (isClient) {
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;
  const persistConfig = {
    key: 'root',
    storage,
  };
  store = createStore(
    persistReducer(persistConfig, reducers),
    initialState,
    enhancer
  );
  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(reducers, initialState, enhancer);
}

export default store;
