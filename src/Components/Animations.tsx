import React from 'react'
import '../Styles/animation.css'

export const SlowAnimation = () => {
  return (
    <div className="container bg-medium-blue">
      <div className="gradient"></div>
      <div className="circle circle1"></div>
    </div>
  )
}
export const FastAnimation = () => {
  return (
    <div className="container bg-light-green">
      <div className="gradient"></div>
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      <div className="circle circle5"></div>
    </div>
  )
}
