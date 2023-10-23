import usePerMessageStore from "../../hooks/usePerMessageStore";
import { useLocation } from "react-router-dom";
import './list.css';
import UserList from "./userList";
import { useEffect } from "react";

export default function PerRoomList() {
  const perMessageStore = usePerMessageStore();




  // const getRoomName = (roomIndex) => {
  //   switch (roomIndex) {
  //     case 1:
  //       return "화남";
  //     case 2:
  //       return "슬픔";
  //     case 3:
  //       return "기쁨";
  //     default:
  //       return "알 수 없음";
  //   }
  // };

  const { connected, currentRoomIndex, roomIndices } = perMessageStore;

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
                 채팅방
              </button>
            </li>
          ))}
        </ul>
        <UserList roomId={roomId} />
      </div>
    </div>
  );
}
