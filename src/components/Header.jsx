import styles from './Header.module.css'
import { RiDeleteBin6Line } from 'react-icons/ri';

function Header({clearChat}) {

  function handleClear() {
    clearChat();
  }

  return (
      <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div><img className={styles.img} src="bot.jpg" alt="img" /></div>
          <div>Chatbot</div>
        </div>
          
        <div>
          <div className={styles.clearBtn} onClick={handleClear} title="Clear Chat"><RiDeleteBin6Line /></div>
        </div>
        </div>
          
    </>
  )
}

export default Header