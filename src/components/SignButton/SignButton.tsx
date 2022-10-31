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
  NoWalletPopup,
  SignButtonInfoPopup,
  SignErrorPopup,
  SignPopup,
} from '../Popups/Popups';
import { exceptionToError } from '../../utils/exceptionToError';
import { useBooleanState } from '../../hooks/useBooleanState';

export function SignButton() {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Sporran'
  >();
  const { files, setFiles } = useFiles();
  const { setSignature } = useSignature();
  const signPopup = useBooleanState();

  const handleSign = useCallback(async () => {
    if (files.length === 0) {
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

        if (message.includes('Rejected')) {
          setSignStatus('SignError');
        }
      }
    }
  }, [files, setFiles, setSignature]);

  const handleDismiss = useCallback(() => {
    setSignStatus(undefined);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.signBtn}
          disabled={files.length === 0}
          onClick={handleSign}
        >
          Sign
        </button>

        <button
          className={styles.infoBtn}
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
      </div>
    </div>
  );
}
