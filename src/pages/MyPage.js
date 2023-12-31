import React from "react";
import ReactCalendar from "../components/calendar/ReactCalendar";
import Diary from "../components/diary/Diary";
import Recommend from "../components/recommend/Recommend";

export default function MyPage(props) {
  return (
    <div className="my-page">
      <div className="diary-area">
        <Diary />
      </div>
      <div>
        <ReactCalendar currentUser={props.currentUser} />
      </div>
      <div className="recommend-area">
        <Recommend currentUser={props.currentUser} />
      </div>
      <div className="user-name">
        <span>{props.currentUser.name}</span>
      </div>
    </div>
  );
}
