import Dropzone from 'react-dropzone';
import React, { useCallback, useState } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import * as styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import { useFiles } from '../Files/Files';
import { useHashes } from '../Hashes/Hashes';
import { createHash } from '../../Utils/sign-helpers';
import { FastAnimation, SlowAnimation } from '../Animation/Animation';
import { isDidSignFile } from '../../Utils/verify-helper';
import { SigningMultipleDidFiles, useShowPopup } from '../Popups/Popups';
import { useSignature } from '../Signature/Signature';

export const ImportFilesSigner = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);
  const [signErrorPopup, setSignErrorPopup] = useState<boolean>(false);
  const { files, setFiles } = useFiles();
  const targetElement = document.querySelector('body');
  const { signature, setSignature } = useSignature();
  const { showPopup } = useShowPopup();
  const { hashes, setHashes } = useHashes();

  const handleDismiss = () => {
    showPopup(false);
    setSignErrorPopup(false);
    if (targetElement != null) {
      enableBodyScroll(targetElement);
    }
  };
  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (signature) {
        const didSignFileIndex = files.findIndex((file) =>
          isDidSignFile(file.name),
        );
        if (didSignFileIndex < 0) return;
        setFiles((files) => [...files].splice(didSignFileIndex, 1));
        setSignature({});
      }
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon);

        if (isDidSignFile(file.name)) {
          showPopup(true);
          setSignErrorPopup(true);
          if (targetElement != null) {
            disableBodyScroll(targetElement);
          }
          return;
        }
        const buffer = await file.arrayBuffer();
        setFiles((files) => [...files, { file, buffer, name: file.name }]);
        const newHash = await createHash(buffer);
        setHashes([...hashes, newHash]);
      });
    },
    [
      files,
      hashes,
      setFiles,
      setHashes,
      setSignature,
      showPopup,
      signature,
      targetElement,
    ],
  );

  return (
    <div className={styles.container}>
      <Dropzone
        onDrop={handleDrop}
        onDragLeave={() => setImportIcon(ImportIcon)}
        onDragEnter={() => setImportIcon(ReleaseIcon)}
      >
        {({ getRootProps, getInputProps }) => (
          <div className={styles.dropContainer} {...getRootProps({})}>
            {impIcon == ImportIcon ? <SlowAnimation /> : <FastAnimation />}

            <input {...getInputProps()} />
            <img className={styles.importIcon} src={impIcon} />
            {impIcon === ImportIcon && (
              <span className={styles.signText}>Sign Your Files</span>
            )}
            {impIcon === ImportIcon && (
              <span className={styles.dragDropText}>drag & drop</span>
            )}
            {impIcon === ImportIcon && (
              <span className={styles.browseFilesText}>
                or click / tap to browse your files
              </span>
            )}
          </div>
        )}
      </Dropzone>

      {signErrorPopup && <SigningMultipleDidFiles onDismiss={handleDismiss} />}
    </div>
  );
};
