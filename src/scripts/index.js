import css from '../styles/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import App from './components/app';

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/(:filter)" component={ App }></Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
