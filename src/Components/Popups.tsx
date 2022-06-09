import React from 'react'

import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { updateSignStatus } from '../Features/Signer/VerifyJwsSlice'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'

import * as Styled from '../StyledComponents/Popups'

interface Props {
  onDismiss: React.MouseEventHandler<HTMLButtonElement>
}

export const MultipleSignPopup = () => {
  const dispatch = useAppDispatch()
  const handleDismiss = () => {
    dispatch(showPopup(false))
    dispatch(clearEndpoint())
    dispatch(updateSignStatus('Not Checked'))
  }
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.AttentionHeading>Verification Error</Styled.AttentionHeading>

        <Styled.Text>
          Multiple signature files found. Please import only one signature file.
        </Styled.Text>

        <Styled.Dismiss onClick={() => handleDismiss()}>Dismiss</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const SignFileInfoPopup = ({ onDismiss }: Props) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.SignatureHeading>Signature</Styled.SignatureHeading>

        <Styled.Text>
          Your files have been signed and your DIDsign signature has been added
          successfully.
        </Styled.Text>
        <Styled.Text>
          The receiver of your documents needs to get your signature together
          with the set of signed files in order to get the verification.
        </Styled.Text>
        <Styled.Text>
          The easiest way to proceed is to zip all files into one archive.
        </Styled.Text>

        <Styled.Dismiss onClick={onDismiss}>OK</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const SignButtonInfoPopup = ({ onDismiss }: Props) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.InfoHeading>Signing</Styled.InfoHeading>

        <Styled.Text>
          In order to successfully sign your files with DIDsign, make sure to
          have a wallet installed that has an on-chain DID.
        </Styled.Text>
        <Styled.Text>
          We recommend to use Sporran, which is a browser extension available
          for Google Chrome and Mozilla Firefox.
        </Styled.Text>

        <Styled.Dismiss onClick={onDismiss}>OK</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const SigningMultipleDidFiles = ({ onDismiss }: Props) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.AttentionHeading>Sign Error</Styled.AttentionHeading>

        <Styled.Text>Signing of signature file is not allowed.</Styled.Text>

        <Styled.Dismiss onClick={onDismiss}>Dismiss</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const ImprintPopup = ({ onDismiss }: Props) => {
  return (
    <Styled.Imprint>
      <Styled.ImprintPopup>
        <Styled.ImprintHeading>Imprint</Styled.ImprintHeading>

        <Styled.ImprintText>
          B.T.E. BOTLabs Trusted Entity GmbH
        </Styled.ImprintText>
        <Styled.ImprintText>Keithstraße 2-4</Styled.ImprintText>
        <Styled.ImprintText>10787 Berlin, Germany</Styled.ImprintText>
        <Styled.ImprintText>
          Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
        </Styled.ImprintText>
        <Styled.ImprintText>
          Registration Number: HRB 231219B
        </Styled.ImprintText>
        <Styled.ImprintText>VAT No: DE 346528612</Styled.ImprintText>
        <Styled.ImprintText>Managing Director: Ingo Rübe</Styled.ImprintText>
        <Styled.ImprintText>
          Contact: <a href="mailto:info@botlabs.org">info@botlabs.org</a>
        </Styled.ImprintText>
        <Styled.ImprintText>
          Or go to{' '}
          <a
            href="https://support.kilt.io/support/home"
            target="_blank"
            rel="noreferrer"
          >
            Tech Support
          </a>{' '}
          and click on “Contact Us”
        </Styled.ImprintText>
        <Styled.ImprintBottomText>
          Requirements according to § 5 TMG (Germany)
        </Styled.ImprintBottomText>

        <Styled.Dismiss onClick={onDismiss}>Dismiss</Styled.Dismiss>
      </Styled.ImprintPopup>
    </Styled.Imprint>
  )
}

export const SignPopup = ({ onDismiss }: Props) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.InfoHeading>Signature Needed</Styled.InfoHeading>

        <Styled.Text>
          Please wait for your wallet extension to open and sign the transaction
          there.
        </Styled.Text>

        <Styled.Dismiss onClick={onDismiss}>Dismiss</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const NoWalletPopup = ({ onDismiss }: Props) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.InfoHeading>No Wallet Found</Styled.InfoHeading>

        <Styled.Text>
          To sign your files with DIDsign you need an on-chain DID in a wallet
          that supports it. We recommend Sporran, a browser extension available
          for Google Chrome and Firefox. Any other wallet supporting on-chain
          signing on the KILT blockchain can also be used.
        </Styled.Text>

        <Styled.Dismiss onClick={onDismiss}>Dismiss</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const SignErrorPopup = ({ onDismiss }: Props) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.AttentionHeading>Sign Error</Styled.AttentionHeading>

        <Styled.Text>
          It looks like error occured while signing. Please try again.
        </Styled.Text>

        <Styled.Dismiss onClick={onDismiss}>Dismiss</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const PendingTx = () => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.SpinnerHeading>
          Blockchain Transaction Pending
        </Styled.SpinnerHeading>

        <Styled.Text>
          Your timestamp is being added to the KILT blockchain.
        </Styled.Text>

        <Styled.BottomText>
          Please leave this tab open until the transaction is complete.
        </Styled.BottomText>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const TimestampError = ({ onDismiss }: Props) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.AttentionHeading>Error: Timestamping</Styled.AttentionHeading>

        <Styled.Text>
          Click “Try Again” or reload the page or restart your browser.
        </Styled.Text>

        <Styled.Dismiss onClick={onDismiss}>Try again</Styled.Dismiss>
      </Styled.Popup>
    </Styled.Container>
  )
}
