import React from "react"

function ImportIcon() {
    return (
        <svg className="mx-auto"
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
                <circle cx="34" cy="34" r="23" fill="#3E6E99"></circle>
                <path
                    fill="#FFF"
                    d="M34 21a3 3 0 013 3v20a3 3 0 01-6 0V24a3 3 0 013-3z"
                    transform="matrix(1 0 0 -1 0 68)"
                ></path>
                <path
                    fill="#FFF"
                    d="M38 28a3 3 0 013 3v14a3 3 0 01-6 0V31a3 3 0 013-3z"
                    transform="scale(-1 1) rotate(-33 0 166.286)"
                ></path>
                <path
                    fill="#FFF"
                    d="M30 28a3 3 0 013 3v14a3 3 0 01-6 0V31a3 3 0 013-3z"
                    transform="rotate(-33 30 38)"
                ></path>
            </g>
        </svg>
    )
}

export default ImportIcon
