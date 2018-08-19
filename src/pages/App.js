import React, { Component } from 'react'
import Game from '../components/Game/index'
import './App.css'

class App extends Component {
  render () {
    const weaponItems = [
      { label: 'Rock', name: 'rock', winsTo: ['scissor'] },
      { label: 'Paper', name: 'paper', winsTo: ['rock'] },
      { label: 'Scissor', name: 'scissor', winsTo: ['paper'] }
    ]

    return (
      <Game
        weaponItems={weaponItems}
      />
    )
  }
}

export default App
