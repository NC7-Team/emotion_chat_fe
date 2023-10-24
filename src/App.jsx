import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useMessageStore from './hooks/useMessageStore'; // useMessageStore import 추가

import Header from "./components/common/header/Header";
import Login from "./user/login/Login";
import LoadingIndicator from "./common/LoadingIndicator";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import PhotoPage from "./pages/PhotoPage";
import ChattingPage from "./pages/ChattingPage";
import PerChattingPage from "./pages/PerChattingPage";
import { ACCESS_TOKEN } from "./constants";
import { getCurrentUser } from "./util/APIUtils";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const messageStore = useMessageStore();
  const { currentRoomIndex } = messageStore;

  const loadCurrentlyLoggedInUser = () => {
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    Alert.success("You're safely logged out!");
  };

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  let backgroundColor;
  switch (currentRoomIndex) {
    case 1:
      backgroundColor = "#FF5733";
      break;
    case 2:
      backgroundColor = "#FFD700";
      break;
    case 3:
      backgroundColor = "#90EE90";
      break;
    default:
      backgroundColor = "#FFFFFF";
  }

  return (
    <div className="app" style={{ backgroundColor }}>
      <div className="app-top-box">
        <Header
          authenticated={authenticated}
          onLogout={handleLogout}
        />
      </div>
      <div className="app-body">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/oauth2" element={<OAuth2RedirectHandler />} />
          <Route path="/chat" element={<ChattingPage />} />
          <Route path="/perchat" element={<PerChattingPage />} />
          <Route
            path="/login"
            element={
              <Navigate to="/mypage" currentUser={currentUser} />
            }
          />
          <Route path="/mypage" element={<MyPage />} />

          <Route
            path="/photo"
            element={authenticated ? <PhotoPage /> : <Login />}
          />
        </Routes>
      </div>
      <Alert
        stack={{ limit: 3 }}
        timeout={3000}
        position="top-right"
        effect="slide"
        offset={65}
      />
    </div>
  );
}

export default App;
