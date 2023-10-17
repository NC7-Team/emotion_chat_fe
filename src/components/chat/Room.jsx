import React, { useState, useEffect } from "react";
import useMessageStore from "../../hooks/useMessageStore";
import './chat.css';


const Room = () => {
  const messageStore = useMessageStore();

  const {
    connected,
    messageEntered,
    messageLogs,
  } = messageStore;

  const [showEnterMessage, setShowEnterMessage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowEnterMessage(false);
    }, 3000);

    return () => clearTimeout(timeout); 
  }, []);

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

  return (
    <div className="chat-wrapper">
      {showEnterMessage && (
        <div className="enter-message-container ">
          {messageLogs.map((message, index) => (
            message.type === 'enterMessage' && (
              <div
                key={index}
                className="enter-message"
              >
                {message.value}
              </div>
            )
          ))}
        </div>
      )}
      <div className="chat-container">
        <ul className="message-list">
          {messageLogs.map((message, index) => (
            message.type !== 'enterMessage' && (
              <li key={index} className={message.sentByUser ? 'userMessage' : 'otherMessage'}>
                {message.value}
              </li>
            )
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="message-input-form">
          <label htmlFor="message-to-send">메시지 입력</label>
          <input
            type="text"
            value={messageEntered}
            onChange={handleChangeInput}
            className="message-input"
          />
          <button type="submit" className="submit-button">전송</button>
        </form>
      </div>
    </div>
  );
}

export default Room;

