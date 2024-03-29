import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import DevTools from '../components/DevTools';
import rootSaga from '../sagas';
// import profileSaga from '../sagas/profile.saga';
// import authSaga from '../sagas/auth.saga';
// import feedSaga from '../sagas/feed.saga';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;
  sagaMiddleware.run(rootSaga);
  return store;
}
