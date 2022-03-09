import React from 'react'
import AttentionIcon from '../ImageAssets/iconBIG_attention.svg'
import InfoIcon from '../ImageAssets/iconBIG_info.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { updateSignStatus } from '../Features/Signer/VerifyJwsSlice'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'
import SignatureIcon from '../ImageAssets/icon_DID.svg'

interface Toggle {
  dismiss: React.MouseEventHandler<HTMLButtonElement>
}

export const SignInfoPopup = (props: Toggle) => {
  return (
    <div className=" z-40 text-dark-purple flex fixed max-w-[300px] mx-auto h-[fit] bg-silver-blue shadow-2xl rounded-[15px] left-1/2 phone:left-[15%] top-1/4 mt-[3%] -ml-[200px] overflow-y-auto">
      <div className="flex relative flex-col w-full h-full items-center mt-4 space-y-3 pl-4 pr-4 mb-4 ">
        <img
          src={CenterLeftBubble}
          className="absolute bottom-0 left-0 mt-auto pointer-events-none"
        />
        <div>
          <img src={InfoIcon} />
        </div>
        <span className="font-['Overpass'] tracking-[0.13px] text-[18px] leading-[20px]">
          Signing
        </span>
        <div className="flex flex-col space-y-5  pl-4 pr-4 text-justify pb-5 phone:pb-0 font-['Overpass'] leading-[16px] tracking-[0.13px] text-[14px]">
          <span>
            In order to successfully sign your files with DIDsign, make sure to
            have a wallet installed that has an onchain DID.
          </span>
          <span>
            We recommend to use Sporran, which is a browser extension available
            for Google Chrome and Mozilla Firefox.
          </span>
        </div>
        <button
          onClick={props.dismiss}
          className="font-['Overpass'] whitespace-nowrap rounded-[8px] w-[130px] text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[22px] bg-medium-blue text-white"
        >
          OK
        </button>
      </div>
    </div>
  )
}
export const MultipleSignPopup = () => {
  const dispatch = useAppDispatch()

  const handleDismiss = () => {
    dispatch(showPopup(false))
    dispatch(clearEndpoint())
    dispatch(updateSignStatus('Not Checked'))
  }
  return (
    <div className=" z-40 text-dark-purple fixed max-w-[400px] phone:w-[300px] mx-auto h-[fit] bg-silver-blue shadow-2xl rounded-[15px] left-1/2 top-1/4 mt-[3%] -ml-[200px] phone:-ml-[150px] phone:overflow-y-scroll">
      <div className="flex relative flex-col w-full h-full items-center mt-4 space-y-5 pl-4 pr-4 pb-4 ">
        <img
          src={CenterLeftBubble}
          className="absolute bottom-0 left-0 mt-auto pointer-events-none"
        />
        <div>
          <img src={AttentionIcon} />
        </div>
        <span className="font-['Overpass'] tracking-wide text-lg ">
          Verification Error
        </span>

        <span className="font-['Overpass'] -tracking-tigher  text-[16px] pl-4 pr-4 text-justify">
          Multiple signature files found. Please import only one signature file.
        </span>

        <button
          onClick={handleDismiss}
          className="font-['Overpass'] rounded-[8px] w-[100px] text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[25px] bg-medium-blue text-white"
        >
          DISMISS
        </button>
      </div>
    </div>
  )
}
export const SignFileInfoPopup = (props: Toggle) => {
  return (
    <div className=" z-40 flex fixed text-dark-purple max-w-[360px] mx-auto h-[400px] bg-silver-blue shadow-2xl rounded-[15px] left-3/4 phone:overflow-y-scroll top-[10%] mt-[3%] -ml-[180px]">
      <div className="flex relative flex-col w-full h-full items-center mt-2 space-y-4 pl-4 pr-4 mb-4 ">
        <img
          src={CenterLeftBubble}
          className="absolute bottom-0 left-0 mt-auto pointer-events-none"
        />
        <div>
          <img src={InfoIcon} />
        </div>
        <div className="flex space-x-1 pt-4">
          <img src={SignatureIcon} />
          <span className="font-['Overpass'] tracking-[0.13px] text-[18px] leading-[20px] ">
            Signature
          </span>
        </div>
        <div className="flex flex-col space-y-5  pl-4 pr-4 text-justify pt-2 pb-2 font-['Overpass'] leading-[16px] tracking-[0.13px]  text-[14px]">
          <span>
            Your files have been signed and your DIDsign signature has been
            added successfully.
          </span>
          <span>
            The receiver of your documents needs to get your signature together
            with the set of signed files in order to get the verfification.
          </span>
          <span>
            The easiest way to proceed is to zip all files into one archive.
          </span>
        </div>
        <button
          onClick={props.dismiss}
          className="font-['Overpass'] whitespace-nowrap rounded-[8px] w-[130px] text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[22px] bg-medium-blue text-white"
        >
          OK
        </button>
      </div>
    </div>
  )
}
export const SigningMultipleDidFiles = (props: Toggle) => {
  return (
    <div className=" z-40 text-dark-purple fixed w-[300px] phone:w-[300px] mx-auto h-[fit] bg-silver-blue shadow-2xl rounded-[15px] left-1/2 top-1/4 mt-[3%] -ml-[150px] phone:-ml-[150px] phone:overflow-y-scroll">
      <div className="flex relative flex-col w-full h-full items-center mt-4 space-y-5 pl-4 pr-4 pb-4 ">
        <img
          src={CenterLeftBubble}
          className="absolute bottom-0 left-0 mt-auto pointer-events-none"
        />
        <div>
          <img src={AttentionIcon} />
        </div>
        <span className="font-['Overpass'] tracking-wide text-lg ">
          Sign Error
        </span>

        <span className="font-['Overpass'] -tracking-tigher  text-[16px] pl-4 pr-4 text-justify">
          Signing of signature file is not allowed.
        </span>

        <button
          onClick={props.dismiss}
          className="font-['Overpass'] rounded-[8px] w-[100px] text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[25px] bg-medium-blue text-white"
        >
          DISMISS
        </button>
      </div>
    </div>
  )
}
