import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp)