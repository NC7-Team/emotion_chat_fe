import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import styles from "./ReactCalendar.module.css";
import "./custom-calendar-style.css";
import moment from "moment";

// Moment.js를 영어로 설정
moment.locale("en");

function App() {
  const [emotions, setEmotions] = useState({});

  const emotionIcons = {
    HAPPY: "😀",
    SAD: "😢",
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/chatlogs/emotions/1")
      .then((response) => {
        setEmotions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching emotions:", error);
      });
  }, []);

  const formatDateToLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDay = (locale, date) => {
    return moment(date).format("DD"); // 날짜를 원하는 포맷으로 표시
  };

  const renderEmotionsAndDate = ({ date, view }) => {
    const formattedDate = formatDateToLocalDateString(date);
    const emotion = emotions[formattedDate];

    if (view === "month" && emotion) {
      const customClassName = emotion === "HAPPY" ? styles.happy : styles.sad;
      return <div className={customClassName}>{emotionIcons[emotion]}</div>;
    }
  };

  return (
    <div className="App">
      <Calendar formatDay={formatDay} tileContent={renderEmotionsAndDate} />
    </div>
  );
}

export default App;
