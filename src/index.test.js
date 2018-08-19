/**
 * @jest-environment jsdom
 */

import React from 'react'
import ReactDOM from 'react-dom'
import PlayerPage from './pages/PlayerPage'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PlayerPage />, div)
  ReactDOM.unmountComponentAtNode(div)
})
