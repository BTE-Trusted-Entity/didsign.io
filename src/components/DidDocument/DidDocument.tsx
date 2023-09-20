import { Fragment, useEffect, useState } from 'react';
import { Did, DidServiceEndpoint } from '@kiltprotocol/sdk-js';

import * as styles from './DidDocument.module.css';

import { SignDoc } from '../../utils/types';
import { ServiceEndpoint } from '../ServiceEndpoints/ServiceEndpoint';
import { useSubscanHost } from '../../hooks/useSubscanHost';
import { CredentialVerifier } from '../Credential/Credential';
import { getSignatureFromRemark, getTimestamp } from '../../utils/timestamp';
import { parseJWS } from '../../utils/verify-helper';
import { apiPromise } from '../../utils/api';

const W3N_ORIGIN = process.env.REACT_APP_IS_TEST_ENV
  ? 'https://test.w3n.id'
  : 'https://w3n.id';

export function DidDocument({ signDoc }: { signDoc: SignDoc }) {
  const { jws, remark, credentials } = signDoc;

  const { signature, header } = parseJWS(jws);
  const { did } = Did.parse(header.kid);

  const subscanHost = useSubscanHost();

  const [web3name, setWeb3Name] = useState<string>();
  const [services, setServices] = useState<DidServiceEndpoint[]>([]);

  useEffect(() => {
    (async () => {
      const api = await apiPromise;
      const { document, web3Name } = Did.linkedInfoFromChain(
        await api.call.did.query(Did.toChain(did)),
      );
      setWeb3Name(web3Name || undefined);
      setServices(document.service || []);
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
                href={`${W3N_ORIGIN}/${web3name}`}
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
          {remark && (
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
