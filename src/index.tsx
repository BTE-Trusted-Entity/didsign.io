import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { ShowPopupProvider } from './Components/Popups/Popups';
import { DIDSign } from './Components/DidSign/DIDSign';

ReactDOM.render(
  <BrowserRouter>
    <ShowPopupProvider>
      <DIDSign />
    </ShowPopupProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
