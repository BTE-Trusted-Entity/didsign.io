import React, { Fragment, useState } from 'react';

import styles from './FilesSigner.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { deleteFile, selectFiles } from '../../Features/Signer/FileSlice';
import {
  clearHash,
  deleteItem,
  selectHash,
} from '../../Features/Signer/hashSlice';
import { clearSign } from '../../Features/Signer/SignatureSlice';
import { showPopup } from '../../Features/Signer/PopupSlice';

import { isDidSignFile } from '../../Utils/verify-helper';

import { SignFileInfoPopup } from '../Popups/Popups';
import { Timestamp } from '../Timestamp/Timestamp';

export const FilesSigner = () => {
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);
  const hash = useAppSelector(selectHash);
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
    dispatch(deleteFile(file));
    dispatch(deleteItem(hash[index]));
    dispatch(clearSign());
    const didSignFile = files.find((file) => isDidSignFile(file.name));
    if (didSignFile !== undefined) {
      dispatch(deleteFile(didSignFile));
      dispatch(deleteItem(hash[index - 1]));
    }
    hash.length === 1 && dispatch(clearSign());
    if (files.length === 1) {
      dispatch(clearHash());
    }
  };
  if (files.length === 0) {
    return null;
  }
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
