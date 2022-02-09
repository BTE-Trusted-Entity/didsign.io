import * as React from "react"

const SvgComponent = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg className="bottom-0 left-0 absolute h-1/5 pointer-events-none w-1/2" width={468} xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>{"Group 3"}</title>
        <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
                <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
                <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="c">
                <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="d">
                <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="e">
                <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="f">
                <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
            </linearGradient>
        </defs>
        <g fillRule="nonzero" fill="none" opacity={0.504}>
            <circle fill="url(#a)" cx={243.002} cy={284} r={147} />
            <path
                d="M6.002 0c58.542 0 106 47.458 106 106s-47.458 106-106 106c-2.014 0-4.015-.056-6.002-.167V.167C1.987.057 3.988 0 6.002 0Z"
                fill="url(#b)"
            />
            <circle fill="url(#a)" cx={150.002} cy={311} r={106} />
            <circle fill="url(#a)" cx={395.502} cy={394.5} r={72.5} />
            <path
                d="M270.42 414c37.235 0 67.42 30.185 67.42 67.42 0 4.928-.529 9.733-1.533 14.36H204.533A67.677 67.677 0 0 1 203 481.42c0-37.235 30.185-67.42 67.42-67.42Z"
                fill="url(#c)"
            />
            <path
                d="M114.263 433c35.675 0 64.878 27.709 67.263 62.779H47C49.384 460.709 78.588 433 114.263 433Z"
                fill="url(#d)"
            />
            <path
                d="M192.842 467c19.426 0 36.047 12.01 42.842 29.01H150c6.795-17 23.416-29.01 42.842-29.01Z"
                fill="url(#e)"
            />
            <circle fill="url(#a)" cx={171.652} cy={402.11} r={30} />
            <path
                d="M38.53 386c32.033 0 58 25.967 58 58 0 22.614-12.941 42.205-31.823 51.77H12.352A58.115 58.115 0 0 1 0 487.353v-86.706C10.245 391.535 23.741 386 38.53 386Z"
                fill="url(#f)"
            />
        </g>
    </svg>
)

export default SvgComponent
