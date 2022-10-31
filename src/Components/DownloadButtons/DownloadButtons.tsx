import { useCallback, useState } from 'react';

import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import * as styles from './DownloadButtons.module.css';

import { FileEntry, useFiles } from '../Files/Files';
import { useSignature } from '../Signature/Signature';
import { useBooleanState } from '../../Utils/useBooleanState';

export function DownloadButtons() {
  const { files } = useFiles();
  const [signatureFile] = files;
  const showLoader = useBooleanState();
  const [progress, setProgress] = useState('0');
  const { setSignature } = useSignature();

  async function generateZipFile(files: FileEntry[]) {
    const zip = new JSZip();
    files.forEach(({ buffer, name }) => zip.file(name, buffer));
    const content = await zip.generateAsync(
      {
        type: 'blob',
        compression: 'STORE',
        streamFiles: true,
      },
      function updateCallback(metadata) {
        setProgress(metadata.percent.toFixed(0));
      },
    );
    saveAs(content, 'DIDsign-files.zip');
  }

  const handleDownloadSign = useCallback(() => {
    saveAs(signatureFile.file, 'signature.didsign');
    setSignature((old) => ({ ...old, downloaded: true }));
  }, [setSignature, signatureFile.file]);

  const handleZip = useCallback(async () => {
    showLoader.on();
    document.body.style.pointerEvents = 'none';
    await generateZipFile(files);
    showLoader.off();
    document.body.style.pointerEvents = 'auto';
    setSignature((old) => ({ ...old, downloaded: true }));
  }, [files, setSignature, showLoader]);

  return (
    <div className={styles.container}>
      <div className={styles.zipBtnWapper}>
        <span className={styles.zipText}>now</span>
        <button className={styles.zipBtn} onClick={handleZip}>
          <span>{showLoader.current ? 'ZIPPING' : 'ZIP ALL FILES'}</span>
        </button>
      </div>

      {showLoader.current && (
        <div className={styles.progressbarWrapper}>
          <div className={styles.progressbar}>
            <div
              className={styles.progress}
              style={{ width: progress + '%' }}
            />
          </div>

          <span className={styles.progressInfo}>{progress + '%'}</span>
        </div>
      )}

      {!showLoader.current && (
        <div className={styles.downloadSignBtnWrapper}>
          <span className={styles.downloadSignText}>or only download</span>
          <button
            className={styles.downloadSignBtn}
            onClick={handleDownloadSign}
          >
            <span>SIGNATURE</span>
          </button>
        </div>
      )}
    </div>
  );
}
