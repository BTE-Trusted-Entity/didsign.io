import React from 'react'
import AttentionIcon from '../ImageAssets/iconBIG_attention.svg'
import InfoIcon from '../ImageAssets/iconBIG_info.svg'
import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { updateSignStatus } from '../Features/Signer/VerifyJwsSlice'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'
import SignatureIcon from '../ImageAssets/icon_DID.svg'
import BTE from '../ImageAssets/bte_logo_black.png'
import {
  Container,
  DismissBtn,
  Heading,
  StyledPopup,
  Text,
  Wrapper,
} from '../StyledComponents/Popup'
import {
  BTELogo,
  Dismiss,
  Imprint,
  ImprintContainer,
  ImprintText,
} from '../StyledComponents/Footer'

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
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={AttentionIcon} />
          <Heading>Verification Error</Heading>
          <Text>
            {' '}
            Multiple signature files found. Please import only one signature
            file.
          </Text>
          <DismissBtn onClick={() => handleDismiss()}>DISMISS</DismissBtn>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
export const SignFileInfoPopup = (props: Toggle) => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={InfoIcon} />
          <Heading>
            <img src={SignatureIcon} />
            Signature
          </Heading>
          <Text>
            Your files have been signed and your DIDsign signature has been
            added successfully.
            <br /> The receiver of your documents needs to get your signature
            together with the set of signed files in order to get the
            verification. <br /> The easiest way to proceed is to zip all files
            into one archive.
          </Text>
          <Dismiss onClick={props.dismiss}>OK</Dismiss>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
export const SignBtnInfoPopup = (props: Toggle) => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={InfoIcon} />
          <Heading>Signing</Heading>
          <Text>
            In order to successfully sign your files with DIDsign, make sure to
            have a wallet installed that has an on-chain DID.
            <br /> We recommend to use Sporran, which is a browser extension
            available for Google Chrome and Mozilla Firefox.
          </Text>
          <Dismiss onClick={props.dismiss}>OK</Dismiss>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
export const SigningMultipleDidFiles = (props: Toggle) => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={AttentionIcon} />
          <Heading>Sign Error</Heading>
          <Text> Signing of signature file is not allowed.</Text>
          <DismissBtn onClick={props.dismiss}>DISMISS</DismissBtn>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
export const SigningDuplicateFiles = (props: Toggle) => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={AttentionIcon} />
          <Heading>Sign Error</Heading>
          <Text>Duplicate files found. Please include each file only once</Text>
          <DismissBtn onClick={props.dismiss}>DISMISS</DismissBtn>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
export const ImprintPopup = (props: Toggle) => {
  return (
    <Imprint>
      <ImprintContainer>
        <BTELogo src={BTE} />
        <ImprintText setMargin>Imprint</ImprintText>
        <ImprintText>B.T.E. BOTLabs Trusted Entity GmbH</ImprintText>
        <ImprintText>Keithstraße 2-4</ImprintText>
        <ImprintText>10787 Berlin, Germany</ImprintText>
        <ImprintText>
          Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
        </ImprintText>
        <ImprintText>Registration Number: HRB 231219B</ImprintText>
        <ImprintText>VAT No: DE 346528612</ImprintText>
        <ImprintText>Managing Director: Ingo Rübe</ImprintText>
        <ImprintText>
          Contact: <a href="mailto:info@botlabs.org">info@botlabs.org</a>
        </ImprintText>
        <ImprintText setMargin>
          Or go to{' '}
          <a
            href="https://support.kilt.io/support/home"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            Tech Support{' '}
          </a>{' '}
          and click on “Contact Us”
        </ImprintText>
        <ImprintText>Requirements according to § 5 TMG (Germany)</ImprintText>
        <Dismiss onClick={props.dismiss}>DISMISS</Dismiss>
      </ImprintContainer>
    </Imprint>
  )
}
export const SignPopup = (props: Toggle) => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={InfoIcon} />
          <Heading>Signature Needed</Heading>
          <Text>
            Please wait for your wallet extension to open and sign the
            transaction there.
          </Text>
          <DismissBtn onClick={props.dismiss}>DISMISS</DismissBtn>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
export const NoWalletPopup = (props: Toggle) => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={InfoIcon} />
          <Heading>No Wallet Found</Heading>
          <Text>
            To sign your files with DIDsign you need an on-chain DID in a wallet
            that supports it. We recommend Sporran, a browser extension
            available for Google Chrome and Firefox. Any other wallet supporting
            on-chain signing on the KILT blockchain can also be used.
          </Text>
          <DismissBtn onClick={props.dismiss}>DISMISS</DismissBtn>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
export const SignErrorPopup = (props: Toggle) => {
  return (
    <Container>
      <StyledPopup>
        <Wrapper>
          <img src={AttentionIcon} />
          <Heading>Sign Error</Heading>
          <Text>
            It looks like error occured while signing. Please try again.
          </Text>
          <DismissBtn onClick={props.dismiss}>DISMISS</DismissBtn>
        </Wrapper>
      </StyledPopup>
    </Container>
  )
}
