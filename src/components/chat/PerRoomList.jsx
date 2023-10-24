import useMessageStore from "../../hooks/usePerMessageStore";
import './list.css';
import './button.scss';
import { useState } from 'react'; // useState 추가

export default function RoomList() {
  const messageStore = useMessageStore();
  const { connected, currentRoomIndex, roomIndices } = messageStore;

  // 버튼 상태 추가
  const [enterButtonVisible, setEnterButtonVisible] = useState(true);

  const handleClickEnterRoom = ({ newRoomIndex }) => {
    if (connected) {
      messageStore.disconnect(currentRoomIndex);
    }
    messageStore.connect(newRoomIndex);
    
    // 버튼 상태 변경
    setEnterButtonVisible(false);
  };

  const handleClickQuitRoom = async () => {
    messageStore.disconnect(currentRoomIndex);
    
    // 버튼 상태 변경
    setEnterButtonVisible(true);
  };

  // 추가할 텍스트 정의
  const additionalText = "위쪽 버튼을 클릭할시 마음이 심하게 상할 수 있습니다.";

  return (
    <div className="list-wrapper" style={{ position: 'absolute', left: '200px' }}>
      <div className="room-list-container">
        <ul className="room-list">
          {roomIndices.map((roomIndex) => (
            <li key={roomIndex} className="room-list-item">
              {enterButtonVisible && (
                <button className="learn-more"
                  type="button"
                  disabled={roomIndex === currentRoomIndex}
                  onClick={() =>
                    handleClickEnterRoom({
                      previousRoomIndex: currentRoomIndex,
                      newRoomIndex: roomIndex,
                    })
                  }
                  style={{ left: '600px' }}
                >
                  용감하게 <br/>입장하기
                </button>
              )}
            </li>
          ))}
          {!enterButtonVisible && (
            <button className="learn-more"
              type="button"
              disabled={!connected}
              onClick={() => handleClickQuitRoom()}
            style={{top:'50px'}}>
              겁쟁이 처럼<br/>도망치기
            </button>
          )}
        </ul>
      </div>
      <div className="additional-text">{additionalText}</div>
    </div>
  );
}
