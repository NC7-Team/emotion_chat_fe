import React, { useState } from "react";
import "./diary.css";
import Button from "./Button";
import DiaryList from "./DiaryList";

const Diary = ({ selectedDate }) => {
  const [state, setState] = useState({ content: "" });
  const [entries, setEntries] = useState([]);
  const [todayEmotion] = useState(null);

  const handleChangeContent = (e) => {
    setState({ ...state, content: e.target.value });
  };

  const handleSubmit = () => {
    const newEntry = state.content;

    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setState({ content: "" });
  };



  const emotionIcons = {
    HAPPY: "😀",
    SAD: "😢",
  };

  return (
    <div className="diary-container">
      <div>
        <h4>오늘 내 감정</h4>
        {todayEmotion && <span>{emotionIcons[todayEmotion]}</span>}
      </div>
      <h4>{selectedDate} 한 줄 일기</h4> {/* 선택된 날짜를 표시 */}
      <DiaryList entries={entries} selectedDate={selectedDate} setDiaryEntries={setEntries} />
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