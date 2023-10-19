import React, { useState, useEffect } from "react";
import useMessageStore from '../../hooks/useMessageStore';
import './chat.css';

const Room = () => {
  const messageStore = useMessageStore();

  const {
    connected,
    messageEntered,
    messageLogs,
  } = messageStore;



  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowEnterMessage(false);
  //   }, 3000);

  //   return () => clearTimeout(timeout); 
  // }, []);

  const beforeUnloadListener = (() => {
    if (connected) {
      messageStore.disconnect();
    }
  });

  window.addEventListener('beforeunload', beforeUnloadListener);

  const handleSubmit = (event) => {
    event.preventDefault();
    messageStore.sendMessage({ type: 'message' });
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    messageStore.changeInput(value);
  };

  if (!connected) {
    return null;
  }

  // 채팅방의 이름을 표시하는 변수
  let roomName = "";

  // 채팅방의 이름을 설정
  // if (window.location.pathname.includes("happiness")) {
  // roomName = "기쁨";
  // } else if (window.location.pathname.includes("sadness")) {
  // roomName = "슬픔";
  // } else if (window.location.pathname.includes("anger")) {
  //  roomName = "화남";
  // }

  return (
    <div className="chat-wrapper" style={{ position: 'absolute', right: '200px' }}>
      <h2>{roomName} Emotion Chat</h2>
      <div className="chat-container">
        <ul className="message-list">
          {messageLogs.map((message, index) => (
            <li
              key={index}
              className={message.sentByUser ? 'userMessage' : 'otherMessage'}
            >
              <div
                className="bubble"
                style={{
                  backgroundColor: message.sentByUser ? '#c6e3fa' : '#BDBDBD ',
                }}
              >
                {message.value}
              </div>
            </li>
          ))}
        
        </ul>



        <form onSubmit={handleSubmit} className="message-input-form">
          <input
            type="text"
            value={messageEntered}
            onChange={handleChangeInput}
            className="message-input"
          />
          <button type="submit" className="submit-button">send</button>
        </form>
      </div>
    </div>
  );
}

export default Room;
