import React from "react"

function OkIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
        >
            <defs>
                <circle cx="9" cy="9" r="9"></circle>
                <filter
                    id="filter-2"
                    width="133.3%"
                    height="133.3%"
                    x="-16.7%"
                    y="-16.7%"
                    filterUnits="objectBoundingBox"
                >
                    <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                        stdDeviation="1"
                    ></feGaussianBlur>
                    <feColorMatrix
                        in="shadowBlurOuter1"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.349764737 0"
                    ></feColorMatrix>
                </filter>
            </defs>
            <g fill="none" stroke="none">
                <g>
                    <use fill="#000" filter="url(#filter-2)"></use>
                    <use fill="#FFF"></use>
                </g>
                <circle cx="9" cy="9" r="7" fill="#11A770"></circle>
                <g fill="#FFF" transform="rotate(-15 26.713 -12.711)">
                    <rect
                        width="2"
                        height="8.5"
                        x="3.758"
                        y="-0.538"
                        rx="1"
                        transform="rotate(45 4.758 3.712)"
                    ></rect>
                    <rect
                        width="2"
                        height="5"
                        x="0.724"
                        y="1.721"
                        rx="1"
                        transform="rotate(162 1.724 4.221)"
                    ></rect>
                </g>
            </g>
        </svg>
    )
}

export default OkIcon
