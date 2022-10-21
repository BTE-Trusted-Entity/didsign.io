import React, { useState } from 'react';

import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import * as styles from './DownloadButtons.module.css';

import { useFiles } from '../Files/Files';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectTimestampStatus,
  updateDownloadStatus,
} from '../../Features/Signer/SignatureSlice';

export const DownloadButtons = () => {
  const { files } = useFiles();
  const [signatureFile] = files;
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>('0');
  const isTimestamped = useAppSelector(selectTimestampStatus);
  const dispatch = useAppDispatch();

  async function generateZipFile(
    files: Array<{ buffer: ArrayBuffer; name: string }>,
  ) {
    const zip = new JSZip();
    files.map((buffer) => zip.file(buffer.name, buffer.buffer));
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

  const handleDownloadSign = async () => {
    saveAs(signatureFile.file, 'signature.didsign');
    if (isTimestamped) dispatch(updateDownloadStatus(true));
  };

  const handleZip = async () => {
    setShowLoader(true);
    document.body.style.pointerEvents = 'none';
    await generateZipFile(files);
    setShowLoader(false);
    document.body.style.pointerEvents = 'auto';
    if (isTimestamped) dispatch(updateDownloadStatus(true));
  };

  return (
    <div className={styles.container}>
      <div className={styles.zipBtnWapper}>
        <span className={styles.zipText}>now</span>
        <button className={styles.zipBtn} onClick={handleZip}>
          <span>{showLoader ? 'ZIPPING' : 'ZIP ALL FILES'}</span>
        </button>
      </div>

      {showLoader && (
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

      {!showLoader && (
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
};
