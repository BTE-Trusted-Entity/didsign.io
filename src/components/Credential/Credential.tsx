import { Fragment, useEffect, useState } from 'react';
import { find } from 'lodash-es';
import {
  Attestation,
  Credential,
  CType,
  Did,
  DidUri,
  IClaim,
  KiltPublishedCredentialV1,
} from '@kiltprotocol/sdk-js';

import * as styles from './Credential.module.css';

import { apiPromise } from '../../utils/api';

function useChainData(credentialV1?: KiltPublishedCredentialV1) {
  const [label, setLabel] = useState(credentialV1?.metadata?.label);
  const [attester, setAttester] = useState<string | DidUri>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (label || !credentialV1) {
      return;
    }

    const { credential } = credentialV1;

    (async () => {
      try {
        const fetched = await CType.fetchFromChain(
          CType.hashToId(credential.claim.cTypeHash),
        );
        if ('title' in fetched) {
          // TODO: remove this `if` once the Spiritnet is updated
          setLabel(fetched.title as string);
          return;
        }
        setLabel(fetched.cType.title);
      } catch {
        // no error, credential can still be verified
      }
    })();
  }, [label, credentialV1]);

  useEffect(() => {
    if (!credentialV1) {
      return;
    }
    const { credential } = credentialV1;

    (async () => {
      const api = await apiPromise;
      const attestationChain = await api.query.attestation.attestations(
        credential.rootHash,
      );

      if (attestationChain.isNone) {
        setError('No Attestation found for credential');
        return;
      }
      const attestation = Attestation.fromChain(
        attestationChain,
        credential.rootHash,
      );

      const didChain = await api.call.did.query(Did.toChain(attestation.owner));
      if (didChain.isNone) {
        setError('Unable to fetch attester details');
        return;
      }
      const { web3Name } = Did.linkedInfoFromChain(didChain);
      setAttester(web3Name ? `w3n:${web3Name}` : attestation.owner);

      if (attestation.revoked) {
        setError('Credential attestation revoked');
      }
    })();
  }, [credentialV1]);

  return { label, attester, error };
}

function useVerify(did: DidUri, credentialV1?: KiltPublishedCredentialV1) {
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!credentialV1) {
      return;
    }
    const { credential } = credentialV1;

    (async () => {
      if (!Did.isSameSubject(credential.claim.owner, did)) {
        setError('Credential subject and signer DID are not the same');
        return;
      }

      try {
        await Credential.verifyCredential(credential);
      } catch {
        setError('Not a valid Kilt Credential');
      }
    })();
  }, [credentialV1, did]);

  return { error };
}

function ClaimValue({
  claim,
  name,
  value,
}: {
  claim: IClaim;
  name: string;
  value: string;
}) {
  const { cTypeHash, contents } = claim;
  const linkableFields = [
    {
      cTypeHash:
        '0x3291bb126e33b4862d421bfaa1d2f272e6cdfc4f96658988fbcffea8914bd9ac',
      name: 'Email',
      href: `mailto:${value}`,
    },
    {
      cTypeHash:
        '0x47d04c42bdf7fdd3fc5a194bcaa367b2f4766a6b16ae3df628927656d818f420',
      name: 'Twitter',
      href: `https://twitter.com/${value}/`,
    },
    {
      cTypeHash:
        '0xd8c61a235204cb9e3c6acb1898d78880488846a7247d325b833243b46d923abe',
      name: 'Username',
      href: `https://discordapp.com/users/${contents['User ID']}`,
    },
    {
      cTypeHash:
        '0xad52bd7a8bd8a52e03181a99d2743e00d0a5e96fdc0182626655fcf0c0a776d0',
      name: 'Username',
      href: `https://github.com/${value}`,
    },
    {
      cTypeHash:
        '0x568ec5ffd7771c4677a5470771adcdea1ea4d6b566f060dc419ff133a0089d80',
      name: 'Username',
      href: `https://www.twitch.tv/${value}`,
    },
    {
      cTypeHash:
        '0xcef8f3fe5aa7379faea95327942fd77287e1c144e3f53243e55705f11e890a4c',
      name: 'Username',
      href: `https://t.me/${value}`,
    },
    {
      cTypeHash:
        '0x329a2a5861ea63c250763e5e4c4d4a18fe4470a31e541365c7fb831e5432b940',
      name: 'Channel Name',
      href: `https://www.youtube.com/channel/${contents['Channel ID']}`,
    },
  ];

  const candidate = find(linkableFields, { cTypeHash, name });
  if (!candidate) {
    return <Fragment>{value}</Fragment>;
  }

  return (
    <a
      href={candidate.href}
      className={styles.anchor}
      target="_blank"
      rel="noreferrer"
    >
      {value}
    </a>
  );
}

interface Props {
  did: DidUri;

  credentialV1?: KiltPublishedCredentialV1;
  initialError?: string;
}

export function CredentialVerifier({ credentialV1, did, initialError }: Props) {
  const { label, attester, error: chainError } = useChainData(credentialV1);
  const { error: verifyError } = useVerify(did, credentialV1);

  const error = [initialError, chainError, verifyError].filter(Boolean)[0];

  return (
    <Fragment>
      {label && <h2 className={styles.heading}>{label}</h2>}

      {credentialV1 &&
        Object.entries(credentialV1.credential.claim.contents).map(
          ([name, value]) => (
            <div className={styles.property} key={name}>
              <span className={styles.name}>{name}</span>
              <span className={styles.value}>
                <ClaimValue
                  claim={credentialV1.credential.claim}
                  name={name}
                  value={String(value)}
                />
              </span>
            </div>
          ),
        )}

      {error && (
        <div className={styles.property}>
          <span className={styles.name}>Error</span>
          <span className={styles.value}>{error}</span>
        </div>
      )}

      {!error && (
        <div className={styles.property}>
          <span className={styles.name}>Attester</span>
          <span className={styles.value}>
            {attester && !attester.startsWith('w3n:') && attester}

            {attester && attester.startsWith('w3n:') && (
              <a
                className={styles.anchor}
                href={`${process.env.REACT_APP_W3NID_ORIGIN}/${attester.replace(
                  'w3n:',
                  '',
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                {attester}
              </a>
            )}
          </span>
        </div>
      )}

      <div className={styles.property}>
        <span className={styles.name}>Valid</span>
        <span className={error ? styles.invalid : styles.valid}></span>
      </div>
    </Fragment>
  );
}
