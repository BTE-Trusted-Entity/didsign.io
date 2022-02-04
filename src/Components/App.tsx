import React from "react"
import "../Styles/App.css"
import Header from "./Header"
import SignerComponent from "./SignerComponent"
import VerifyerComponent from "./VerifyerComponent"
import ZipButton from "./ZipButton"
import video from '../ImageAssets/animation.mp4'
import SignVerifyBtn from "./SignVerifyBtn"
import Footer from "./Footer"

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
            <div className="absolute mt-0 ml-0">

                <svg width="355px" height="159px" viewBox="0 0 355 159" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>Group 5</title>
                    <defs>
                        <linearGradient x1="50%" y1="100%" x2="50%" y2="-2.96410775e-15%" id="linearGradient-1">
                            <stop stopColor="#3E6E99" stopOpacity="0.5" offset="0%"></stop>
                            <stop stopColor="#2A2231" stopOpacity="0" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="115.259024%" x2="50%" y2="-2.96410775e-15%" id="linearGradient-2">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.5" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="164.972052%" x2="50%" y2="-0.0108412836%" id="linearGradient-3">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.7" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="117.396585%" x2="50%" y2="-0.0108412836%" id="linearGradient-4">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.7" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="100%" x2="50%" y2="-0.0108412836%" id="linearGradient-5">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.7" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <g id="UI-Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.601981027">
                        <g id="Bubbles" transform="translate(0.000000, -11.000000)" fillRule="nonzero">
                            <g id="Group-5" transform="translate(0.000000, 11.000000)">
                                <circle id="Oval" fillOpacity="0.46" fill="url(#linearGradient-1)" transform="translate(182.070079, 86.410000) scale(-1, -1) translate(-182.070079, -86.410000) " cx="182.070079" cy="86.41" r="67.42"></circle>
                                <path d="M105.070079,48.99 C142.305117,48.99 172.490079,79.1749622 172.490079,116.41 C172.490079,132.002512 167.196868,146.358728 158.309317,157.779778 L51.8308417,157.779778 C42.9432901,146.358728 37.6500792,132.002512 37.6500792,116.41 C37.6500792,79.1749622 67.8350413,48.99 105.070079,48.99 Z" id="Combined-Shape" fillOpacity="0.45" fill="url(#linearGradient-2)"></path>
                                <path d="M160.120079,104.76 C185.591452,104.76 206.240079,125.408627 206.240079,150.88 C206.240079,153.224967 206.06507,155.529058 205.727401,157.779926 L114.512757,157.779926 C114.175088,155.529058 114.000079,153.224967 114.000079,150.88 C114.000079,125.408627 134.648707,104.76 160.120079,104.76 Z" id="Combined-Shape" fillOpacity="0.5" fill="url(#linearGradient-3)"></path>
                                <path d="M308.120079,80.76 C333.591452,80.76 354.240079,101.408627 354.240079,126.88 C354.240079,138.766479 349.743389,149.602701 342.358321,157.78035 L273.881837,157.78035 C266.496769,149.602701 262.000079,138.766479 262.000079,126.88 C262.000079,101.408627 282.648707,80.76 308.120079,80.76 Z" id="Combined-Shape" fillOpacity="0.45" fill="url(#linearGradient-4)"></path>
                                <path d="M14.5000792,0 C58.4067168,0 94.0000792,35.5933624 94.0000792,79.5 C94.0000792,123.406638 58.4067168,159 14.5000792,159 C9.54791707,159 4.70151011,158.547208 4.38760139e-13,157.680767 L4.41424675e-13,1.31923309 C4.70151011,0.452791601 9.54791707,0 14.5000792,0 Z" id="Combined-Shape" fillOpacity="0.45" fill="url(#linearGradient-5)"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div className="absolute mt-0 right-0">
                <svg width="502px" height="170px" viewBox="0 0 502 170" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>Group 6</title>
                    <defs>
                        <linearGradient x1="50%" y1="104.071552%" x2="50%" y2="-8.4737066%" id="linearGradient-1">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.500102437" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="100%" x2="50%" y2="-10.6424948%" id="linearGradient-2">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.5" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="100%" x2="50%" y2="-2.96410775e-15%" id="linearGradient-3">
                            <stop stopColor="#3E6E99" stopOpacity="0.5" offset="0%"></stop>
                            <stop stopColor="#2A2231" stopOpacity="0" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="139.994205%" x2="50%" y2="-2.96410775e-15%" id="linearGradient-4">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.5" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="100%" x2="50%" y2="-0.0108412836%" id="linearGradient-5">
                            <stop stopColor="#3E6E99" stopOpacity="0.7" offset="0%"></stop>
                            <stop stopColor="#2A2231" stopOpacity="0" offset="100%"></stop>
                        </linearGradient>
                        <linearGradient x1="50%" y1="133.396866%" x2="50%" y2="-0.0108412836%" id="linearGradient-6">
                            <stop stopColor="#2A2231" stopOpacity="0" offset="0%"></stop>
                            <stop stopColor="#3E6E99" stopOpacity="0.7" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <g id="UI-Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.601981027">
                        <g id="Bubbles" transform="translate(-938.000000, 0.000000)" fillRule="nonzero">
                            <g id="Group-6" transform="translate(938.000000, 0.000000)">
                                <path d="M501.999889,0 L501.998889,169.839 L480.912966,169.839665 C445.904191,156.535293 421.024889,122.67022 421.024889,82.9942743 C421.024889,46.7087125 441.833895,15.2833544 472.16937,0.000734934152 L501.999889,0 Z" id="Combined-Shape" fillOpacity="0.4" fill="url(#linearGradient-1)"></path>
                                <path d="M355.404558,52.0662116 C355.404558,89.0478296 325.425034,119.027354 288.443416,119.027354 C251.461798,119.027354 221.482273,89.0478296 221.482273,52.0662116 C221.482273,31.0401176 231.173307,12.2774859 246.332391,0.00130182893 L330.554441,0.00130182893 C345.713524,12.2774859 355.404558,31.0401176 355.404558,52.0662116 Z" id="Combined-Shape" fillOpacity="0.4" fill="url(#linearGradient-2)"></path>
                                <circle id="Oval-Copy-2" fillOpacity="0.4" fill="url(#linearGradient-3)" transform="translate(408.619896, 100.732720) scale(1, -1) translate(-408.619896, -100.732720) " cx="408.619896" cy="100.73272" r="66.9611428"></circle>
                                <path d="M66.9611428,77.4721154 C103.942761,77.4721154 133.922286,107.45164 133.922286,144.433258 C133.922286,153.047733 132.295574,161.282268 129.332574,168.846443 L4.58971179,168.846443 C1.6267114,161.282268 0,153.047733 0,144.433258 C0,107.45164 29.9795248,77.4721154 66.9611428,77.4721154 Z" id="Combined-Shape" fillOpacity="0.4" fill="url(#linearGradient-4)"></path>
                                <circle id="Oval" fillOpacity="0.45" fill="url(#linearGradient-5)" transform="translate(328.121518, 101.199521) scale(1, -1) translate(-328.121518, -101.199521) " cx="328.121518" cy="101.199521" r="45.8061095"></circle>
                                <path d="M152.326171,101.080338 C177.624187,101.080338 198.132281,121.588432 198.132281,146.886447 C198.132281,154.843305 196.103498,162.326315 192.534999,168.846411 L112.117344,168.846411 C108.548844,162.326315 106.520062,154.843305 106.520062,146.886447 C106.520062,121.588432 127.028156,101.080338 152.326171,101.080338 Z" id="Combined-Shape" fillOpacity="0.4" fill="url(#linearGradient-6)"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    )
}
function App() {



    return (
        <div>
            <RenderTopBubbles />
            <div className="flex flex-col overflow-x-hidden">
                <Header />
                <SignVerifyBtn />
                {Signer ? showSigner() : showVerifyer()}
                <ZipButton />
                <Footer />
                
            </div>
        </div>
    )
}
export default App


