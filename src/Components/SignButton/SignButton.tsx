import React, { useState } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import * as styles from './SignButton.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  updateCredentials,
  updateSign,
} from '../../Features/Signer/SignatureSlice';
import { getSignatureContents, generateJWS } from '../../Utils/sign-helpers';
import { selectFinalHash, selectHash } from '../../Features/Signer/hashSlice';
import {
  addBufferTop,
  addFileTop,
  IBuffer,
  selectFiles,
} from '../../Features/Signer/FileSlice';
import {
  NoWalletPopup,
  SignErrorPopup,
  SignPopup,
  SignButtonInfoPopup,
  useShowPopup,
} from '../Popups/Popups';
import { exceptionToError } from '../../Utils/exceptionToError';

export const SignButton = () => {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Sporran' | null
  >(null);
  const targetElement = document.querySelector('body');
  const files = useAppSelector(selectFiles);
  const [signPopup, setSignPopup] = useState<boolean>(false);
  const showPopup = useShowPopup().set;

  const generateSignatureFile = async (blob: Blob) => {
    const newFile = new File([blob], 'signature.didsign');
    const newBufferObj: IBuffer = {
      buffer: await newFile.arrayBuffer(),
      name: newFile.name,
    };
    dispatch(addBufferTop(newBufferObj));
    dispatch(addFileTop(newFile));
  };
  const handleChange = async () => {
    if (hashes.length == 0) {
      return;
    }
    showPopup(true);
    if (targetElement !== null) {
      disableBodyScroll(targetElement);
      setSignStatus('Default');
    }

    try {
      const signingData = await finalHash;

      const {
        credentials = undefined,
        didKeyUri,
        signature,
      } = await getSignatureContents(signingData);

      const jws = generateJWS({ signature, didKeyUri }, signingData);
      const signedDoc = { hashes, jws, credentials };
      const blob = new Blob([JSON.stringify(signedDoc)], {
        type: 'application/json;charset=utf-8',
      });

      await generateSignatureFile(blob);
      dispatch(updateSign(signature));

      if (credentials) dispatch(updateCredentials(credentials));

      showPopup(false);

      if (targetElement !== null) {
        enableBodyScroll(targetElement);
      }
    } catch (error: unknown) {
      if (targetElement) disableBodyScroll(targetElement);

      if (!window.kilt.sporran) {
        setSignStatus('No Sporran');
      } else {
        const { message } = exceptionToError(error);

        if (message.includes('Rejected')) {
          setSignStatus('SignError');
        }
      }
    }
  };

  const hashes = useAppSelector(selectHash);
  const finalHash = useAppSelector(selectFinalHash);
  const dispatch = useAppDispatch();
  const handleDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }
    showPopup(false);
    setSignStatus(null);
  };
  const showSignPopup = () => {
    if (targetElement !== null) {
      disableBodyScroll(targetElement);
    }
    setSignPopup(true);
    showPopup(true);
  };
  const handleSignDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }
    showPopup(false);
    setSignPopup(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.signBtn}
          disabled={files.length === 0}
          onClick={() => handleChange()}
        >
          Sign
        </button>

        <button
          className={styles.infoBtn}
          aria-label="Sign Information"
          onClick={showSignPopup}
        ></button>

        {signPopup && <SignButtonInfoPopup onDismiss={handleSignDismiss} />}

        {signStatus === 'Default' && <SignPopup onDismiss={handleDismiss} />}

        {signStatus === 'No Sporran' && (
          <NoWalletPopup onDismiss={handleDismiss} />
        )}

        {signStatus === 'SignError' && (
          <SignErrorPopup onDismiss={handleDismiss} />
        )}
      </div>
    </div>
  );
};
