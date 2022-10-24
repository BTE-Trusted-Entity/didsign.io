import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { ShowPopupProvider } from './Components/Popups/Popups';
import { HashesProvider } from './Components/Hashes/Hashes';
import { FilesProvider } from './Components/Files/Files';
import { SignatureProvider } from './Components/Signature/Signature';
import { JWSProvider } from './Components/JWS/JWS';
import { VerifiedSignatureProvider } from './Components/VerifiedSignature/VerifiedSignature';
import { DIDSign } from './Components/DidSign/DIDSign';
import { store } from './app/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ShowPopupProvider>
        <HashesProvider>
          <FilesProvider>
            <SignatureProvider>
              <JWSProvider>
                <VerifiedSignatureProvider>
                  <DIDSign />
                </VerifiedSignatureProvider>
              </JWSProvider>
            </SignatureProvider>
          </FilesProvider>
        </HashesProvider>
      </ShowPopupProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
