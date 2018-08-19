import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import Weapon from '../Weapon/index'
import styles from './WeaponList.css'

const WeaponList = ({ items, onClick }) => (
  <Fragment>
    <div className={styles['weapon-list-header']}>Select a weapon</div>
    <div className={styles['weapon-list']}>
      {items.map((item, key) => (
        <Weapon
          key={key}
          {...item}
          onClick={() => onClick(item)}
        />
      ))}
    </div>
  </Fragment>
)

export default CSSModules(WeaponList, styles)
