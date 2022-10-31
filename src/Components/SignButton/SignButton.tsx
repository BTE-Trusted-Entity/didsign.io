import { useCallback, useState } from 'react';

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

export function SignButton() {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Sporran' | null
  >(null);
  const { files, setFiles } = useFiles();
  const { setSignature } = useSignature();
  const [signPopup, setSignPopup] = useState<boolean>(false);

  const handleSign = useCallback(async () => {
    if (files.length == 0) {
      return;
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

      const file = await createDidSignFile(blob);
      setFiles((files) => [file, ...files]);

      setSignature((old) => ({
        ...old,
        signature,
        ...(credentials && { credentials }),
      }));
    } catch (error: unknown) {
      if (!window.kilt.sporran) {
        setSignStatus('No Sporran');
      } else {
        const { message } = exceptionToError(error);

        if (message.includes('Rejected')) {
          setSignStatus('SignError');
        }
      }
    }
  }, [files, setFiles, setSignature]);

  const handleDismiss = useCallback(() => {
    setSignStatus(null);
  }, []);

  const showSignPopup = useCallback(() => {
    setSignPopup(true);
  }, []);

  const handleSignDismiss = useCallback(() => {
    setSignPopup(false);
  }, []);

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
}
