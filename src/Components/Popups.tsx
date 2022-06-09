import React from 'react'
import AttentionIcon from '../ImageAssets/iconBIG_attention.svg'
import InfoIcon from '../ImageAssets/iconBIG_info.svg'
import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { updateSignStatus } from '../Features/Signer/VerifyJwsSlice'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'
import SignatureIcon from '../ImageAssets/icon_DID.svg'
import BTE from '../ImageAssets/bte_logo_black.png'
import { Spinner } from './Spinner'

import * as Styled from '../StyledComponents/Popups'

interface Toggle {
  dismiss: React.MouseEventHandler<HTMLButtonElement>
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
        <Styled.Wrapper>
          <img src={AttentionIcon} />
          <Styled.Heading>Verification Error</Styled.Heading>

          <Styled.Text>
            Multiple signature files found. Please import only one signature
            file.
          </Styled.Text>

          <Styled.Dismiss onClick={() => handleDismiss()}>
            DISMISS
          </Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const SignFileInfoPopup = (props: Toggle) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <img src={InfoIcon} />
          <Styled.Heading>
            <img src={SignatureIcon} />
            Signature
          </Styled.Heading>

          <Styled.Text>
            Your files have been signed and your DIDsign signature has been
            added successfully.
            <br /> The receiver of your documents needs to get your signature
            together with the set of signed files in order to get the
            verification. <br /> The easiest way to proceed is to zip all files
            into one archive.
          </Styled.Text>

          <Styled.Dismiss onClick={props.dismiss}>OK</Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}
export const SignButtonInfoPopup = (props: Toggle) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <img src={InfoIcon} />
          <Styled.Heading>Signing</Styled.Heading>

          <Styled.Text>
            In order to successfully sign your files with DIDsign, make sure to
            have a wallet installed that has an on-chain DID.
            <br /> We recommend to use Sporran, which is a browser extension
            available for Google Chrome and Mozilla Firefox.
          </Styled.Text>

          <Styled.Dismiss onClick={props.dismiss}>OK</Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}
export const SigningMultipleDidFiles = (props: Toggle) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <img src={AttentionIcon} />
          <Styled.Heading>Sign Error</Styled.Heading>

          <Styled.Text> Signing of signature file is not allowed.</Styled.Text>

          <Styled.Dismiss onClick={props.dismiss}>DISMISS</Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const ImprintPopup = (props: Toggle) => {
  return (
    <Styled.Imprint>
      <Styled.ImprintContainer>
        <Styled.BTELogo src={BTE} />

        <Styled.ImprintText setMargin>Imprint</Styled.ImprintText>
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
        <Styled.ImprintText setMargin>
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
        <Styled.ImprintText>
          Requirements according to § 5 TMG (Germany)
        </Styled.ImprintText>

        <Styled.Dismiss onClick={props.dismiss}>DISMISS</Styled.Dismiss>
      </Styled.ImprintContainer>
    </Styled.Imprint>
  )
}
export const SignPopup = (props: Toggle) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <img src={InfoIcon} />
          <Styled.Heading>Signature Needed</Styled.Heading>

          <Styled.Text>
            Please wait for your wallet extension to open and sign the
            transaction there.
          </Styled.Text>

          <Styled.Dismiss onClick={props.dismiss}>DISMISS</Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}
export const NoWalletPopup = (props: Toggle) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <img src={InfoIcon} />
          <Styled.Heading>No Wallet Found</Styled.Heading>

          <Styled.Text>
            To sign your files with DIDsign you need an on-chain DID in a wallet
            that supports it. We recommend Sporran, a browser extension
            available for Google Chrome and Firefox. Any other wallet supporting
            on-chain signing on the KILT blockchain can also be used.
          </Styled.Text>

          <Styled.Dismiss onClick={props.dismiss}>DISMISS</Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}
export const SignErrorPopup = (props: Toggle) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <img src={AttentionIcon} />
          <Styled.Heading>Sign Error</Styled.Heading>

          <Styled.Text>
            It looks like error occured while signing. Please try again.
          </Styled.Text>

          <Styled.Dismiss onClick={props.dismiss}>DISMISS</Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const PendingTx = () => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <Spinner size={58} />
          <Styled.Heading>Blockchain Transaction Pending</Styled.Heading>

          <Styled.Text>
            Your timestamp is being added to the KILT blockchain.
          </Styled.Text>

          <Styled.BottomText>
            Please leave this tab open until the transaction is complete.
          </Styled.BottomText>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}

export const TimestampError = (props: Toggle) => {
  return (
    <Styled.Container>
      <Styled.Popup>
        <Styled.Wrapper>
          <img src={AttentionIcon} />
          <Styled.Heading>Error: Timestamping</Styled.Heading>

          <Styled.Text>
            Click “Try Again” or reload the page or restart your browser.
          </Styled.Text>

          <Styled.Dismiss onClick={props.dismiss}>TRY AGAIN</Styled.Dismiss>
        </Styled.Wrapper>
      </Styled.Popup>
    </Styled.Container>
  )
}
