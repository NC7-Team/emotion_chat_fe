import usePerMessageStore from "../../hooks/usePerMessageStore";
import './list.css'

export default function PerRoomList() {
  const messagePerStore = usePerMessageStore();

  const { connected, currentRoomIndex, roomIndices } = messagePerStore;

  const handleClickEnterRoom = ({ newRoomIndex }) => {
    if (connected) {
      messagePerStore.disconnect(currentRoomIndex);
    }
    messagePerStore.connect(newRoomIndex);
  };

  const handleClickQuitRoom = async () => {
    messagePerStore.disconnect(currentRoomIndex);
  };

  return (
    <div>
      <ul className="room-list">
        {roomIndices.map((roomIndex) => (
          <li key={roomIndex}>
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
            다이다이 채팅방
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
    </div>
  );
}
