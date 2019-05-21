import createSagaMiddleware, { END } from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from '../reducers';

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const enhancers = [];

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => {
    store.dispatch(END);
  };

  return store;
}
