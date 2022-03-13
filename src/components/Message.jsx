import React from 'react'
import styles from './Message.module.css'

function Message({ message }) {
  console.log(message)
  return (
    <div className={styles.container}>{message}</div>
  )
}

export default Message