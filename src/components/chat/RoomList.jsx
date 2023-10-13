import useMessageStore from "../../hooks/useMessageStore";

export default function RoomList() {
  const messageStore = useMessageStore();

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
    <div>
      <ul>
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
    </div>
  );
}
