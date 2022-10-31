import { createRoot } from 'react-dom/client';

import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { ShowPopupProvider } from './Components/Popups/Popups';
import { DIDSign } from './Components/DidSign/DIDSign';

const root = document.getElementById('root');
if (!root) throw new Error('Cannot find #root to render');

createRoot(root).render(
  <BrowserRouter>
    <ShowPopupProvider>
      <DIDSign />
    </ShowPopupProvider>
  </BrowserRouter>,
);
