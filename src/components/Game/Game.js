import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Icon from '../Icon/index'
import WeaponList from '../WeaponList/index'
import styles from './Game.scss'
 

class Game extends Component {
  constructor (props) {
    super(props)
    this.modes = {
      playerVsComputer: {
        label: 'Player vs Computer',
        player1Label: 'Player',
        player2Label: 'Computer'
      },
      computerVsComputer: {
        label: 'Computer vs Computer',
        player1Label: 'Computer1',
        player2Label: 'Computer2'
      }
    }
    this.initialState = {
      scores: {
        player1: 0,
        player2: 0
      },
      player1Choice: null,
      player2Choice: null,
      whoWonLastRound: null,
      roundNumber: 1,
      activeMode: null,
      showNextRoundButton: false,
      showSelectedWeaponBlock: false,
      weaponSelected: false,
      isGameOver: false,
      selectedMode: Object.keys(this.modes)[0]
    }

    this.state = this.initialState
  }

  get isGameOver() {
    const { isGameOver } = this.state
    return isGameOver
  }

  getRandomWeapon () {
    const { weaponItems } = this.props
    const weaponKeys = Object.keys(weaponItems)
    return weaponItems[ Math.floor(Math.random() * Math.floor(weaponKeys.length)) ]
  };

  updateScores () {
    const { maxRoundCount } = this.props
    const { player1Choice, player2Choice, activeMode, roundNumber } = this.state
    const { player1Label, player2Label } = this.modes[activeMode]
    const showNextRoundButton = (roundNumber + 1) <= maxRoundCount && activeMode !== 'computerVsComputer'

    if (player1Choice.winsTo.includes(player2Choice.name)) {
      this.setState((prevState, props) => {
        return {
          scores: {
            player1: prevState.scores.player1 + 1,
            player2: prevState.scores.player2
          },
          whoWonLastRound: `${player1Label} won this round`,
          roundNumber: (prevState.roundNumber <= maxRoundCount) ? prevState.roundNumber : prevState.roundNumber + 1,
          showNextRoundButton: showNextRoundButton
        }
      })
    } else if (player2Choice.winsTo.includes(player1Choice.name)) {
      this.setState((prevState) => {
        return {
          scores: {
            player1: prevState.scores.player1,
            player2: prevState.scores.player2 + 1
          },
          whoWonLastRound: `${player2Label} won this round`,
          roundNumber: (prevState.roundNumber <= maxRoundCount) ? prevState.roundNumber : prevState.roundNumber + 1,
          showNextRoundButton: showNextRoundButton
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          whoWonLastRound: 'TIE',
          roundNumber: (prevState.roundNumber <= maxRoundCount) ? prevState.roundNumber : prevState.roundNumber + 1,
          showNextRoundButton: showNextRoundButton
        }
      })
    }
  }

  startNewGame () {
    const { selectedMode } = this.state
    this.setState(
      {...this.initialState, activeMode: selectedMode},
      () => {
        if (selectedMode === 'computerVsComputer') {
          this.startAutoGame()
        }
      }
    )
  }

  startAutoGame () {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        showSelectedWeaponBlock: true,
        player1Choice: this.getRandomWeapon(),
        player2Choice: this.getRandomWeapon()
      }), () => {
        this.updateScores()
        this.timeout = setTimeout(() => {
          const { winRoundCount } = this.props
          const { player1, player2 } = this.state.scores

          this.setState((prevState, props) => ({ 
            weaponSelected: true,
            showNextRoundButton : false,
            showSelectedWeaponBlock: prevState.roundNumber < props.maxRoundCount ? false : true,
            roundNumber: prevState.roundNumber < props.maxRoundCount ? prevState.roundNumber + 1 : prevState.roundNumber,
            isGameOver: prevState.roundNumber === props.maxRoundCount ||  player1 === winRoundCount || player2 === winRoundCount
          }), () => {
            if(this.isGameOver) return this.stopAutoGame()
          })
        }, 2000)
      })
    }, 5000)
  }

  stopAutoGame() {
    clearTimeout(this.timeout)
    clearInterval(this.timer)
  }

  handleModeChange = (e) => {
    this.setState({ selectedMode: e.target.value })
  }

  weaponOnClickHandler (weapon) {
    if(this.isGameOver) return

    this.setState({
      weaponSelected: true,
      showSelectedWeaponBlock: true,
      player1Choice: weapon,
      player2Choice: this.getRandomWeapon()
    }, () => {
      this.updateScores()
      this.timeout = setTimeout(() => { 
        const { maxRoundCount, winRoundCount } = this.props
        const { roundNumber, scores } = this.state
        const { player1, player2 } = scores
        this.setState({ 
          isGameOver: roundNumber === maxRoundCount ||  player1 === winRoundCount || player2 === winRoundCount
        })
      })
    })
  }  

  nextRoundOnClickHandler () {
    this.setState((prevState, props) => ({ 
      weaponSelected: false,
      showNextRoundButton : false,
      showSelectedWeaponBlock: false,
      roundNumber: prevState.roundNumber < props.maxRoundCount ? prevState.roundNumber + 1 : prevState.roundNumber
    }))
  }

  renderPlayerBoard () {
    const { maxRoundCount } = this.props
    const { scores, roundNumber, activeMode } = this.state
    if (!activeMode) return null

    const { player1Label, player2Label } = this.modes[activeMode]

    return (
      <div className={styles['player-board-wrapper']}>
        <div className={styles['player-board-item']}>
          <div className={styles['player-name']}>{player1Label}</div>
          <div className={styles['player-score']}>{scores.player1}</div>
        </div>
        <div className={styles['player-board-versus']}>
          <div>vs</div>
          {roundNumber <= maxRoundCount && <div>Round {roundNumber}</div>}
        </div>
        <div className={styles['player-board-item']}>
          <div className={styles['player-name']}>{player2Label}</div>
          <div className={styles['player-score']}>{scores.player2}</div>
        </div>
      </div>
    )
  }

  renderNewGame () {
    const modeContent = Object.keys(this.modes).map((item, ind) => (
      <option value={item} key={ind}>
        {this.modes[item].label}
      </option>
    ))

    return (
      <div>
        <div className={styles['game-mode']}>Select game mode</div>
        <div>
          <select
            onChange={this.handleModeChange}
          >
            {modeContent}
          </select>
        </div>
        <div>
          <button onClick={() => this.startNewGame()}>Start New Game</button>
        </div>
      </div>
    )
  }

  renderPlayerChoices () {
    const { player1Choice, player2Choice, whoWonLastRound, showSelectedWeaponBlock } = this.state
    if(!player1Choice || !player2Choice || !showSelectedWeaponBlock) {
      return <div className={styles['player-choice-wrapper']} />
    }
    return (
      <div className={styles['player-choice-wrapper']}>
        <div className={styles['player-choice-item']}>
          <Icon name={player1Choice.name} alt={player1Choice.label} />
        </div>
        <div className={styles['player-choice-result']}>
          {whoWonLastRound}
        </div>
        <div className={styles['player-choice-item']}>
          <Icon name={player2Choice.name} alt={player2Choice.label} />
        </div>
      </div>
    )
  }

  renderAutoGameWarning() {
    if(!this.isGameOver && this.state.activeMode === 'computerVsComputer') {
      return (
        <div>New round will start soon automatically...</div>
      )
    }
    return null
  }

  renderGameOver () {
    if (!this.isGameOver) return null
    const { player1, player2 } = this.state.scores
    return (
      <div className={styles['game-over']}>
        <div>GAME OVER</div>
        {player1 > player2 && <div>Player1 won</div>}
        {player1 < player2 && <div>Player2 won</div>}
        {player1 === player2 && <div>TIE</div>}
      </div>
    )
  }

  renderWeaponList (){
    const { weaponItems } = this.props
    const { showNextRoundButton, activeMode } = this.state

    if(this.isGameOver || activeMode === 'computerVsComputer') return null

    if(showNextRoundButton){
      return (
        <div className={styles['next-round']}>
          <button onClick={() => this.nextRoundOnClickHandler()}>Start next round</button>
        </div>
      )
    }
    
    return <WeaponList items={weaponItems} onClick={(weapon) => this.weaponOnClickHandler(weapon)} />
  }

  render () {
    const { activeMode } = this.state

    if (!activeMode) {
      return (
        <div className={styles['wrapper']}>
          {this.renderNewGame()}
        </div>
      )
    }

    return (
      <div className={styles['wrapper']}>
        {this.renderPlayerBoard()}
        {this.renderPlayerChoices()}
        {this.renderWeaponList()}
        {this.renderGameOver()}
        {this.renderAutoGameWarning()}
        {this.isGameOver && this.renderNewGame()}
      </div>
    )
  }
}

Game.propTypes = {
  weaponItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      winsTo: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  activeMode: PropTypes.oneOf(['playerVsComputer', 'computerVsComputer']),
  maxRoundCount: PropTypes.number,
  winRoundCount: PropTypes.number
}

Game.defaultProps = {
  weaponItems: [
    { label: 'Rock', name: 'rock', winsTo: ['scissor'] },
    { label: 'Paper', name: 'paper', winsTo: ['rock'] },
    { label: 'Scissor', name: 'scissor', winsTo: ['paper'] }
  ],
  maxRoundCount: 5,
  winRoundCount: 3
}

export default CSSModules(Game, styles)
