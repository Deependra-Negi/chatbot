import React from 'react'
import styles from './Reply.module.css'

function Reply({reply}) {
  return (
    <div className={styles.container}>{reply}</div>
  )
}

export default Reply