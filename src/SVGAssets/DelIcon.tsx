import React, { MouseEventHandler } from "react"

function DelIcon() {
   
    return (
        <svg className="pointer-events-none"
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
                <circle cx="9" cy="9" r="7" fill="#2A2231"></circle>
                <g fill="#FFF" transform="rotate(45 .464 12.536)">
                    <g>
                        <rect width="2" height="8" x="3" y="0" rx="1"></rect>
                        <rect
                            width="2"
                            height="8"
                            x="3"
                            y="0"
                            rx="1"
                            transform="rotate(90 4 4)"
                        ></rect>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default DelIcon
