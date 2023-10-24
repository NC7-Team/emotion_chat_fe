import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import styles from "./ReactCalendar.module.css";
import "./custom-calendar-style.css";
import moment from "moment";
import Diary from "../diary/Diary";
import DiaryList from "../diary/DiaryList";


moment.locale("en");

function App(props) {
  const [emotions, setEmotions] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState({});

  const emotionIcons = {
    HAPPY: "😀",
    SAD: "😢",
    ANGRY: "😠"
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/api/chatlogs/emotions/${props.currentUser.id}`)
      .then((response) => {
        setEmotions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching emotions:", error);
      });
  }, [props.currentUser]);

  const formatDateToLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    const formattedDate = formatDateToLocalDateString(date);
    setSelectedDate(formattedDate);

    // 선택한 날짜에 대한 감정 가져오기
    const emotionsForDate = emotions[formattedDate];

    // 선택한 날짜의 감정 설정하기
    if (emotionsForDate) {
      setEmotions((prevEmotions) => ({
        ...prevEmotions,
        [formattedDate]: emotionsForDate,
      }));
    } else {
      // 감정이 없는 경우 기존 감정 제거
      setEmotions((prevEmotions) => {
        const updatedEmotions = { ...prevEmotions };
        delete updatedEmotions[formattedDate];
        return updatedEmotions;
      });
    }
  };

  const formatDay = (locale, date) => {
    return moment(date).format("DD"); // 날짜를 원하는 포맷으로 표시
  };

  const renderEmotionsAndDate = ({ date, view }) => {
    const formattedDate = formatDateToLocalDateString(date);
    const emotion = emotions[formattedDate];

    let customClassName = "";
    if (view === "month" && emotion) {
      switch (emotion) {
        case "HAPPY":
          customClassName = styles.happy;
          break;
        case "SAD":
          customClassName = styles.sad;
          break;
        case "ANGRY":
          customClassName = styles.angry;
          break;
        default:
          break;
      }
      return <div className={customClassName}>{emotionIcons[emotion]}</div>;
    }
  };

  return (
    <div className="App">
      <Calendar
        onClickDay={handleDateClick}
        formatDay={formatDay}
        tileContent={renderEmotionsAndDate}
      />
      {selectedDate && (
        <Diary
          currentUser={props.currentUser}
          selectedDate={selectedDate}
        />
      )}
      {selectedDate && (
        <DiaryList
          entries={diaryEntries[selectedDate] || []}
          selectedDate={selectedDate}
          setDiaryEntries={setDiaryEntries}
        />
      )}
    </div>
  );
}

export default App;
