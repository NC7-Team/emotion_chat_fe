import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import styles from "./ReactCalendar.module.css";
import "./custom-calendar-style.css";
import moment from "moment";
import Diary from "../diary/Diary";
import DiaryList from "../diary/DiaryList";

moment.locale("en");

function App() {
  const [emotions, setEmotions] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState({});
  const userId = 1;

  const emotionIcons = {
    HAPPY: "😀",
    SAD: "😢",
  };

  useEffect(() => {
    axios.get("/api/chatlogs/emotions/1")
      .then((response) => {
        setEmotions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching emotions:", error);
      });

    // axios.get(`/api/diary/${userId}/${selectedDate}`)
    //   .then((response) => {
    //     setDiaryEntries(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching diary entries:", error);
    //   });
  }, []);

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

    // 선택한 날짜의 일기 항목 가져오기
    // axios
    //   .get(`/api/diary/${userId}/${formattedDate}`)
    //   .then((response) => {
    //     if (response.data && response.data.content) {
    //       console.log(response.data)
    //       setDiaryEntries({
    //         [response.data.diaryId]: response.data.content,
    //       });
    //     } else {
    //       // 일기 항목이 없는 경우 기존 항목 제거
    //       setDiaryEntries({});
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("선택한 날짜의 일기 항목을 가져오는 중 오류 발생:", error);
    //   });
  };


  const formatDay = (locale, date) => {
    return moment(date).format("DD");
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
      <Calendar
        onClickDay={handleDateClick}
        formatDay={formatDay}
        tileContent={renderEmotionsAndDate}
      />
      {selectedDate && (
        <Diary
          selectedDate={selectedDate}
          diaryEntries={diaryEntries}
          setDiaryEntries={setDiaryEntries}
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