import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { paths } from '../../Utils/paths';
import { ImportFilesSigner } from '../ImportFiles/ImportFilesSigner';
import { ImportFilesVerifier } from '../ImportFiles/ImportFilesVerifier';
import { Terms } from '../Terms/Terms';
import { Privacy } from '../Privacy/Privacy';
import { Imprint } from '../Imprint/Imprint';
import { Maintenance } from '../Maintenance/Maintenance';

export function Main() {
  if (process.env.REACT_APP_MAINTENANCE === 'true') {
    return <Maintenance />;
  }

  return (
    <Routes>
      <Route path={paths.signer} element={<ImportFilesSigner />} />
      <Route path={paths.verifier} element={<ImportFilesVerifier />} />
      <Route path="*" element={<Navigate to={paths.signer} replace />} />
      <Route path={paths.terms} element={<Terms />} />
      <Route path={paths.privacy} element={<Privacy />} />
      <Route path={paths.imprint} element={<Imprint />} />
    </Routes>
  );
}
