import { useCallback, useState } from 'react';

import * as styles from './SignButton.module.css';

import { useSignature } from '../Signature/Signature';
import {
  createDidSignFile,
  createHashFromHashArray,
  generateJWS,
  getSignatureContents,
} from '../../utils/sign-helpers';
import { useFiles } from '../Files/Files';
import {
  NotAuthorized,
  NoWalletPopup,
  Rejected,
  SignButtonInfoPopup,
  SignErrorPopup,
  SignPopup,
} from '../Popups/Popups';
import { exceptionToError } from '../../utils/exceptionToError';
import { useBooleanState } from '../../hooks/useBooleanState';

export function SignButton() {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Sporran' | 'NotAuthorized' | 'Rejected'
  >();
  const { files, setFiles } = useFiles();
  const { setSignature } = useSignature();
  const signPopup = useBooleanState();
  const isProcessing = useBooleanState();

  const handleSign = useCallback(async () => {
    if (files.length === 0) {
      return;
    }
    isProcessing.on();
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

      const file = await createDidSignFile({ hashes, jws, credentials });
      setFiles((files) => [file, ...files]);

      setSignature((old) => ({
        ...old,
        signature,
        ...(credentials && { credentials }),
      }));
    } catch (error) {
      if (!window.kilt.sporran) {
        setSignStatus('No Sporran');
      } else {
        const { message } = exceptionToError(error);

        if (message === 'Not authorized') {
          setSignStatus('NotAuthorized');
          return;
        }

        if (message === 'Rejected' || message.includes('User closed')) {
          setSignStatus('Rejected');
          return;
        }

        setSignStatus('SignError');
      }
    } finally {
      isProcessing.off();
    }
  }, [files, setFiles, setSignature, isProcessing]);

  const handleDismiss = useCallback(() => {
    setSignStatus(undefined);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.signButton}
          disabled={files.length === 0 || isProcessing.current}
          onClick={handleSign}
        >
          Sign
        </button>

        <button
          className={styles.infoButton}
          aria-label="Sign Information"
          onClick={signPopup.on}
        ></button>

        {signPopup.current && <SignButtonInfoPopup onDismiss={signPopup.off} />}

        {signStatus === 'Default' && <SignPopup onDismiss={handleDismiss} />}

        {signStatus === 'No Sporran' && (
          <NoWalletPopup onDismiss={handleDismiss} />
        )}

        {signStatus === 'SignError' && (
          <SignErrorPopup onDismiss={handleDismiss} />
        )}

        {signStatus === 'NotAuthorized' && (
          <NotAuthorized onDismiss={handleDismiss} />
        )}

        {signStatus === 'Rejected' && <Rejected onDismiss={handleDismiss} />}
      </div>
    </div>
  );
}
