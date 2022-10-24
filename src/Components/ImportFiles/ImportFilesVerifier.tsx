import Dropzone from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';
import { base16 } from 'multiformats/bases/base16';
import * as zip from '@zip.js/zip.js';

import * as styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import { useFiles } from '../Files/Files';
import {
  getFileNames,
  getVerifiedData,
  handleFilesFromZip,
  isDidSignFile,
} from '../../Utils/verify-helper';
import { useVerifiedSignature } from '../VerifiedSignature/VerifiedSignature';
import { createHash, createHashFromHashArray } from '../../Utils/sign-helpers';
import { IRemark, NamedCredential, SignDoc } from '../../Utils/types';
import { useJWS } from '../JWS/JWS';
import { useHashes } from '../Hashes/Hashes';
import { FastAnimation, SlowAnimationVerifier } from '../Animation/Animation';
import { MultipleSignPopup, useShowPopup } from '../Popups/Popups';

import { useConnect } from '../../Hooks/useConnect';

export const ImportFilesVerifier = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);
  const { hashes, set: setHashes } = useHashes();
  const {
    hashArray: jwsHash,
    sign: jws,
    signStatus: jwsStatus,
    setJWS,
  } = useJWS();
  const { files, setFiles, setZip } = useFiles();
  const {
    filesStatus: statuses,
    clearEndpoint,
    setVerifiedSignature,
  } = useVerifiedSignature();
  const [remark, setRemark] = useState<IRemark>();
  const [credentials, setCredentials] = useState<NamedCredential[]>();
  const showPopup = useShowPopup().set;

  useConnect();

  const showMultipleSignPopup = useCallback(() => {
    setImportIcon(ImportIcon);
    setJWS((old) => ({ ...old, signStatus: 'Multiple Sign' }));
    showPopup(true);
  }, [setJWS, showPopup]);

  const filesArrayHasDidSign = (files: File[]) =>
    files.some((file) => isDidSignFile(file.name));

  const handleZipCase = useCallback(
    async (file: File) => {
      setJWS((old) => ({ ...old, signStatus: 'Validating' }));

      setZip(file.name);

      const reader = new zip.ZipReader(new zip.BlobReader(file));
      const entries = await reader.getEntries();
      const newFiles = await Promise.all(
        entries.map(async (entry) => {
          if (!entry.getData) throw new Error('Impossible: no entry.getData');
          const buffer = await entry.getData(new zip.Uint8ArrayWriter());
          const name = entry.filename;
          const file = new File([buffer], name);
          return { file, buffer, name };
        }),
      );
      setFiles(newFiles);
      await reader.close();

      const verifiedSignatureContents = await handleFilesFromZip(newFiles);

      if (verifiedSignatureContents) {
        setJWS((old) => ({ ...old, signStatus: 'Verified' }));
        setVerifiedSignature((old) => ({
          ...verifiedSignatureContents,
          endpoints: [...old.endpoints, ...verifiedSignatureContents.endpoints],
          filesStatus: [
            ...old.filesStatus,
            ...verifiedSignatureContents.filesStatus,
          ],
        }));
      } else {
        setJWS((old) => ({ ...old, signStatus: 'Invalid' }));
      }
      return;
    },
    [setFiles, setJWS, setVerifiedSignature, setZip],
  );

  const handleIndividualCase = useCallback(
    async (file: File) => {
      const buffer = await file.arrayBuffer();

      if (isDidSignFile(file.name)) {
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
          setJWS((old) => ({ ...old, signStatus: 'Corrupted' }));
        }

        setJWS((old) => ({
          ...old,
          hashArray: [...old.hashArray, ...hashesWithPrefix],
          sign: jws,
        }));
        setVerifiedSignature((old) => ({
          ...old,
          filesStatus: [...old.filesStatus, true],
        }));
        setHashes([...hashes, '']);
      } else {
        const hash = await createHash(buffer);
        setHashes([...hashes, hash]);
        setVerifiedSignature((old) => ({
          ...old,
          filesStatus: [...old.filesStatus, false],
        }));
      }
      setFiles((files) => [...files, { file, buffer, name: file.name }]);
    },
    [hashes, setFiles, setHashes, setJWS, setVerifiedSignature],
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
          setJWS((old) => ({ ...old, signStatus: 'Not Checked' }));
        }

        if (file.name.split('.').pop() === 'zip') {
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
    [files, handleIndividualCase, handleZipCase, setJWS, showMultipleSignPopup],
  );
  useEffect(() => {
    if (jwsHash.length) {
      hashes.forEach((hash, index) => {
        if (jwsHash.includes(hash)) {
          setVerifiedSignature((old) => {
            const filesStatus = [...old.filesStatus];
            filesStatus[index] = true;
            return { ...old, filesStatus };
          });
        } else {
          if (hash !== '') {
            setJWS((old) => ({ ...old, signStatus: 'Invalid' }));
          }
        }
      });
    }
  }, [hashes, jwsHash, jwsStatus, setJWS, setVerifiedSignature]);

  const fetchDidDocument = useCallback(async () => {
    setJWS((old) => ({ ...old, signStatus: 'Validating' }));
    const verifiedSignatureInstance = await getVerifiedData(jws, remark);
    if (verifiedSignatureInstance) {
      setJWS((old) => ({ ...old, signStatus: 'Verified' }));
      setVerifiedSignature((old) => ({
        ...verifiedSignatureInstance,
        filesStatus: statuses,
        credentials,
        endpoints: [...old.endpoints, ...verifiedSignatureInstance.endpoints],
      }));
    } else {
      setJWS((old) => ({ ...old, signStatus: 'Invalid' }));
    }
  }, [credentials, jws, remark, setJWS, setVerifiedSignature, statuses]);

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
  return (
    <div className={styles.container}>
      {jwsStatus === 'Multiple Sign' && <MultipleSignPopup />}

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
  );
};
