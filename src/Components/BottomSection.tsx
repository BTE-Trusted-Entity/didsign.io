import React from "react"
import Signature from "./Signature"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import SignBtn from "./SignBtn"
import { selectSign } from "../Features/Signer/SignatureSlice"
import { selectFile } from "../Features/Signer/FileSlice"
import Footer from "./Footer"
import BottomLeftBubble from "../SVGAssets/BottomLeftBubble"
import CenterRightBubble from "../SVGAssets/CenterRightBubble"
import CenterLeftBubble from "../SVGAssets/CenterLeftBubble"
import DownloadBtns from "./DownloadBtns"

function BottomSection() {
    const file = useAppSelector(selectFile)
    const sign = useAppSelector(selectSign)
    return <div className=" bg-bottom-body w-screen h-fit relative">
        <div className="flex-col items-center justify-center w-screen">
            {sign == "" ? <SignBtn /> : <DownloadBtns />}
        </div>
        
    </div>
}

export default BottomSection
