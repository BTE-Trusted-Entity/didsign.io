import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { DIDSign } from './Components/DIDSign'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './app/store'

ReactDOM.render(
  <Provider store={store}>
    <DIDSign />
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
