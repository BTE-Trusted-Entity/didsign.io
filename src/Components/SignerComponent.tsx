import "../Styles/App.css"
import React from "react"
import Files from "./ImportFiles"
import FileList from "./FileList"
import Icon from "../SVGAssets/Icon"
import CenterRightBubble from "../SVGAssets/CenterRightBubble"
import BottomSection from "./BottomSection"
import Footer from "./Footer"
import CenterLeftBubble from "../SVGAssets/CenterLeftBubble"

function SignerComponent() {
    return (

        <div className="bg-mid-body w-screen overflow-y-hidden">
            <Files />
            <div className="flex-col -space-y-1 mx-auto w-[48%] h-16 2xl:h-56 xl:h-32 overflow-y-scroll mt-5 big-phone:w-2/3 scrollbar-thin scrollbar-thumb-sky-700">
                <FileList />
            </div>
            

        </div>

    )
}
export default SignerComponent



