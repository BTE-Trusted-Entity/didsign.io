import React from 'react';

import styles from './Popups.module.css';

import { useAppDispatch } from '../../app/hooks';
import { showPopup } from '../../Features/Signer/PopupSlice';
import { updateSignStatus } from '../../Features/Signer/VerifyJwsSlice';
import { clearEndpoint } from '../../Features/Signer/VerifiedSignatureSlice';

interface Props {
  onDismiss: React.MouseEventHandler<HTMLButtonElement>;
  onOkay?: React.MouseEventHandler<HTMLButtonElement>;
}

export const MultipleSignPopup = () => {
  const dispatch = useAppDispatch();
  const handleDismiss = () => {
    dispatch(showPopup(false));
    dispatch(clearEndpoint());
    dispatch(updateSignStatus('Not Checked'));
  };
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.attentionHeading}>Verification Error</h1>

        <span className={styles.text}>
          Multiple signature files found. Please import only one signature file.
        </span>

        <button className={styles.dismissBtn} onClick={() => handleDismiss()}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

export const SignFileInfoPopup = ({ onDismiss }: Props) => {
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
};

export const SignButtonInfoPopup = ({ onDismiss }: Props) => {
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
};

export const SigningMultipleDidFiles = ({ onDismiss }: Props) => {
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
};

export const ImprintPopup = ({ onDismiss }: Props) => {
  return (
    <div className={styles.imprint}>
      <div className={styles.imprintPopup}>
        <h1 className={styles.imprintHeading}>Imprint</h1>

        <span className={styles.imprintText}>
          B.T.E. BOTLabs Trusted Entity GmbH
        </span>
        <span className={styles.imprintText}>Keithstraße 2-4</span>
        <span className={styles.imprintText}>10787 Berlin, Germany</span>
        <span className={styles.imprintText}>
          Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
        </span>
        <span className={styles.imprintText}>
          Registration Number: HRB 231219B
        </span>
        <span className={styles.imprintText}>VAT No: DE 346528612</span>
        <span className={styles.imprintText}>Managing Director: Ingo Rübe</span>
        <span className={styles.imprintText}>
          Contact: <a href="mailto:info@botlabs.org">info@botlabs.org</a>
        </span>
        <span className={styles.imprintText}>
          Or go to{' '}
          <a
            href="https://support.kilt.io/support/home"
            target="_blank"
            rel="noreferrer"
          >
            Tech Support
          </a>{' '}
          and click on “Contact Us”
        </span>
        <span className={styles.imprintBottomText}>
          Requirements according to § 5 TMG (Germany)
        </span>

        <button className={styles.dismissBtn} onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
};

export const SignPopup = ({ onDismiss }: Props) => {
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
};

export const NoWalletPopup = ({ onDismiss }: Props) => {
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
};

export const SignErrorPopup = ({ onDismiss }: Props) => {
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
};

export const PendingTx = () => {
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
};

export const TimestampError = ({ onDismiss }: Props) => {
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
};
export const DeleteCredential = ({ onDismiss, onOkay }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.popup}>
        <h1 className={styles.infoHeading}>Delete Credential</h1>

        <span className={styles.text}>
          Do you want to delete this credential from your signature file?
        </span>
        <div className={styles.btnWrapper}>
          <button
            className={styles.cancelBtn}
            onClick={onDismiss}
            onMouseDown={(event) => event.preventDefault()}
          >
            Cancel
          </button>
          <button
            className={styles.okayBtn}
            onClick={onOkay}
            onMouseDown={(event) => event.preventDefault()}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};
