import React, { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import Header from '../components/Header'

function ChatPage() {

  const [chatFlag, setChatFlag] = useState(false)
  
  const clearChat = () => {
    localStorage.clear('messages');
    setChatFlag(!chatFlag);
  }

  return (
    <div>
      <Header clearChat={clearChat}/>
      <ChatWindow chatFlag={chatFlag}/>
    </div>
  )
}

export default ChatPage