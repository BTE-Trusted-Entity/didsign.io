import Dropzone from 'react-dropzone';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { without } from 'lodash-es';

// disabling until https://github.com/import-js/eslint-plugin-import/issues/2352 is fixed
// eslint-disable-next-line import/no-unresolved
import { base16 } from 'multiformats/bases/base16';

import * as styles from '../../components/Layout/Layout.module.css';

import ImportIcon from '../../images/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../images/iconBIG_import_release.svg';
import { FileEntry } from '../../components/Files/Files';
import {
  getFileNames,
  getVerifiedData,
  handleFilesFromZip,
  isDidSignFile,
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
  endpoints: [],
  w3name: '',
  txHash: '',
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
        setFiles((oldFiles) =>
          oldFiles.map((old) => ({ ...old, verified: false })),
        );
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
        setVerifiedSignature((old) => ({
          ...verifiedSignatureContents,
          endpoints: [...old.endpoints, ...verifiedSignatureContents.endpoints],
        }));
        setFiles(verifiedSignatureContents.files);
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

      const isDidSign = isDidSignFile(file);
      const hash = isDidSign ? '' : await createHash(buffer);
      const verified = isDidSign;

      if (isDidSign) {
        const decoder = new TextDecoder('utf-8');
        const result = decoder.decode(buffer);
        const { jws, hashes, remark, credentials } = JSON.parse(
          result,
        ) as SignDoc;

        if (remark) setRemark(remark);

        if (credentials) setCredentials(credentials);

        const hashesWithPrefix = hashes.map((hash) => addMissingPrefix(hash));
        const baseHash = await createHashFromHashArray(hashesWithPrefix);
        const hashFromJWS: string = JSON.parse(atob(jws.split('.')[1])).hash;
        if (baseHash !== addMissingPrefix(hashFromJWS)) {
          setJwsStatus('Corrupted');
        }

        setJwsState((old) => ({
          ...old,
          jws,
          jwsHashes: [...old.jwsHashes, ...hashesWithPrefix],
        }));
      }
      setFiles((files) => [...files, { file, buffer, name, hash, verified }]);
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
    if (jwsHashes.length <= 0) {
      return;
    }

    let needUpdate = false;
    const newFiles = files.map((file) => {
      if (file.hash !== '' && !jwsHashes.includes(file.hash)) {
        setJwsStatus('Invalid');
        return file;
      }
      if (file.verified) {
        return file;
      }
      needUpdate = true;
      return { ...file, verified: true };
    });
    if (needUpdate) {
      setFiles(newFiles);
    }
  }, [
    files,
    jwsHashes,
    jwsStatus,
    setFiles,
    setJwsState,
    setJwsStatus,
    setVerifiedSignature,
  ]);

  const fetchDidDocument = useCallback(async () => {
    setJwsStatus('Validating');

    const verifiedSignatureInstance = await getVerifiedData(jws, remark);
    if (!verifiedSignatureInstance) {
      setJwsStatus('Invalid');
      return;
    }

    setJwsStatus('Verified');
    setVerifiedSignature((old) => ({
      ...verifiedSignatureInstance,
      credentials,
      endpoints: [...old.endpoints, ...verifiedSignatureInstance.endpoints],
    }));
  }, [credentials, jws, remark, setJwsStatus, setVerifiedSignature]);

  useEffect(() => {
    if (jwsStatus !== 'Not Checked') {
      return;
    }
    const statuses = files
      .map(({ verified }) => verified)
      .filter((value) => typeof value === 'boolean');
    if (statuses && statuses.length > 1) {
      if (!statuses.includes(false)) {
        fetchDidDocument();
      } else {
        clearVerifiedSignature();
      }
    }
  }, [files, jwsStatus, fetchDidDocument, clearVerifiedSignature]);

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
