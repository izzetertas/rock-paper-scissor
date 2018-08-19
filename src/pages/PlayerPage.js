import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import contentService from '../services/contentService'
import styles from './PlayerPage.scss'
import Player from '../components/Player/index'

class PlayerPage extends Component {
  state = {
    players: [],
    loading: true,
    errorMessage: null
  }

  componentDidMount() {
    contentService.getPlayers()
      .then((data) => {
        this.setState({ players: data, loading : false })
      })
      .catch(error => {
        this.setState({ players: [], loading : false, errorMessage: error })
      })
  }

  render () {
    const { loading, errorMessage, players } = this.state
    if (loading) {
      return <div>Loading...</div>
    }

    if (errorMessage) {
      return <div>There has been an error loading this page. Please try again later.{errorMessage}</div>
    }

    const playersContent = (
      players.map((item, i) => (<Player key={i} {...item} />))
    )

    return (
      <div className={styles['player-list']}>
        <h1>Player List</h1>
        {playersContent}
      </div>
    )
  }
}
export default CSSModules(PlayerPage, styles)
