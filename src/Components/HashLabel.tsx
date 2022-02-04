import React from "react"

interface props{
    hash:string
}

function HashLabel(props:props) {
    return <div className="mx-auto mt-4 text-red-800 text-center h-20">
        <label >Hash:{props.hash}</label>

    </div>
}

export default HashLabel
