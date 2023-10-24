// import React, { useState, useEffect } from 'react';
// import './list.css';
// import './chat.css';
// import useMessageStore from '../../hooks/useMessageStore'; // useMessageStore import 추가

// const UserList = ({ roomId }) => {
//   const [userList, setUserList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const messageStore = useMessageStore();
//   const { currentRoomIndex } = messageStore; // currentRoomIndex를 가져옴

//   const fetchUserList = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/chatUsers/${roomId}`);
//       if (!response.ok) {
//         throw new Error('네트워크 응답이 실패했습니다');
//       }

//       const data = await response.json();
//       const usersInChatRoom = data.usersInChatRoom || [];

//       setUserList(Array.from(usersInChatRoom));
//       setLoading(false);
//     } catch (error) {
//       console.error('유저 목록을 가져오는 중 오류 발생:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserList();

//     const intervalId = setInterval(() => {
//       fetchUserList();
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [roomId, currentRoomIndex]); // roomId 및 currentRoomIndex를 의존성 배열에 추가

//   const roomBackgroundClass = `room-background-${currentRoomIndex}`;

//   return (
//     <div className="user-list-container">
//       {loading ? (
//         <div>로딩 중...</div>
//       ) : (
//         <div>
//           <h2>Participants</h2>
//           <div className={roomBackgroundClass}>
//             <ul style={{ listStyle: "none" }}>
//               {userList.map((roomId) => (
//                 <li key={roomId}>user {roomId}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;

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

  const roomBackgroundClass = `room-background-${currentRoomIndex}`;

  // 색상을 여기에서 설정
  const backgroundColor = getBackgroundColor(currentRoomIndex);

  function getBackgroundColor(roomIndex) {
    switch (roomIndex) {
      case 1:
        return '#FF5733'; // Room 1 background color
      case 2:
        return '#FFD700'; // Room 2 background color
      case 3:
        return '#90EA90'; // Room 3 background color
      default:
        return '#FFFFFF'; // Default background color
    }
  }

  return (
    <div className="user-list-container">
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <div>
          <h2>Participants</h2>
          <div className={roomBackgroundClass} style={{ backgroundColor }}>
            <ul style={{ listStyle: "none" }}>
              {userList.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;

