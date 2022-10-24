import React, { Fragment } from 'react';

import classnames from 'classnames';

import * as styles from './FilesVerifier.module.css';

import { useFiles } from '../Files/Files';
import { useVerifiedSignature } from '../VerifiedSignature/VerifiedSignature';
import { useHashes } from '../Hashes/Hashes';
import { useJWS } from '../JWS/JWS';

import { isDidSignFile } from '../../Utils/verify-helper';

export const FilesVerifier = () => {
  const { files, zip, setFiles, setZip } = useFiles();

  const { signStatus: jwsStatus, clearJWS, setJWS } = useJWS();
  const { filesStatus, clearEndpoint, setVerifiedSignature } =
    useVerifiedSignature();

  const { hashes, set: setHashes } = useHashes();

  const handleDeleteAll = () => {
    if (jwsStatus === 'Validating') {
      return;
    }

    clearEndpoint();
    setFiles([]);
    setZip();
    setHashes([]);
    clearJWS();
    setVerifiedSignature((old) => ({ ...old, filesStatus: [] }));
  };

  const handleDeleteFile = (file: File) => {
    if (jwsStatus === 'Validating') return;

    const index = files.findIndex((entry) => entry.file === file);
    const didSignFileDeleted = isDidSignFile(files[index].name);
    if (didSignFileDeleted) {
      setVerifiedSignature((old) => ({
        ...old,
        filesStatus: old.filesStatus.map(() => false),
      }));
      clearJWS();
    }

    if (jwsStatus !== 'Corrupted') {
      setJWS((old) => ({ ...old, signStatus: 'Not Checked' }));
    }

    clearEndpoint();
    setVerifiedSignature((old) => ({
      ...old,
      filesStatus: old.filesStatus.splice(index, 1),
    }));
    setFiles((files) => [...files].splice(index, 1));
    setHashes([...hashes].splice(index, 1));
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
            {files.map(({ name }, index) => (
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

      {!zip && (
        <div className={styles.container}>
          <h2 className={styles.heading}>Files</h2>

          <ul className={styles.list}>
            {files.map(({ file }, index) => (
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
