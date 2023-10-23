import React, { useState, useEffect } from 'react';
import './list.css';

const UserList = ({ roomId }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();

    const intervalId = setInterval(() => {
      fetchUserList(); 
    }, 1000); 

    return () => clearInterval(intervalId);
  }, [roomId]);

  return (
    
    <div className="user-list-container">
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <div>
          <h3>유저 목록:</h3>
          <ul>
            {userList.map((roomId) => (
              <li key={roomId}>유저 {roomId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;