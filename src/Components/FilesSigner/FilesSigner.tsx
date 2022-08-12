import { Fragment, useState } from 'react';

import * as styles from './FilesSigner.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  deleteBuffer,
  deleteFile,
  selectBuffers,
  selectFiles,
} from '../../Features/Signer/FileSlice';
import { deleteHashFromIndex } from '../../Features/Signer/hashSlice';
import {
  clearSign,
  selectCredentials,
} from '../../Features/Signer/SignatureSlice';
import { showPopup } from '../../Features/Signer/PopupSlice';

import { isDidSignFile } from '../../Utils/verify-helper';

import { SignFileInfoPopup } from '../Popups/Popups';
import { Timestamp } from '../Timestamp/Timestamp';
import { CredentialsInsertion } from '../CredentialsInsertion/CredentialsInsertion';

export const FilesSigner = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);
  const buffers = useAppSelector(selectBuffers);
  const credentials = useAppSelector(selectCredentials);
  const [signPopup, setSignPopup] = useState<boolean>(false);

  const showSignInfoPopup = () => {
    dispatch(showPopup(true));
    setSignPopup(true);
    document.body.style.overflowY = 'hidden';
  };
  const handleDismiss = () => {
    dispatch(showPopup(false));
    setSignPopup(false);
    document.body.style.overflowY = 'auto';
  };
  const handleDeleteFile = (file: File) => {
    const index = files.indexOf(file);
    dispatch(deleteHashFromIndex(index));
    dispatch(deleteBuffer(buffers[index]));
    dispatch(deleteFile(file));
    const didSignFile = files.find((file) => isDidSignFile(file.name));

    if (!didSignFile) return;

    dispatch(deleteBuffer(buffers[files.indexOf(didSignFile)]));
    dispatch(deleteFile(didSignFile));
    dispatch(clearSign());
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Files</h2>

      <ul className={styles.list}>
        {files.map((file: File, index: number) => (
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
