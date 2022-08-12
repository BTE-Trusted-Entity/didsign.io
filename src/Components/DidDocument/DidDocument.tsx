import React, { Fragment } from 'react';

import * as styles from './DidDocument.module.css';

import { useAppSelector } from '../../app/hooks';
import {
  selectAttachedCredentials,
  selectServiceEndpoints,
  selectTimestamp,
  selectTxHash,
  selectVerifiedDid,
  selectVerifiedSign,
  selectW3Name,
} from '../../Features/Signer/VerifiedSignatureSlice';
import { selectJwsSignStatus } from '../../Features/Signer/VerifyJwsSlice';
import { JWSErrors } from '../JWSErrors/JWSErrors';
import { ServiceEndpoint } from '../ServiceEndpoints/ServiceEndpoint';

import { useSubscanHost } from '../../Utils/useSubscanHost';
import { CredentialVerifier } from '../Credential/Credential';

export const DidDocument = () => {
  const did = useAppSelector(selectVerifiedDid);
  const w3name = useAppSelector(selectW3Name);
  const timestamp = useAppSelector(selectTimestamp) || 'No timestamp available';
  const txHash = useAppSelector(selectTxHash);
  const signature = useAppSelector(selectVerifiedSign);
  const attachedCredentials = useAppSelector(selectAttachedCredentials);
  const seviceEndpoints = useAppSelector(selectServiceEndpoints);
  const jwsStatus = useAppSelector(selectJwsSignStatus);
  const subscanHost = useSubscanHost();

  if (jwsStatus === 'Not Checked' || jwsStatus === 'Validating') return null;

  if (jwsStatus !== 'Verified') {
    return <JWSErrors />;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <span className={styles.verificationText}>Verification</span>
        </div>

        <div className={styles.textWrapper}>
          <span className={styles.title}>Signed By</span>
          <span className={styles.text}>
            {w3name && (
              <Fragment>
                w3n:{w3name}
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
            <span className={styles.title}>Attached Credentidals</span>

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
            {seviceEndpoints.map((endpoint) => (
              <ServiceEndpoint
                url={endpoint.urls[0]}
                endpointType={endpoint.types[0]}
                key={endpoint.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
};
