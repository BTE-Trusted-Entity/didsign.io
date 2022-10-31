import Dropzone from 'react-dropzone';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { without } from 'lodash-es';

import * as styles from '../../components/Layout/Layout.module.css';

import ImportIcon from '../../images/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../images/iconBIG_import_release.svg';
import { FileEntry, FilesContext } from '../../components/Files/Files';
import { createHash } from '../../utils/sign-helpers';
import {
  FastAnimation,
  SlowAnimation,
} from '../../components/Animation/Animation';
import { isDidSignFile } from '../../utils/verify-helper';
import { SigningMultipleDidFiles } from '../../components/Popups/Popups';
import { SignatureContext } from '../../components/Signature/Signature';
import { Navigation } from '../../components/Navigation/Navigation';
import { FilesEmpty } from '../../components/FilesEmpty/FilesEmpty';
import { SignedFiles } from '../../components/SignedFiles/SignedFiles';
import { SignButton } from '../../components/SignButton/SignButton';
import { DownloadButtons } from '../../components/DownloadButtons/DownloadButtons';
import { Signature } from '../../utils/types';
import { InfoLink } from '../../components/BottomSection/InfoLink';
import { useBooleanState } from '../../hooks/useBooleanState';

export function Sign() {
  const dragging = useBooleanState();
  const icon = dragging.current ? ReleaseIcon : ImportIcon;
  const signErrorPopup = useBooleanState();

  const [files, setFiles] = useState<FileEntry[]>([]);
  const filesContext = useMemo(() => ({ files, setFiles }), [files]);

  const [signatureValues, setSignature] = useState<Signature>({});
  const signatureContext = useMemo(
    () => ({ ...signatureValues, setSignature }),
    [signatureValues],
  );
  const { signature, timestamped, downloaded } = signatureValues;

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (signature) {
        const didSignFile = files.find(isDidSignFile);
        if (!didSignFile) return;

        setFiles((files) => without(files, didSignFile));
        setSignature({});
      }
      acceptedFiles.forEach(async (file: File) => {
        dragging.off();

        const { name } = file;
        if (isDidSignFile(file)) {
          signErrorPopup.on();
          return;
        }
        const buffer = await file.arrayBuffer();
        const hash = await createHash(buffer);
        setFiles((files) => [...files, { file, buffer, name, hash }]);
      });
    },
    [dragging, files, signErrorPopup, signature],
  );

  const handleDelete = useCallback(() => {
    setSignature({});
    setFiles([]);
  }, []);

  return (
    <FilesContext.Provider value={filesContext}>
      <SignatureContext.Provider value={signatureContext}>
        <main className={styles.main}>
          <Navigation needWarning={timestamped && !downloaded} />
          <div className={styles.middleSection}>
            <div className={styles.container}>
              <Dropzone
                onDrop={handleDrop}
                onDragEnter={dragging.on}
                onDragLeave={dragging.off}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className={styles.dropContainer} {...getRootProps({})}>
                    {dragging.current ? <FastAnimation /> : <SlowAnimation />}

                    <input {...getInputProps()} />
                    <img className={styles.importIcon} src={icon} alt="" />

                    {!dragging.current && (
                      <Fragment>
                        <span className={styles.signText}>Sign Your Files</span>
                        <span className={styles.dragDropText}>drag & drop</span>
                        <span className={styles.browseFilesText}>
                          or click / tap to browse your files
                        </span>
                      </Fragment>
                    )}
                  </div>
                )}
              </Dropzone>

              {signErrorPopup.current && (
                <SigningMultipleDidFiles onDismiss={signErrorPopup.off} />
              )}
            </div>

            {files.length === 0 ? <FilesEmpty /> : <SignedFiles />}
          </div>

          <section className={styles.bottomContainer}>
            <div className={styles.bottomSection}>
              {!signature ? <SignButton /> : <DownloadButtons />}

              {signature && (
                <button
                  className={styles.startOverBtn}
                  onClick={handleDelete}
                />
              )}
            </div>
            <InfoLink />
          </section>
        </main>
      </SignatureContext.Provider>
    </FilesContext.Provider>
  );
}
