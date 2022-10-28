import React, { Fragment } from 'react';

import * as styles from './FilesVerifier.module.css';

import { FileEntry } from '../Files/Files';

import { isDidSignFile } from '../../Utils/verify-helper';

export function FilesVerifier({
  files,
  zip,
  onDelete,
  onDeleteAll,
}: {
  files: FileEntry[];
  zip?: string;
  onDelete: (index: number) => void;
  onDeleteAll: () => void;
}) {
  return (
    <Fragment>
      {zip && (
        <div className={styles.zipContainer}>
          <div className={styles.zipFile}>
            <p className={styles.zipFilename}>{zip}</p>

            <button
              className={styles.deleteBtn}
              aria-label="Remove all files"
              onClick={onDeleteAll}
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
                  onClick={() => onDelete(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
}
