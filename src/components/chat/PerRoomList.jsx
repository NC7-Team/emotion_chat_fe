import React, { useState, useEffect } from "react";
import usePerMessageStore from "../../hooks/usePerMessageStore";
import './list.css';
import UserList from "./userList";

export default function PerRoomList() {
  const perMessageStore = usePerMessageStore();
  const { connected, currentRoomIndex, roomIndices } = perMessageStore;
  const roomId = perMessageStore.getCurrentRoomId();
  const [roomTitle, setRoomTitle] = useState("");
  const maxRoomSize = 2;
  const maxRooms = 8;

  useEffect(() => {
    fetchRoomList();
  }, [perMessageStore]);

  const getRoomSize = (roomIndex) => {
    return perMessageStore.getRoomMemberCount(roomIndex).length;
  }

  const handleClickEnterRoom = ({ newRoomIndex }) => {
    if (connected) {
      perMessageStore.disconnect(currentRoomIndex);
    }
    perMessageStore.connect(newRoomIndex);
  };

  const handleClickQuitRoom = async () => {
    perMessageStore.disconnect(currentRoomIndex);
  };

  const fetchRoomList = () => {
    fetch("http://localhost:8080/rooms/all")
      .then((response) => response.json())
      .then((data) => {
        perMessageStore.roomIndices = data.map((room) => room.roomIndex);
        perMessageStore.publish();
      });
  };

  const createOrJoinRoom = (roomTitle) => {
    fetch("http://localhost:8080/rooms/createOrJoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (connected) {
            perMessageStore.disconnect(currentRoomIndex);
          }
          perMessageStore.connect(data.roomIndex);
        } else {
          console.log("최대 인원을 초과하여 방 생성 또는 입장 불가");
        }
        setRoomTitle("");
      });
  };

  useEffect(() => {
    fetchRoomList();
  }, [perMessageStore]);

  return (
    <div className="list-wrapper" style={{ position: 'absolute', left: '200px' }}>
      <div className="room-list-container">
        <ul className="room-list">
          {roomIndices.map((roomIndex) => (
            <li key={roomIndex} className="room-list-item">
              <button
                type="button"
                disabled={roomIndex === currentRoomIndex || getRoomSize(roomIndex) >= maxRoomSize}
                onClick={() => handleClickEnterRoom({ newRoomIndex: roomIndex })}
              >
                {perMessageStore.getRoomTitle(roomIndex)} 채팅방 ({getRoomSize(roomIndex)}/{maxRoomSize})
              </button>
            </li>
          ))}
        </ul>
        <div className="create-room">
          <input
            type="text"
            placeholder="방 제목을 입력하세요"
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
          {roomIndices.length < maxRooms && (
            <button
              type="button"
              onClick={() => createOrJoinRoom(roomTitle)}
            >
              방 생성 또는 입장
            </button>
          )}
        </div>
        <button
          type="button"
          disabled={!connected}
          onClick={() => handleClickQuitRoom()}
        >
          연결 종료
        </button>
        <UserList roomId={roomId} />
      </div>
    </div>
  );
}


