import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch 대신 Routes 사용
import EmotionCalendar from './components/EmotionCalendar';
import OtherComponent from './components/OtherComponent';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/myPage" element={<EmotionCalendar />} />
        <Route path="/otherPath" element={<OtherComponent />} />
      </Routes>
    </Router>
  );
}

export default App;


