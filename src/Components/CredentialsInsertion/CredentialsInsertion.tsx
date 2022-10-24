import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { without } from 'lodash-es';
import classnames from 'classnames';

import * as styles from './CredentialsInsertion.module.css';

import { useSignature } from '../Signature/Signature';
import { NamedCredential, SignDoc } from '../../Utils/types';
import { useFiles } from '../Files/Files';
import { DeleteCredential } from '../Popups/Popups';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';
import { createDidSignFile } from '../../Utils/sign-helpers';

interface EditingProps {
  stopEditing: () => void;
  credential: NamedCredential;
  isEditing: boolean;
}

function EditContents({ credential, isEditing, stopEditing }: EditingProps) {
  const [error, setError] = useState(false);
  const { files, setFiles } = useFiles();
  const { credentials: storedCredentials, setSignature } = useSignature();
  const credentialName = credential.name;
  const credentialRowRef = useRef(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const getSignatureData = useCallback(() => {
    const { buffer } = files[0];
    const decoder = new TextDecoder('utf-8');
    const decoded = decoder.decode(buffer);
    return JSON.parse(decoded) as SignDoc;
  }, [files]);

  const updateSignatureFile = useCallback(
    async (newContents: SignDoc) => {
      const blob = new Blob([JSON.stringify(newContents)], {
        type: 'application/json;charset=utf-8',
      });

      const file = await createDidSignFile(blob);
      setFiles((files) => [file, ...files.slice(1)]);
    },
    [setFiles],
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
      setSignature((old) => ({ ...old, credentials: updatedCredentials }));
      updateSignatureFile(updatedContents);
    },
    [
      credential,
      error,
      getSignatureData,
      setSignature,
      storedCredentials,
      updateSignatureFile,
    ],
  );

  const handleShowPopup = useCallback(() => {
    setShowDeletePopup(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setShowDeletePopup(false);
  }, []);

  const handleDelete = useCallback(async () => {
    handleDismiss();
    const { hashes, jws } = getSignatureData();

    if (!storedCredentials) throw new Error('No credentials');

    const credentials = without(storedCredentials, credential);

    const updatedContents = {
      hashes,
      jws,
      ...(credentials.length > 0 && { credentials }),
    };

    setSignature((old) => ({ ...old, credentials }));
    updateSignatureFile(updatedContents);
  }, [
    credential,
    getSignatureData,
    handleDismiss,
    setSignature,
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
  const { credentials } = useSignature();

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
