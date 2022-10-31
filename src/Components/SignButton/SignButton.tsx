import { useState } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import * as styles from './SignButton.module.css';

import { useSignature } from '../Signature/Signature';
import {
  createDidSignFile,
  createHashFromHashArray,
  generateJWS,
  getSignatureContents,
} from '../../Utils/sign-helpers';
import { useFiles } from '../Files/Files';
import {
  NoWalletPopup,
  SignButtonInfoPopup,
  SignErrorPopup,
  SignPopup,
} from '../Popups/Popups';
import { exceptionToError } from '../../Utils/exceptionToError';

export const SignButton = () => {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Sporran' | null
  >(null);
  const targetElement = document.querySelector('body');
  const { files, setFiles } = useFiles();
  const { setSignature } = useSignature();
  const [signPopup, setSignPopup] = useState<boolean>(false);

  const generateSignatureFile = async (blob: Blob) => {
    const file = await createDidSignFile(blob);
    setFiles((files) => [file, ...files]);
  };
  const handleSign = async () => {
    if (files.length == 0) {
      return;
    }
    if (targetElement !== null) {
      disableBodyScroll(targetElement);
    }
    setSignStatus('Default');

    try {
      const hashes = files.map(({ hash }) => hash);
      const signingData = await createHashFromHashArray(hashes);

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
      setSignature((old) => ({
        ...old,
        signature,
        ...(credentials && { credentials }),
      }));

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

  const handleDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }
    setSignStatus(null);
  };
  const showSignPopup = () => {
    if (targetElement !== null) {
      disableBodyScroll(targetElement);
    }
    setSignPopup(true);
  };
  const handleSignDismiss = () => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }
    setSignPopup(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.signBtn}
          disabled={files.length === 0}
          onClick={() => handleSign()}
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
