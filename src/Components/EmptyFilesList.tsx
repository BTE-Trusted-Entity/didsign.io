import React from 'react'

export const EmptyFilesList = () => {
  const list = [1, 2, 3, 4, 5]
  return (
    <div className="flex flex-col pl-28  w-[96%] space-y-[45px]">
      {list.map((number) => (
        <div
          key={number}
          className="border-dotted border-[0.2px] border-[#4d6b85] opacity-80"
        ></div>
      ))}
    </div>
  )
}
