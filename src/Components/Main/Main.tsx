import React, { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import styles from './Main.module.css';

import { ImportFilesSigner } from '../ImportFiles/ImportFilesSigner';
import { FilesSigner } from '../FilesSigner/FilesSigner';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearAll, selectFiles } from '../../Features/Signer/FileSlice';
import { FilesEmpty } from '../FilesEmpty/FilesEmpty';
import { FilesVerifier } from '../FilesVerifier/FilesVerifier';
import { ImportFilesVerifier } from '../ImportFiles/ImportFilesVerifier';

import { paths } from '../../Utils/paths';
import {
  BottomSectionSigner,
  BottomSectionVerifier,
} from '../BottomSection/BottomSection';
import { clearHash } from '../../Features/Signer/hashSlice';
import { clearSign } from '../../Features/Signer/SignatureSlice';
import {
  clearEndpoint,
  clearFileStatuses,
} from '../../Features/Signer/VerifiedSignatureSlice';
import { clearJWS } from '../../Features/Signer/VerifyJwsSlice';
import { usePreventNavigation } from '../../Hooks/usePreventNavigation';
import { Terms } from '../Terms/Terms';
import { Privacy } from '../Privacy/Privacy';
import { Imprint } from '../Imprint/Imprint';
import { Navigation } from '../Navigation/Navigation';

const Signer = () => {
  const files = useAppSelector(selectFiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearEndpoint());
    dispatch(clearJWS());
    dispatch(clearFileStatuses());
    dispatch(clearAll());
    dispatch(clearHash());
    dispatch(clearSign());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <Navigation />
      <div className={styles.middleSection}>
        <ImportFilesSigner />
        {files.length === 0 ? <FilesEmpty /> : <FilesSigner />}
      </div>
      <BottomSectionSigner />
    </main>
  );
};

const Verifier = () => {
  const files = useAppSelector(selectFiles);
  const dispatch = useAppDispatch();

  //allows navigation prevented by time stamping
  usePreventNavigation(false);

  useEffect(() => {
    dispatch(clearAll());
    dispatch(clearHash());
    dispatch(clearSign());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <Navigation />
      <div className={styles.middleSection}>
        <ImportFilesVerifier />

        {files.length === 0 ? <FilesEmpty /> : <FilesVerifier />}
      </div>

      <BottomSectionVerifier />
    </main>
  );
};

export const Main = () => {
  return (
    <Routes>
      <Route path={paths.signer} element={<Signer />} />
      <Route path={paths.verifier} element={<Verifier />} />
      <Route path={paths.terms} element={<Terms />} />
      <Route path={paths.privacy} element={<Privacy />} />
      <Route path={paths.imprint} element={<Imprint />} />
      <Route path="*" element={<Navigate to={paths.signer} replace />} />
    </Routes>
  );
};
