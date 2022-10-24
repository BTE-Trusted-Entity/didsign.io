import { Fragment, useState } from 'react';
import { without } from 'lodash-es';

import * as styles from './FilesSigner.module.css';

import { useFiles } from '../Files/Files';
import { useHashes } from '../Hashes/Hashes';
import { useSignature } from '../Signature/Signature';

import { isDidSignFile } from '../../Utils/verify-helper';

import { SignFileInfoPopup, useShowPopup } from '../Popups/Popups';
import { Timestamp } from '../Timestamp/Timestamp';
import { CredentialsInsertion } from '../CredentialsInsertion/CredentialsInsertion';

export const FilesSigner = () => {
  const { files, setFiles } = useFiles();
  const { credentials, setSignature } = useSignature();
  const [signPopup, setSignPopup] = useState<boolean>(false);
  const { showPopup } = useShowPopup();
  const { hashes, setHashes } = useHashes();

  const showSignInfoPopup = () => {
    showPopup(true);
    setSignPopup(true);
    document.body.style.overflowY = 'hidden';
  };
  const handleDismiss = () => {
    showPopup(false);
    setSignPopup(false);
    document.body.style.overflowY = 'auto';
  };
  const handleDeleteFile = (index: number) => {
    setHashes(without(hashes, hashes[index]));
    setFiles((files) => without(files, files[index]));

    const didSignFile = files.find(({ name }) => isDidSignFile(name));
    if (!didSignFile) return;

    setFiles((files) => without(files, didSignFile));
    setSignature({});
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Files</h2>

      <ul className={styles.list}>
        {files.map(({ file }, index) => (
          <li key={index}>
            {isDidSignFile(file.name) && (
              <Fragment>
                <div className={styles.file}>
                  <p className={styles.didsignFile}>{file.name}</p>

                  <p className={styles.didsignInfo}>
                    added by DIDsign
                    <button
                      className={styles.infoBtn}
                      aria-label="signature file information"
                      onClick={showSignInfoPopup}
                    />
                  </p>
                </div>
                {credentials && <CredentialsInsertion />}
                <Timestamp />
              </Fragment>
            )}

            {!isDidSignFile(file.name) && (
              <div className={styles.file}>
                {file.type.includes('image') ? (
                  <p className={styles.imageFile}>{file.name}</p>
                ) : (
                  <p className={styles.docFile}>{file.name}</p>
                )}

                <button
                  className={styles.deleteBtn}
                  aria-label="delete file"
                  onClick={() => handleDeleteFile(index)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {signPopup && <SignFileInfoPopup onDismiss={handleDismiss} />}
    </div>
  );
};
