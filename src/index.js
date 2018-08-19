import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.css'
import './index.css'
import App from './pages/App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
