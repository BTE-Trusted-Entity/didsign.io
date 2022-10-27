import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { ShowPopupProvider } from './Components/Popups/Popups';
import { SignatureProvider } from './Components/Signature/Signature';
import { DIDSign } from './Components/DidSign/DIDSign';

ReactDOM.render(
  <BrowserRouter>
    <ShowPopupProvider>
      <SignatureProvider>
        <DIDSign />
      </SignatureProvider>
    </ShowPopupProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
