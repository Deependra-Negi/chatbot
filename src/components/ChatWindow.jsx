import React, { useEffect, useState, useRef } from 'react'
import styles from './ChatWindow.module.css'
import Message from './Message';
import Reply from './Reply';

function ChatWindow() {

  const inpRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    let msgs = localStorage.getItem('messages');
    
    handleFocus();

    if (msgs == null) {
      setData([])
    } else {
      setData(JSON.parse(msgs))
    }
  },[msg])
  
  //focus on input field on page load
  function handleFocus() {
    inpRef.current.focus();
  }

  function handleSend(e) {
    if (localStorage.getItem('messages') == null) {
      localStorage.setItem('messages', JSON.stringify([msg]));
    }
    else {
      let arr = JSON.parse(localStorage.getItem('messages'))
      arr.push(msg)
      localStorage.setItem('messages', JSON.stringify(arr));
    }
    setMsg('')
  }

  function handleChange(e) {
    setMsg(e.target.value);
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      handleSend(e)
    }
  }
  return (
    <>
      
      <div>{data.length>0 ? data.map((el) => {
        return (
          <div className={styles.container}>
            <div className={styles.reply}>
            <Reply  reply={el}/>
            </div>
            <div className={styles.user}>
            <Message  message={el} />
            </div>
          </div>
          ) 
      }):<div></div>}</div>
      <div className={styles.footer}>
        <div className={styles.inputCont}>
          <input ref={inpRef} value={msg} onChange={handleChange} onKeyPress={handleEnter} type="text" />
        </div>
        <div className={styles.buttonCont}>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      
    </>
  )
}

export default ChatWindow