import React, { Fragment, useCallback, useState } from 'react';

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

interface Props {
  currentCredential: NamedCredential;
}
interface EditingProps {
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  currentCredential: NamedCredential;
  isEditing: boolean;
}
function EditContents({
  onBlur,
  onKeyPress,
  currentCredential,
  isEditing,
}: EditingProps) {
  const [error, setError] = useState(false);
  const buffers = useAppSelector(selectBuffers);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const dispatch = useAppDispatch();
  const storedCredentials = useAppSelector(selectCredentials);
  const credentialName = currentCredential.name;

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

      if (error) setError(false);

      const { hashes, jws } = getSignatureData();

      if (!storedCredentials) throw new Error('No credentials');

      const updatedCredentials = [...storedCredentials];
      const credentialCopy = { ...currentCredential, name: input };

      updatedCredentials.splice(
        updatedCredentials.indexOf(currentCredential),
        1,
        credentialCopy,
      );

      const updatedContents = {
        hashes,
        jws,
        credentials: updatedCredentials,
      };
      dispatch(updateCredentials(updatedCredentials));
      updateSignatureFile(updatedContents);
    },
    [
      currentCredential,
      dispatch,
      error,
      getSignatureData,
      storedCredentials,
      updateSignatureFile,
    ],
  );
  const handleShowPopup = useCallback(() => {
    setShowDeletePopup(true);
    dispatch(showPopup(true));
  }, [dispatch]);

  const handleDismiss = useCallback(() => {
    setShowDeletePopup(false);
    dispatch(showPopup(false));
  }, [dispatch]);

  const handleDelete = useCallback(async () => {
    handleDismiss();
    const { hashes, jws } = getSignatureData();

    if (!storedCredentials) throw new Error('No credentials');

    const credentialsCopy = [...storedCredentials];
    credentialsCopy.splice(credentialsCopy.indexOf(currentCredential), 1);

    const updatedContents = {
      hashes,
      jws,
      credentials: credentialsCopy.length > 0 ? credentialsCopy : undefined,
    };

    dispatch(updateCredentials(credentialsCopy));
    updateSignatureFile(updatedContents);
  }, [
    currentCredential,
    dispatch,
    getSignatureData,
    handleDismiss,
    storedCredentials,
    updateSignatureFile,
  ]);

  return (
    <div
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
          onBlur={onBlur}
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
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleShowPopup}
        />
      </div>
      {showDeletePopup && (
        <DeleteCredential onDismiss={handleDismiss} onOkay={handleDelete} />
      )}
    </div>
  );
}

function CredentialRow({ currentCredential }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const credentialName = currentCredential.name;
  const dispatch = useAppDispatch();

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setIsEditing(false);
    }
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    dispatch(showPopup(false));
  }, [dispatch]);
  return (
    <Fragment>
      {isEditing ? (
        <EditContents
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          currentCredential={currentCredential}
          isEditing={isEditing}
        />
      ) : (
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
      )}
    </Fragment>
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
              <CredentialRow currentCredential={credential} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
