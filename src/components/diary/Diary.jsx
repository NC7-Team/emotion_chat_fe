import React, { useState } from "react";
import "./diary.css";
import Button from "./Button"; // 필요한 Button 컴포넌트 파일을 가져옴

const Diary = () => {
  const [state, setState] = useState({ content: "" }); // state 변수 정의

  const handleChangeContent = (e) => {
    setState({ ...state, content: e.target.value }); // handleChangeContent 함수 정의
  };


  const handleOnGoBack = () => {
    // handleOnGoBack 함수 정의
  };

  const handleSubmit = () => {
    // handleSubmit 함수 정의
  };

  return (
    <div className="diary-container">
      {/* 일기 */}
      <h4>오늘의 일기</h4>
      <div className="input_wrapper">
        <textarea
          placeholder="오늘은 어땠나요?" // 일기를 작성할 textarea 적용
          value={state.content}
          onChange={handleChangeContent}
        />
      </div>

      <div className="editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Diary;
