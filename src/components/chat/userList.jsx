import React, { useState, useEffect } from 'react';
import './list.css';
import './chat.css';

const UserList = ({ roomId }) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserList = async () => {
    try {
      const response = await fetch(`https://www.moodcanvas.site/chatUsers/${roomId}`);
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
    fetchUserList(); // Fetch user list when component mounts

    const intervalId = setInterval(() => {
      fetchUserList(); // Fetch user list at regular intervals (e.g., every 5 seconds)
    }, 1000); // Adjust the interval time (in milliseconds) as needed

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [roomId]);

  return (

    <div className="user-list-container">
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <div>
          <h2>Participants</h2>
          <ul style={{ listStyle: "none" }}>
            {userList.map((roomId) => (
              <li key={roomId} >user  {roomId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserList;
