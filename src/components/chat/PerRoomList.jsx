import useMessageStore from "../../hooks/useMessageStore";
import './list.css';
import UserList from "./UserList";

export default function RoomList() {
  const messageStore = useMessageStore();

  // const location = useLocation();
  // useEffect(() => {
  //   let emotion = location.state['id'];
  //   handleClickEnterRoom({
  //     previousRoomIndex: 0,
  //     newRoomIndex: emotion,
  //   });
  // }, [location])




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
              e다이다이 채팅방
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
