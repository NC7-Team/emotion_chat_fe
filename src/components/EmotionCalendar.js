import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import styles from './EmotionCalendar.module.css';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [emotions, setEmotions] = useState({}); // 초기값을 빈 객체로 설정

  const emotionIcons = {
    HAPPY: '😀',
    SAD: '😢'
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/chatlogs/emotions/1')
      .then(response => {
        // console.log(response.data); 
        setEmotions(response.data);
      })
      .catch(error => {
        console.error('Error fetching emotions:', error);
      });
  }, []);

  const formatDateToLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderEmotionsAndDate = ({ date, view }) => {
    const formattedDate = formatDateToLocalDateString(date);
    const emotion = emotions[formattedDate];
    // console.log(formattedDate, emotion); 

    if (view === 'month' && emotion) {
      return (
        <div>
          <span>{emotionIcons[emotion]}</span>
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