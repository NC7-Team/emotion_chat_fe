import React from "react";
import ReactCalendar from "../components/calendar/ReactCalendar";
import Recommand from "../components/recommand/Recommand";
import App from "../components/Diary/App";


const MyPage = () => {
    return (
        <div>
            <ReactCalendar />
            <Recommand />
            <App />
        </div>
    );
};

export default MyPage;
