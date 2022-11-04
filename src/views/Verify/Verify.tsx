import Dropzone from 'react-dropzone';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { without } from 'lodash-es';

import * as styles from '../../components/Layout/Layout.module.css';

import ImportIcon from '../../images/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../images/iconBIG_import_release.svg';
import { FileEntry } from '../../components/Files/Files';
import {
  getFileNames,
  getSignDoc,
  hasUnverified,
  isDidSignFile,
  unzipFileEntries,
} from '../../utils/verify-helper';
import { createHash } from '../../utils/sign-helpers';
import { SignDoc, VerificationError } from '../../utils/types';
import {
  FastAnimation,
  SlowAnimationVerifier,
} from '../../components/Animation/Animation';
import { MultipleSignPopup } from '../../components/Popups/Popups';
import { useConnect } from '../../hooks/useConnect';
import { Navigation } from '../../components/Navigation/Navigation';
import { FilesEmpty } from '../../components/FilesEmpty/FilesEmpty';
import { VerifiedFiles } from '../../components/VerifiedFiles/VerifiedFiles';
import { usePreventNavigation } from '../../hooks/usePreventNavigation';
import { DidDocument } from '../../components/DidDocument/DidDocument';
import { useBooleanState } from '../../hooks/useBooleanState';
import { JWSErrors } from '../../components/JWSErrors/JWSErrors';

export function Verify() {
  const dragging = useBooleanState();
  const icon = dragging.current ? ReleaseIcon : ImportIcon;

  const [error, setError] = useState<VerificationError>();

  const [zip, setZip] = useState<string>();
  const [files, setFiles] = useState<FileEntry[]>([]);

  useConnect();

  //allows navigation prevented by time stamping
  usePreventNavigation(false);

  const handleDeleteFile = useCallback((index: number) => {
    setFiles((files) => without(files, files[index]));
  }, []);

  const handleDeleteAll = useCallback(() => {
    setFiles([]);
    setZip(undefined);
    setError(undefined);
  }, []);

  const dismissMultipleSignPopup = useCallback(() => setError(undefined), []);

  const handleDrop = useCallback(
    async (droppedFiles: File[]) => {
      dragging.off();

      const existingDidSignCount = zip || files.some(isDidSignFile) ? 1 : 0;
      const droppedDidSignCount = droppedFiles.filter(isDidSignFile).length;

      if (existingDidSignCount + droppedDidSignCount > 1) {
        setError('Multiple Sign');
        return;
      }

      if (files.length === 0 && droppedFiles.length === 1) {
        const [file] = droppedFiles;
        if (file.name.endsWith('.zip')) {
          const filenames = await getFileNames(file);
          const didSignFile = filenames.find((name) => isDidSignFile({ name }));
          if (didSignFile) {
            setZip(file.name);
            setFiles(await unzipFileEntries(file));
            return;
          }
        }
      }

      const newFiles = await Promise.all(
        droppedFiles.map(async (file: File) => {
          const { name } = file;
          const buffer = await file.arrayBuffer();
          const hash = await createHash(buffer);
          return { file, buffer, name, hash };
        }),
      );
      setFiles((files) => [...files, ...newFiles]);
    },
    [dragging, files, zip],
  );

  const didSignFile = files.find(isDidSignFile);
  const [signDoc, setSignDoc] = useState<SignDoc>();
  const isValidating = useBooleanState();

  useEffect(() => {
    (async () => {
      try {
        setSignDoc(undefined);
        setError(undefined);

        if (didSignFile) {
          isValidating.on();
          setSignDoc(await getSignDoc(didSignFile.file));
        }
      } catch (exception) {
        setError(zip ? 'Invalid' : 'Corrupted');
        console.error(exception);
      } finally {
        isValidating.off();
      }
    })();
  }, [didSignFile, isValidating, zip]);

  const verified =
    signDoc &&
    files.length > 0 &&
    !error &&
    !hasUnverified(files, signDoc.hashes);

  return (
    <main className={styles.main}>
      <Navigation />
      <div className={styles.middleSection}>
        <div className={styles.container}>
          <Dropzone
            onDrop={handleDrop}
            onDragEnter={dragging.on}
            onDragLeave={dragging.off}
          >
            {({ getRootProps, getInputProps }) => (
              <div className={styles.dropContainer} {...getRootProps({})}>
                {dragging.current ? (
                  <FastAnimation />
                ) : (
                  <SlowAnimationVerifier />
                )}

                <input {...getInputProps()} />
                <img className={styles.importIcon} src={icon} alt="" />

                {!dragging.current && (
                  <Fragment>
                    <span className={styles.signText}>Verify Your Files</span>
                    <span className={styles.dragDropText}>drag & drop</span>
                    <span className={styles.browseFilesText}>
                      or click / tap to browse your files
                    </span>
                  </Fragment>
                )}
              </div>
            )}
          </Dropzone>
        </div>

        {files.length === 0 && <FilesEmpty />}
        {files.length > 0 && (
          <VerifiedFiles
            files={files}
            zip={zip}
            hashes={signDoc?.hashes || []}
            verified={verified}
            onDelete={handleDeleteFile}
            onDeleteAll={handleDeleteAll}
          />
        )}
      </div>

      <section className={styles.bottomContainer}>
        <div className={styles.bottomSection}>
          {isValidating.current && (
            <span className={styles.verificationLoader} />
          )}

          {!verified && !error && (
            <span className={styles.verificationText}>
              Verification <div></div>
            </span>
          )}

          {error === 'Multiple Sign' && (
            <MultipleSignPopup onDismiss={dismissMultipleSignPopup} />
          )}

          {(error === 'Corrupted' || error === 'Invalid') && (
            <JWSErrors error={error} />
          )}

          {verified && <DidDocument signDoc={signDoc} />}

          {verified && (
            <button
              className={styles.startOverButton}
              onClick={handleDeleteAll}
            />
          )}
        </div>
      </section>
    </main>
  );
}
