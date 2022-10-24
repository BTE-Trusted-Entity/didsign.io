import { Fragment, useState } from 'react';

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
  const showPopup = useShowPopup().set;
  const { hashes, set: setHashes } = useHashes();

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
  const handleDeleteFile = (file: File) => {
    const index = files.findIndex((entry) => entry.file === file);
    setHashes([...hashes].splice(index, 1));
    setFiles((files) => [...files].splice(index, 1));

    const didSignFileIndex = files.findIndex((file) =>
      isDidSignFile(file.name),
    );

    if (didSignFileIndex < 0) return;

    setFiles((files) => [...files].splice(didSignFileIndex, 1));
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
                  onClick={() => handleDeleteFile(file)}
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
