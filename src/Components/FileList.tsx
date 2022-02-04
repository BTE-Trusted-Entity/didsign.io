import React from 'react'


function Buttons() {
    return (
        <div className="flex space-x-2 ml-auto">

            <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>General/iconOK</title>
                <defs>
                    <circle id="path-1" cx="9" cy="9" r="9"></circle>
                    <filter x="-16.7%" y="-16.7%" width="133.3%" height="133.3%" filterUnits="objectBoundingBox" id="filter-2">
                        <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.349764737 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g id="General/iconOK" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Oval-Copy-13">
                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
                    </g>
                    <circle id="Oval" fill="#11A770" cx="9" cy="9" r="7"></circle>
                    <g id="Group-2" transform="translate(9.251664, 8.970361) rotate(-15.000000) translate(-9.251664, -8.970361) translate(5.016673, 5.258051)" fill="#FFFFFF">
                        <rect id="Rectangle-Copy" transform="translate(4.757673, 3.712311) rotate(-315.000000) translate(-4.757673, -3.712311) " x="3.75767318" y="-0.537689399" width="2" height="8.5" rx="1"></rect>
                        <rect id="Rectangle-Copy-2" transform="translate(1.723599, 4.221130) rotate(-558.000000) translate(-1.723599, -4.221130) " x="0.723599002" y="1.72112965" width="2" height="5" rx="1"></rect>
                    </g>
                </g>
            </svg>


            <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>General/iconDelete</title>
                <defs>
                    <circle id="path-1" cx="9" cy="9" r="9"></circle>
                    <filter x="-16.7%" y="-16.7%" width="133.3%" height="133.3%" filterUnits="objectBoundingBox" id="filter-2">
                        <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.349764737 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g id="General/iconDelete" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Oval-Copy-13">
                        <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                        <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
                    </g>
                    <circle id="Oval" fill="#2A2231" cx="9" cy="9" r="7"></circle>
                    <g id="Group" transform="translate(9.000000, 9.000000) rotate(-315.000000) translate(-9.000000, -9.000000) translate(5.000000, 5.000000)" fill="#FFFFFF">
                        <g id="Group-2" transform="translate(0.000000, 0.000000)">
                            <rect id="Rectangle-Copy" x="3" y="0" width="2" height="8" rx="1"></rect>
                            <rect id="Rectangle-Copy-2" transform="translate(4.000000, 4.000000) rotate(-270.000000) translate(-4.000000, -4.000000) " x="3" y="0" width="2" height="8" rx="1"></rect>
                        </g>
                    </g>
                </g>
            </svg>

        </div>
    )
}

function FileList() {
    return <div className="flex-col -space-y-1 mx-auto w-1/3 overflow-y-scroll scroll-co mt-5 h-48">
        <div className="flex flex-col space-y-1">
            <div className="flex items-center mt-2">
                <svg width="22px" height="30px" viewBox="0 0 22 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>doc_type/image</title>
                    <g id="doc_type/image" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-9">
                            <g id="Group-3">
                                <rect id="Rectangle" stroke="#3E6E99" fill="#FFFFFF" x="0.5" y="0.5" width="21" height="29"></rect>
                                <rect id="Rectangle" fill="#3E6E99" x="3.74468085" y="10.6153846" width="14.9787234" height="9.23076923"></rect>
                            </g>
                            <g id="Group" transform="translate(3.744681, 10.615385)" fill="#FFFFFF">
                                <polygon id="Triangle" points="4.68085106 3.23076923 8.42553191 8.30769231 0.936170213 8.30769231"></polygon>
                                <polygon id="Triangle-Copy" points="8.68085106 4.15384615 11.7446809 8.30769231 5.61702128 8.30769231"></polygon>
                                <ellipse id="Oval" cx="12.1702128" cy="2.76923077" rx="1.40425532" ry="1.38461538"></ellipse>
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="mx-2 flex -space-y-1 flex-col">
                    <span className="text-left text-gray-900text-md 3xl:text-lg">File_1.png</span>
                    <span className="text-left text-gray-900 font text-sm 3xl:text-md">146KB</span>

                </div>
                <Buttons />

            </div>
            <div className="bg-slate-900 h-px w-full"></div>
        </div>
        <div className="flex flex-col space-y-1 ">
            <div className="flex items-center mt-2">
                <svg width="22px" height="30px" viewBox="0 0 22 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>doc_type/image</title>
                    <g id="doc_type/image" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-9">
                            <g id="Group-3">
                                <rect id="Rectangle" stroke="#3E6E99" fill="#FFFFFF" x="0.5" y="0.5" width="21" height="29"></rect>
                                <rect id="Rectangle" fill="#3E6E99" x="3.74468085" y="10.6153846" width="14.9787234" height="9.23076923"></rect>
                            </g>
                            <g id="Group" transform="translate(3.744681, 10.615385)" fill="#FFFFFF">
                                <polygon id="Triangle" points="4.68085106 3.23076923 8.42553191 8.30769231 0.936170213 8.30769231"></polygon>
                                <polygon id="Triangle-Copy" points="8.68085106 4.15384615 11.7446809 8.30769231 5.61702128 8.30769231"></polygon>
                                <ellipse id="Oval" cx="12.1702128" cy="2.76923077" rx="1.40425532" ry="1.38461538"></ellipse>
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="mx-2 flex -space-y-1 flex-col">
                    <span className="text-left text-gray-900text-md 3xl:text-lg ">File_1.png</span>
                    <span className="text-left text-gray-900 font text-sm 3xl:text-md">146KB</span>

                </div>

                <Buttons />
            </div>
            <div className="bg-slate-900 h-px w-full"></div>
        </div>
        <div className="flex flex-col space-y-1">
            <div className="flex items-center mt-2">
                <svg width="22px" height="30px" viewBox="0 0 22 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>doc_type/image</title>
                    <g id="doc_type/image" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-9">
                            <g id="Group-3">
                                <rect id="Rectangle" stroke="#3E6E99" fill="#FFFFFF" x="0.5" y="0.5" width="21" height="29"></rect>
                                <rect id="Rectangle" fill="#3E6E99" x="3.74468085" y="10.6153846" width="14.9787234" height="9.23076923"></rect>
                            </g>
                            <g id="Group" transform="translate(3.744681, 10.615385)" fill="#FFFFFF">
                                <polygon id="Triangle" points="4.68085106 3.23076923 8.42553191 8.30769231 0.936170213 8.30769231"></polygon>
                                <polygon id="Triangle-Copy" points="8.68085106 4.15384615 11.7446809 8.30769231 5.61702128 8.30769231"></polygon>
                                <ellipse id="Oval" cx="12.1702128" cy="2.76923077" rx="1.40425532" ry="1.38461538"></ellipse>
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="mx-2 flex -space-y-1 flex-col">
                    <span className="text-left text-gray-900text-md 3xl:text-lg">File_1.png</span>
                    <span className="text-left text-gray-900 font text-sm 3xl:text-md">146KB</span>

                </div>

                <Buttons />
            </div>
            <div className="bg-slate-900 h-px w-full"></div>
        </div>
        <div className="flex flex-col space-y-1">
            <div className="flex items-center mt-2">
                <svg width="22px" height="30px" viewBox="0 0 22 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>doc_type/image</title>
                    <g id="doc_type/image" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-9">
                            <g id="Group-3">
                                <rect id="Rectangle" stroke="#3E6E99" fill="#FFFFFF" x="0.5" y="0.5" width="21" height="29"></rect>
                                <rect id="Rectangle" fill="#3E6E99" x="3.74468085" y="10.6153846" width="14.9787234" height="9.23076923"></rect>
                            </g>
                            <g id="Group" transform="translate(3.744681, 10.615385)" fill="#FFFFFF">
                                <polygon id="Triangle" points="4.68085106 3.23076923 8.42553191 8.30769231 0.936170213 8.30769231"></polygon>
                                <polygon id="Triangle-Copy" points="8.68085106 4.15384615 11.7446809 8.30769231 5.61702128 8.30769231"></polygon>
                                <ellipse id="Oval" cx="12.1702128" cy="2.76923077" rx="1.40425532" ry="1.38461538"></ellipse>
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="mx-2 flex -space-y-1 flex-col">
                    <span className="text-left text-gray-900text-md 3xl:text-lg">File_1.png</span>
                    <span className="text-left text-gray-900 font text-sm 3xl:text-md">146KB</span>

                </div>
                <Buttons />
            </div>
            <div className="bg-slate-900 h-px w-full"></div>

        </div>
        <div className="flex flex-col space-y-1">
            <div className="flex items-center mt-2">
                <svg width="22px" height="30px" viewBox="0 0 22 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>doc_type/image</title>
                    <g id="doc_type/image" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-9">
                            <g id="Group-3">
                                <rect id="Rectangle" stroke="#3E6E99" fill="#FFFFFF" x="0.5" y="0.5" width="21" height="29"></rect>
                                <rect id="Rectangle" fill="#3E6E99" x="3.74468085" y="10.6153846" width="14.9787234" height="9.23076923"></rect>
                            </g>
                            <g id="Group" transform="translate(3.744681, 10.615385)" fill="#FFFFFF">
                                <polygon id="Triangle" points="4.68085106 3.23076923 8.42553191 8.30769231 0.936170213 8.30769231"></polygon>
                                <polygon id="Triangle-Copy" points="8.68085106 4.15384615 11.7446809 8.30769231 5.61702128 8.30769231"></polygon>
                                <ellipse id="Oval" cx="12.1702128" cy="2.76923077" rx="1.40425532" ry="1.38461538"></ellipse>
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="mx-2 flex -space-y-1 flex-col">
                    <span className="text-left text-gray-900text-md 3xl:text-lg">File_1.png</span>
                    <span className="text-left text-gray-900 font text-sm 3xl:text-md">146KB</span>

                </div>

                <Buttons />
            </div>
            <div className="bg-slate-900 h-px w-full"></div>

        </div>
        <div className="flex flex-col space-y-1">
            <div className="flex items-center mt-2">
                <svg width="22px" height="30px" viewBox="0 0 22 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>doc_type/image</title>
                    <g id="doc_type/image" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Group-9">
                            <g id="Group-3">
                                <rect id="Rectangle" stroke="#3E6E99" fill="#FFFFFF" x="0.5" y="0.5" width="21" height="29"></rect>
                                <rect id="Rectangle" fill="#3E6E99" x="3.74468085" y="10.6153846" width="14.9787234" height="9.23076923"></rect>
                            </g>
                            <g id="Group" transform="translate(3.744681, 10.615385)" fill="#FFFFFF">
                                <polygon id="Triangle" points="4.68085106 3.23076923 8.42553191 8.30769231 0.936170213 8.30769231"></polygon>
                                <polygon id="Triangle-Copy" points="8.68085106 4.15384615 11.7446809 8.30769231 5.61702128 8.30769231"></polygon>
                                <ellipse id="Oval" cx="12.1702128" cy="2.76923077" rx="1.40425532" ry="1.38461538"></ellipse>
                            </g>
                        </g>
                    </g>
                </svg>
                <div className="mx-2 flex -space-y-1 flex-col">
                    <span className="text-left text-gray-900text-md 3xl:text-lg">File_1.png</span>
                    <span className="text-left text-gray-900 font text-sm 3xl:text-md">146KB</span>

                </div>

                <Buttons />
            </div>
            <div className="bg-slate-900 h-px w-full"></div>

        </div>

    </div>

}

export default FileList
