import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

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
  children: JSX.Element[] | JSX.Element;
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

function useFixedBody() {
  return useEffect(() => {
    const { body } = document;
    disableBodyScroll(body);
    return () => enableBodyScroll(body);
  }, []);
}

interface Props {
  onDismiss: React.MouseEventHandler<HTMLButtonElement>;
  onOkay?: React.MouseEventHandler<HTMLButtonElement>;
}

export function MultipleSignPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.attentionHeading}>Verification Error</h2>

        <p className={styles.text}>
          Multiple signature files found. Please import only one signature file.
        </p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function SignFileInfoPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.signatureHeading}>Signature</h2>

        <p className={styles.text}>
          Your files have been signed and your DIDsign signature has been added
          successfully.
        </p>
        <p className={styles.text}>
          The receiver of your documents needs to get your signature together
          with the set of signed files in order to get the verification.
        </p>
        <p className={styles.text}>
          The easiest way to proceed is to zip all files into one archive.
        </p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          OK
        </button>
      </div>
    </div>
  );
}

export function SignButtonInfoPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.infoHeading}>Signing</h2>

        <p className={styles.text}>
          In order to successfully sign your files with DIDsign, make sure to
          have a wallet installed that has an on-chain DID.
        </p>
        <p className={styles.text}>
          We recommend to use Sporran, which is a browser extension available
          for Google Chrome and Mozilla Firefox.
        </p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          OK
        </button>
      </div>
    </div>
  );
}

export function SigningMultipleDidFiles({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.attentionHeading}>Sign Error</h2>

        <p className={styles.text}>Signing of signature file is not allowed.</p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function SignPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.infoHeading}>Signature Needed</h2>

        <p className={styles.text}>
          Please wait for your wallet extension to open and sign the transaction
          there.
        </p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function NoWalletPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.infoHeading}>No Wallet Found</h2>

        <p className={styles.text}>
          To sign your files with DIDsign you need an on-chain DID in a wallet
          that supports it. We recommend Sporran, a browser extension available
          for Google Chrome and Firefox. Any other wallet supporting on-chain
          signing on the KILT blockchain can also be used.
        </p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function SignErrorPopup({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.attentionHeading}>Sign Error</h2>

        <p className={styles.text}>
          It looks like error occurred while signing. Please try again.
        </p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function PendingTx() {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.spinnerHeading}>
          Blockchain Transaction Pending
        </h2>

        <p className={styles.text}>
          Your timestamp is being added to the KILT blockchain.
        </p>

        <p className={styles.bottomText}>
          Please leave this tab open until the transaction is complete.
        </p>
      </div>
    </div>
  );
}

export function TimestampError({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.attentionHeading}>Error Timestamping</h2>

        <p className={styles.text}>
          Try again or reload the page or restart your browser.
        </p>

        <button className={styles.dismissButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function DeleteCredential({ onDismiss, onOkay }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.infoHeading}>Delete Credential</h2>

        <p className={styles.text}>
          Do you want to delete this credential from your signature file?
        </p>

        <div className={styles.buttonWrapper}>
          <button className={styles.cancelButton} onClick={onDismiss}>
            Cancel
          </button>
          <button className={styles.okayButton} onClick={onOkay}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export function TimestampWarning({ onDismiss, onOkay }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.attentionHeading}>Save Your File!</h2>

        <p className={styles.text}>
          Your data belongs to you – DIDsign doesn’t keep a copy of it. Make
          sure you have saved your timestamped file before switching to the
          verifier tab.
        </p>

        <div className={styles.buttonWrapper}>
          <button className={styles.cancelButton} onClick={onDismiss}>
            Cancel
          </button>
          <button className={styles.okayButton} onClick={onOkay}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export function NotAuthorized({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.infoHeading}>Authorization error</h2>

        <p className={styles.errorText}>The authorization was rejected.</p>
        <p className={styles.errorText}>
          Follow the instructions on our{' '}
          <a
            className={styles.link}
            href="https://support.kilt.io/support/solutions/articles/80000968082-how-to-grant-access-to-website-"
            target="_blank"
            rel="noreferrer"
          >
            Tech Support
          </a>{' '}
          site to establish the connection between DIDsign and your wallet.
        </p>

        <button className={styles.cancelButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function Rejected({ onDismiss }: Props) {
  usePopupBackdrop();
  useFixedBody();

  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h2 className={styles.infoHeading}>Signing error</h2>

        <p className={styles.errorText}>
          Your wallet was closed before the request was signed.
        </p>
        <p className={styles.errorText}>Click “Dismiss“ to try again.</p>

        <button className={styles.cancelButton} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function Backdrop() {
  const { visible } = useShowPopup();
  if (!visible) {
    return null;
  }
  return <div className={styles.backdrop} />;
}
