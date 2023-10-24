// import React, { useState, useEffect, useRef } from 'react';
// import useMessageStore from '../../hooks/usePerMessageStore';
// import './chat2.css';
// import PerPhoto from '../../pages/PerPhoto';
// import { useNavigate } from 'react-router-dom'; // useNavigate 추가

// const Room = () => {
//   const perMessageStore = useMessageStore();
//   const navigate = useNavigate(); // useNavigate 훅 사용

//   const {
//     connected,
//     messageEntered,
//     messageLogs,
//     currentRoomIndex,
//   } = perMessageStore;

//   const [period, setPeriod] = useState(1000);
//   const [remainingTime, setRemainingTime] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     let tid;

//     const beforeUnloadListener = () => {
//       if (connected) {
//         perMessageStore.disconnect();
//       }
//     };

//     const countdownClock = () => {
//       setPeriod((prevPeriod) => {
//         if (prevPeriod <= 0) {
//           clearTimeout(tid);
//           setIsModalOpen(true);
//           return 0;
//         }

//         const minutes = Math.floor((prevPeriod / 60) % 60);
//         const seconds = prevPeriod % 60;
//         setRemainingTime(`${minutes}분 ${seconds}초`);

//         tid = setTimeout(countdownClock, 1000);
//         return prevPeriod - 1;
//       });
//     };

//     window.addEventListener('beforeunload', beforeUnloadListener);

//     if (connected) {
//       countdownClock();
//     }

//     return () => {
//       window.removeEventListener('beforeunload', beforeUnloadListener);
//       clearTimeout(tid);
//     };
//   }, [connected]);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     navigate('/'); // 모달 닫기 후 메인 페이지로 이동
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     perMessageStore.sendMessage({ type: 'message' });
//   };

//   const handleChangeInput = (event) => {
//     const { value } = event.target;
//     perMessageStore.changeInput(value);
//   };

//   if (!connected) {
//     return null;
//   }




//   return (
//     <div className="chat-wrapper" style={{ position: 'relative',top: '30px' ,left: '600px' }}>
//       <h2>상대의 멘탈을 부셔버리세요</h2>
//       <div className="center-content">
//       <div className="chat-container">
//         <ul className="message-list">
//           {messageLogs.map((message, index) => (
//             <li
//               key={index}
//               className={message.sentByUser ? 'userMessage' : 'otherMessage'}
//             >
//               <div
//                 className="bubble"
//                 style={{
//                   backgroundColor: message.sentByUser ? '#c6e3fa' : '#BDBDBD ',
//                 }}
//               >
//                 {message.value}
//               </div>
//             </li>
//           ))}
//         </ul>

//         <form onSubmit={handleSubmit} className="message-input-form">
//           <input
//             type="text"
//             value={messageEntered}
//             onChange={handleChangeInput}
//             className="message-input"
//           />
//           <button type="submit" className="submit-button">send</button>
//         </form>
//       </div>
//       </div>

//       {isModalOpen && (
//         <div className="modal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
//           <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white' }}>
//             <span className="close" onClick={closeModal}>
//               &times;
//             </span>
//             <PerPhoto />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Room;

import React, { useState, useEffect, useRef } from 'react';
import useMessageStore from '../../hooks/usePerMessageStore';
import './chat2.css';
import PerPhoto from '../../pages/PerPhoto';
import { useNavigate } from 'react-router-dom';

const Room = () => {
  const perMessageStore = useMessageStore();
  const navigate = useNavigate();

  const {
    connected,
    messageEntered,
    messageLogs,
    currentRoomIndex,
  } = perMessageStore;

  const [period, setPeriod] = useState(1000);
  const [remainingTime, setRemainingTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const messageListRef = useRef(null); // Ref for the message list element

  useEffect(() => {
    let tid;

    const beforeUnloadListener = () => {
      if (connected) {
        perMessageStore.disconnect();
      }
    };

    const countdownClock = () => {
      setPeriod((prevPeriod) => {
        if (prevPeriod <= 0) {
          clearTimeout(tid);
          setIsModalOpen(true);
          return 0;
        }

        const minutes = Math.floor((prevPeriod / 60) % 60);
        const seconds = prevPeriod % 60;
        setRemainingTime(`${minutes}분 ${seconds}초`);

        tid = setTimeout(countdownClock, 1000);
        return prevPeriod - 1;
      });
    };

    window.addEventListener('beforeunload', beforeUnloadListener);

    if (connected) {
      countdownClock();
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener);
      clearTimeout(tid);
    };
  }, [connected]);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    perMessageStore.sendMessage({ type: 'message' });
  };

  const handleChangeInput = (event) => {
    const { value } = event.target;
    perMessageStore.changeInput(value);
  };

  useEffect(() => {
    if (messageListRef.current) {
      // Scroll to the bottom of the message list
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageLogs]);

  if (!connected) {
    return null;
  }

  return (
    <div className="chat-wrapper" style={{ position: 'relative', top: '30px', left: '600px' }}>
      <h2>상대의 멘탈을 부셔버리세요</h2>
      <div className="center-content">
        <div className="chat-container">
          <ul className="message-list" ref={messageListRef}>
            {messageLogs.map((message, index) => (
              <li
                key={index}
                className={message.sentByUser ? 'userMessage' : 'otherMessage'}
              >
                <div
                  className="bubble"
                  style={{
                    backgroundColor: message.sentByUser ? '#c6e3fa' : '#BDBDBD ',
                  }}
                >
                  {message.value}
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="message-input-form">
            <input
              type="text"
              value={messageEntered}
              onChange={handleChangeInput}
              className="message-input"
            />
            <button type="submit" className="submit-button">send</button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
          <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white' }}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <PerPhoto />
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
