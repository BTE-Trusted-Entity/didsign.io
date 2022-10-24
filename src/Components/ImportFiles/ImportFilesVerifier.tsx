import Dropzone from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';
import { base16 } from 'multiformats/bases/base16';

import * as styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import { useFiles } from '../Files/Files';
import {
  getFileNames,
  getVerifiedData,
  handleFilesFromZip,
  isDidSignFile,
  unzipFileEntries,
} from '../../Utils/verify-helper';
import { useVerifiedSignature } from '../VerifiedSignature/VerifiedSignature';
import { createHash, createHashFromHashArray } from '../../Utils/sign-helpers';
import {
  IRemark,
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
import { useSignature } from '../Signature/Signature';
import { DidDocument } from '../DidDocument/DidDocument';

interface JWSState {
  jws: string;
  jwsStatus: JWSStatus;
  jwsHashes: string[];
}

const initialJwsState: JWSState = {
  jws: '',
  jwsStatus: 'Not Checked',
  jwsHashes: [],
};

export const ImportFilesVerifier = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);

  const [jwsState, setJwsState] = useState(initialJwsState);
  const { jws, jwsStatus, jwsHashes } = jwsState;
  const clearJWS = useCallback(() => setJwsState(initialJwsState), []);
  const setJwsStatus = useCallback(
    (status: JWSStatus) =>
      setJwsState((old) => ({ ...old, jwsStatus: status })),
    [],
  );
  const handleFileDelete = useCallback(
    () => setJwsStatus('Not Checked'),
    [setJwsStatus],
  );

  const { files, setFiles, setZip } = useFiles();
  const {
    filesStatus: statuses,
    clearEndpoint,
    setVerifiedSignature,
  } = useVerifiedSignature();
  const [remark, setRemark] = useState<IRemark>();
  const [credentials, setCredentials] = useState<NamedCredential[]>();
  const { setSignature } = useSignature();

  useConnect();

  //allows navigation prevented by time stamping
  usePreventNavigation(false);

  useEffect(() => {
    setFiles([]);
    setZip();
    setSignature({});
  }, [setFiles, setSignature, setZip]);

  const showMultipleSignPopup = useCallback(() => {
    setImportIcon(ImportIcon);
    setJwsStatus('Multiple Sign');
  }, [setJwsStatus]);

  const dismissMultipleSignPopup = useCallback(() => {
    clearEndpoint();
    setJwsStatus('Not Checked');
  }, [clearEndpoint, setJwsStatus]);

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
          filesStatus: [
            ...old.filesStatus,
            ...verifiedSignatureContents.filesStatus,
          ],
        }));
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
        setVerifiedSignature((old) => ({
          ...old,
          filesStatus: [...old.filesStatus, true],
        }));
      } else {
        setVerifiedSignature((old) => ({
          ...old,
          filesStatus: [...old.filesStatus, false],
        }));
      }
      setFiles((files) => [...files, { file, buffer, name, hash }]);
    },
    [setFiles, setJwsStatus, setVerifiedSignature],
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
    if (jwsHashes.length) {
      files.forEach(({ hash }, index) => {
        if (jwsHashes.includes(hash)) {
          setVerifiedSignature((old) => {
            const filesStatus = [...old.filesStatus];
            filesStatus[index] = true;
            return { ...old, filesStatus };
          });
        } else {
          if (hash !== '') {
            setJwsStatus('Invalid');
          }
        }
      });
    }
  }, [
    files,
    jwsHashes,
    jwsStatus,
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
        filesStatus: statuses,
        credentials,
        endpoints: [...old.endpoints, ...verifiedSignatureInstance.endpoints],
      }));
    } else {
      setJwsStatus('Invalid');
    }
  }, [credentials, jws, remark, setJwsStatus, setVerifiedSignature, statuses]);

  useEffect(() => {
    if (jwsStatus === 'Not Checked') {
      if (statuses && statuses.length > 1) {
        if (!statuses.includes(false)) {
          fetchDidDocument();
        } else {
          clearEndpoint();
        }
      }
    }
  }, [statuses, jwsStatus, fetchDidDocument, clearEndpoint]);

  const handleDelete = () => {
    setSignature({});
    setFiles([]);
    setZip();
    clearEndpoint();
    clearJWS();
    setVerifiedSignature((old) => ({ ...old, filesStatus: [] }));
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
            jwsStatus={jwsStatus}
            clearJWS={clearJWS}
            onDelete={handleFileDelete}
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

          <DidDocument jwsStatus={jwsStatus} />

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
