import usePerMessageStore from "../../hooks/usePerMessageStore";
import React, { useState, useEffect } from "react";
import './list.css';
import './button.scss';

export default function PerRoomList() {
  const perMessageStore = usePerMessageStore();
  const [buttonHidden, setButtonHidden] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const { connected, currentRoomIndex, roomIndices } = perMessageStore;

  const roomId = perMessageStore.getCurrentRoomId();

  const handleClickEnterRoom = ({ newRoomIndex }) => {
    if (connected) {
      perMessageStore.disconnect(currentRoomIndex);
    }
    perMessageStore.connect(newRoomIndex);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setButtonHidden(false);
        clearInterval(timer);
      }
    }, 1000);
  }, [countdown]);

  useEffect(() => {
    if (!buttonHidden) {
      handleClickEnterRoom({
        newRoomIndex: roomIndices,
      });
    }
  }, [buttonHidden]);

  return (
    <div style={{ position: 'absolute', left: '700px' }}>
      {countdown > 0 && (
        <div style={{ fontSize: '500px' }}>{countdown}</div>
      )}
      {/* {!buttonHidden && (
        <button class="learn-more"
          type="button"
          disabled={roomIndices === currentRoomIndex}
        >
          준비되면 클릭하세요
        </button>
      )} */}
    </div>
  );
}
