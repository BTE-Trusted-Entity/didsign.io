import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useRef,
} from 'react';
import { without } from 'lodash-es';
import classnames from 'classnames';

import * as styles from './CredentialsInsertion.module.css';

import { useSignature } from '../Signature/Signature';
import { NamedCredential, SignDoc } from '../../utils/types';
import { useFiles } from '../Files/Files';
import { DeleteCredential } from '../Popups/Popups';
import { useHandleOutsideClick } from '../../hooks/useHandleOutsideClick';
import { createDidSignFile } from '../../utils/sign-helpers';
import { replace } from '../../utils/replace';
import { useBooleanState } from '../../hooks/useBooleanState';

interface EditingProps {
  stopEditing: () => void;
  credential: NamedCredential;
  isEditing: boolean;
}

function EditContents({ credential, isEditing, stopEditing }: EditingProps) {
  const error = useBooleanState();
  const { files, setFiles } = useFiles();
  const { credentials: storedCredentials, setSignature } = useSignature();
  const credentialName = credential.name;
  const credentialRowRef = useRef(null);
  const showDeletePopup = useBooleanState();

  const getSignatureData = useCallback(() => {
    const { buffer } = files[0];
    const decoder = new TextDecoder('utf-8');
    const decoded = decoder.decode(buffer);
    return JSON.parse(decoded) as SignDoc;
  }, [files]);

  const handleStopEditing = useCallback(() => {
    if (showDeletePopup.current) return;
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
    async (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.currentTarget.value;

      if (input.length < 1 || input.length > 32) {
        error.on();
        return;
      }
      if (error.current) {
        error.off();
        return;
      }

      const { hashes, jws } = getSignatureData();

      if (!storedCredentials) throw new Error('No credentials');

      const credentials = replace(storedCredentials, credential, {
        ...credential,
        name: input,
      });

      setSignature((old) => ({ ...old, credentials }));

      const file = await createDidSignFile({ hashes, jws, credentials });
      setFiles((files) => [file, ...files.slice(1)]);
    },
    [
      credential,
      error,
      getSignatureData,
      setFiles,
      setSignature,
      storedCredentials,
    ],
  );

  const handleDelete = useCallback(async () => {
    showDeletePopup.off();
    const { hashes, jws } = getSignatureData();

    if (!storedCredentials) throw new Error('No credentials');

    const credentials = without(storedCredentials, credential);

    const updatedContents = {
      hashes,
      jws,
      ...(credentials.length > 0 && { credentials }),
    };

    setSignature((old) => ({ ...old, credentials }));

    const file = await createDidSignFile(updatedContents);
    setFiles((files) => [file, ...files.slice(1)]);
  }, [
    credential,
    getSignatureData,
    setFiles,
    setSignature,
    showDeletePopup,
    storedCredentials,
  ]);

  return (
    <div
      ref={credentialRowRef}
      className={classnames({
        [styles.credentialContainer]: true,
        [styles.editing]: isEditing,
        [styles.error]: error.current,
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
        {error.current && (
          <span className={styles.inputError}>
            Credential name should have 1 to 32 characters
          </span>
        )}
      </div>
      <div className={styles.editContainer}>
        <span className={styles.editingInfo}>rename or delete</span>
        <button
          className={styles.deleteButton}
          aria-label="delete credential"
          onClick={showDeletePopup.on}
        />
      </div>
      {showDeletePopup.current && (
        <DeleteCredential
          onDismiss={showDeletePopup.off}
          onOkay={handleDelete}
        />
      )}
    </div>
  );
}

interface Props {
  credential: NamedCredential;
}

function CredentialRow({ credential }: Props) {
  const isEditing = useBooleanState();
  const credentialName = credential.name;

  const handleEditClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      // prevent bubbling to stop the same event from dismissing the editor
      event.stopPropagation();
      isEditing.on();
    },
    [isEditing],
  );

  if (isEditing.current) {
    return (
      <EditContents
        credential={credential}
        isEditing={isEditing.current}
        stopEditing={isEditing.off}
      />
    );
  }

  return (
    <div className={styles.credentialContainer}>
      <label className={styles.credentialLabel}>Credential</label>
      <span className={styles.name}>{credentialName}</span>
      <div className={styles.editContainer}>
        <button
          className={styles.editButton}
          aria-label="edit name"
          onClick={handleEditClick}
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
