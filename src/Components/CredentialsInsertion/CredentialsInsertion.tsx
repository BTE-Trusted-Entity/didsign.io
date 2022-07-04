import React, { useCallback, useRef, useState } from 'react';

import classnames from 'classnames';

import styles from './CredentialsInsertion.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectCredentials,
  updateCredentials,
} from '../../Features/Signer/SignatureSlice';
import { NamedCredential, SignDoc } from '../../Utils/types';
import {
  IBuffer,
  selectBuffers,
  updateBufferTop,
  updateFileTop,
} from '../../Features/Signer/FileSlice';
import { DeleteCredential } from '../Popups/Popups';
import { showPopup } from '../../Features/Signer/PopupSlice';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';
interface EditingProps {
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  onDismiss: React.MouseEventHandler<HTMLButtonElement>;
  onShowPopup: React.MouseEventHandler<HTMLButtonElement>;
  stopEditing: () => void;
  showDeletePopup: boolean;
  credential: NamedCredential;
  isEditing: boolean;
}

function EditContents({
  onKeyPress,
  credential,
  isEditing,
  onDismiss,
  onShowPopup,
  showDeletePopup,
  stopEditing,
}: EditingProps) {
  const [error, setError] = useState(false);
  const buffers = useAppSelector(selectBuffers);
  const dispatch = useAppDispatch();
  const storedCredentials = useAppSelector(selectCredentials);
  const credentialName = credential.name;
  const credentialRowRef = useRef(null);

  useHandleOutsideClick(credentialRowRef, stopEditing);

  const getSignatureData = useCallback(() => {
    const { buffer } = buffers[0];
    const decoder = new TextDecoder('utf-8');
    const decoded = decoder.decode(buffer);
    return JSON.parse(decoded) as SignDoc;
  }, [buffers]);

  const updateSignatureFile = useCallback(
    async (newContents: SignDoc) => {
      const blob = new Blob([JSON.stringify(newContents)], {
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
    [dispatch],
  );

  const handleChange = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const input = event.currentTarget.value;

      if (input.length < 1 || input.length > 32) {
        setError(true);
        return;
      }
      if (error) {
        setError(false);
        return;
      }

      const { hashes, jws } = getSignatureData();

      if (!storedCredentials) throw new Error('No credentials');

      const updatedCredentials = [...storedCredentials];
      const credentialCopy = { ...credential, name: input };

      updatedCredentials[updatedCredentials.indexOf(credential)] =
        credentialCopy;

      const updatedContents = {
        hashes,
        jws,
        credentials: updatedCredentials,
      };
      dispatch(updateCredentials(updatedCredentials));
      updateSignatureFile(updatedContents);
    },
    [
      credential,
      dispatch,
      error,
      getSignatureData,
      storedCredentials,
      updateSignatureFile,
    ],
  );

  const handleDelete = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      onDismiss(event);
      const { hashes, jws } = getSignatureData();

      if (!storedCredentials) throw new Error('No credentials');

      const credentialsCopy = [...storedCredentials];
      credentialsCopy.splice(credentialsCopy.indexOf(credential), 1);

      const updatedContents = {
        hashes,
        jws,
        credentials: credentialsCopy.length > 0 ? credentialsCopy : undefined,
      };

      dispatch(updateCredentials(credentialsCopy));
      updateSignatureFile(updatedContents);
    },
    [
      credential,
      dispatch,
      getSignatureData,
      onDismiss,
      storedCredentials,
      updateSignatureFile,
    ],
  );

  return (
    <div
      ref={credentialRowRef}
      className={classnames({
        [styles.credentialContainer]: true,
        [styles.editing]: isEditing,
        [styles.error]: error,
      })}
    >
      <label className={styles.credentialLabel}>Credential</label>

      <div className={styles.inputContainer}>
        <input
          type="text"
          aria-label="input credential name"
          className={styles.input}
          onKeyPress={onKeyPress}
          defaultValue={credentialName}
          onChange={handleChange}
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
          onClick={onShowPopup}
        />
      </div>
      {showDeletePopup && (
        <DeleteCredential onDismiss={onDismiss} onOkay={handleDelete} />
      )}
    </div>
  );
}

interface Props {
  credential: NamedCredential;
}

function CredentialRow({ credential }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const credentialName = credential.name;
  const dispatch = useAppDispatch();

  const stopEditing = useCallback(() => {
    if (showDeletePopup) {
      return;
    }

    setIsEditing(false);
  }, [showDeletePopup]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        stopEditing();
      }
    },
    [stopEditing],
  );

  const handleShowPopup = useCallback(() => {
    dispatch(showPopup(true));
    setShowDeletePopup(true);
  }, [dispatch]);

  const handleDismiss = useCallback(() => {
    setShowDeletePopup(false);
    dispatch(showPopup(false));
  }, [dispatch]);

  if (isEditing) {
    return (
      <EditContents
        onKeyPress={handleKeyPress}
        credential={credential}
        isEditing={isEditing}
        onDismiss={handleDismiss}
        onShowPopup={handleShowPopup}
        showDeletePopup={showDeletePopup}
        stopEditing={stopEditing}
      />
    );
  }

  return (
    <div className={styles.credentialContainer}>
      <label className={styles.credentialLabel}>Credential</label>
      <span className={styles.name}>{credentialName}</span>
      <div className={styles.editContainer}>
        <button
          className={styles.editBtn}
          aria-label="edit name"
          onClick={() => setIsEditing(true)}
        />
      </div>
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
          {credentials.map((credential) => (
            <li
              className={styles.listItem}
              key={credential.credential.rootHash}
            >
              <CredentialRow credential={credential} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
