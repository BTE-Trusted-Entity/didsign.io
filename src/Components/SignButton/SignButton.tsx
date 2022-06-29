import React, { useState } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from './SignButton.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateSign } from '../../Features/Signer/SignatureSlice';
import { openSporan, generateJWS } from '../../Utils/sign-helpers';
import { selectFinalHash, selectHash } from '../../Features/Signer/hashSlice';
import {
  addBufferTop,
  addFileTop,
  IBuffer,
  selectFiles,
} from '../../Features/Signer/FileSlice';
import { Signature, SignDoc } from '../../Utils/types';
import { showPopup } from '../../Features/Signer/PopupSlice';
import {
  NoWalletPopup,
  SignErrorPopup,
  SignPopup,
  SignButtonInfoPopup,
} from '../Popups/Popups';

export const SignButton = () => {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Sporran' | null
  >(null);
  const targetElement = document.querySelector('body');
  const files = useAppSelector(selectFiles);
  const [signPopup, setSignPopup] = useState<boolean>(false);

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
    dispatch(showPopup(true));
    if (targetElement !== null) {
      disableBodyScroll(targetElement);
      setSignStatus('Default');
    }
    openSporan(await finalHash)
      .then(async (response) => {
        dispatch(updateSign(response.signature));
        const signature: Signature = {
          keyUri: response.keyUri,
          signature: response.signature,
        };
        const jws = generateJWS(signature, await finalHash);
        const signedDoc: SignDoc = { hashes: hashes, jws: jws };
        const blob = new Blob([JSON.stringify(signedDoc)], {
          type: 'application/json;charset=utf-8',
        });
        await generateSignatureFile(blob);
        dispatch(showPopup(false));
        if (targetElement !== null) enableBodyScroll(targetElement);
      })
      .catch((e) => {
        targetElement !== null && disableBodyScroll(targetElement);
        if (window.kilt.sporran == undefined) setSignStatus('No Sporran');
        else e.toString().includes('Rejected') && setSignStatus('SignError');
      });
  };
  const hashes = useAppSelector(selectHash);
  const finalHash = useAppSelector(selectFinalHash);
  const dispatch = useAppDispatch();
  const handleDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }
    dispatch(showPopup(false));
    setSignStatus(null);
  };
  const showSignPopup = () => {
    if (targetElement !== null) {
      disableBodyScroll(targetElement);
    }
    setSignPopup(true);
    dispatch(showPopup(true));
  };
  const handleSignDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }
    dispatch(showPopup(false));
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

      <span className={styles.onchainInfo}>
        Don&apos;t have an on-chain DID yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className="hover:underline text-medium-blue"
          href="https://support.kilt.io/support/solutions/folders/80000689099"
        >
          Read here
        </a>
      </span>
    </div>
  );
};
