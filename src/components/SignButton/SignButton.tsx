import { useCallback, useState } from 'react';

import * as styles from './SignButton.module.css';

import { useSignature } from '../Signature/Signature';
import {
  createDidSignFile,
  createHashFromHashArray,
  generateJWS,
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

import { SignWithDid } from '../../utils/types';

export function SignButton() {
  const [signStatus, setSignStatus] = useState<
    'SignError' | 'Default' | 'No Wallet' | 'NotAuthorized' | 'Rejected'
  >();
  const { files, setFiles } = useFiles();
  const { setSignature } = useSignature();
  const signPopup = useBooleanState();
  const isProcessing = useBooleanState();

  const handleSign = useCallback(
    async (signWithDid: SignWithDid) => {
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
        } = await signWithDid(signingData);

        const jws = generateJWS({ signature, didKeyUri }, signingData);

        const file = await createDidSignFile({ hashes, jws, credentials });
        setFiles((files) => [file, ...files]);

        setSignature((old) => ({
          ...old,
          signature,
          ...(credentials && { credentials }),
        }));
      } catch (error) {
        const { message } = exceptionToError(error);

        if (message.includes('Not authorized')) {
          setSignStatus('NotAuthorized');
          return;
        }

        if (message === 'Rejected' || message.includes('User closed')) {
          setSignStatus('Rejected');
          return;
        }

        setSignStatus('SignError');
      } finally {
        isProcessing.off();
      }
    },
    [files, setFiles, setSignature, isProcessing],
  );

  const handleNoWallet = useCallback(() => {
    setSignStatus('No Wallet');
  }, []);
  const fakeWallet = { key: 'fake', name: 'Fake', handleClick: handleNoWallet };

  const handleDismiss = useCallback(() => {
    setSignStatus(undefined);
  }, []);

  const capableWallets = [...Object.entries(window.kilt)]
    .filter(([key]) => window.kilt[key].signWithDid)
    .map(([key, { name = key, signWithDid }]) => ({
      key,
      name,
      handleClick: () => handleSign(signWithDid),
    }));
  const buttons = capableWallets.length > 0 ? capableWallets : [fakeWallet];

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {buttons.map(({ key, name, handleClick }) => (
          <button
            key={key}
            className={styles.signButton}
            disabled={files.length === 0 || isProcessing.current}
            onClick={handleClick}
          >
            {buttons.length === 1 ? 'Sign' : `Sign with ${name}`}
          </button>
        ))}

        <button
          className={styles.infoButton}
          aria-label="Sign Information"
          onClick={signPopup.on}
        ></button>

        {signPopup.current && <SignButtonInfoPopup onDismiss={signPopup.off} />}

        {signStatus === 'Default' && <SignPopup onDismiss={handleDismiss} />}

        {signStatus === 'No Wallet' && (
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
