import type { Did } from '@kiltprotocol/types';

import { useCallback, useState } from 'react';

import { toVc } from '@kiltprotocol/legacy-credentials';
import { DidResolver, Holder } from '@kiltprotocol/sdk-js';
import { hexToU8a, u8aToHex } from '@polkadot/util';

import * as styles from './SignButton.module.css';

import { useBooleanState } from '../../hooks/useBooleanState';
import { apiPromise } from '../../utils/api';
import { exceptionToError } from '../../utils/exceptionToError';
import {
  createDidSignFile,
  createHashFromHashArray,
  generateJWS,
} from '../../utils/sign-helpers';
import { SignWithDid } from '../../utils/types';
import { KiltVerifiablePresentationV1 } from '../Credential/Credential';
import { useFiles } from '../Files/Files';
import {
  NotAuthorized,
  NoWalletPopup,
  Rejected,
  SignButtonInfoPopup,
  SignErrorPopup,
  SignPopup,
} from '../Popups/Popups';
import { useSignature } from '../Signature/Signature';

const INDEXER_URL = 'https://dev-indexer.kilt.io/';

async function queryCredentialInfo(claimHash: string) {
  const query = `
{
  attestations(filter: {claimHash: {equalTo: "${claimHash}"}}) {
    totalCount
    nodes {
      creationBlock {
        hash
        timeStamp
      }
      issuerId
      claimHash
    }
  }
}`;
  const response = await fetch(INDEXER_URL, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: [['Content-Type', 'application/json']],
  });
  const {
    data: {
      attestations: { totalCount, nodes },
    },
  } = await response.json();
  if (totalCount !== 1) {
    throw new Error('did not find credential info');
  }
  const [
    {
      creationBlock: { hash, timeStamp },
      issuerId,
    },
  ] = nodes;
  console.log('timestamp is', timeStamp);
  return {
    blockHash: hexToU8a(hash),
    timestamp: new Date(timeStamp + 'Z'),
    issuer: issuerId as Did,
  };
}

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

        let verifiablePresentation: KiltVerifiablePresentationV1 | undefined;
        if (credentials) {
          const { genesisHash } = await apiPromise;
          const VCs = await Promise.all(
            credentials.map(async ({ credential }) => {
              const info = await queryCredentialInfo(credential.rootHash);
              console.log('timestamp parsed as', info.timestamp);
              return toVc(credential, {
                ...info,
                chainGenesisHash: genesisHash,
              });
            }),
          );
          const { didDocument } = await DidResolver.resolve(
            didKeyUri.split('#')[0] as Did,
          );
          if (!didDocument) {
            console.error('aaaaaaaaaaaa');
            throw new Error('aaaaaaaaaaaargh');
          }
          const signer = {
            id: didKeyUri,
            algorithm: 'Sr25519',
            sign: async ({ data }: { data: Uint8Array }) => {
              const signed = await signWithDid(u8aToHex(data), didDocument.id);
              return hexToU8a(signed.signature);
            },
          };
          verifiablePresentation = (await Holder.createPresentation({
            credentials: VCs,
            holder: { didDocument, signers: [signer] },
            proofOptions: { domain: signingData },
          })) as KiltVerifiablePresentationV1;
        }

        const file = await createDidSignFile({
          hashes,
          jws,
          verifiablePresentation,
        });
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
