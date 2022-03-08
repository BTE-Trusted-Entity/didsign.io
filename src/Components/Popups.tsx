import React from 'react'
import AttentionIcon from '../ImageAssets/iconBIG_attention.svg'
import InfoIcon from '../ImageAssets/iconBIG_info.svg'
import CenterLeftBubble from '../ImageAssets/CenterLeftBubble.svg'
import { useAppDispatch } from '../app/hooks'
import { showPopup } from '../Features/Signer/PopupSlice'
import { updateSignStatus } from '../Features/Signer/VerifyJwsSlice'
import { clearEndpoint } from '../Features/Signer/EndpointSlice'

interface Toggle {
  dismiss: React.MouseEventHandler<HTMLButtonElement>
}

export const SignInfoPopup = (props: Toggle) => {
  const dispatch = useAppDispatch()

  return (
    <div className=" z-40 flex fixed max-w-[300px] mx-auto h-[hit] max-h-[360px] bg-mid-body shadow-2xl rounded-[15px] left-1/2 phone:left-[15%] top-1/4 mt-[3%] -ml-[200px] overflow-y-scroll">
      <div className="flex relative flex-col w-full h-full items-center mt-4 space-y-3 pl-4 pr-4 mb-4 ">
        <img
          src={CenterLeftBubble}
          className="absolute bottom-0 left-0 mt-auto pointer-events-none"
        />
        <div>
          <img src={InfoIcon} />
        </div>
        <span className="font-['Overpass'] tracking-[0.13px] text-[18px] leading-[20px] text-[#2A2231]">
          Signing
        </span>
        <div className="flex flex-col space-y-5  pl-4 pr-4 text-justify pb-5 phone:pb-0 font-['Overpass'] leading-[16px] tracking-[0.13px] text-[#2A2231] text-[14px]">
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
          className="font-['Overpass'] whitespace-nowrap rounded-[8px] w-[130px] text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[22px] bg-[#3E6E99] text-white"
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
    <div className=" z-40 fixed max-w-[400px] phone:w-[300px] mx-auto h-[fit] bg-mid-body shadow-2xl rounded-[15px] left-1/2 top-1/4 mt-[3%] -ml-[200px] phone:-ml-[150px] phone:overflow-y-scroll">
      <div className="flex relative flex-col w-full h-full items-center mt-4 space-y-5 pl-4 pr-4 pb-4 ">
        <img
          src={CenterLeftBubble}
          className="absolute bottom-0 left-0 mt-auto pointer-events-none"
        />
        <div>
          <img src={AttentionIcon} />
        </div>
        <span className="font-['Overpass'] tracking-wide text-lg text-[#2A2231]">
          Verification Error
        </span>

        <span className="font-['Overpass'] -tracking-tigher text-[#2A2231] text-[16px] pl-4 pr-4 text-justify">
          Multiple signature files found. Please import only one signature file.
        </span>

        <button
          onClick={handleDismiss}
          className="font-['Overpass'] rounded-[8px] w-[100px] text-[12px] leading-[12px]  tracking-[0.1px] pl-4 pr-4 text-center h-[25px] bg-[#3E6E99] text-white"
        >
          DISMISS
        </button>
      </div>
    </div>
  )
}
