import React from 'react';

import * as styles from './BottomSection.module.css';

import { useVerifiedSignature } from '../VerifiedSignature/VerifiedSignature';
import { useFiles } from '../Files/Files';
import { useSignature } from '../Signature/Signature';
import { useJWS } from '../JWS/JWS';
import { useHashes } from '../Hashes/Hashes';
import { DownloadButtons } from '../DownloadButtons/DownloadButtons';
import { SignButton } from '../SignButton/SignButton';
import { DidDocument } from '../DidDocument/DidDocument';

const InfoLink = () => {
  return (
    <div className={styles.infoLink}>
      <span className={styles.infoItem}>
        Don’t have an on-chain DID yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.trusted-entity.io/assets/pdf/Upgrading-to-on-chain-DID.pdf"
        >
          Read here
        </a>
      </span>
      <span className={styles.infoItem}>
        Don’t have a web3name yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_link_address_Full_May22.pdf"
        >
          Read here
        </a>
      </span>
    </div>
  );
};

export const BottomSectionSigner = () => {
  const { setHashes } = useHashes();
  const { setFiles, setZip } = useFiles();
  const { setSignature } = useSignature();

  const handleDelete = () => {
    setSignature({});
    setFiles([]);
    setZip();
    setHashes([]);
  };
  const { signature } = useSignature();
  return (
    <section className={styles.container}>
      <div className={styles.bottomSection}>
        {!signature ? <SignButton /> : <DownloadButtons />}

        {signature && (
          <button
            className={styles.startOverBtn}
            onClick={() => handleDelete()}
          />
        )}
      </div>
      <InfoLink />
    </section>
  );
};

export const BottomSectionVerifier = () => {
  const { signStatus: jwsStatus, clearJWS } = useJWS();
  const { setHashes } = useHashes();
  const { setFiles, setZip } = useFiles();
  const { setSignature } = useSignature();
  const { clearEndpoint, setVerifiedSignature } = useVerifiedSignature();

  const handleDelete = () => {
    setSignature({});
    setFiles([]);
    setZip();
    setHashes([]);
    clearEndpoint();
    clearJWS();
    setVerifiedSignature((old) => ({ ...old, filesStatus: [] }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.bottomSection}>
        {jwsStatus === 'Validating' && (
          <span className={styles.verificationLoader} />
        )}

        {jwsStatus === 'Not Checked' && (
          <span className={styles.verificationText}>
            Verification <div></div>
          </span>
        )}

        <DidDocument />

        {jwsStatus === 'Verified' && (
          <button
            className={styles.startOverBtn}
            onClick={() => handleDelete()}
          />
        )}
      </div>
    </section>
  );
};
