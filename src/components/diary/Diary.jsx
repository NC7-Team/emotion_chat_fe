import React, { useState, useEffect } from "react";
import axios from "axios";
import "./diary.css";
import Button from "./Button";
import DiaryList from "./DiaryList";

const Diary = ({ currentUserId, selectedDate, diaryEntries, setDiaryEntries }) => {
  const [state, setState] = useState({ content: "" });
  const [entries, setEntries] = useState([]);
  const [display, setDisplay] = useState(false);
  const [index, setIndex] = useState([]);
  const [content, setContent] = useState([]);
  const [todayEmotion, setTodayEmotion] = useState(null);

  const handleChangeContent = (e) => {
    setState({ ...state, content: e.target.value });
  };

  const handleSubmit = () => {
    const newEntry = state.content;

    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setState({ content: "" });

    let formData = new FormData();
    formData.append("userId", currentUserId);
    formData.append("date", selectedDate);
    formData.append("entry", newEntry);

    axios.post("/api/diary/create", formData)
      .then(() => {
        axios.get(`/api/diary/${currentUserId}/${selectedDate}`)
          .then((response) => {
            setDisplay(true)
            setIndex(response.data.diaryId)
            setContent(response.data.content)
          })
      })
      .catch((error) => {
        console.error("Error saving diary entry:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/chatlogs/emotions/1")
      .then((response) => {
        const formattedDate = selectedDate; // 선택된 날짜로 변경
        const todayEmotionData = response.data[formattedDate];

        if (todayEmotionData) {
          setTodayEmotion(todayEmotionData);
        }
      })
      .catch((error) => {
        console.error("Error fetching emotions:", error);
      });

    // 선택된 날짜에 해당하는 일기를 불러옵니다.
    if (selectedDate) {
      axios
        .get(`/api/diary/${currentUserId}/${selectedDate}`)
        .then((response) => {
          console.log(response.data)
          if (response.data) {
            setDisplay(true)
            setIndex(response.data.diaryId)
            setContent(response.data.content)
          }
        })
        .catch((error) => {
          setDisplay(false)
          setIndex(null)
          setContent(null)
        });
    }
  }, [selectedDate]);

  const emotionIcons = {
    HAPPY: "😀",
    SAD: "😢",
    ANGRY: "😠"
  };

  return (
    <div className="diary-container">
      <div>
        <h4>오늘 내 감정</h4>
        {todayEmotion && <span>{emotionIcons[todayEmotion]}</span>}
      </div>
      <h4>{selectedDate} 한 줄 일기</h4> {/* 선택된 날짜를 표시 */}
      <DiaryList display={display} index={index} content={content} />
      <div className="input_wrapper">
        <textarea
          placeholder="오늘은 어땠나요?"
          value={state.content}
          onChange={handleChangeContent}
        />
      </div>

      <div className="editor_section bottom_section">
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Diary;