import * as styles from './VerifiedFiles.module.css';

import { FileEntry } from '../Files/Files';
import { isDidSignFile } from '../../utils/verify-helper';

export function VerifiedFiles({
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
  if (zip) {
    return (
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
          {files.map(({ file, name, verified }, index) => (
            <li
              className={
                verified ? styles.unzippedFileOk : styles.unzippedFileInvalid
              }
              key={index}
            >
              {isDidSignFile(file) ? (
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
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Files</h2>

      <ul className={styles.list}>
        {files.map(({ file, name, verified }, index) => (
          <li
            className={verified ? styles.fileOk : styles.fileInvalid}
            key={index}
          >
            {isDidSignFile(file) ? (
              <p className={styles.didsignFile}>{name}</p>
            ) : file.type.includes('image') ? (
              <p className={styles.imageFile}>{name}</p>
            ) : (
              <p className={styles.docFile}>{name}</p>
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
  );
}
