import Dropzone from 'react-dropzone';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { without } from 'lodash-es';

import * as styles from '../../components/Layout/Layout.module.css';

import ImportIcon from '../../images/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../images/iconBIG_import_release.svg';
import { FileEntry } from '../../components/Files/Files';
import {
  getFileNames,
  getVerifiedData,
  handleFilesFromZip,
  hasUnverified,
  isDidSignFile,
  parseJWS,
  unzipFileEntries,
} from '../../utils/verify-helper';
import { createHash, createHashFromHashArray } from '../../utils/sign-helpers';
import {
  IRemark,
  IVerifiedSignatureContents,
  JWSStatus,
  NamedCredential,
  SignDoc,
} from '../../utils/types';
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

interface JWSState {
  jws: string;
  jwsStatus: JWSStatus;
  jwsHashes: string[];
}

const initialJws: JWSState = {
  jws: '',
  jwsStatus: 'Not Checked',
  jwsHashes: [],
};

const initialVerifiedSignature: IVerifiedSignatureContents = {
  signature: '',
  did: undefined,
  credentials: [],
};

function addMissingPrefix(hash: string): string {
  return hash.startsWith(base16.prefix) ? hash : `${base16.prefix}${hash}`;
}

export function Verify() {
  const dragging = useBooleanState();
  const icon = dragging.current ? ReleaseIcon : ImportIcon;

  const [jwsState, setJwsState] = useState(initialJws);
  const { jws, jwsStatus, jwsHashes } = jwsState;
  const clearJWS = useCallback(() => setJwsState(initialJws), []);
  const setJwsStatus = useCallback(
    (status: JWSStatus) =>
      setJwsState((old) => ({ ...old, jwsStatus: status })),
    [],
  );

  const [zip, setZip] = useState<string>();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [remark, setRemark] = useState<IRemark>();
  const [credentials, setCredentials] = useState<NamedCredential[]>();

  const [verifiedSignature, setVerifiedSignature] = useState(
    initialVerifiedSignature,
  );
  const clearVerifiedSignature = useCallback(
    () => setVerifiedSignature(initialVerifiedSignature),
    [],
  );

  useConnect();

  //allows navigation prevented by time stamping
  usePreventNavigation(false);

  const handleDeleteFile = useCallback(
    (index: number) => {
      if (jwsStatus === 'Validating') return;

      const file = files[index];
      setFiles((files) => without(files, file));

      const didSignFileDeleted = isDidSignFile(file);
      if (didSignFileDeleted) {
        clearJWS();
      }

      if (jwsStatus !== 'Corrupted') {
        setJwsStatus('Not Checked');
      }

      clearVerifiedSignature();
    },
    [
      clearJWS,
      clearVerifiedSignature,
      files,
      jwsStatus,
      setFiles,
      setJwsStatus,
    ],
  );

  const handleDeleteAll = useCallback(() => {
    if (jwsStatus === 'Validating') {
      return;
    }

    clearVerifiedSignature();
    setFiles([]);
    setZip(undefined);
    clearJWS();
  }, [clearJWS, clearVerifiedSignature, jwsStatus, setFiles, setZip]);

  const dismissMultipleSignPopup = useCallback(() => {
    clearVerifiedSignature();
    setJwsStatus('Not Checked');
  }, [clearVerifiedSignature, setJwsStatus]);

  const handleZipCase = useCallback(
    async (file: File) => {
      setJwsStatus('Validating');

      setZip(file.name);

      const newFiles = await unzipFileEntries(file);
      setFiles(newFiles);
      const verifiedSignatureContents = await handleFilesFromZip(newFiles);

      if (verifiedSignatureContents) {
        setJwsStatus('Verified');
        setVerifiedSignature(verifiedSignatureContents);
      } else {
        setJwsStatus('Invalid');
      }
      return;
    },
    [setFiles, setJwsStatus, setVerifiedSignature, setZip],
  );

  const handleIndividualCase = useCallback(
    async (file: File) => {
      const { name } = file;
      const buffer = await file.arrayBuffer();
      const hash = await createHash(buffer);

      if (isDidSignFile(file)) {
        const { jws, hashes, remark, credentials } = JSON.parse(
          await file.text(),
        ) as SignDoc;

        if (remark) setRemark(remark);
        if (credentials) setCredentials(credentials);

        const hashesWithPrefix = hashes.map(addMissingPrefix);
        const baseHash = await createHashFromHashArray(hashesWithPrefix);
        const jwsBaseHash = parseJWS(jws).payload.hash;
        if (baseHash !== jwsBaseHash) {
          setJwsStatus('Corrupted');
        }

        setJwsState((old) => ({
          ...old,
          jws,
          jwsHashes: [...old.jwsHashes, ...hashesWithPrefix],
        }));
      }

      setFiles((files) => [...files, { file, buffer, name, hash }]);
    },
    [setFiles, setJwsStatus],
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      dragging.off();

      if (files.some(isDidSignFile) && acceptedFiles.some(isDidSignFile)) {
        setJwsStatus('Multiple Sign');
        return;
      }

      const signatureFilesCount = acceptedFiles.filter(isDidSignFile).length;
      if (signatureFilesCount > 1) {
        setJwsStatus('Multiple Sign');
        return;
      }

      acceptedFiles.forEach(async (file: File) => {
        if (files.length === 0) {
          setJwsStatus('Not Checked');
        }

        if (file.name.endsWith('.zip')) {
          const filenames = await getFileNames(file);
          const didSignFile = filenames.find((name) => isDidSignFile({ name }));

          if (didSignFile && acceptedFiles.length > 1) {
            return;
          }

          if (didSignFile) {
            if (files.length === 0) {
              await handleZipCase(file);
            }
            return;
          }
        }
        await handleIndividualCase(file);
      });
    },
    [dragging, files, handleIndividualCase, handleZipCase, setJwsStatus],
  );

  useEffect(() => {
    if (jwsHashes.length !== 0 && hasUnverified(files, jwsHashes)) {
      setJwsStatus('Invalid');
    }
  }, [files, jwsHashes, setJwsStatus]);

  const fetchDidDocument = useCallback(async () => {
    setJwsStatus('Validating');

    const verifiedSignatureInstance = await getVerifiedData(jws);
    if (!verifiedSignatureInstance) {
      setJwsStatus('Invalid');
      return;
    }

    setJwsStatus('Verified');
    setVerifiedSignature({
      ...verifiedSignatureInstance,
      credentials,
    });
  }, [credentials, jws, setJwsStatus, setVerifiedSignature]);

  useEffect(() => {
    if (jwsStatus !== 'Not Checked') {
      return;
    }
    if (hasUnverified(files, jwsHashes)) {
      clearVerifiedSignature();
    }
    if (false) {
      fetchDidDocument();
    }
  }, [files, jwsStatus, fetchDidDocument, clearVerifiedSignature, jwsHashes]);

  return (
    <main className={styles.main}>
      <Navigation />
      <div className={styles.middleSection}>
        <div className={styles.container}>
          {jwsStatus === 'Multiple Sign' && (
            <MultipleSignPopup onDismiss={dismissMultipleSignPopup} />
          )}

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
            hashes={jwsHashes}
            onDelete={handleDeleteFile}
            onDeleteAll={handleDeleteAll}
          />
        )}
      </div>

      <section className={styles.bottomContainer}>
        <div className={styles.bottomSection}>
          {jwsStatus === 'Validating' && (
            <span className={styles.verificationLoader} />
          )}

          {jwsStatus === 'Not Checked' && (
            <span className={styles.verificationText}>
              Verification <div></div>
            </span>
          )}

          <DidDocument
            jwsStatus={jwsStatus}
            verifiedSignature={verifiedSignature}
            remark={remark}
          />

          {jwsStatus === 'Verified' && (
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
