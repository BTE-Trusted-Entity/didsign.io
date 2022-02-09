import React from "react"
import "../Styles/App.css"
import Header from "./Header"
import SignerComponent from "./SignerComponent"
import VerifyerComponent from "./VerifyerComponent"
import SignVerifyBtn from "./SignVerifyBtn"
import Footer from "./Footer"
import BottomLeftBubble from "../SVGAssets/BottomLeftBubble"
import BottomRightBubble from "../SVGAssets/BottomRightBubble"
import TopLeftBubble from "../SVGAssets/TopLeftBubble"
import TopRightBubble from "../SVGAssets/TopRightBubble"
import BottomSection from "./BottomSection"
import CenterRightBubble from "../SVGAssets/CenterRightBubble"
import CenterLeftBubble from "../SVGAssets/CenterLeftBubble"

const Signer = true
function showSigner() {
    return <SignerComponent />
}
function showVerifyer() {
    return <VerifyerComponent />
}
function RenderTopBubbles() {
    return (
        <div>

            <TopLeftBubble />


            <TopRightBubble />

        </div>
    )
}
function DIDSign() {
    return (
        <div className="relative h-screen w-screen bg-bottom-body">
            <RenderTopBubbles />
            <div className="flex flex-col overflow-x-hidden">
                <Header />
                <SignVerifyBtn />
                {Signer ? showSigner() : showVerifyer()}
            </div>
            
            <BottomSection />
            <BottomLeftBubble />
            <BottomRightBubble />
            <Footer />

        </div>
    )
}
export default DIDSign


