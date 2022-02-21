import React from 'react'
import { selectFinalHash, selectHash } from '../Features/Signer/hashSlice'
import { useAppSelector } from '../app/hooks'
import { selectDid, selectSign } from '../Features/Signer/SignatureSlice'
import { generateJWS, generateZipFile } from '../Utils/sign-helpers'
import { Signature, SignDoc } from '../Utils/types'
import { saveAs } from 'file-saver'
import { selectFile } from '../Features/Signer/FileSlice'
import '../Styles/App.css'

export function DownloadBtns() {
  const sign = useAppSelector(selectSign)
  const did = useAppSelector(selectDid)
  const finalHash = useAppSelector(selectFinalHash)
  const hashes = useAppSelector(selectHash)
  const files = useAppSelector(selectFile)
  const signature: Signature = { keyID: did, signature: sign }
  let jws = ''

  const handleDownloadSign = async () => {
    jws = generateJWS(signature, await finalHash)
    const signedDoc: SignDoc = { hashes: hashes, jws: jws }
    const blob = new Blob([JSON.stringify(signedDoc)], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, 'DIDsign.signature')
  }
  const handleZip = async () => {
    jws = generateJWS(signature, await finalHash)
    await generateZipFile(files)
  }
  return (
    <div>
      <div className="bg-[#ddf0ff80] border-solid border-[#517ca240] border-2 mx-auto flex flex-col items-center justify-center rounded-b-lg w-[48%] big-phone:w-[80%] pt-4 pr-4 shadow-md mb-8">
        <div className="w-1/2 h-10 2xl:w-[40%] 2xl:h-12 flex space-x-2 justify-center items-center">
          <span className="pr-2 text-[14px] font-[Overpass Regular]">now</span>
          <button
            className="w-[160px] h-[30px] text-[14px]  font-[Overpass Regular] bg-sky-700 text-zinc-50 rounded-md"
            onClick={handleZip}
          >
            ZIP ALL FILES
          </button>
        </div>
        <div className="w-1/2 2xl:w-[36%] h-10 2xl:h-12 flex space-x-3 justify-start items-center">
          <span className="text-[14px] 2xl:w-[36%] font-[Overpass Regular] text-right">
            or only download
          </span>
          <button
            className="w-[130px] h-[22px]  font-[Overpass Regular] bg-sky-700 text-zinc-50 text-[12px] rounded-md mt-1.5"
            onClick={handleDownloadSign}
          >
            SIGNATURE
          </button>
        </div>
      </div>
    </div>
  )
}
