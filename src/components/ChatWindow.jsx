import React, { useEffect, useState, useRef } from 'react'
import styles from './ChatWindow.module.css'
import Message from './Message';
import Reply from './Reply';
import { v4 as uuid } from 'uuid';

function ChatWindow() {

  const scrollRef = useRef();
  // const inpRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

    useEffect(() => {
    //to scroll into view of new message
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    let msgs = localStorage.getItem('messages');
    
    // handleFocus();

    if (msgs == null) {
      setData([])
    } else {
      setData(JSON.parse(msgs))
    }
  },[msg])
  

  //focus on input field on page load
  // function handleFocus() {
  //   inpRef.current.focus();
  // }

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
    setTimeout(() => {
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
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
    <div className={styles.chatWindow}>
      
      <div >{data.length>0 ? data.map((el) => {
        return (
          <div key={uuid()} className={styles.container}>
            <div className={styles.reply}>
            <Reply reply={el}/>
            </div>
            <div ref={scrollRef} className={styles.user}>
            <Message message={el} />
            </div>
          </div>
          ) 
      }) : <div></div>}
      </div>
      <div className={styles.footer}>
        <div className={styles.inputCont}>
          <input value={msg} onChange={handleChange} onKeyPress={handleEnter} type="text" />
          {/* <input ref={inpRef} value={msg} onChange={handleChange} onKeyPress={handleEnter} type="text" /> */}
        </div>
        <div className={styles.buttonCont}>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      
    </div>
  )
}

export default ChatWindow