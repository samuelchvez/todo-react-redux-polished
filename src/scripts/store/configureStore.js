import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const configureStore = () => {

  let middlewares = [thunk];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(
    reducer,
    applyMiddleware(...middlewares));
}

export default configureStore;