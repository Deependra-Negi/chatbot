import React, { useEffect, useState, useRef } from 'react'
import { BiSend } from 'react-icons/bi';
import styles from './ChatWindow.module.css'
import Message from './Message';
import Reply from './Reply';
import { v4 as uuid } from 'uuid';

function ChatWindow({chatFlag}) {

  const scrollRef = useRef();
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState(true);

    useEffect(() => {
    //to scroll into view of new message
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
  
  let msgs = localStorage.getItem('messages');

  useEffect(() => {
    if (msgs == null) {
      setEmpty(true);
      setData([])
    } else {
      setEmpty(false);
      setData(JSON.parse(msgs))
    }
  }, [msgs,chatFlag])



  // let msgss = localStorage.getItem('messages');

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
      {empty ?
        <div className={styles.emptyMsg}>
          <h2>No messages yet!</h2>
        </div> :
        <div >{data.length > 0 ? data.map((el) => {
          return (
            <div key={uuid()} className={styles.container}>
              <div className={styles.reply}>
                <Reply reply={el} />
              </div>
              <div ref={scrollRef} className={styles.user}>
                <Message message={el} />
              </div>
            </div>
          )
        }) : <div></div>}
        </div>}
      <div className={styles.footer}>
        <div className={styles.inputCont}>
          <input value={msg} onChange={handleChange} onKeyPress={handleEnter} type="text" />
        </div>
        <div className={styles.buttonCont}>
          <button onClick={handleSend} title="send">
            <div style={{display:"flex", justifyContent:"center"}}><div>Send</div><BiSend /></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow