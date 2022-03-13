import React from 'react'
import styles from './Header.module.css'

function Header() {
  return (
      <>
      <div className={styles.container}>
          <div><img className={styles.img} src="bot.jpg" alt="img" /></div>
          <div>Chatbot</div>
        </div>
          
    </>
  )
}

export default Header