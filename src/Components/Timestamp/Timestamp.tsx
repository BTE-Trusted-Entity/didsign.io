import {
  FormEvent,
  Fragment,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import BN from 'bn.js';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { BlockchainApiConnection } from '@kiltprotocol/chain-helpers';

import classnames from 'classnames';

import * as styles from './Timestamp.module.css';

import { useSignature } from '../Signature/Signature';
import { useFiles } from '../Files/Files';

import {
  getExtrinsic,
  getFee,
  getKiltAccountsWithEnoughBalance,
  getTimestamp,
} from '../../Utils/timestamp';
import { IKiltAccount, SignDoc } from '../../Utils/types';
import { asKiltCoins } from '../../Utils/asKiltCoins';
import { exceptionToError } from '../../Utils/exceptionToError';
import { createDidSignFile } from '../../Utils/sign-helpers';

import { useConnect } from '../../Hooks/useConnect';
import { usePreventNavigation } from '../../Hooks/usePreventNavigation';

import { Spinner } from '../Spinner/Spinner';
import { PendingTx, SignPopup, TimestampError } from '../Popups/Popups';
import { useBooleanState } from '../../Utils/useBooleanState';

function getAccountLabel(account: IKiltAccount) {
  const { address, source, name } = account;

  return name ? `${name} (${source})` : `${address} (${source})`;
}

function useFee() {
  const [fee, setFee] = useState<BN>();

  useEffect(() => {
    (async () => {
      setFee(await getFee());
    })();
  }, []);

  return fee;
}

export function Timestamp() {
  useConnect();

  const { files, setFiles } = useFiles();
  const {
    downloaded: signatureDownloaded,
    signature,
    setSignature,
  } = useSignature();

  const [status, setStatus] = useState<
    | 'start'
    | 'getting-accounts'
    | 'accounts-ready'
    | 'signing'
    | 'finalizing'
    | 'done'
    | 'error'
  >('start');

  usePreventNavigation(
    ['finalizing', 'done'].includes(status) && !signatureDownloaded,
  );

  const [accounts, setAccounts] = useState<IKiltAccount[]>();
  const [selectedAccount, setSelectedAccount] = useState<IKiltAccount>();
  const isAccountsMenuOpen = useBooleanState();

  const [timestamp, setTimestamp] = useState('');

  const fee = useFee();

  const handleStartClick = useCallback(async () => {
    try {
      setStatus('getting-accounts');
      setAccounts(await getKiltAccountsWithEnoughBalance());
      setStatus('accounts-ready');
    } catch (exception) {
      setStatus('error');
      console.error(exceptionToError(exception));
    }
  }, []);

  const handleSelectClick = useCallback(
    (account: IKiltAccount) => () => {
      setSelectedAccount(account);
      isAccountsMenuOpen.off();
    },
    [isAccountsMenuOpen],
  );

  const handleSelectKeyPress = useCallback(
    (account: IKiltAccount) => (event: KeyboardEvent) => {
      if (event.key !== 'Enter') {
        return;
      }
      setSelectedAccount(account);
      isAccountsMenuOpen.off();
    },
    [isAccountsMenuOpen],
  );

  const remainingAccounts = useMemo(() => {
    return accounts?.filter((account) => account !== selectedAccount);
  }, [selectedAccount, accounts]);

  const handleFinalized = useCallback(
    async (blockHash: string, txHash: string) => {
      try {
        const decoder = new TextDecoder('utf-8');
        const decoded = decoder.decode(files[0].buffer);
        const didSignData = JSON.parse(decoded) as SignDoc;

        const withRemark = { ...didSignData, remark: { txHash, blockHash } };

        const blob = new Blob([JSON.stringify(withRemark)], {
          type: 'application/json;charset=utf-8',
        });
        const file = await createDidSignFile(blob);
        setFiles((files) => [file, ...files.slice(1)]);

        setTimestamp(await getTimestamp(blockHash));

        setStatus('done');
        setSignature((old) => ({
          ...old,
          timestamped: true,
          downloaded: false,
        }));
      } catch (exception) {
        setStatus('error');
        console.error(exceptionToError(exception));
      }
    },
    [files, setFiles, setSignature],
  );
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      setStatus('signing');

      try {
        if (!selectedAccount) {
          throw new Error('No selected account');
        }
        if (!signature) {
          throw new Error('Impossible: signature not set');
        }

        const { api } = await BlockchainApiConnection.getConnectionOrConnect();

        const extrinsic = await getExtrinsic(signature);

        const injector = await web3FromAddress(selectedAccount.address);

        await extrinsic.signAndSend(
          selectedAccount.address,
          { signer: injector.signer },
          ({ status, dispatchError }) => {
            if (status.isReady) {
              setStatus('finalizing');
            }

            if (status.isFinalized && !dispatchError) {
              handleFinalized(
                status.asFinalized.toString(),
                extrinsic.hash.toString(),
              );
            }

            if (!dispatchError) {
              return;
            }

            if (!dispatchError.isModule) {
              // Other, CannotLookup, BadOrigin, no extra info
              throw new Error(dispatchError.toString());
            }

            const decoded = api.registry.findMetaError(dispatchError.asModule);
            const { docs, name, section } = decoded;

            throw new Error(`${section}.${name}: ${docs.join(' ')}`);
          },
        );
      } catch (exception) {
        const error = exceptionToError(exception);
        if (!error.message.includes('User closed the popup')) {
          setStatus('error');
          console.error(error);
        }
      }
    },
    [selectedAccount, signature, handleFinalized],
  );

  function handleDismiss() {
    if (accounts) {
      setStatus('accounts-ready');
    } else {
      setStatus('start');
    }
  }

  function handleTryAgain() {
    setStatus('start');
  }

  return (
    <div className={styles.container}>
      <div className={styles.timestamp}>
        <h3 className={styles.heading}>Timestamp</h3>

        {status === 'start' && (
          <section className={styles.section}>
            <p className={styles.fee}>
              Add a definite timestamp{' '}
              {fee ? `≈ (${asKiltCoins(fee)} KILT)` : <Spinner />}
            </p>
            <button
              className={styles.btn}
              onClick={handleStartClick}
              disabled={!fee}
            >
              Start
            </button>
          </section>
        )}
        {status === 'getting-accounts' && <Spinner />}

        {status === 'accounts-ready' && (
          <form onSubmit={handleSubmit}>
            <section className={styles.section}>
              <div
                className={styles.select}
                aria-expanded={isAccountsMenuOpen.current}
              >
                {!isAccountsMenuOpen.current && (
                  <button
                    className={classnames(
                      styles.openBtn,
                      Boolean(selectedAccount) && styles.selectedAccount,
                    )}
                    type="button"
                    onClick={isAccountsMenuOpen.on}
                  >
                    {selectedAccount
                      ? getAccountLabel(selectedAccount)
                      : 'Select account'}
                  </button>
                )}

                {isAccountsMenuOpen.current && (
                  <Fragment>
                    <button
                      className={classnames(
                        styles.closeBtn,
                        Boolean(selectedAccount) && styles.selectedAccount,
                      )}
                      type="button"
                      onClick={isAccountsMenuOpen.off}
                    >
                      {selectedAccount
                        ? getAccountLabel(selectedAccount)
                        : 'Select account'}
                    </button>

                    <ul className={styles.options}>
                      {remainingAccounts?.map((account) => (
                        <li
                          className={styles.option}
                          key={account.address}
                          onClick={handleSelectClick(account)}
                          onKeyPress={handleSelectKeyPress(account)}
                          tabIndex={0}
                        >
                          <p>{getAccountLabel(account)}</p>
                        </li>
                      ))}
                    </ul>
                  </Fragment>
                )}
              </div>

              <button
                className={styles.btn}
                type="submit"
                disabled={!selectedAccount}
              >
                Create
              </button>
            </section>
          </form>
        )}

        {status === 'signing' && <SignPopup onDismiss={handleDismiss} />}

        {status === 'finalizing' && <PendingTx />}

        {status === 'done' && timestamp && (
          <section className={styles.section}>{timestamp}</section>
        )}

        {status === 'error' && <TimestampError onDismiss={handleTryAgain} />}
      </div>
    </div>
  );
}
