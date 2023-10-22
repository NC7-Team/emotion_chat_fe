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
                <ReactCalendar />
            </div>
            <div className="recommend-area">
                <Recommend />
            </div>
            <div>
                <span>{props.currentUser.name && props.currentUser.name[0]}</span>
            </div>
        </div>
    );
}
