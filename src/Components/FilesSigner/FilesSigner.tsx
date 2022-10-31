import { Fragment, useCallback } from 'react';
import { without } from 'lodash-es';

import * as styles from './FilesSigner.module.css';

import { useFiles } from '../Files/Files';
import { useSignature } from '../Signature/Signature';
import { isDidSignFile } from '../../Utils/verify-helper';
import { SignFileInfoPopup } from '../Popups/Popups';
import { Timestamp } from '../Timestamp/Timestamp';
import { CredentialsInsertion } from '../CredentialsInsertion/CredentialsInsertion';
import { useBooleanState } from '../../Utils/useBooleanState';

export function FilesSigner() {
  const { files, setFiles } = useFiles();
  const { credentials, setSignature } = useSignature();
  const signPopup = useBooleanState();

  const handleDeleteFile = useCallback(
    (index: number) => {
      setFiles((files) => without(files, files[index]));

      const didSignFile = files.find(isDidSignFile);
      if (!didSignFile) return;

      setFiles((files) => without(files, didSignFile));
      setSignature({});
    },
    [files, setFiles, setSignature],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Files</h2>

      <ul className={styles.list}>
        {files.map(({ file }, index) => (
          <li key={index}>
            {isDidSignFile(file) && (
              <Fragment>
                <div className={styles.file}>
                  <p className={styles.didsignFile}>{file.name}</p>

                  <p className={styles.didsignInfo}>
                    added by DIDsign
                    <button
                      className={styles.infoBtn}
                      aria-label="signature file information"
                      onClick={signPopup.on}
                    />
                  </p>
                </div>
                {credentials && <CredentialsInsertion />}
                <Timestamp />
              </Fragment>
            )}

            {!isDidSignFile(file) && (
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

      {signPopup.current && <SignFileInfoPopup onDismiss={signPopup.off} />}
    </div>
  );
}
