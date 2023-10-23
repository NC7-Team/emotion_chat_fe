import useMessageStore from "../../hooks/useMessageStore";
import { useLocation } from "react-router-dom";
import './list.css';
import UserList from "./userList";
import { useEffect } from "react";

export default function RoomList() {
  const messageStore = useMessageStore();

  const location = useLocation();
  useEffect(() => {
    let emotion = location.state['id'];
    handleClickEnterRoom({
      previousRoomIndex: 0,
      newRoomIndex: emotion,
    });
  })


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

  const { connected, currentRoomIndex, roomIndices } = messageStore;

  const roomId = messageStore.getCurrentRoomId();


  const handleClickEnterRoom = ({ newRoomIndex }) => {
    if (connected) {
      messageStore.disconnect(currentRoomIndex);
    }
    messageStore.connect(newRoomIndex);
  };

  const handleClickQuitRoom = async () => {
    messageStore.disconnect(currentRoomIndex);
  };

  return (
    <div className="list-wrapper" style={{ position: 'absolute', left: '200px' }}>
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
        <UserList roomId={roomId} />
      </div>
    </div>
  );
}