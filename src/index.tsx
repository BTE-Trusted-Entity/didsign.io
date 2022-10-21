import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { ShowPopupProvider } from './Components/Popups/Popups';
import { DIDSign } from './Components/DidSign/DIDSign';
import { store } from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ShowPopupProvider>
        <DIDSign />
      </ShowPopupProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
