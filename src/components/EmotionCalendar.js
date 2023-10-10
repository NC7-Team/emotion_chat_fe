import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
//import styles from './EmotionCalendar.module.css';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일

const emotions = {
  '2023-10-01': '😀',
  '2023-10-10': '😢',
  '2023-10-21': '😢',
  '2023-10-24': '😀'
};

function App() {

  // 로컬 시간대로 변경, 하루씩 날짜 밀리는 것 방지
  const formatDateToLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderEmotionsAndDate = ({ date, view }) => {
    const formattedDate = formatDateToLocalDateString(date);

    if (view === 'month') {
      return (
        <div>
          {emotions[formattedDate] && <span>{emotions[formattedDate]}</span>}
        </div>
      );
    }
  };

  return (
    <div className="App">
      <Calendar tileContent={renderEmotionsAndDate} />
    </div>
  );
}

export default App;
