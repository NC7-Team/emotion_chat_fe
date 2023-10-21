import React, { useState, useEffect } from "react";
import usePerMessageStore from "../../hooks/usePerMessageStore";
import './chat.css';
import UserList from "./userList";


const PerRoom = () => {
  const permessageStore = usePerMessageStore();
  const [showEnterMessage, setShowEnterMessage] = useState(true);


  const {
    connected,
    messageEntered,
    messageLogs,
  } = permessageStore;

  const roomId = permessageStore.getCurrentRoomId();


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowEnterMessage(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const beforeUnloadListener = (() => {
    if (connected) {
      permessageStore.disconnect();
    }
  });

  window.addEventListener('beforeunload', beforeUnloadListener);


  const handleSubmit = (event) => {
    event.preventDefault();
    permessageStore.sendMessage({ type: 'message' });
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    permessageStore.changeInput(value);
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

      <UserList roomId={roomId} />


      <div className="user-list-container">
      </div>
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
      <div style={{ position: "relative", height: "500px" }}>
      </div>
    </div>
  );

}

export default PerRoom;