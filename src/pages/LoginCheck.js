import React from "react";
import ReactCalendar from "../components/calendar/ReactCalendar";

const LoginCheckt = () => {
  const isLoggedIn = false; // 토큰값을 여기서 확인해야 합니다.

  // 토큰값을 확인하고 조치를 취한 후에 페이지를 새로고침
  if (!isLoggedIn) {
    // 토큰값이 없다면 로그인 페이지로 리다이렉트
    window.location.href = "/login";
  }

  return (
    <div>
      <ReactCalendar />
    </div>
  );
};

export default LoginCheckt;
