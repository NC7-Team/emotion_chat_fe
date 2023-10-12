import React from 'react';
import EmotionCalendar from '../components/calendar/EmotionCalendar';

const MyPage = () => {
  /* const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>마이페이지</div>;
  */

  return (
    <div>
      <EmotionCalendar /> {/* EmotionCalendar를 렌더링합니다. */}
    </div>
  );
};

export default MyPage;
