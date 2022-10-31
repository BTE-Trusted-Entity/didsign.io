import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import * as styles from './Popups.module.css';

interface ShowPopupContextType {
  visible: boolean;

  showPopup(value: boolean): void;
}

const ShowPopupContext = createContext<ShowPopupContextType>({
  visible: false,
  showPopup() {
    return;
  },
});

export function useShowPopup(): ShowPopupContextType {
  return useContext(ShowPopupContext);
}

export function ShowPopupProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [visible, showPopup] = useState(false);
  const value = useMemo(() => ({ visible, showPopup }), [visible]);
  return (
    <ShowPopupContext.Provider value={value}>
      {children}
    </ShowPopupContext.Provider>
  );
}

function usePopupBackdrop() {
  const { showPopup } = useShowPopup();
  return useEffect(() => {
    showPopup(true);
    return () => showPopup(false);
  }, [showPopup]);
}

interface Props {
  onDismiss: React.MouseEventHandler<HTMLButtonElement>;
  onOkay?: React.MouseEventHandler<HTMLButtonElement>;
}

export function MultipleSignPopup({ onDismiss }: { onDismiss: () => void }) {
  usePopupBackdrop();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.attentionHeading}>Verification Error</h1>

        <span className={styles.text}>
          Multiple signature files found. Please import only one signature file.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function SignFileInfoPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.signatureHeading}>Signature</h1>

        <span className={styles.text}>
          Your files have been signed and your DIDsign signature has been added
          successfully.
        </span>
        <span className={styles.text}>
          {' '}
          The receiver of your documents needs to get your signature together
          with the set of signed files in order to get the verification.
        </span>
        <span className={styles.text}>
          {' '}
          The easiest way to proceed is to zip all files into one archive.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          OK
        </button>
      </div>
    </div>
  );
}

export function SignButtonInfoPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.infoHeading}>Signing</h1>

        <span className={styles.text}>
          In order to successfully sign your files with DIDsign, make sure to
          have a wallet installed that has an on-chain DID.
        </span>
        <span className={styles.text}>
          {' '}
          We recommend to use Sporran, which is a browser extension available
          for Google Chrome and Mozilla Firefox.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          OK
        </button>
      </div>
    </div>
  );
}

export function SigningMultipleDidFiles({ onDismiss }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.attentionHeading}>Sign Error</h1>

        <span className={styles.text}>
          Signing of signature file is not allowed.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function SignPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.infoHeading}>Signature Needed</h1>

        <span className={styles.text}>
          Please wait for your wallet extension to open and sign the transaction
          there.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function NoWalletPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.infoHeading}>No Wallet Found</h1>

        <span className={styles.text}>
          To sign your files with DIDsign you need an on-chain DID in a wallet
          that supports it. We recommend Sporran, a browser extension available
          for Google Chrome and Firefox. Any other wallet supporting on-chain
          signing on the KILT blockchain can also be used.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function SignErrorPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.attentionHeading}>Sign Error</h1>

        <span className={styles.text}>
          It looks like error occured while signing. Please try again.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function PendingTx() {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.spinnerHeading}>
          Blockchain Transaction Pending
        </h1>

        <span className={styles.text}>
          Your timestamp is being added to the KILT blockchain.
        </span>

        <span className={styles.bottomText}>
          Please leave this tab open until the transaction is complete.
        </span>
      </div>
    </div>
  );
}

export function TimestampError({ onDismiss }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.attentionHeading}>Error Timestamping</h1>

        <span className={styles.text}>
          Click “Try Again” or reload the page or restart your browser.
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function DeleteCredential({ onDismiss, onOkay }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.infoHeading}>Delete Credential</h1>

        <span className={styles.text}>
          Do you want to delete this credential from your signature file?
        </span>
        <div className={styles.btnWrapper}>
          <button className={styles.cancelBtn} onClick={onDismiss}>
            Cancel
          </button>
          <button className={styles.okayBtn} onClick={onOkay}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export function TimestampWarning({ onDismiss, onOkay }: Props) {
  usePopupBackdrop();
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.attentionHeading}>Save Your File!</h1>

        <span className={styles.text}>
          Your data belongs to you – DIDsign doesn’t keep a copy of it. Make
          sure you have saved your timestamped file before switching to the
          verifier tab.
        </span>
        <div className={styles.btnWrapper}>
          <button className={styles.cancelBtn} onClick={onDismiss}>
            Cancel
          </button>
          <button className={styles.okayBtn} onClick={onOkay}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
