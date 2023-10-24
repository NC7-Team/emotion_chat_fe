import React from "react";
import useMessageStore from '../../hooks/useMessageStore';
import './chat.css';

const Room = () => {
  const messageStore = useMessageStore();

  const {
    connected,
    messageEntered,
    messageLogs,
    currentRoomIndex,
  } = messageStore;

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


  const getRoomName = (roomIndex) => {
    switch (roomIndex) {
      case 1:
        return "화남";
      case 2:
        return "슬픔";
      case 3:
        return "기쁨";
      default:
        return "알 수 없음";
    }
  };
  // 채팅방의 이름을 표시하는 변수
  // const roomName = "";
  const roomName = getRoomName(currentRoomIndex);
  const roomBackgroundClass = `room-background-${currentRoomIndex}`;

  return (
    <div className="chat-wrapper" style={{ position: 'absolute', right: '200px' }}>
      <h2>{roomName} 방</h2>
      <div className={`chat-container ${roomBackgroundClass}`}>
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