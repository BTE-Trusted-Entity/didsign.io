import React from 'react'

function SignVerifyBtn() {
    return <div>
        <div className="flex-row w-screen h-12 bg-mid-body">
            <button className="h-full w-1/2 bg-transparent font-normal text-xl uppercase underline big-phone:text-sm">SIGN</button>
            <button className="h-full w-1/2 bg-opacity-20 bg-sky-900 font-normal text-xl big-phone:text-sm">VERIFY</button>

        </div>
    </div>
}

export default SignVerifyBtn
