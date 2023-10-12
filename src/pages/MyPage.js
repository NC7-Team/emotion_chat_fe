import React from "react";
import ReactCalendar from "../components/calendar/ReactCalendar";

const MyPage = () => {
  /* const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>마이페이지</div>;
  */

  return (
    <div>
      <ReactCalendar />
    </div>
  );
};

export default MyPage;
