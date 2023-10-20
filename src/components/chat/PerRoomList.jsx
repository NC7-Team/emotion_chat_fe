import React, { useEffect } from "react";
import usePerMessageStore from "../../hooks/usePerMessageStore";
import { useLocation } from "react-router-dom";
import "./list.css";
import UserList from "./UserList";

export default function PerRoomList() {
  const perMessageStore = usePerMessageStore();
  const location = useLocation();

  // useEffect(() => {
  //   let emotion = location.state["id"];
  //   handleClickEnterRoom({
  //     previousRoomIndex: 0,
  //     newRoomIndex: emotion,
  //   });
  // }, [location]);

  const getRoomName = (roomIndex) => {
    return "알 수 없음";
  };

  const {
    connected,
    currentRoomIndex,
    roomIndices,
  } = perMessageStore;

  const roomId = perMessageStore.getCurrentRoomId();

  const handleClickEnterRoom = ({ newRoomIndex }) => {
    if (connected) {
      perMessageStore.disconnect(currentRoomIndex);
    }
    perMessageStore.connect(newRoomIndex);
  };

  const handleClickQuitRoom = async () => {
    perMessageStore.disconnect(currentRoomIndex);
  };

  const handleCreateRoom = () => {
    const newRoomIndex = perMessageStore.createRoom();
    handleClickEnterRoom({ newRoomIndex });
  };

  return (
    <div className="list-wrapper" style={{ position: "absolute", left: "200px" }}>
      <div className="room-list-container">
        <ul className="room-list">
          {roomIndices.map((roomIndex) => (
            <li key={roomIndex} className="room-list-item">
              <button
                type="button"
                disabled={roomIndex === currentRoomIndex}
                onClick={() =>
                  handleClickEnterRoom({
                    previousRoomIndex: currentRoomIndex,
                    newRoomIndex: roomIndex,
                  })
                }
              >
                {getRoomName(roomIndex)} 채팅방
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={!connected}
          onClick={() => handleClickQuitRoom()}
        >
          연결 종료
        </button>
        <button type="button" onClick={handleCreateRoom}>
          새로운 방 생성
        </button>
        <UserList roomId={roomId} />
      </div>
    </div>
  );
}
