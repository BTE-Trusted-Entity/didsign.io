import { Fragment, useEffect, useState } from 'react';
import { Did, DidServiceEndpoint } from '@kiltprotocol/sdk-js';

import * as styles from './DidDocument.module.css';

import { SignDoc } from '../../utils/types';
import { ServiceEndpoint } from '../ServiceEndpoints/ServiceEndpoint';
import { useSubscanHost } from '../../hooks/useSubscanHost';
import { CredentialVerifier } from '../Credential/Credential';
import { getSignatureFromRemark, getTimestamp } from '../../utils/timestamp';
import { parseJWS } from '../../utils/verify-helper';

export function DidDocument({ signDoc }: { signDoc: SignDoc }) {
  const { jws, remark, credentials } = signDoc;

  const { signature, header } = parseJWS(jws);
  const { did } = Did.Utils.parseDidUri(header.kid);

  const subscanHost = useSubscanHost();

  const [web3name, setWeb3Name] = useState<string>();
  const [services, setServices] = useState<DidServiceEndpoint[]>([]);

  useEffect(() => {
    (async () => {
      setWeb3Name((await Did.Web3Names.queryWeb3NameForDid(did)) || undefined);

      const result = await Did.DidResolver.resolveDoc(did);
      setServices(result?.details?.getEndpoints() || []);
    })();
  }, [did]);

  const [timestamp, setTimestamp] = useState<string>();
  useEffect(() => {
    (async () => {
      if (!remark) {
        return;
      }
      if (signature === (await getSignatureFromRemark(remark))) {
        setTimestamp(await getTimestamp(remark.blockHash));
      } else {
        setTimestamp('No timestamp available');
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
          {remark && (
            <a
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
                <span className={styles.text}>{name}</span>
                <CredentialVerifier did={did} credential={credential} />
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
