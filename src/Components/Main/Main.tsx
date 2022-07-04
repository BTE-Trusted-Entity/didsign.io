import React, { Fragment, useEffect } from 'react';

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
    <Fragment>
      <div className={styles.container}>
        <ImportFilesSigner />
        {files.length === 0 ? <FilesEmpty /> : <FilesSigner />}
      </div>
      <BottomSectionSigner />
    </Fragment>
  );
};

const Verifier = () => {
  const files = useAppSelector(selectFiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearAll());
    dispatch(clearHash());
    dispatch(clearSign());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={styles.container}>
        <ImportFilesVerifier />

        {files.length === 0 ? <FilesEmpty /> : <FilesVerifier />}
      </div>

      <BottomSectionVerifier />
    </Fragment>
  );
};

export const Main = () => {
  return (
    <Routes>
      <Route path={paths.signer} element={<Signer />} />
      <Route path={paths.verifier} element={<Verifier />} />
      <Route path="*" element={<Navigate to={paths.signer} replace />} />
    </Routes>
  );
};
