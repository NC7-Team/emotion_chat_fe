import React from "react";
import "./diary.css";
import axios from "axios";

const DiaryList = ({ display, index, content }) => {
  const handleDeleteEntry = (index) => {
    axios.delete(`/api/diary/${index}`)
      .then(() => {
        alert("삭제완료")
        window.location.reload();
      })
  };

  return (
    <div className="diary-list">
      {
        display ?
          <div key={index} className="diary-entry">
            <span>{content}</span>
            <button onClick={() => handleDeleteEntry(index)}>삭제</button>
          </div>
          : null
      }
    </div>
  );
};

export default DiaryList;