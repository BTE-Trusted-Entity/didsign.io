import Dropzone from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';
import { base16 } from 'multiformats/bases/base16';
import * as zip from '@zip.js/zip.js';

import * as styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import { useFiles } from '../Files/Files';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getFileNames,
  getVerifiedData,
  handleFilesFromZip,
  isDidSignFile,
} from '../../Utils/verify-helper';
import {
  clearEndpoint,
  fileStatus,
  update,
  updateAllFilesStatus,
  updateIndividualFileStatus,
  updateIndividualFileStatusOnIndex,
} from '../../Features/Signer/VerifiedSignatureSlice';
import { createHash, createHashFromHashArray } from '../../Utils/sign-helpers';
import { IRemark, NamedCredential, SignDoc } from '../../Utils/types';
import {
  addJwsHashArray,
  addJwsSign,
  selectJwsHash,
  selectJwsSign,
  selectJwsSignStatus,
  updateSignStatus,
} from '../../Features/Signer/VerifyJwsSlice';
import { useHashes } from '../Hashes/Hashes';
import { FastAnimation, SlowAnimationVerifier } from '../Animation/Animation';
import { MultipleSignPopup, useShowPopup } from '../Popups/Popups';

import { useConnect } from '../../Hooks/useConnect';

export const ImportFilesVerifier = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);
  const { hashes, set: setHashes } = useHashes();
  const jwsHash = useAppSelector(selectJwsHash);
  const jws = useAppSelector(selectJwsSign);
  const jwsStatus = useAppSelector(selectJwsSignStatus);
  const { files, setFiles, setZip } = useFiles();
  const statuses = useAppSelector(fileStatus);
  const [remark, setRemark] = useState<IRemark>();
  const [credentials, setCredentials] = useState<NamedCredential[]>();
  const showPopup = useShowPopup().set;

  useConnect();

  const dispatch = useAppDispatch();

  const showMultipleSignPopup = useCallback(() => {
    setImportIcon(ImportIcon);
    dispatch(updateSignStatus('Multiple Sign'));
    showPopup(true);
  }, [dispatch, showPopup]);

  const filesArrayHasDidSign = (files: File[]) =>
    files.some((file) => isDidSignFile(file.name));

  const handleZipCase = useCallback(
    async (file: File) => {
      dispatch(updateSignStatus('Validating'));

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
        dispatch(updateSignStatus('Verified'));
        dispatch(update(verifiedSignatureContents));
        dispatch(updateAllFilesStatus(verifiedSignatureContents.filesStatus));
      } else {
        dispatch(updateSignStatus('Invalid'));
      }
      return;
    },
    [dispatch, setFiles, setZip],
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
          dispatch(updateSignStatus('Corrupted'));
        }
        dispatch(addJwsSign(jws));
        dispatch(addJwsHashArray(hashesWithPrefix));
        dispatch(updateIndividualFileStatus(true));
        setHashes([...hashes, '']);
      } else {
        const hash = await createHash(buffer);
        setHashes([...hashes, hash]);
        dispatch(updateIndividualFileStatus(false));
      }
      setFiles((files) => [...files, { file, buffer, name: file.name }]);
    },
    [dispatch, hashes, setFiles, setHashes],
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
          dispatch(updateSignStatus('Not Checked'));
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
    [
      dispatch,
      files,
      handleIndividualCase,
      handleZipCase,
      showMultipleSignPopup,
    ],
  );
  useEffect(() => {
    if (jwsHash.length) {
      hashes.filter(async (hash, index) => {
        if (jwsHash.includes(hash)) {
          dispatch(updateIndividualFileStatusOnIndex(index));
        } else {
          if (hash !== '') {
            dispatch(updateSignStatus('Invalid'));
          }
          return;
        }
      });
    }
  }, [dispatch, hashes, jwsHash, jwsStatus]);

  const fetchDidDocument = useCallback(async () => {
    dispatch(updateSignStatus('Validating'));
    const verifiedSignatureInstance = await getVerifiedData(jws, remark);
    if (verifiedSignatureInstance) {
      dispatch(updateSignStatus('Verified'));
      dispatch(
        update({
          ...verifiedSignatureInstance,
          filesStatus: statuses,
          credentials,
        }),
      );
    } else {
      dispatch(updateSignStatus('Invalid'));
    }
  }, [credentials, dispatch, jws, remark, statuses]);

  useEffect(() => {
    if (jwsStatus === 'Not Checked') {
      if (statuses && statuses.length > 1) {
        if (!statuses.includes(false)) {
          fetchDidDocument();
        } else {
          dispatch(clearEndpoint());
        }
      }
    }
  }, [statuses, jwsStatus, dispatch, fetchDidDocument]);
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
