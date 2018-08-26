import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
  const store = createStore(
    rootReducer,
    /* preloadedState, */
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
}

const store = configureStore();

export default store;
