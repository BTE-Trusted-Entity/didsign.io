import type { Types } from '@kiltprotocol/credentials';
import type { Did, Service } from '@kiltprotocol/types';

import { Fragment, useEffect, useState } from 'react';

import { isSameSubject, parse } from '@kiltprotocol/did';
import { DidResolver, Verifier } from '@kiltprotocol/sdk-js';

import * as styles from './DidDocument.module.css';

import { useSubscanHost } from '../../hooks/useSubscanHost';
import { getSignatureFromRemark, getTimestamp } from '../../utils/timestamp';
import { SignDoc } from '../../utils/types';
import { parseJWS } from '../../utils/verify-helper';
import {
  CredentialVerifier,
  KiltVerifiablePresentationV1,
} from '../Credential/Credential';
import { ServiceEndpoint } from '../ServiceEndpoints/ServiceEndpoint';

function usePresentationVerify(
  did: Did,
  presentation?: KiltVerifiablePresentationV1,
  filesHash?: string,
) {
  const [result, setResult] =
    useState<Awaited<ReturnType<typeof Verifier.verifyPresentation>>>();

  useEffect(() => {
    if (!presentation) {
      return;
    }

    (async () => {
      if (!isSameSubject(presentation.holder, did)) {
        setResult({
          verified: false,
          error: [
            new Error('Presentation holder and signer DID are not the same'),
          ],
        });
        return;
      }

      setResult(
        await Verifier.verifyPresentation({
          presentation: presentation,
          verificationCriteria: {
            proofPurpose: 'authentication',
            domain: filesHash,
          },
          // config: {
          //   //  cTypes: cType ? [cType] : undefined,
          // },
        }),
      );
    })();
  }, [presentation, did, filesHash]);

  return result;
}

export function DidDocument({ signDoc }: { signDoc: SignDoc }) {
  const { jws, remark, verifiablePresentation, credentials } = signDoc;

  const { signature, header, payload } = parseJWS(jws);
  const { did } = parse(header.kid);

  const presentationResult = usePresentationVerify(
    did,
    verifiablePresentation,
    payload.hash,
  );

  const subscanHost = useSubscanHost();

  const [web3name, setWeb3Name] = useState<string>();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      const { didDocument } = await DidResolver.resolve(did);
      const web3Name = didDocument?.alsoKnownAs?.[0];
      setWeb3Name(web3Name || undefined);
      setServices(didDocument?.service || []);
    })();
  }, [did]);

  const [timestamp, setTimestamp] = useState<string>();
  useEffect(() => {
    (async () => {
      if (remark && signature === (await getSignatureFromRemark(remark))) {
        setTimestamp(await getTimestamp(remark.blockHash));
      }
    })();
  }, [remark, signature]);

  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <span className={styles.verificationText}>Verification</span>
      </div>

      <div className={styles.textWrapper}>
        <span className={styles.title}>Signed By</span>
        <span className={styles.text}>
          {web3name && (
            <Fragment>
              <a
                className={styles.anchor}
                href={`${process.env.REACT_APP_W3NID_ORIGIN}/${web3name}`}
                target="_blank"
                rel="noreferrer"
              >
                w3n:{web3name}
              </a>
              <br />
            </Fragment>
          )}
          {did}
        </span>
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>Signed At</span>
        <span className={styles.text}>
          {timestamp || 'No timestamp available'}
          {remark && subscanHost && (
            <a
              className={styles.subscan}
              href={`${subscanHost}/extrinsic/${remark.txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              Subscan
            </a>
          )}
        </span>
      </div>

      <div className={styles.textWrapper}>
        <span className={styles.title}>Signature</span>
        <span className={styles.text}>{signature}</span>
      </div>

      {credentials && (
        <div className={styles.textWrapper}>
          <span className={styles.title}>Attached Credentials</span>

          <div className={styles.credentialContainer}>
            {credentials.map(({ credential, name }) => (
              <div
                key={credential.rootHash}
                className={styles.credentialsWrapper}
              >
                <CredentialVerifier
                  did={did}
                  credentialV1={{ credential, metadata: { label: name } }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {presentationResult && (
        <div className={styles.textWrapper}>
          <span className={styles.title}>Attached Credentials</span>

          <div className={styles.credentialContainer}>
            {presentationResult.credentialResults?.map(
              ({ credential, error }) => (
                <div key={credential.id} className={styles.credentialsWrapper}>
                  <CredentialVerifier
                    did={did}
                    credentialV2={credential as Types.KiltCredentialV1}
                    initialError={
                      error?.map((e) => String(e)).join('\n') ||
                      presentationResult.proofResults
                        ?.flatMap(({ error }) => error)
                        .join('\n')
                    }
                  />
                </div>
              ),
            )}
          </div>
        </div>
      )}

      <div className={styles.textWrapper}>
        <span className={styles.title}>Service Endpoints</span>
        <div className={styles.endpointsWrapper}>
          {services.map(({ id, type, serviceEndpoint }) => (
            <ServiceEndpoint
              did={did}
              url={serviceEndpoint[0]}
              endpointType={type[0]}
              key={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
