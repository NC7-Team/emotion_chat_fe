import React, { useState, useEffect } from 'react';
import './list.css';
import './chat.css';
import useMessageStore from '../../hooks/useMessageStore';

const UserList = ({ roomId }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const messageStore = useMessageStore();
  const { currentRoomIndex } = messageStore;

  const fetchUserList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/chatUsers/${roomId}`);
      if (!response.ok) {
        throw new Error('네트워크 응답이 실패했습니다');
      }

      const data = await response.json();
      const usersInChatRoom = data.usersInChatRoom || [];

      setUserList(Array.from(usersInChatRoom));
      setLoading(false);
    } catch (error) {
      console.error('유저 목록을 가져오는 중 오류 발생:', error);
      console.log(roomId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();

    const intervalId = setInterval(() => {
      fetchUserList();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [roomId, currentRoomIndex]);


  return (
    <div className="user-list-container">
    </div>
  );
};

export default UserList;

