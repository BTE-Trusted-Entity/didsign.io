import React from 'react'
function CenterRightBubble(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
        <div className="absolute bottom-16 right-0 big-phone:w-60 big-phone:h-28 h-1/6 pointer-events-none">
            <svg width={354} height={128} xmlns="http://www.w3.org/2000/svg" {...props}>
                <title>{"Group 2"}</title>
                <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="117.847%" id="a">
                        <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                        <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="117.847%" id="b">
                        <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                        <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="117.847%" id="c">
                        <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                        <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="117.847%" id="d">
                        <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                        <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="117.847%" id="e">
                        <stop stopColor="#3E6E99" stopOpacity={0.298} offset="0%" />
                        <stop stopColor="#DDF0FF" stopOpacity={0} offset="100%" />
                    </linearGradient>
                </defs>
                <g fillRule="nonzero" fill="none" opacity={0.498}>
                    <path
                        d="M172.42 19c37.235 0 67.42 30.185 67.42 67.42 0 15.24-5.057 29.299-13.583 40.59H118.583C110.057 115.72 105 101.66 105 86.42 105 49.185 135.185 19 172.42 19Z"
                        fill="url(#a)"
                    />
                    <path
                        d="M249.42 49c37.235 0 67.42 30.185 67.42 67.42 0 3.603-.283 7.14-.827 10.59H182.827a67.921 67.921 0 0 1-.827-10.59C182 79.185 212.185 49 249.42 49Z"
                        fill="url(#b)"
                    />
                    <path
                        d="M193.464 105c16.73 0 31.38 8.908 39.465 22.24H154c8.084-13.332 22.734-22.24 39.464-22.24Z"
                        fill="url(#c)"
                    />
                    <path
                        d="M46.12 81c25.471 0 46.12 20.649 46.12 46.12v.12H0L0 127.12c0-25.217 20.238-45.707 45.357-46.114Z"
                        fill="url(#d)"
                    />
                    <path
                        d="M339.5 0c4.952 0 9.799.453 14.5 1.32V127l-78.254.002a79.128 79.128 0 0 1-15.735-46.187L260 79.5C260 35.593 295.593 0 339.5 0Z"
                        fill="url(#e)"
                    />
                </g>
            </svg>
        </div>
    )
}

export default CenterRightBubble
