import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Icon.css'

class Icon extends Component {
  constructor (props) {
    super(props)
    this.state = { icon: null }
  }

  getIcon (name) {
    let icon

    try {
      icon = require(`../../assets/icons/${name}.svg`)
    } catch (e) {
      console.warn(e)
    }

    return icon
  }

  componentWillMount () {
    const icon = this.getIcon(this.props.name)
    this.setState({icon})
  }

  render () {
    const { icon } = this.state
    const { name } = this.props
    if (icon) {
      return <img src={icon} alt={name} title={name} />
    }

    return null
  }
}

Icon.propTypes = {
  /** Name of the icon to display */
  name: PropTypes.string.isRequired
}

export default CSSModules(Icon, styles)
