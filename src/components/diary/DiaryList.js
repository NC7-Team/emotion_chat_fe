import React from "react";
import "./diary.css";

const DiaryList = ({ entries, selectedDate, setDiaryEntries }) => {
  const handleDeleteEntry = (index) => {
    setDiaryEntries((prevEntries) => {
      const newEntries = [...prevEntries];
      newEntries.splice(index, 1);
      return newEntries;
    });
  };

  return (
    <div className="diary-list">
      {entries.map((entry, index) => (
        <div key={index} className="diary-entry">
          <span>{entry}</span>
          <button onClick={() => handleDeleteEntry(index)}>삭제</button>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
