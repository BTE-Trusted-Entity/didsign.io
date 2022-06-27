import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { DIDSign } from './Components/DidSign/DIDSign';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <DIDSign />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
