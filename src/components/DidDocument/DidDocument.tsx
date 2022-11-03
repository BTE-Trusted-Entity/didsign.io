import { Fragment, useEffect, useState } from 'react';
import { Did, DidServiceEndpoint } from '@kiltprotocol/sdk-js';

import * as styles from './DidDocument.module.css';

import { IVerifiedSignatureContents, JWSStatus } from '../../utils/types';
import { JWSErrors } from '../JWSErrors/JWSErrors';
import { ServiceEndpoint } from '../ServiceEndpoints/ServiceEndpoint';
import { useSubscanHost } from '../../hooks/useSubscanHost';
import { CredentialVerifier } from '../Credential/Credential';

export function DidDocument({
  jwsStatus,
  verifiedSignature,
}: {
  jwsStatus: JWSStatus;
  verifiedSignature: IVerifiedSignatureContents;
}) {
  const {
    did,
    timestamp = 'No timestamp available',
    txHash,
    signature,
    credentials: attachedCredentials,
  } = verifiedSignature;
  const subscanHost = useSubscanHost();

  const [web3name, setWeb3Name] = useState<string>();
  const [services, setServices] = useState<DidServiceEndpoint[]>([]);

  useEffect(() => {
    (async () => {
      if (!did) {
        return;
      }

      setWeb3Name((await Did.Web3Names.queryWeb3NameForDid(did)) || undefined);

      const result = await Did.DidResolver.resolveDoc(did);
      setServices(result?.details?.getEndpoints() || []);
    })();
  }, [did]);

  if (jwsStatus === 'Not Checked' || jwsStatus === 'Validating' || !did) {
    return null;
  }

  if (jwsStatus !== 'Verified') {
    return <JWSErrors jwsStatus={jwsStatus} />;
  }

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
              w3n:{web3name}
              <br />
            </Fragment>
          )}
          {did}
        </span>
      </div>
      <div className={styles.textWrapper}>
        <span className={styles.title}>Signed At</span>
        <span className={styles.text}>
          {timestamp}
          {txHash && (
            <a
              href={`${subscanHost}/extrinsic/${txHash}`}
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

      {attachedCredentials && (
        <div className={styles.textWrapper}>
          <span className={styles.title}>Attached Credentials</span>

          <div className={styles.credentialContainer}>
            {attachedCredentials.map((credentialItem) => (
              <div
                key={credentialItem.credential.rootHash}
                className={styles.credentialsWrapper}
              >
                <span className={styles.text}>{credentialItem.name}</span>
                <CredentialVerifier
                  did={did}
                  credential={credentialItem.credential}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.textWrapper}>
        <span className={styles.title}>Service Endpoints</span>
        <div className={styles.endpointsWrapper}>
          {services.map(({ id, types, urls }) => (
            <ServiceEndpoint
              did={did}
              url={urls[0]}
              endpointType={types[0]}
              key={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
