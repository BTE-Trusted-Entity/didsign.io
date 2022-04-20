import React from 'react'
import { useAppSelector } from '../app/hooks'
import { SignBtn } from './SignBtn'
import { selectSign } from '../Features/Signer/SignatureSlice'
import { DownloadBtns } from './DownloadBtns'
import { BottomSection, Container } from '../StyledComponents/BottomSection'

export const BottomSectionSigner = () => {
  const sign = useAppSelector(selectSign)
  return (
    <Container>
      <BottomSection>{!sign ? <SignBtn /> : <DownloadBtns />}</BottomSection>
    </Container>
  )
}
