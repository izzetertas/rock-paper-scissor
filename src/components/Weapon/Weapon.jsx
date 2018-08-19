import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Weapon.scss'
import Icon from '../Icon/index'

class Weapon extends Component {
  render () {
    const { name, onClick } = this.props

    return (
      <div
        className={styles['wrapper']}
        onClick={() => onClick(name)}
      >
        <Icon name={name} />
      </div>
    )
  }
}

Weapon.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default CSSModules(Weapon, styles)
