import Dropzone from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';
import { base16 } from 'multiformats/bases/base16';
import { without } from 'lodash-es';

import * as styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import { FileEntry } from '../Files/Files';
import {
  getFileNames,
  getVerifiedData,
  handleFilesFromZip,
  isDidSignFile,
  unzipFileEntries,
} from '../../Utils/verify-helper';
import { createHash, createHashFromHashArray } from '../../Utils/sign-helpers';
import {
  IRemark,
  IVerifiedSignatureContents,
  JWSStatus,
  NamedCredential,
  SignDoc,
} from '../../Utils/types';
import { FastAnimation, SlowAnimationVerifier } from '../Animation/Animation';
import { MultipleSignPopup } from '../Popups/Popups';

import { useConnect } from '../../Hooks/useConnect';
import { Navigation } from '../Navigation/Navigation';
import { FilesEmpty } from '../FilesEmpty/FilesEmpty';
import { FilesVerifier } from '../FilesVerifier/FilesVerifier';
import { usePreventNavigation } from '../../Hooks/usePreventNavigation';
import { DidDocument } from '../DidDocument/DidDocument';

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

export const ImportFilesVerifier = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);

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

  const [verifiedSignature, setVerifiedSignature] =
    useState<IVerifiedSignatureContents>(initialVerifiedSignature);
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
      const didSignFileDeleted = isDidSignFile(file.name);
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
      setFiles((files) => without(files, file));
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

  const showMultipleSignPopup = useCallback(() => {
    setImportIcon(ImportIcon);
    setJwsStatus('Multiple Sign');
  }, [setJwsStatus]);

  const dismissMultipleSignPopup = useCallback(() => {
    clearVerifiedSignature();
    setJwsStatus('Not Checked');
  }, [clearVerifiedSignature, setJwsStatus]);

  const filesArrayHasDidSign = (files: File[]) =>
    files.some((file) => isDidSignFile(file.name));

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

      const isDidSign = isDidSignFile(name);
      // TODO: can we still hash it?
      const hash = isDidSign ? '' : await createHash(buffer);
      const verified = isDidSign;

      if (isDidSign) {
        const addMissingPrefix = (hash: string): string =>
          hash.startsWith(base16.prefix) ? hash : `${base16.prefix}${hash}`;

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
      const filesArray = files.map(({ file }) => file);
      if (
        filesArrayHasDidSign(filesArray) &&
        filesArrayHasDidSign(acceptedFiles)
      ) {
        showMultipleSignPopup();
        return;
      }
      const signatureFiles = acceptedFiles.filter((file) =>
        isDidSignFile(file.name),
      );
      if (signatureFiles.length > 1) {
        showMultipleSignPopup();
        return;
      }
      acceptedFiles.forEach(async (file: File) => {
        setImportIcon(ImportIcon);
        if (files.length === 0) {
          setJwsStatus('Not Checked');
        }

        if (file.name.endsWith('.zip')) {
          const filenames = await getFileNames(file);
          const didSignFile = filenames.find(isDidSignFile);

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
    [
      files,
      handleIndividualCase,
      handleZipCase,
      setJwsStatus,
      showMultipleSignPopup,
    ],
  );
  useEffect(() => {
    if (jwsHashes.length > 0) {
      files.forEach((file) => {
        if (jwsHashes.includes(file.hash)) {
          setFiles((oldFiles) =>
            oldFiles.map((oldFile) =>
              oldFile !== file ? oldFile : { ...file, verified: true },
            ),
          );
        } else {
          if (file.hash !== '') {
            setJwsStatus('Invalid');
          }
        }
      });
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
    if (verifiedSignatureInstance) {
      setJwsStatus('Verified');
      setVerifiedSignature((old) => ({
        ...verifiedSignatureInstance,
        credentials,
        endpoints: [...old.endpoints, ...verifiedSignatureInstance.endpoints],
      }));
    } else {
      setJwsStatus('Invalid');
    }
  }, [credentials, jws, remark, setJwsStatus, setVerifiedSignature]);

  useEffect(() => {
    const statuses = files
      .map(({ verified }) => verified)
      .filter((value) => typeof value === 'boolean');
    if (jwsStatus === 'Not Checked') {
      if (statuses && statuses.length > 1) {
        if (!statuses.includes(false)) {
          fetchDidDocument();
        } else {
          clearVerifiedSignature();
        }
      }
    }
  }, [files, jwsStatus, fetchDidDocument, clearVerifiedSignature]);

  const handleDelete = () => {
    setFiles([]);
    setZip(undefined);
    clearVerifiedSignature();
    clearJWS();
  };

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
            onDragLeave={() => setImportIcon(ImportIcon)}
            onDragEnter={() => setImportIcon(ReleaseIcon)}
          >
            {({ getRootProps, getInputProps }) => (
              <div className={styles.dropContainer} {...getRootProps({})}>
                {impIcon == ImportIcon ? (
                  <SlowAnimationVerifier />
                ) : (
                  <FastAnimation />
                )}

                <input {...getInputProps()} />
                <img className={styles.importIcon} src={impIcon} />
                {impIcon === ImportIcon && (
                  <span className={styles.signText}>Verify Your Files</span>
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
        </div>

        {files.length === 0 && <FilesEmpty />}
        {files.length > 0 && (
          <FilesVerifier
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
              className={styles.startOverBtn}
              onClick={() => handleDelete()}
            />
          )}
        </div>
      </section>
    </main>
  );
};
