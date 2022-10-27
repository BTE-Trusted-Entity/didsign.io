import React, { Fragment } from 'react';
import { findIndex, without } from 'lodash-es';

import * as styles from './FilesVerifier.module.css';

import { useFiles } from '../Files/Files';
import { useVerifiedSignature } from '../VerifiedSignature/VerifiedSignature';
import { JWSStatus } from '../../Utils/types';

import { isDidSignFile } from '../../Utils/verify-helper';

export function FilesVerifier({
  jwsStatus,
  clearJWS,
  onDelete,
}: {
  jwsStatus: JWSStatus;
  clearJWS: () => void;
  onDelete: () => void;
}) {
  const { files, zip, setFiles, setZip } = useFiles();

  const { clearEndpoint } = useVerifiedSignature();

  const handleDeleteAll = () => {
    if (jwsStatus === 'Validating') {
      return;
    }

    clearEndpoint();
    setFiles([]);
    setZip();
    clearJWS();
  };

  const handleDeleteFile = (file: File) => {
    if (jwsStatus === 'Validating') return;

    const index = findIndex(files, { file });
    const fileEntry = files[index];
    const didSignFileDeleted = isDidSignFile(fileEntry.name);
    if (didSignFileDeleted) {
      setFiles((oldFiles) =>
        oldFiles.map((old) => ({ ...old, verified: false })),
      );
      clearJWS();
    }

    if (jwsStatus !== 'Corrupted') {
      onDelete();
    }

    clearEndpoint();
    setFiles((files) => without(files, fileEntry));
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {zip && (
        <div className={styles.zipContainer}>
          <div className={styles.zipFile}>
            <p className={styles.zipFilename}>{zip}</p>

            <button
              className={styles.deleteBtn}
              aria-label="Remove all files"
              onClick={handleDeleteAll}
            />
          </div>

          <h2 className={styles.heading}>Files</h2>

          <ul className={styles.list}>
            {files.map(({ name, verified }, index) => (
              <li
                className={
                  verified ? styles.unzippedFileOk : styles.unzippedFileInvalid
                }
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

      {!zip && (
        <div className={styles.container}>
          <h2 className={styles.heading}>Files</h2>

          <ul className={styles.list}>
            {files.map(({ file, verified }, index) => (
              <li
                className={verified ? styles.fileOk : styles.fileInvalid}
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
}
