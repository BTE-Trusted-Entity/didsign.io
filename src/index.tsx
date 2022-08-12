import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { DIDSign } from './Components/DidSign/DIDSign';
import { store } from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <DIDSign />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
