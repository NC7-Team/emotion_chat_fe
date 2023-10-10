import React, { Component } from 'react';
import './ChatPage.css';

class ChatApp extends Component {
  render() {
    return (
      <div className="chat-app">
        {/* 상단 네비게이션 바 */}
        <div className="header">
          <span>친구 목록</span>
        </div>

        {/* 채팅창 */}
        <div className="chat-window">
          {/* 채팅 메시지 목록 */}
          <div className="message-list">
            {/* 각각의 메시지 */}
            <div className="message">
              <div className="message-sender">친구 이름</div>
              <div className="message-content">메시지 내용</div>
            </div>
          </div>

          {/* 메시지 입력창 */}
          <div className="message-input">
            <input type="text" placeholder="메시지 입력" />
            <button>전송</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;
