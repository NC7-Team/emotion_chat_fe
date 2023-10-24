import React, { useState, useEffect, useRef } from 'react';
import useMessageStore from '../../hooks/useMessageStore';
import './chat2.css';

const PerRoom = () => {
  const MessageStore = useMessageStore();

  const {
    connected,
    messageEntered,
    messageLogs,
  } = MessageStore;

  const [period, setPeriod] = useState(300); // 초기 카운트다운 시간
  const [remainingTime, setRemainingTime] = useState('');

  const messageListRef = useRef(null); // 메시지 목록 요소에 대한 참조

  useEffect(() => {
    let tid;

    const beforeUnloadListener = () => {
      if (connected) {
        MessageStore.disconnect();
      }
    };

    const countdownClock = () => {
      setPeriod((prevPeriod) => {
        if (prevPeriod <= 0) {
          clearTimeout(tid);
          // 페이지 이동 또는 원하는 작업 수행
          window.location.href = 'autoPhoto';
          return 0;
        }

        const minutes = Math.floor((prevPeriod / 60) % 60);
        const seconds = prevPeriod % 60;
        setRemainingTime(`${minutes}분 ${seconds}초`);

        tid = setTimeout(countdownClock, 1000);
        return prevPeriod - 1;
      });
    };

    window.addEventListener('beforeunload', beforeUnloadListener);
    if (connected) {
      countdownClock();
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
      clearTimeout(tid);
    };
  }, [connected]);

  // 메시지가 업데이트될 때 스크롤을 자동으로 아래로 이동
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageLogs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    MessageStore.sendMessage({ type: 'message' });
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    MessageStore.changeInput(value);
  };

  if (!connected) {
    return null;
  }

  // 채팅방의 이름을 표시하는 변수
  let roomName = "";

  return (
    <div className="chat-wrapper" style={{ position: 'relative', left: '540px' , top:'40px'}}>
      <h2>{roomName} 상대의 마음을 무너뜨리세요!</h2>
      <div className="chat-container" ref={messageListRef}>
        <ul className="message-list">
          {messageLogs.map((message, index) => (
            <li
              key={index}
              className={message.sentByUser ? 'userMessage' : 'otherMessage'}
            >
              <div
                className="bubble"
                style={{
                  backgroundColor: message.sentByUser ? '#c6e3fa' : '#BDBDBD',
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

export default PerRoom;
