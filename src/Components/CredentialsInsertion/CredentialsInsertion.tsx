import {
  useCallback,
  useRef,
  useState,
  KeyboardEvent,
  ChangeEvent,
} from 'react';

import classnames from 'classnames';

import * as styles from './CredentialsInsertion.module.css';

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
import { DeleteCredential, useShowPopup } from '../Popups/Popups';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';

interface EditingProps {
  stopEditing: () => void;
  credential: NamedCredential;
  isEditing: boolean;
}

function EditContents({ credential, isEditing, stopEditing }: EditingProps) {
  const [error, setError] = useState(false);
  const buffers = useAppSelector(selectBuffers);
  const dispatch = useAppDispatch();
  const storedCredentials = useAppSelector(selectCredentials);
  const credentialName = credential.name;
  const credentialRowRef = useRef(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const showPopup = useShowPopup().set;

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

  const handleStopEditing = useCallback(() => {
    if (showDeletePopup) return;
    stopEditing();
  }, [showDeletePopup, stopEditing]);

  useHandleOutsideClick(credentialRowRef, handleStopEditing);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
        stopEditing();
      }
    },
    [stopEditing],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleShowPopup = useCallback(() => {
    showPopup(true);
    setShowDeletePopup(true);
  }, [showPopup]);

  const handleDismiss = useCallback(() => {
    setShowDeletePopup(false);
    showPopup(false);
  }, [showPopup]);

  const handleDelete = useCallback(async () => {
    handleDismiss();
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
  }, [
    credential,
    dispatch,
    getSignatureData,
    handleDismiss,
    storedCredentials,
    updateSignatureFile,
  ]);

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
          onKeyDown={handleKeyPress}
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
          onClick={handleShowPopup}
        />
      </div>
      {showDeletePopup && (
        <DeleteCredential onDismiss={handleDismiss} onOkay={handleDelete} />
      )}
    </div>
  );
}

interface Props {
  credential: NamedCredential;
}

function CredentialRow({ credential }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const credentialName = credential.name;

  const stopEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  if (isEditing) {
    return (
      <EditContents
        credential={credential}
        isEditing={isEditing}
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
