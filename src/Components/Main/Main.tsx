import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { paths } from '../../Utils/paths';
import { ImportFilesSigner } from '../ImportFiles/ImportFilesSigner';
import { ImportFilesVerifier } from '../ImportFiles/ImportFilesVerifier';
import { Terms } from '../Terms/Terms';
import { Privacy } from '../Privacy/Privacy';
import { Imprint } from '../Imprint/Imprint';
import { Maintenance } from '../Maintenance/Maintenance';
import { VerifiedSignatureProvider } from '../VerifiedSignature/VerifiedSignature';
import { FilesProvider } from '../Files/Files';
import { SignatureProvider } from '../Signature/Signature';

export function Main() {
  if (process.env.REACT_APP_MAINTENANCE === 'true') {
    return <Maintenance />;
  }

  return (
    <Routes>
      <Route
        path={paths.signer}
        element={
          <FilesProvider>
            <SignatureProvider>
              <ImportFilesSigner />
            </SignatureProvider>
          </FilesProvider>
        }
      />
      <Route
        path={paths.verifier}
        element={
          <VerifiedSignatureProvider>
            <ImportFilesVerifier />
          </VerifiedSignatureProvider>
        }
      />
      <Route path="*" element={<Navigate to={paths.signer} replace />} />
      <Route path={paths.terms} element={<Terms />} />
      <Route path={paths.privacy} element={<Privacy />} />
      <Route path={paths.imprint} element={<Imprint />} />
    </Routes>
  );
}
