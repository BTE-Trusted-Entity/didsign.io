import React, { Fragment, useCallback, useState } from 'react';

import classnames from 'classnames';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import styles from './CredentialsInsertion.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCredentials,
  updateCredentials,
} from '../../Features/Signer/SignatureSlice';
import { CredentialInteface } from '../../Utils/types';
import {
  IBuffer,
  selectBuffers,
  updateBufferTop,
  updateFileTop,
} from '../../Features/Signer/FileSlice';
import { DeleteCredential } from '../Popups/Popups';
import { showPopup } from '../../Features/Signer/PopupSlice';

interface Props {
  credentials: CredentialInteface[];
  rowIndex: number;
}
interface Edit {
  error?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  credentialName: string;
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function ShowEditing({
  onBlur,
  onChange,
  onKeyPress,
  onDelete,
  error,
  credentialName,
}: Edit) {
  return (
    <Fragment>
      <div className={styles.inputContainer}>
        <input
          type="text"
          aria-label="input credential name"
          className={styles.input}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          defaultValue={credentialName}
          onChange={onChange}
          autoFocus
        />
        {error && (
          <span className={styles.inputError}>
            Credential name should have 1 to 32 characters
          </span>
        )}
      </div>
      <div className={styles.editContainer}>
        <span className={styles.editingInfo}>rename or delete</span>
        <button
          className={styles.deleteBtn}
          aria-label="delete credential"
          onMouseDown={onDelete}
        />
      </div>
    </Fragment>
  );
}

function ShowContents({ onEditClick, credentialName }: Edit) {
  return (
    <Fragment>
      <span className={styles.name}>{credentialName}</span>
      <div className={styles.editContainer}>
        <button
          className={styles.editBtn}
          aria-label="edit name"
          onClick={onEditClick}
        />
      </div>
    </Fragment>
  );
}

function CredentialRow({ credentials, rowIndex }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const buffers = useAppSelector(selectBuffers);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const targetElement = document.querySelector('body');
  const credentialName = credentials[rowIndex].name;

  const updateSignatureFile = useCallback(
    async (credentials: CredentialInteface[]) => {
      const { buffer } = buffers[0];
      const decoder = new TextDecoder('utf-8');
      const decoded = decoder.decode(buffer);
      const { hashes, jws } = JSON.parse(decoded);
      const updatedSignaturerContents =
        credentials.length !== 0
          ? { hashes, jws, credentials }
          : { hashes, jws };

      const blob = new Blob([JSON.stringify(updatedSignaturerContents)], {
        type: 'application/json;charset=utf-8',
      });

      const newFile = new File([blob], 'signature.didsign');
      const newBufferObj: IBuffer = {
        buffer: await newFile.arrayBuffer(),
        name: newFile.name,
      };

      dispatch(updateBufferTop(newBufferObj));
      dispatch(updateFileTop(newFile));
    },
    [buffers, dispatch],
  );

  const handleChange = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const input = event.currentTarget.value;

      if (input.length < 1 || input.length > 32) {
        setError(true);
        return;
      } else {
        if (error) setError(false);
      }

      const updatedCredentials = credentials.map((credential, index) => {
        if (index === rowIndex) {
          const credentialCopy = { ...credential, name: input };
          return credentialCopy;
        }

        return credential;
      });

      updateSignatureFile(updatedCredentials);
      dispatch(updateCredentials(updatedCredentials));
    },
    [credentials, updateSignatureFile, dispatch, error, rowIndex],
  );

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setIsEditing(false);
    }
  }, []);

  const handleShowPopup = useCallback(() => {
    dispatch(showPopup(true));
    setShowDeletePopup(true);

    if (targetElement !== null) {
      disableBodyScroll(targetElement);
    }
  }, [dispatch, targetElement]);

  const handleDismiss = useCallback(() => {
    if (targetElement !== null) {
      enableBodyScroll(targetElement);
    }

    dispatch(showPopup(false));
    setShowDeletePopup(false);
  }, [dispatch, targetElement]);

  const handleDelete = useCallback(() => {
    const credentialsCopy = [...credentials];
    credentialsCopy.splice(rowIndex, 1);

    dispatch(updateCredentials(credentialsCopy));
    updateSignatureFile(credentialsCopy);
    handleDismiss();
  }, [credentials, dispatch, handleDismiss, rowIndex, updateSignatureFile]);

  const handleBlur = useCallback(() => {
    setError(false);
    setIsEditing(false);
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return (
    <div
      className={classnames({
        [styles.credentialContainer]: true,
        [styles.editing]: isEditing,
        [styles.error]: error,
      })}
    >
      <label className={styles.credentialLabel}>Credential</label>
      {isEditing ? (
        <ShowEditing
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onDelete={handleShowPopup}
          error={error}
          credentialName={credentialName}
        />
      ) : (
        <ShowContents
          credentialName={credentialName}
          onEditClick={handleEdit}
        />
      )}
      {showDeletePopup && (
        <DeleteCredential onDismiss={handleDismiss} onOkay={handleDelete} />
      )}
    </div>
  );
}

export function CredentialsInsertion() {
  const credentials = useAppSelector(selectCredentials);
  return (
    <div className={styles.grid}>
      <div className={styles.arrowIcon} />
      {credentials && (
        <ul className={styles.list}>
          {credentials.map((credential, index) => (
            <li
              className={styles.listItem}
              key={credential.credential.rootHash}
            >
              <CredentialRow credentials={credentials} rowIndex={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
