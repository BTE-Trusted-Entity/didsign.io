import Dropzone from 'react-dropzone';
import React, { useCallback, useEffect, useState } from 'react';
import { base16 } from 'multiformats/bases/base16';

import styles from './ImportFiles.module.css';

import ImportIcon from '../../ImageAssets/iconBIG_import_NEW.svg';
import ReleaseIcon from '../../ImageAssets/iconBIG_import_release.svg';
import {
  addFile,
  addFileName,
  selectFiles,
  selectFilenames,
} from '../../Features/Signer/FileSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getFileNames,
  getVerifiedData,
  isDidSignFile,
  newUnzip,
} from '../../Utils/verify-helper';
import {
  clearEndpoint,
  fileStatus,
  update,
  updateAllFilesStatus,
  updateIndividualFileStatus,
  updateIndividualFileStatusOnIndex,
} from '../../Features/Signer/EndpointSlice';
import { createHash, createHashFromHashArray } from '../../Utils/sign-helpers';
import { IRemark, SignDoc } from '../../Utils/types';
import {
  addJwsHashArray,
  addJwsSign,
  selectJwsHash,
  selectJwsSign,
  selectJwsSignStatus,
  updateSignStatus,
} from '../../Features/Signer/VerifyJwsSlice';
import { addHash, selectHash } from '../../Features/Signer/hashSlice';
import {
  FastAnimation,
  SlowAnimationVerifier,
} from '../AnimationViews/Animations';
import { showPopup } from '../../Features/Signer/PopupSlice';
import { MultipleSignPopup } from '../Popups/Popups';

import { useConnect } from '../../Hooks/useConnect';

export const ImportFilesVerifier = () => {
  const [impIcon, setImportIcon] = useState<string>(ImportIcon);
  const fileHash = useAppSelector(selectHash);
  const jwsHash = useAppSelector(selectJwsHash);
  const jws = useAppSelector(selectJwsSign);
  const jwsStatus = useAppSelector(selectJwsSignStatus);
  const savedZippedFilenames = useAppSelector(selectFilenames);
  const files = useAppSelector(selectFiles);
  const statuses = useAppSelector(fileStatus);
  const [remark, setRemark] = useState<IRemark>();
  useConnect();

  const dispatch = useAppDispatch();

  const showMultipleSignPopup = useCallback(() => {
    setImportIcon(ImportIcon);
    dispatch(updateSignStatus('Multiple Sign'));
    dispatch(showPopup(true));
  }, [dispatch]);

  const filesArrayHasDidSign = (files: File[]) =>
    files.some((file) => isDidSignFile(file.name));

  const handleZipCase = useCallback(
    async (file: File) => {
      dispatch(updateSignStatus('Validating'));

      const signatureStatus = await newUnzip(file);
      if (signatureStatus) {
        dispatch(updateSignStatus('Verified'));
        dispatch(update(signatureStatus.signatureWithEndpoint));
        dispatch(updateAllFilesStatus(signatureStatus.fileStatus));
      } else {
        dispatch(updateSignStatus('Invalid'));
      }
      return;
    },
    [dispatch],
  );

  const handleIndividualCase = useCallback(
    async (file: File) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async function () {
        if (typeof reader.result === 'string')
          throw new Error(
            'Verification: type of reader result should be arraybuffer',
          );

        if (isDidSignFile(file.name)) {
          const addMissingPrefix = (hash: string): string =>
            hash.startsWith(base16.prefix) ? hash : `${base16.prefix}${hash}`;

          const decoder = new TextDecoder('utf-8');
          const result = decoder.decode(reader.result as ArrayBuffer);
          const { jws, hashes, remark } = JSON.parse(result) as SignDoc;
          if (remark) setRemark(remark);
          const hashesWithPrefix = hashes.map((hash) => addMissingPrefix(hash));
          const baseHash = await createHashFromHashArray(hashesWithPrefix);
          const hashFromJWS: string = JSON.parse(atob(jws.split('.')[1])).hash;
          if (baseHash !== addMissingPrefix(hashFromJWS)) {
            dispatch(updateSignStatus('Corrupted'));
          }
          dispatch(addJwsSign(jws));
          dispatch(addJwsHashArray(hashesWithPrefix));
          dispatch(updateIndividualFileStatus(true));
          dispatch(addHash(''));
        } else {
          const hash = await createHash(reader.result);
          dispatch(addHash(hash));
          dispatch(updateIndividualFileStatus(false));
        }
        dispatch(addFile(file));
      };
    },
    [dispatch],
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (filesArrayHasDidSign(files) && filesArrayHasDidSign(acceptedFiles)) {
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
          const didSignFile = filenames.filter((file: string) =>
            isDidSignFile(file),
          );
          if (didSignFile.length && acceptedFiles.length > 1) {
            return;
          }
          if (
            savedZippedFilenames.filter((file) => isDidSignFile(file))
              .length === 1 &&
            didSignFile.length === 1
          ) {
            showMultipleSignPopup();
            return;
          }

          if (didSignFile.length === 1) {
            if (files.length > 0) {
              return;
            }
            dispatch(addFile(file));
            dispatch(addFileName(filenames));
            await handleZipCase(file);
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
      savedZippedFilenames,
      showMultipleSignPopup,
    ],
  );
  useEffect(() => {
    if (jwsHash.length) {
      fileHash.filter(async (hash, index) => {
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
  }, [dispatch, fileHash, jwsHash, jwsStatus]);

  const fetchEndpoints = useCallback(async () => {
    dispatch(updateSignStatus('Validating'));
    const verifiedSignatureInstance = await getVerifiedData(jws, remark);
    if (verifiedSignatureInstance) {
      dispatch(updateSignStatus('Verified'));
      dispatch(update(verifiedSignatureInstance));
    } else {
      dispatch(updateSignStatus('Invalid'));
    }
  }, [dispatch, jws, remark]);

  useEffect(() => {
    if (jwsStatus === 'Not Checked') {
      if (statuses.length > 1) {
        if (!statuses.includes(false)) {
          fetchEndpoints();
        } else {
          dispatch(clearEndpoint());
        }
      }
    }
  }, [statuses, jwsStatus, fetchEndpoints, dispatch]);
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
    </div>
  );
};
