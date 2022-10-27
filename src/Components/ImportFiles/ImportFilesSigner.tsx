import Dropzone from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';
import { without } from 'lodash-es';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import * as styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import { useFiles } from '../Files/Files';
import { createHash } from '../../Utils/sign-helpers';
import { FastAnimation, SlowAnimation } from '../Animation/Animation';
import { isDidSignFile } from '../../Utils/verify-helper';
import { SigningMultipleDidFiles } from '../Popups/Popups';
import { useSignature } from '../Signature/Signature';
import { Navigation } from '../Navigation/Navigation';
import { FilesEmpty } from '../FilesEmpty/FilesEmpty';
import { FilesSigner } from '../FilesSigner/FilesSigner';
import { SignButton } from '../SignButton/SignButton';
import { DownloadButtons } from '../DownloadButtons/DownloadButtons';

// TODO: extract component?
function InfoLink() {
  return (
    <div className={styles.infoLink}>
      <span className={styles.infoItem}>
        Don’t have an on-chain DID yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.trusted-entity.io/assets/pdf/Upgrading-to-on-chain-DID.pdf"
        >
          Read here
        </a>
      </span>
      <span className={styles.infoItem}>
        Don’t have a web3name yet?{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_link_address_Full_May22.pdf"
        >
          Read here
        </a>
      </span>
    </div>
  );
}

export const ImportFilesSigner = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);
  const [signErrorPopup, setSignErrorPopup] = useState<boolean>(false);
  const { files, setFiles } = useFiles();
  const targetElement = document.querySelector('body');
  const { signature, setSignature } = useSignature();

  useEffect(() => {
    setSignature({});
  }, [setSignature]);

  const handleDismiss = () => {
    setSignErrorPopup(false);
    if (targetElement != null) {
      enableBodyScroll(targetElement);
    }
  };
  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (signature) {
        const didSignFile = files.find(({ name }) => isDidSignFile(name));
        if (!didSignFile) return;

        setFiles((files) => without(files, didSignFile));
        setSignature({});
      }
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon);

        const { name } = file;
        if (isDidSignFile(name)) {
          setSignErrorPopup(true);
          if (targetElement != null) {
            disableBodyScroll(targetElement);
          }
          return;
        }
        const buffer = await file.arrayBuffer();
        const hash = await createHash(buffer);
        setFiles((files) => [...files, { file, buffer, name, hash }]);
      });
    },
    [files, setFiles, setSignature, signature, targetElement],
  );

  const handleDelete = () => {
    setSignature({});
    setFiles([]);
  };

  return (
    <main className={styles.main}>
      <Navigation />
      <div className={styles.middleSection}>
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

          {signErrorPopup && (
            <SigningMultipleDidFiles onDismiss={handleDismiss} />
          )}
        </div>

        {files.length === 0 ? <FilesEmpty /> : <FilesSigner />}
      </div>

      <section className={styles.bottomContainer}>
        <div className={styles.bottomSection}>
          {!signature ? <SignButton /> : <DownloadButtons />}

          {signature && (
            <button
              className={styles.startOverBtn}
              onClick={() => handleDelete()}
            />
          )}
        </div>
        <InfoLink />
      </section>
    </main>
  );
};
