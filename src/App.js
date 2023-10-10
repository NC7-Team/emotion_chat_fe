// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Switch 대신 Routes 사용
import EmotionCalendar from './components/EmotionCalendar'; // 경로 확인
import OtherComponent from './components/OtherComponent'; // 경로 확인
import Navigation from './components/Navigation';
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


