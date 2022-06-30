import React from 'react';

import styles from './BottomSection.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearEndpoint,
  clearFileStatuses,
} from '../../Features/Signer/VerifiedSignatureSlice';
import { clearAll, clearFileName } from '../../Features/Signer/FileSlice';
import { clearSign, selectSign } from '../../Features/Signer/SignatureSlice';
import {
  clearJWS,
  selectJwsSignStatus,
} from '../../Features/Signer/VerifyJwsSlice';
import { clearHash } from '../../Features/Signer/hashSlice';
import { DownloadButtons } from '../DownloadButtons/DownloadButtons';
import { SignButton } from '../SignButton/SignButton';
import { DidDocument } from '../DidDocument/DidDocument';

export const BottomSectionSigner = () => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(clearSign());
    dispatch(clearAll());
    dispatch(clearHash());
  };
  const sign = useAppSelector(selectSign);
  return (
    <section className={styles.container}>
      <div className={styles.bottomSection}>
        {!sign ? <SignButton /> : <DownloadButtons />}

        {sign && (
          <button
            className={styles.startOverBtn}
            onClick={() => handleDelete()}
          />
        )}
      </div>
    </section>
  );
};

export const BottomSectionVerifier = () => {
  const jwsStatus = useAppSelector(selectJwsSignStatus);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(clearSign());
    dispatch(clearAll());
    dispatch(clearHash());
    dispatch(clearFileName());
    dispatch(clearEndpoint());
    dispatch(clearJWS());
    dispatch(clearFileStatuses());
  };

  return (
    <section className={styles.container}>
      <div className={styles.bottomSection}>
        {jwsStatus === 'Validating' && (
          <span className={styles.verificationLoader} />
        )}

        {jwsStatus === 'Not Checked' && (
          <span className={styles.verificationText}>
            Verification <div></div>
          </span>
        )}

        <DidDocument />

        {jwsStatus === 'Verified' && (
          <button
            className={styles.startOverBtn}
            onClick={() => handleDelete()}
          />
        )}
      </div>
    </section>
  );
};
