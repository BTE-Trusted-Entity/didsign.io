import React from "react"

function BigOk() {
    return (
        <svg className="absolute mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="68"
            height="68"
            viewBox="0 0 68 68"
        >
            <defs>
                <circle id="path-1" cx="34" cy="34" r="34"></circle>
                <filter
                    id="filter-2"
                    width="108.8%"
                    height="108.8%"
                    x="-4.4%"
                    y="-4.4%"
                    filterUnits="objectBoundingBox"
                >
                    <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                        stdDeviation="1"
                    ></feGaussianBlur>
                    <feComposite
                        in="shadowBlurOuter1"
                        in2="SourceAlpha"
                        operator="out"
                        result="shadowBlurOuter1"
                    ></feComposite>
                    <feColorMatrix
                        in="shadowBlurOuter1"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.349764737 0"
                    ></feColorMatrix>
                </filter>
            </defs>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g>
                    <use fill="#000" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                    <use fill="#FFF" fillOpacity="0.499" xlinkHref="#path-1"></use>
                </g>
                <circle cx="34" cy="34" r="23" fill="#11A770"></circle>
                <g fill="#FFF" transform="translate(21.945 21.889)">
                    <path
                        d="M15.145-.242a3 3 0 013 3v20a3 3 0 11-6 0v-20a3 3 0 013-3z"
                        transform="rotate(30 15.145 12.758)"
                    ></path>
                    <path
                        d="M7.145 7.758a3 3 0 013 3v11a3 3 0 11-6 0v-11a3 3 0 013-3z"
                        transform="rotate(147 7.145 16.258)"
                    ></path>
                </g>
            </g>
        </svg>
    )
}

export default BigOk
