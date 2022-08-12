import React, { Fragment } from 'react';

import classnames from 'classnames';

import * as styles from './FilesVerifier.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearAll,
  clearFileName,
  deleteFile,
  selectFiles,
  selectFilenames,
} from '../../Features/Signer/FileSlice';
import {
  clearEndpoint,
  clearFileStatuses,
  deleteFilestatusOnIndex,
  fileStatus,
  replaceStatus,
} from '../../Features/Signer/VerifiedSignatureSlice';
import {
  clearHash,
  deleteHashFromIndex,
} from '../../Features/Signer/hashSlice';
import {
  clearJWS,
  selectJwsSignStatus,
  updateSignStatus,
} from '../../Features/Signer/VerifyJwsSlice';

import { isDidSignFile } from '../../Utils/verify-helper';

export const FilesVerifier = () => {
  const files = useAppSelector(selectFiles);
  const unzippedFileNames = useAppSelector(selectFilenames);

  const jwsStatus = useAppSelector(selectJwsSignStatus);
  const filesStatus = useAppSelector(fileStatus);

  const dispatch = useAppDispatch();

  const handleDeleteAll = () => {
    if (jwsStatus === 'Validating') {
      return;
    }

    dispatch(clearEndpoint());
    dispatch(clearAll());
    dispatch(clearHash());
    dispatch(clearFileName());
    dispatch(clearJWS());
    dispatch(clearFileStatuses());
  };

  const handleDeleteFile = (file: File) => {
    if (jwsStatus === 'Validating') return;

    const index = files.indexOf(file);
    const didSignFileDeleted = isDidSignFile(files[index].name);
    if (didSignFileDeleted) {
      dispatch(replaceStatus());
      dispatch(clearJWS());
    }

    if (jwsStatus !== 'Corrupted') {
      dispatch(updateSignStatus('Not Checked'));
    }

    dispatch(clearEndpoint());
    dispatch(deleteFilestatusOnIndex(index));
    dispatch(deleteFile(file));
    dispatch(deleteHashFromIndex(index));
  };

  if (files.length === 0) {
    return null;
  }

  const hasUnzippedFiles = unzippedFileNames.length > 0;

  return (
    <Fragment>
      {hasUnzippedFiles && (
        <div className={styles.zipContainer}>
          <div className={styles.zipFile}>
            <p className={styles.zipFilename}>{files[0].name}</p>

            <button
              className={styles.deleteBtn}
              aria-label="Remove all files"
              onClick={handleDeleteAll}
            />
          </div>

          <h2 className={styles.heading}>Files</h2>

          <ul className={styles.list}>
            {unzippedFileNames.map((name: string, index: number) => (
              <li
                className={classnames(
                  filesStatus[index]
                    ? styles.unzippedFileOk
                    : styles.unzippedFileInvalid,
                )}
                key={index}
              >
                {isDidSignFile(name) ? (
                  <p className={styles.didsignFile}>{name}</p>
                ) : name.includes('png') || name.includes('jpg') ? (
                  <p className={styles.imageFile}>{name}</p>
                ) : (
                  <p className={styles.docFile}>{name}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hasUnzippedFiles && (
        <div className={styles.container}>
          <h2 className={styles.heading}>Files</h2>

          <ul className={styles.list}>
            {files.map((file: File, index: number) => (
              <li
                className={classnames(
                  filesStatus[index] ? styles.fileOk : styles.fileInvalid,
                )}
                key={index}
              >
                {isDidSignFile(file.name) ? (
                  <p className={styles.didsignFile}>{file.name}</p>
                ) : file.type.includes('image') ? (
                  <p className={styles.imageFile}>{file.name}</p>
                ) : (
                  <p className={styles.docFile}>{file.name}</p>
                )}

                <button
                  className={styles.deleteBtn}
                  aria-label="Remove file"
                  onClick={() => handleDeleteFile(file)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};
