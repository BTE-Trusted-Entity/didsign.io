import Dropzone from 'react-dropzone';
import React, { useCallback, useState } from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import {
  addBuffer,
  addFile,
  deleteBuffer,
  deleteFile,
  IBuffer,
  selectFiles,
} from '../../Features/Signer/FileSlice';
import { addHash } from '../../Features/Signer/hashSlice';
import { createHash } from '../../Utils/sign-helpers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FastAnimation, SlowAnimation } from '../Animation/Animation';
import { isDidSignFile } from '../../Utils/verify-helper';
import { SigningMultipleDidFiles } from '../Popups/Popups';
import { showPopup } from '../../Features/Signer/PopupSlice';
import { clearSign, selectSign } from '../../Features/Signer/SignatureSlice';

export const ImportFilesSigner = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);
  const [signErrorPopup, setSignErrorPopup] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const files = useAppSelector(selectFiles);
  const targetElement = document.querySelector('body');
  const sign = useAppSelector(selectSign);

  const handleDismiss = () => {
    dispatch(showPopup(false));
    setSignErrorPopup(false);
    if (targetElement != null) {
      enableBodyScroll(targetElement);
    }
  };
  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (sign) {
        const didSignFile = files.find((file) => isDidSignFile(file.name));
        if (!didSignFile) return;
        const arrayBuffer = await didSignFile.arrayBuffer();
        const bufferObj: IBuffer = {
          buffer: arrayBuffer,
          name: didSignFile.name,
        };
        dispatch(deleteFile(didSignFile));
        dispatch(deleteBuffer(bufferObj));
        dispatch(clearSign());
      }
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon);

        if (isDidSignFile(file.name)) {
          dispatch(showPopup(true));
          setSignErrorPopup(true);
          if (targetElement != null) {
            disableBodyScroll(targetElement);
          }
          return;
        }
        const buffer = await file.arrayBuffer();
        const bufferObj: IBuffer = {
          buffer,
          name: file.name,
        };
        dispatch(addBuffer(bufferObj));
        dispatch(addFile(file));
        const newHash = await createHash(buffer);
        dispatch(addHash(newHash));
      });
    },
    [dispatch, files, sign, targetElement],
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
