import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Backdrop, ShowPopupProvider } from './components/Popups/Popups';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { paths } from './utils/paths';
import { Sign } from './views/Sign/Sign';
import { Verify } from './views/Verify/Verify';
import { Maintenance } from './views/Maintenance/Maintenance';
import { Terms } from './views/Terms/Terms';
import { Privacy } from './views/Privacy/Privacy';
import { Imprint } from './views/Imprint/Imprint';
import { checkTestEnvironment } from './utils/checkTestEnvironment';

checkTestEnvironment();

const isMaintenance = process.env.REACT_APP_MAINTENANCE === 'true';
const root = document.getElementById('root');
if (!root) throw new Error('Cannot find #root to render');

createRoot(root).render(
  <BrowserRouter>
    <ShowPopupProvider>
      <Backdrop />
      <Header />

      <Routes>
        {isMaintenance ? (
          <Route path="*" element={<Maintenance />} />
        ) : (
          <Fragment>
            <Route path={paths.signer} element={<Sign />} />
            <Route path={paths.verifier} element={<Verify />} />
            <Route path="*" element={<Navigate to={paths.signer} replace />} />
          </Fragment>
        )}
        <Route path={paths.terms} element={<Terms />} />
        <Route path={paths.privacy} element={<Privacy />} />
        <Route path={paths.imprint} element={<Imprint />} />
      </Routes>

      <Footer />
    </ShowPopupProvider>
  </BrowserRouter>,
);
