import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { ShowPopupProvider } from './Components/Popups/Popups';
import { FilesProvider } from './Components/Files/Files';
import { SignatureProvider } from './Components/Signature/Signature';
import { DIDSign } from './Components/DidSign/DIDSign';

ReactDOM.render(
  <BrowserRouter>
    <ShowPopupProvider>
      <FilesProvider>
        <SignatureProvider>
          <DIDSign />
        </SignatureProvider>
      </FilesProvider>
    </ShowPopupProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
